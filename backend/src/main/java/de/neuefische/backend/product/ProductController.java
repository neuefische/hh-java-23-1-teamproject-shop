package de.neuefische.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(value = "api/product", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;


    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return ResponseEntity.ok(productService.findProductById(id));
    }

    @PostMapping
    public ResponseEntity<Product> postProduct(@RequestBody Product product) {
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable String id) {
        if (productRepository.existsById(id)) {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        }
        else return ResponseEntity.notFound().build();
    }


    @PutMapping("{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        if (!product.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id does not match the request body's id");
        }
        return ResponseEntity.of(productService.updateProduct(id, product));
    }

}

