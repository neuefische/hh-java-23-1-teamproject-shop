import {createContext, ReactElement, useEffect, useState} from "react";
import {Product} from "./model/product";
import axios from "axios";
import {toast} from "react-toastify";

export const ProductProvider = createContext<{allProducts: Product[], post: (product: Product) => void}>
                                ({allProducts: [], post: () => {}})

export default function ProductContext(props: {children: ReactElement}) {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() =>
        {
            getAllProducts()
        }, []
    )

    function getAllProducts(): void {
        axios.get("/api/product")
            .then(response => setProducts(response.data))
            .catch(() => toast.error("Loading page failed!\nTry again later"))
    }

    function postProduct(product: Product): void {
        axios.post("/api/product", product)
            .then(response => {
                setProducts([...products, response.data])
                toast.success("Successfully added! :D")
            })
            .catch(() => toast.error("Not added!\nTry again later"))
    }

    return (
        <ProductProvider.Provider value={{allProducts: products, post: postProduct}}>
            {props.children}
        </ProductProvider.Provider>
    )
}