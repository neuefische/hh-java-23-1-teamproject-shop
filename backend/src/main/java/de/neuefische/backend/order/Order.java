package de.neuefische.backend.order;

import de.neuefische.backend.product.Product;
import org.springframework.data.annotation.Id;

import java.util.List;

public record Order(
        @Id
        String id,

        List<String> productIds,

        OrderStatus orderStatus
) {
}
