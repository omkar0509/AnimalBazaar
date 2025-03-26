package in.sp.main.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import in.sp.main.Model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}