package de.neuefische.backend.product;

import de.neuefische.backend.product.model.ProductCategory;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    private final ProductRepository productRepository = mock(ProductRepository.class);
    private final ProductService productService = new ProductService(productRepository);

    @Test
    void findAllProducts_expectedEmptyList_WhenRepositoryIsEmpty() {
        //Given
        when(productRepository.getProductMap())
                .thenReturn(Collections.emptyMap());

        //When
        List<Product> actual = productService.findAllProducts();

        //Then
        verify(productRepository).getProductMap();
        assertThat(actual).isInstanceOf(List.class).isEmpty();

    }

    @Test
    void findAllProducts_expectedListWithOneProduct_WhenRepoContainsOneProduct() {
        //Given
        Product product = new Product("123", "salad", 3.5, ProductCategory.SALAD, "");
        when(productRepository.getProductMap())
                .thenReturn(Map.of("123", product));

        //When
        List<Product> actual = productService.findAllProducts();

        //Then
        verify(productRepository).getProductMap();
        assertThat(actual).isInstanceOf(List.class).contains(product);
    }
}