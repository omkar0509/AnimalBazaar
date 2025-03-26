package in.sp.main.Controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import in.sp.main.Model.Animal;
import in.sp.main.Model.User;
import in.sp.main.Repo.UserRepository;
import in.sp.main.Service.AnimalService;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = "http://localhost:3000")
public class AnimalController {

    @Autowired
    private AnimalService animalService;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/sell")
    public ResponseEntity<Animal> addAnimal(
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("gender") String gender,
            @RequestParam("breed") String breed,
            @RequestParam("age") int age,
            @RequestParam("description") String description,
            @RequestParam("mo") String mo,
            @RequestParam("address") String address,
            @RequestParam("image") MultipartFile imageFile) {

       

        // Check if the user is authenticated
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String username = authentication.getName();
        System.out.print(username);

        try {
            User seller = userRepository.findByUsername(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found"));

            Animal animal = new Animal();
            animal.setName(name);
            animal.setPrice(price);
            animal.setGender(gender);
            animal.setBreed(breed);
            animal.setAge(age);
            animal.setDescription(description);
            animal.setMo(mo);
            animal.setAddress(address);
            animal.setSeller(seller);

            if (!imageFile.isEmpty()) {
                animal.setImage(imageFile.getBytes());
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image file is required");
            }

            Animal savedAnimal = animalService.addAnimal(animal, imageFile);
            return ResponseEntity.ok(savedAnimal);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/buy")
    public ResponseEntity<List<Animal>> getAnimalsByBreed(@RequestParam String breed) {
        List<Animal> animals = animalService.getAnimalsByBreed(breed);
        if (animals.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Optional<Animal> animalOptional = animalService.getAnimalById(id);
        if (animalOptional.isEmpty() || animalOptional.get().getImage() == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] imageBytes = animalOptional.get().getImage();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        if (isPng(imageBytes)) {
            headers.setContentType(MediaType.IMAGE_PNG);
        }

        return ResponseEntity.ok().headers(headers).body(imageBytes);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Animal>> getAnimalsByUserId(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<Animal> animals = animalService.getAnimalsBySeller(userOptional.get());
        animals.forEach(animal -> {
            if (animal.getImage() != null) {
                animal.setImageBase64(Base64.getEncoder().encodeToString(animal.getImage())); // Convert byte[] to Base64
            }
        });

        return ResponseEntity.ok(animals);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAnimal(@PathVariable Long id) {
        // Check if the user is authenticated
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        try {
            // Delete the animal by ID
            animalService.deleteAnimalById(id);
            return ResponseEntity.ok("Animal deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting animal");
        }
    }

    private boolean isPng(byte[] imageBytes) {
        return imageBytes.length > 4 &&
                imageBytes[0] == (byte) 0x89 &&
                imageBytes[1] == (byte) 0x50 &&
                imageBytes[2] == (byte) 0x4E &&
                imageBytes[3] == (byte) 0x47;
    }
}