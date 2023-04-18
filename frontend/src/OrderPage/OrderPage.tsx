import {OrderProvider} from "../context/OrderContext";
import {useContext, useEffect, useState} from "react";
import {Order} from "../model/order";
import {ProductProvider} from "../context/ProductContext";
import {Product} from "../model/product";

export default function OrderPage() {

    const orderContext = useContext(OrderProvider)
    const productContext = useContext(ProductProvider)


    const [productList, setProductList] = useState<Product[]>([])

    useEffect(() => {
            makeOrderBySearchingForProductId()
        }, [orderContext.currentOrder]
    )

    function makeOrderBySearchingForProductId() {
        let listOfProducts: Product[]
        listOfProducts = productContext.allProducts.filter(product => {
            if (orderContext.currentOrder.productIds.has(product.id)) {
                return product
            }

        })


        setProductList(listOfProducts)

    }


    function calculateSum(): number {
        let sum : number = 0
        productList.forEach(product => {
            sum += product.price * (orderContext.currentOrder.productIds.get(product.id))!
        })
        return sum
    }

    return (
        <div>
            <table>
                <tr>
                    <th>Name:</th>
                    <th>Menge:</th>
                    <th>Preis:</th>
                </tr>
                {
                productList?.map(product => {
                    return (
                        <tr>
                          <td>{product.name}</td>
                          <td>{orderContext.currentOrder.productIds.get(product.id)}</td>
                          <td>{product.price * (orderContext.currentOrder.productIds.get(product.id))!}</td>
                        </tr>
                    )
                })

                }
                <hr/>
                <tr>
                    <th>Summe: </th>
                    <td></td>
                    <td>{calculateSum()}$</td>
                </tr>
            </table>
        </div>

    )
}