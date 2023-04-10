package de.neuefische.backend.product;

import de.neuefische.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final IdService idService;


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

    public Product saveProduct(Product product) {
        String newId = idService.createId();
        Product newProduct = new Product(
                newId,
                product.name(),
                product.price(),
                product.productCategory(),
                product.imageURL(),
                product.vegan(),
                product.warningsList()
        );
        return productRepository.save(newProduct);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }




}