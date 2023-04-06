import {Product} from "../../model/product";
import "./ProductCard.css"
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {ProductProvider} from "../../ProductContext";

type ProductCardProps = {
    product: Product
}

export default function ProductCard(props: ProductCardProps) {

    const context = useContext(ProductProvider)

    const navigate = useNavigate()

    function onDeleteClick() {
        context.delete(props.product.id)
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
                </div>
            </div>
        </div>
    )
}