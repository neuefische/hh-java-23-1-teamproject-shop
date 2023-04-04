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

        productMap.put("123", new Product("123", "Salat", 3.5, ProductCategory.SALAD, "https://www.gaumenfreundin.de/wp-content/uploads/2022/12/Gemischter-Salat-Gaumenfreundin.jpg"));
        productMap.put("234", new Product("234", "Burger", 4, ProductCategory.MAIN_DISH, "https://www.kerrygold.de/wp-content/uploads/2021/11/Chorizo_Burger_Querformat_2-scaled.jpg"));
        productMap.put("345", new Product("345", "Suppe", 3, ProductCategory.APPETIZER, "https://www.toastenstein.com/wp-content/uploads/2020/11/rezept_champignon_spinta_suppe-scaled.jpg"));
        productMap.put("456", new Product("456", "Pommes", 4.8, ProductCategory.SNACK, "https://foodlovin.de/wp-content/uploads/2018/10/pommes-42.jpg"));

    }

    public Product findProductById(String id) {
        return productMap.get(id);
    }
}
