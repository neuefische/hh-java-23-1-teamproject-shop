import {Product} from "../../model/product";
import "./ProductCard.css"

type ProductCardProps = {
    product: Product
}

export default function ProductCard(props: ProductCardProps) {


    return (
        <div className={"ProductContainer"}>
            <div className={"ProductCard"}>
                <img src={props.product.imageURL} alt={props.product.name}/>
                <div className={"ProductText"}>
                    <h3>{props.product.name}</h3>
                    <h4>{props.product.price}€</h4>
                </div>
            </div>
        </div>
    )
}