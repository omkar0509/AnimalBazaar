package in.sp.main.Repo;


import org.springframework.data.jpa.repository.JpaRepository;

import in.sp.main.Model.Animal;
import in.sp.main.Model.User;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByBreed(String breed);
    List<Animal> findBySeller(User seller);
}
