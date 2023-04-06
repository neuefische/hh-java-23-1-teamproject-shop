package de.neuefische.backend.product;

import de.neuefische.backend.product.model.ProductCategory;
import de.neuefische.backend.product.model.Warnings;
import de.neuefische.backend.service.IdService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    private final ProductRepository productRepository = mock(ProductRepository.class);
    private final IdService idService = mock(IdService.class);
    private final ProductService productService = new ProductService(productRepository, idService);
    private Product product, productWithoutId;


    @BeforeEach
    void setUp() {
        product = new Product("123", "salad", 3.5, ProductCategory.SALAD, "", true, List.of(Warnings.FRUCTOSE, Warnings.LACTOSE));
        productWithoutId = new Product("", "salad", 3.5, ProductCategory.SALAD, "", true, List.of(Warnings.FRUCTOSE, Warnings.LACTOSE));
    }

    @Test
    void findAllProducts_expectedEmptyList_WhenRepositoryIsEmpty() {
        //Given
        when(productRepository.findAll())
                .thenReturn(Collections.emptyList());

        //When
        List<Product> actual = productService.findAllProducts();

        //Then
        verify(productRepository).findAll();
        assertThat(actual).isInstanceOf(List.class).isEmpty();

    }

    @Test
    void findAllProducts_expectedListWithOneProduct_WhenRepoContainsOneProduct() {
        //Given
        when(productRepository.findAll())
                .thenReturn(List.of(product));

        //When
        List<Product> actual = productService.findAllProducts();

        //Then
        verify(productRepository).findAll();
        assertThat(actual).isInstanceOf(List.class).contains(product);
    }


    @Test
    void saveProduct() {
        //Given
        when(idService.createId())
                .thenReturn("123");
        when(productRepository.save(product))
                .thenReturn(product);

        //When
        Product actual = productService.saveProduct(productWithoutId);

        //Then
        verify(idService).createId();
        verify(productRepository).save(product);
        assertThat(actual).isEqualTo(product);
    }

    @Test
    void findProductById_expectProduct_whenProductExists() {
        //Given
        when(productRepository.findById(product.id()))
                .thenReturn(Optional.ofNullable(product));

        // WHEN

        Product actual = productService.findProductById(product.id());

        // Then
        verify(productRepository).findById(product.id());
        assertThat(actual).isEqualTo(product);

    }

    @Test
    void findProductById_expectNoSuchElementException_whenProductDoesNotExists() {
        //Given
        when(productRepository.findById("false-id"))
                .thenReturn(Optional.empty());

        //When
        Exception actual = catchException(() -> productService.findProductById("false-id"));
        NoSuchElementException expected = new NoSuchElementException();

        //Then
        verify(productRepository).findById("false-id");
        assertThat(actual).isInstanceOf(expected.getClass()).hasMessageContaining("false-id");
    }
}