package de.neuefische.backend.product;

import de.neuefische.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final IdService idService;

    public List<Product> findAllProducts() {
        return productRepository.getProductMap().values().stream().toList();
    }

    public Product saveProduct(Product product) {
        String newId = idService.createId();
        Product newProduct = new Product(
                                        newId,
                                        product.name(),
                                        product.price(),
                                        product.productCategory(),
                                        product.imageURL()
                            );
        return productRepository.save(newProduct);
    }
}