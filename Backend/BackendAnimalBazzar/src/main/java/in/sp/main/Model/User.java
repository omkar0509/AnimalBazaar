package in.sp.main.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false) // Enforces uniqueness at the database level
    private String username;
    private String password;
    private String email;
    private String role = "ROLE_USER"; // Default role

    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Ensure the role is not null or empty
        if (role == null || role.trim().isEmpty()) {
            role = "ROLE_USER"; // Default role
        }
        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }
}