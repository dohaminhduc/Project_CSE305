package Project305.MinhDuc.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Project305.MinhDuc.model.User;
import Project305.MinhDuc.repository.UserRepository;
import Project305.MinhDuc.request.LoginRequest;
import Project305.MinhDuc.service.AuthService;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    Long id = request.getIdentityNumber(); 
    Optional<User> userOpt = userRepository.findById(id);

    if (userOpt.isPresent()) {
        User user = userOpt.get();
        if (user.getPassword().equals(request.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("userType", user.getUserType());
            return ResponseEntity.ok(response);
        }
    }

    Map<String, String> errorResponse = new HashMap<>();
    errorResponse.put("status", "error");
    errorResponse.put("message", "Invalid identity number or password");

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
}


    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam String userType) {
        authService.register(username, password, email, userType);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("User logged out successfully");
    }
}
