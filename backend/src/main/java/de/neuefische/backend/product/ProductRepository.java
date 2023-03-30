package de.neuefische.backend.product;

import de.neuefische.backend.product.model.ProductCategory;
import lombok.Getter;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
@Getter
public class ProductRepository {

    private final Map<String, Product> productMap = new HashMap<>();

    public ProductRepository() {
        productMap.put("123", new Product("123", "Salat", 3.5, ProductCategory.SALAD));
    }

}
