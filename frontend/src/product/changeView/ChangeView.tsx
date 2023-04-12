import "./ChangeView.css"
import {useContext, useEffect} from "react";
import {ProductProvider} from "../../ProductContext";
import {useParams} from "react-router-dom";
import {FormProvider} from "../FormContext";

export default function ChangeView() {

    const context = useContext(ProductProvider)
    const formContext = useContext(FormProvider)
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            context.getById(id)
        }
    }, [])


    return (
        <div className={"AddView"}>
            <form onSubmit={formContext.save}>
                <div className={"form-element"}>
                    <label htmlFor={"product-name"}>Name: </label>
                    <input type={"text"} id={"product-name"} name={"name"} value={formContext.newProduct.name}
                           onChange={formContext.inputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-price"}>Preis: </label>
                    <input type={"number"} id={"product-price"} name={"price"} value={context.currentProduct.price}
                           onChange={formContext.inputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-category"}>Kategorie: </label>
                    <select id={"product-category"} name={"productCategory"}
                            value={context.currentProduct.productCategory}
                            onChange={formContext.selectChange}>
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
                    <input type={"text"} id={"product-image-url"} name={"imageURL"}
                           value={context.currentProduct.imageURL}
                           onChange={formContext.inputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-vegan"}>Vegan</label>
                    <input type={"checkbox"} id={"product-vegan"} name={"vegan"} checked={context.currentProduct.vegan}
                           onChange={formContext.checkboxChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"product-warnings"}>Unverträglichkeiten:</label>
                    <div>
                        <label htmlFor={"warning-gluten"}> <input type={"checkbox"} id={"product-warnings"}
                                                                  name={"warningsList"}
                                                                  value={"GLUTEN"}
                                                                  onChange={formContext.checkboxListChange}
                                                                  checked={context.currentProduct.warningsList.includes("GLUTEN")}/>Gluten</label>
                        <label htmlFor={"warning-lactose"}><input type={"checkbox"} id={"product-warnings"}
                                                                  name={"warningsList"}
                                                                  value={"LACTOSE"}
                                                                  onChange={formContext.checkboxListChange}
                                                                  checked={context.currentProduct.warningsList.includes("LACTOSE")}/>Lactose</label>
                        <label htmlFor={"warning-fructose"}> <input type={"checkbox"} id={"product-warnings"}
                                                                    name={"warningsList"}
                                                                    value={"FRUCTOSE"}
                                                                    onChange={formContext.checkboxListChange}
                                                                    checked={context.currentProduct.warningsList.includes("FRUCTOSE")}/>Fructose</label>
                        <label htmlFor={"warning-nuts"}> <input type={"checkbox"} id={"product-warnings"}
                                                                name={"warningsList"}
                                                                value={"NUTS"}
                                                                onChange={formContext.checkboxListChange}
                                                                checked={context.currentProduct.warningsList.includes("NUTS")}/>Nüsse</label>

                    </div>

                </div>
                <button type={"submit"}>Speichern</button>
            </form>
        </div>
    )
}