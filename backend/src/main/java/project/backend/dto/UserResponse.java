package project.backend.dto;

import java.util.UUID;

public record UserResponse(
    UUID id,
    String displayName,
    String email,
    String role
) {
    
}
