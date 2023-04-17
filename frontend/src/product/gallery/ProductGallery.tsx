import ProductCard from "../card/ProductCard";
import {useContext} from "react";
import {ProductProvider} from "../../../context/ProductContext";
import "./ProductGallery.css"


export default function ProductGallery() {

    const context = useContext(ProductProvider)

    return (
        <div className={"ProductGallery"}>
            {context.allProducts.map(product => {
                return <ProductCard key={product.id} product={product}/>
            })}
        </div>
    )
}