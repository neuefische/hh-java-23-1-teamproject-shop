import {createContext, Dispatch, ReactElement, SetStateAction, useState} from "react";
import {dummyOrder, Order} from "../model/order";
import axios from "axios";
import {toast} from "react-toastify";


export const OrderProvider = createContext<{
    currentOrder : Order,
    setCurrentOrder: Dispatch<SetStateAction<Order>>,
    post: () => void
}>(
    {
        currentOrder: { productIds: new Map<string, number>()},
        setCurrentOrder: () => {},
        post: () => {}
    })
export default function OrderContext(props: { children: ReactElement }) {

  const [currentOrder, setCurrentOrder] = useState<Order>(dummyOrder)



    function postOrder(): void {
        axios.post<Order>("/api/order", currentOrder)
            .then(() => {
                setCurrentOrder(dummyOrder)
            })
            .catch(() => toast.error("Failed to add order!"))
    }


    return (
        <OrderProvider.Provider
            value={{
                currentOrder: currentOrder,
                setCurrentOrder: setCurrentOrder,
                post: postOrder

            }}>
            {props.children}
        </OrderProvider.Provider>

    )

}