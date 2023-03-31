package de.neuefische.backend.product;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.product.model.ProductCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

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
        dummyProduct = new Product("123", "salad", 3.50, ProductCategory.SALAD, "");
        jsonProduct = mapper.writeValueAsString(dummyProduct);
    }

    @Test
    void getAllProducts_expectedEmptyList_WhenRepoIsEmpty() throws Exception {
        mvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getAllProducts_expectedListWithOneElement_whenRepoHasOneElement() throws Exception {
        productRepository.getProductMap().put("123", dummyProduct);
        mvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonProduct + "]"));
    }
}