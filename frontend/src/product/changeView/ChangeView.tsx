import "./ChangeView.css"
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Product} from "../../model/product";
import {ProductProvider} from "../../ProductContext";

export default function ChangeView() {

    const dummyProduct: Product = {
        id: "",
        name: "",
        price: 0,
        productCategory: "APPETIZER",
        imageURL: "",
        vegan: false,
        warningsList: []
    }
    const [newProduct, setNewProduct] = useState<Product>(dummyProduct)
    const context = useContext(ProductProvider)

    function onInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setNewProduct({...newProduct, [event.target.name]: event.target.value})
    }

    function onCheckBoxChange(event: ChangeEvent<HTMLInputElement>): void {
        setNewProduct({...newProduct, [event.target.name]: event.target.checked})

    }

    function onCheckBoxChangeWhenList(event: ChangeEvent<HTMLInputElement>): void {
        let newWarningsList: string[] = newProduct.warningsList
        if (event.target.checked) {
            newWarningsList.push(event.target.value)
        }  else {
            newWarningsList = newWarningsList.filter(warning => warning !== event.target.value)
        }
        setNewProduct({...newProduct, [event.target.name]: newWarningsList})

    }

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        setNewProduct({...newProduct, [event.target.name]: event.target.value})
    }

    function onSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        context.update(newProduct.id,newProduct)
        setNewProduct(dummyProduct)
    }

    return (
        <div className={"AddView"}>
            <form onSubmit={onSave}>
                <div className={"form-element"}>
                    <label htmlFor={"product-id"}>ID: </label>
                    <input type={"text"} id={"product-id"} name={"id"} value={newProduct.id}
                           onChange={onInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-name"}>Name: </label>
                    <input type={"text"} id={"product-name"} name={"name"} value={newProduct.name}
                           onChange={onInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-price"}>Preis: </label>
                    <input type={"number"} id={"product-price"} name={"price"} value={newProduct.price}
                           onChange={onInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-category"}>Kategorie: </label>
                    <select id={"product-category"} name={"productCategory"} value={newProduct.productCategory}
                            onChange={onSelectChange}>
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
                    <input type={"text"} id={"product-image-url"} name={"imageURL"} value={newProduct.imageURL}
                           onChange={onInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-vegan"}>Vegan</label>
                    <input type={"checkbox"} id={"product-vegan"} name={"vegan"} checked={newProduct.vegan}
                           onChange={onCheckBoxChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-warnings"}>Unverträglichkeiten:</label>
                    <div>
                        <label htmlFor={"warning-gluten"}> <input type={"checkbox"} id={"product-warnings"}
                                                                  name={"warningsList"}
                                                                  value={"GLUTEN"}
                                                                  onChange={onCheckBoxChangeWhenList}/>Gluten</label>
                        <label htmlFor={"warning-lactose"}><input type={"checkbox"} id={"product-warnings"}
                                                                  name={"warningsList"}
                                                                  value={"LACTOSE"} onChange={onCheckBoxChangeWhenList}/>Lactose</label>
                        <label htmlFor={"warning-fructose"}> <input type={"checkbox"} id={"product-warnings"}
                                                                    name={"warningsList"}
                                                                    value={"FRUCTOSE"} onChange={onCheckBoxChangeWhenList}/>Fructose</label>
                        <label htmlFor={"warning-nuts"}> <input type={"checkbox"} id={"product-warnings"}
                                                                name={"warningsList"}
                                                                value={"NUTS"}
                                                                onChange={onCheckBoxChangeWhenList}/>Nüsse</label>

                    </div>

                </div>
                <button type={"submit"}>Speichern</button>
            </form>
        </div>
    )
}