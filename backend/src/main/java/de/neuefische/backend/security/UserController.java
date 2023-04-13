package de.neuefische.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final MongoUserDetailsService userService;

    @GetMapping("/me")
    public String getMe() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping
    public MongoUserDTO loginUser() {
        MongoUser user = userService.findMongoUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        return new MongoUserDTO(user.id(), user.username(), user.role());
    }
}
