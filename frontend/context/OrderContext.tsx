import {createContext, ReactElement, useEffect, useState} from "react";
import {dummyOrder, Order, orderStatus} from "../src/model/order";
import axios from "axios/index";
import {toast} from "react-toastify";


export const OrderProvider = createContext<{
    allOrders: Order[],
    currentOrder: Order,
    post: (order: Order) => void
}>(
    {
        allOrders: [],
        currentOrder: { id: "", productIds:[], OrderStatus:[]},
        post: () => {}
    })
export default function OrderContext(props: { children: ReactElement }) {
    const [currentOrder, setCurrentOrder] = useState<Order>(dummyOrder)


    function postOrder(order: Order): void {
        axios.post<Order>("/api/order", order)
            .then(response => {
                setCurrentOrder(response.data)
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
                post: postOrder

            }}>
            {props.children}
        </OrderProvider.Provider>

    )

}