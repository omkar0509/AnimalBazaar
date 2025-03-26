package in.sp.main.Service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import in.sp.main.JWT.JwtUtil;
import in.sp.main.Model.User;
import in.sp.main.Repo.UserRepository;
import in.sp.main.Security.CustomUserDetails; 

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER"); // Ensure role is set
        return userRepository.save(user);
    }

    public String loginUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                CustomUserDetails userDetails = new CustomUserDetails(user); // Pass the User object
                return jwtUtil.generateToken(userDetails); // Generate token with user details
            }
        }
        throw new RuntimeException("Invalid username or password");
    }
}