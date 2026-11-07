package project.backend.security;

import java.io.IOException;
import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import project.backend.services.JwtService;
import project.backend.services.UserService;

/**
 * jwtAuthenticationFilter
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserService userService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsService, UserService userService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Request header se Authorization nikaalo
        String authHeader = request.getHeader("Authorization");

        // 2. Agar header missing hai ya Bearer se start nahi hota, toh filter chain aage badha kar return kar jao
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. "Bearer " ke baad ka actual token string nikaalo
        String jwt = authHeader.substring(7);

        // 4. Check karo token valid hai aur user pehle se authenticate nahi hua pada hai
        if (jwtService.isTokenValid(jwt) && SecurityContextHolder.getContext().getAuthentication() == null) {
            UUID userId = jwtService.extractUserId(jwt);

            // 5. Database me user exist karta hai ya nahi
            if (userService.existsById(userId)) {
                userService.findEmailById(userId).ifPresent(email -> {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    // 6. Spring Security ka Authentication object build karo
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // 7. Security context me set kar do taaki Spring Security ko pata chal jaye ki user verified hai
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                });
            }
        }

        // 8. Agle filter ke paas request forward karo
        filterChain.doFilter(request, response);
    }
}

