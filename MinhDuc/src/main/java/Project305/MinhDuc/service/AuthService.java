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

    public void register(String id, String username, String password, String email, String userType) {
    User user;

    if (userType.equalsIgnoreCase("DOCTOR")) {
        user = new Doctor();
    } else if (userType.equalsIgnoreCase("PATIENT")) {
        user = new Patient();
    } else {
        throw new IllegalArgumentException("Invalid user type: " + userType);
    }

    user.setId(id);
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    user.setUserType(UserType.valueOf(userType.toUpperCase()));
    userRepository.save(user);
}


    public User authenticate(String id, String password) {
        User user = userRepository.findByIdentityNumber(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return user;
    }
}