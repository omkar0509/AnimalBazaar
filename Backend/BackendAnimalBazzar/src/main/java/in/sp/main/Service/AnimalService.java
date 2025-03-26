package in.sp.main.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import in.sp.main.Model.Animal;
import in.sp.main.Model.User;
import in.sp.main.Repo.AnimalRepository;

@Service
public class AnimalService {
    @Autowired
    private AnimalRepository animalRepository;

    public Animal addAnimal(Animal animal, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            animal.setImage(imageFile.getBytes()); // Store image as byte[]
        }
        return animalRepository.save(animal);
    }

    public List<Animal> getAnimalsByBreed(String breed) {
        return animalRepository.findByBreed(breed);
    }
    public Optional<Animal> getAnimalById(Long id) {
        return animalRepository.findById(id);
    }
    public List<Animal> getAnimalsBySeller(User seller) {
        return animalRepository.findBySeller(seller);
    }
    public void deleteAnimalById(Long id) {
        animalRepository.deleteById(id);
    }


}