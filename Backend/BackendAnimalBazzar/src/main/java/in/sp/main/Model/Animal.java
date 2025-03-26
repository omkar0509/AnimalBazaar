package in.sp.main.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String gender;
    private String breed;
    private int age;
    private String description;
    private String mo;
    private String address;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @Transient // This field will not be persisted in the database
    private String imageBase64; // Base64-encoded image for the frontend

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true) // Allow null values
    private User seller;

    // Getter and Setter for imageBase64
    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }
}