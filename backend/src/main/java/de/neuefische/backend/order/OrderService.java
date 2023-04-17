package de.neuefische.backend.order;

import de.neuefische.backend.product.Product;
import de.neuefische.backend.product.ProductService;
import de.neuefische.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final IdService idService;
    public List<Order> listOrders() {
        return orderRepository.findAll();
    }
    public Order getOrderBy(String id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            return optionalOrder.get();
        } else {
            throw new IllegalArgumentException("Product with ID " + id + " not found");
        }
    }

    public Order orderProducts(List<String> productIds) {
        return orderRepository.save(new Order(idService.createId(), productIds, OrderStatus.ORDERED));
    }
}
