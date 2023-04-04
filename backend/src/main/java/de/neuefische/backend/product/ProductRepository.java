package de.neuefische.backend.product;

import lombok.Getter;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
@Getter
public class ProductRepository {

    private final Map<String, Product> productMap = new HashMap<>();



    public Product save(Product product) {
        this.productMap.put(product.id(), product);
        return this.productMap.get(product.id());
    }
}
