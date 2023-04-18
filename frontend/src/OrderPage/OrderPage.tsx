import {OrderProvider} from "../context/OrderContext";
import {useContext, useEffect, useState} from "react";
import {Order} from "../model/order";

export default function OrderPage () {

    const orderContext = useContext(OrderProvider)

    const [currentOrder, setCurrentOrder] = useState<Order>()

    return (
        <div></div>

    )
}