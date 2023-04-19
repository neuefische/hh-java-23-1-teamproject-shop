package de.neuefische.backend.order;

import de.neuefische.backend.product.Product;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;

public record Order(
        @Id
        String id,

        Map<String, Integer> productIds


) {
}
