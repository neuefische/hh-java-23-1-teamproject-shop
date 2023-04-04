package de.neuefische.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> findAllProducts() {
        return productRepository.getProductMap().values().stream().toList();
    }

    public Product findProductById(String id) {
        Product product = productRepository.findProductById(id);

        if (product == null) {
            throw new NoSuchElementException("Product with id: " + id + " not found");
        }

        return product;
    }
}