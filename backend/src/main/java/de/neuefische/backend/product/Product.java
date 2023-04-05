package de.neuefische.backend.product;

import de.neuefische.backend.product.model.ProductCategory;
import de.neuefische.backend.product.model.Warnings;

import java.util.List;
import org.springframework.data.annotation.Id;


public record Product(
        @Id
        String id,
        String name,
        double price,
        ProductCategory productCategory,
        String imageURL,
        boolean vegan,
        List<Warnings> warningsList

) {
}
