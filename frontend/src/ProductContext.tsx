import {createContext, ReactElement, useEffect, useState} from "react";
import {Product} from "./model/product";
import axios from "axios";
import {toast} from "react-toastify";

export const ProductProvider = createContext<{ allProducts: Product[], currentProduct: Product, getById: (id: string) => void }>({
    allProducts: [],
    currentProduct: {id: "", name: "", price: 0, productCategory: "SALAD", imageURL: ""},
    getById: id => {
    }
})

export default function ProductContext(props: { children: ReactElement }) {
    const [allProduct, setAllProducts] = useState<Product[]>([])
    const [currentProduct, setCurrentProduct] = useState<Product>({
        id: "",
        name: "",
        price: 0,
        productCategory: "SALAD",
        imageURL: ""
    })

    useEffect(() => {
            getAllProducts()
        }, []
    )

    function getAllProducts(): void {
        axios.get("/api/product")
            .then(response => setAllProducts(response.data))
            .catch(() => toast.error("Loading page failed!\nTry again later"))
    }

    function getProductById(id: string): void {
        axios.get<Product>(`/api/product/${id}`)
            .then(response => {
                setCurrentProduct(response.data)
            })
    }

    return (
        <ProductProvider.Provider
            value={{allProducts: allProduct, currentProduct: currentProduct, getById: getProductById}}>
            {props.children}
        </ProductProvider.Provider>
    )
}

