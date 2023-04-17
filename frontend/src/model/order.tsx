import {Product} from "./product";

export type Order = {

   id: string,

    productIds: Product[]

    OrderStatus: orderStatus[]

}

export type orderStatus =    "ORDERED" | "IN_PROGRESS" | "ON_THE_WAY" | "DELIVERED"

export const dummyOrder: Order = {
    id: "",
    productIds: [],
    OrderStatus: []

}