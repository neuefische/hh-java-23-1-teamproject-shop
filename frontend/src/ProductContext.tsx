import {createContext, ReactElement, useEffect, useState} from "react";
import {Product} from "./model/product";
import axios from "axios";
import {toast} from "react-toastify";

export const ProductProvider = createContext<{allProducts: Product[]}>({allProducts: []})

export default function ProductContext(props: {children: ReactElement}) {
    const [allProduct, setAllProducts] = useState<Product[]>([])

    useEffect(() =>
        {
            getAllProducts()
        }, []
    )

    function getAllProducts(): void {
        axios.get("api/product")
            .then(response => setAllProducts(response.data))
            .catch(() => toast.error("Loading page failed!\nTry again later"))
    }

    return (
        <ProductProvider.Provider value={{allProducts: allProduct}}>
            {props.children}
        </ProductProvider.Provider>
    )
}