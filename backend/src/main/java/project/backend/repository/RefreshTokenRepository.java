package project.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.domain.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    
    Optional<RefreshToken> findByToken(String token);

    void deleteByToken(UUID userId);
}
