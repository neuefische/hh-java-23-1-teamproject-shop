import {Product} from "../../model/product";
import "./ProductCard.css"
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {ProductProvider} from "../../context/ProductContext";
import {OrderProvider} from "../../context/OrderContext";
import {Order} from "../../model/order";

type ProductCardProps = {
    product: Product
}

export default function ProductCard(props: ProductCardProps) {

    const context = useContext(ProductProvider)
    const orderContext = useContext(OrderProvider)
    const navigate = useNavigate()
    const [amount, setAmount] = useState<number>(1)




    function onDeleteClick() {
        context.delete(props.product.id)
    }

    function onAddToOrder() {
        orderContext.setCurrentOrder(
            {...orderContext.currentOrder, productIds: orderContext.currentOrder.productIds.set(props.product.id, amount)})

    }


    return (
        <div className={"ProductContainer"}>
            <div className={"ProductCard"}>
                <img src={props.product.imageURL} alt={props.product.name}/>
                <div className={"ProductText"}>
                    <h3>{props.product.name}</h3>
                    <h4>{props.product.price}€</h4>
                </div>
                <div>
                    <button onClick={()=> {navigate("/product/details/" + props.product.id)}}>Details</button>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={()=> {navigate("/product/edit/" + props.product.id)}}>Edit</button>
                </div>
                <div>
                    <label htmlFor={"product-amount"}>Anzahl: </label>
                    <input type={"number"} id={"product-amount"} name={"amount"} value={amount}
                           onChange={(event) => setAmount(event.target.value as unknown as number)}/>
                    <button onClick={onAddToOrder}>Hinzufügen</button>
                </div>
            </div>
        </div>
    )
}