package de.neuefische.backend.product;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.product.model.ProductCategory;
import de.neuefische.backend.product.model.Warnings;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProductIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper mapper;

    private Product dummyProduct;

    private String jsonProduct;

    @BeforeEach
    void setUp() throws Exception {
        dummyProduct = new Product("123", "salad", 3.50, ProductCategory.SALAD, "", true, List.of(Warnings.FRUCTOSE, Warnings.LACTOSE));
        jsonProduct = mapper.writeValueAsString(dummyProduct);
    }


    @Test
    @DirtiesContext
    void getAllProducts_expectedListWithOneElement_whenRepoHasOneElement() throws Exception {
        productRepository.save(dummyProduct);
        mvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonProduct + "]"));
    }


    @Test
    @DirtiesContext
    void postProduct_expectProductInRepository() throws Exception {
        String responseJson =
                mvc.perform(
                        post("/api/product")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonProduct))
                        .andExpect(status().isCreated())
                        .andExpect(content().json("""
                                {
                                    "name": "salad",
                                    "price": 3.5,
                                    "productCategory": "SALAD",
                                    "imageURL": ""
                                }
                                """))
                        .andExpect(jsonPath("$.id").isNotEmpty())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();

        Product actual = mapper.readValue(responseJson, Product.class);
        Product expected = new Product(
                actual.id(),
                dummyProduct.name(),
                dummyProduct.price(),
                dummyProduct.productCategory(),
                dummyProduct.imageURL(),
                dummyProduct.vegan(),
                dummyProduct.warningsList());
        assertThat(productRepository.findAll()).contains(expected);
    }
}