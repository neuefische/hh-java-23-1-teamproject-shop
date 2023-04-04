package de.neuefische.backend.product;

import de.neuefische.backend.product.model.ProductCategory;
import org.springframework.data.annotation.Id;


public record Product(
        @Id
        String id,
        String name,
        double price,
        ProductCategory productCategory,
        String imageURL
) {
}
