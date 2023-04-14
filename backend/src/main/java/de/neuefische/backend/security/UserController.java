package de.neuefische.backend.security;

import de.neuefische.backend.product.Product;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/logout")
    public void logout(HttpSession httpSession){
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

    @PostMapping("/signup")
    public MongoUser signUp(@RequestBody MongoUser user) {
            return userService.saveUser(user);
    }

}
