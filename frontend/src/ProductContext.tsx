import {createContext, ReactElement, useEffect, useState} from "react";
import {Product} from "./model/product";
import axios from "axios";
import {toast} from "react-toastify";

export const ProductProvider = createContext<{ allProducts: Product[], currentProduct: Product, getById: (id: string) => void, post: (product: Product) => void, delete: (id: string) => void }>({
    allProducts: [],
    currentProduct: {id: "", name: "", price: 0, productCategory: "SALAD", imageURL: "", vegan: false, warningsList: []},
    getById: () => {},
    post: () => {},
    delete: () => {}
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
        warningsList: []
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
            .then(response => {
                setAllProducts([...allProducts, response.data])
                toast.success("Successfully added!")
            })
            .catch(() => toast.error("Failed to add product!"))
    }

    function deleteProduct(id: string) {
        axios.delete('/api/product/' + id)
            .then(() => {
                setAllProducts(allProducts.filter((product) => product.id !== id))
            })
            .catch(console.error)
    }

    return (
        <ProductProvider.Provider
            value={{allProducts: allProducts, currentProduct: currentProduct, getById: getProductById, post: postProduct, delete: deleteProduct}}>
            {props.children}
        </ProductProvider.Provider>
    )
}

