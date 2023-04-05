package de.neuefische.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public Product findProductById(String id) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isEmpty()) {
            throw new NoSuchElementException("Product with id: " + id + " not found");
        }

        return product.get();
    }
}