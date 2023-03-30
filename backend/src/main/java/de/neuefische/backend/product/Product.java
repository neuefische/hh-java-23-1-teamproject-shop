package de.neuefische.backend.product;

import de.neuefische.backend.product.model.ProductCategory;

public record Product(
        String id,
        String name,
        double price,
        ProductCategory productCategory
) {
}
