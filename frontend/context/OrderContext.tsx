import {createContext, ReactElement, useEffect, useState} from "react";
import {dummyProduct, Product} from "../src/model/product";
import {dummyOrder, Order, orderStatus} from "../src/model/order";
import axios from "axios/index";
import {toast} from "react-toastify";
import {ProductProvider} from "./ProductContext";

export const OrderProvider = createContext<{
    allOrders: Order[],
    currentOrder: Order,
    getById: (id: string) => void,
    post: (order: Order) => void
}>(
    {
        allOrders: [],
        currentOrder: { id: "", productIds:[], OrderStatus:[]},
        getById: () => {},
        post: () => {}
    })
export default function OrderContext(props: { children: ReactElement }) {
    const [allOrders, setAllOrders] = useState<Order[]>([])
    const [currentOrder, setCurrentOrder] = useState<Order>(dummyOrder)


    useEffect(() => {
            getAllOrders()
        }, []
    )

    function getAllOrders(): void {
        axios.get("/api/order")
            .then(response => setAllOrders(response.data))
            .catch(() => toast.error("Loading page failed!\nTry again later"))
    }

    function getOrderById(id: string): void {
        axios.get<Order>(`/api/order/${id}`)
            .then(response => {
                setCurrentOrder(response.data)
            })
    }

    function postOrder(order: Order): void {
        axios.post<Order>("/api/order", order)
            .then(response => {
                setAllOrders([...allOrders, response.data])
                toast.success("Successfully added!")
                setCurrentOrder(dummyOrder)
            })
            .catch(() => toast.error("Failed to add order!"))
    }


    return (
        <OrderProvider.Provider
            value={{
                allOrders: allOrders,
                currentOrder: currentOrder,
                getById: getOrderById,
                post: postOrder,

            }}>
            {props.children}
        </OrderProvider.Provider>

    )

}