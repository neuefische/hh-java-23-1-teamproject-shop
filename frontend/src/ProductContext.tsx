import {createContext, ReactElement, useEffect, useState} from "react";
import {Product} from "./model/product";
import axios from "axios";
import {toast} from "react-toastify";

export const ProductProvider = createContext<{ allProducts: Product[], currentProduct: Product, getById: (id: string) => void, post: (product: Product) => void }>({
    allProducts: [],
    currentProduct: {id: "", name: "", price: 0, productCategory: "SALAD", imageURL: "", vegan: false, warnings: []},
    getById: () => {},
    post: () => {}
})

export default function ProductContext(props: { children: ReactElement }) {
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [currentProduct, setCurrentProduct] = useState<Product>({
        id: "",
        name: "",
        price: 0,
        productCategory: "SALAD",
        imageURL: "",
        vegan: false,
        warnings: []
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

    function postProduct(product: Product): void {
        axios.post<Product>("/api/product", product)
            .then(() => {
                setAllProducts([...allProducts, product])
                toast.success("Successfully added!")
            })
            .catch(() => toast.error("Failed to add product!"))
    }

    return (
        <ProductProvider.Provider
            value={{allProducts: allProducts, currentProduct: currentProduct, getById: getProductById, post: postProduct}}>
            {props.children}
        </ProductProvider.Provider>
    )
}

