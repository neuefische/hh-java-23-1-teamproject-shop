import {useContext} from "react";
import {ProductProvider} from "../../ProductContext";

export default function ProductDetail() {

    const context = useContext(ProductProvider)

    return (
        <div>

            <div>
                <p>{context.currentProduct.productCategory}</p>
                <p>{context.currentProduct.imageURL}</p>
                <p>{context.currentProduct.name}</p>
                <p>{context.currentProduct.price}</p>
                <p>{context.currentProduct.id}</p>
            </div>
        </div>
    )
}