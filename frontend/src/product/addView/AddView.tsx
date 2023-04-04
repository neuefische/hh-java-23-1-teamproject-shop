import "./AddView.css"
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Product} from "../../model/product";
import {ProductProvider} from "../../ProductContext";

export default function AddView() {

    const dummyProduct: Product = {id: "", name: "", price: 0, productCategory: "APPETIZER", imageURL: ""}
    const [newProduct, setNewProduct] = useState<Product>(dummyProduct)
    const context = useContext(ProductProvider)

    function onInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setNewProduct({...newProduct, [event.target.name]: event.target.value})
    }

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        setNewProduct({...newProduct, [event.target.name]: event.target.value})
    }

    function onSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        context.post(newProduct)
        setNewProduct(dummyProduct)
    }

    return (
        <div className={"AddView"}>
            <form onSubmit={onSave}>
                <div className={"form-element"}>
                    <label htmlFor={"product-name"}>Name: </label>
                    <input type={"text"} id={"product-name"} name={"name"} value={newProduct.name} onChange={onInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-price"}>Preis: </label>
                    <input type={"number"} id={"product-price"} name={"price"} value={newProduct.price} onChange={onInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-category"}>Kategorie: </label>
                    <select id={"product-category"} name={"productCategory"} value={newProduct.productCategory} onChange={onSelectChange}>
                        <option value={"APPETIZER"}>Vorspeise</option>
                        <option value={"SALAD"}>Salat</option>
                        <option value={"MAIN_DISH"}>Hauptspeise</option>
                        <option value={"DESSERT"}>Dessert</option>
                        <option value={"SNACK"}>Snack</option>
                        <option value={"DRINK"}>Getränk</option>
                    </select>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-image-url"}>Bild-url: </label>
                    <input type={"text"} id={"product-image-url"} name={"imageURL"} value={newProduct.imageURL} onChange={onInputChange}/>
                </div>
                <button type={"submit"}>Speichern</button>
            </form>
        </div>
    )
}