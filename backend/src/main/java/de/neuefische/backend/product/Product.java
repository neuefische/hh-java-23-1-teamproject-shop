package de.neuefische.backend.product;

import de.neuefische.backend.product.model.ProductCategory;
import de.neuefische.backend.product.model.Warnings;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;


public record Product(
        @Id
        String id,
        @NotBlank
        @Size(min= 2)
        String name,

        @NotBlank
        @Positive
        double price,

        @NotBlank
        ProductCategory productCategory,

        @NotBlank
        String imageURL,

        boolean vegan,

        List<Warnings> warningsList

) {
}
