package de.neuefische.backend.security;

public record MongoUserDTO(
        String id,
        String username,
        Role role
) {
}
