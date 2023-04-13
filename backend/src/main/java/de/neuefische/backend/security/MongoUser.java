package de.neuefische.backend.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("MongoUsers")
public record MongoUser (
        @Id
        String id,
        String username,
        String password,
        Role role
) {
}
