package Project305.MinhDuc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import Project305.MinhDuc.model.Doctor;
import Project305.MinhDuc.model.Patient;
import Project305.MinhDuc.model.User;
import Project305.MinhDuc.model.UserType;
import Project305.MinhDuc.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public void register(String username, String password, String email, String userType) {
        User user;

        if (userType.equalsIgnoreCase("DOCTOR")) {
            user = new Doctor(username, password, email);
        } else if (userType.equalsIgnoreCase("PATIENT")) {
            user = new Patient(username, password, email, java.time.LocalDate.now());
        } else {
            throw new IllegalArgumentException("Invalid user type: " + userType);
        }

        user.setName(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setUserType(Enum.valueOf(UserType.class, userType.toUpperCase()));
        userRepository.save(user);
    }

    public User authenticate(Long id, String password) {
        return userRepository.findById(id)
                .map(user -> {
                    if (!user.getPassword().equals(password)) {
                        throw new BadCredentialsException("Invalid credentials");
                    }
                    return user;
                })
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}