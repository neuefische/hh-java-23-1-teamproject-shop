import {useContext, useEffect} from "react";
import {ProductProvider} from "../../ProductContext";
import {useParams} from "react-router-dom";

export default function ProductDetail() {

    const context = useContext(ProductProvider)

    const {id} = useParams<{id: string}>()

    useEffect(()=> {
        if(id) {
            context.getById(id)
        }
    }, [])

    return (
        <div>

            <div>
                <p>{context.currentProduct.productCategory}</p>
                <img src={context.currentProduct.imageURL}/>
                <p>{context.currentProduct.name}</p>
                <p>{context.currentProduct.price}</p>
                <p>{context.currentProduct.id}</p>
            </div>
        </div>
    )
}