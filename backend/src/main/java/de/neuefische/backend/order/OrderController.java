package de.neuefische.backend.order;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "api/order", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;



    @GetMapping
    public List<Order> getOrders(){
        return orderService.listOrders();
    }

    @GetMapping("{id}")
    public Order getOrderBy(@PathVariable String id) {
        return orderService.getOrderBy(id);
    }

    @PostMapping
    public Order makeOrder(@RequestBody Order order) {
        return orderService.orderProducts(order);
    }

}
