import {useContext} from "react";
import {FormProvider} from "../../context/FormContext";
import "./FormView.css"

export default function FormView(props: {toPost: boolean}) {

    const formContext = useContext(FormProvider)

    return (
        <div className={"FormView"}>
            <form onSubmit={props.toPost ? formContext.post : formContext.save}>

                <div className={"form-element"}>
                    <label htmlFor={"product-name"}>Name: </label>
                    <input type={"text"} id={"product-name"} name={"name"} value={formContext.newProduct.name}
                           onChange={formContext.inputChange}/>
                </div>

                <div className={"form-element"}>
                    <label htmlFor={"product-price"}>Preis: </label>
                    <input type={"number"} id={"product-price"} name={"price"} value={formContext.newProduct.price}
                           onChange={formContext.inputChange}/>
                </div>

                <div className={"form-element"}>
                    <label htmlFor={"product-category"}>Kategorie: </label>
                    <select id={"product-category"} name={"productCategory"}
                            value={formContext.newProduct.productCategory}
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
                           value={formContext.newProduct.imageURL}
                           onChange={formContext.inputChange}/>
                </div>

                <div className={"form-element"}>
                    <label htmlFor={"product-vegan"}>Vegan</label>
                    <input type={"checkbox"} id={"product-vegan"} name={"vegan"} checked={formContext.newProduct.vegan}
                           onChange={formContext.checkboxChange}/>
                </div>

                <div className={"form-element"}>
                    <label htmlFor={"product-warnings"}>Unverträglichkeiten:</label>
                    <div>
                        <label htmlFor={"warning-gluten"}> <input type={"checkbox"} id={"product-warnings"}
                                                                  name={"warningsList"}
                                                                  value={"GLUTEN"}
                                                                  onChange={formContext.checkboxListChange}
                                                                  checked={formContext.newProduct.warningsList.includes("GLUTEN")}/>Gluten</label>
                        <label htmlFor={"warning-lactose"}><input type={"checkbox"} id={"product-warnings"}
                                                                  name={"warningsList"}
                                                                  value={"LACTOSE"}
                                                                  onChange={formContext.checkboxListChange}
                                                                  checked={formContext.newProduct.warningsList.includes("LACTOSE")}/>Lactose</label>
                        <label htmlFor={"warning-fructose"}> <input type={"checkbox"} id={"product-warnings"}
                                                                    name={"warningsList"}
                                                                    value={"FRUCTOSE"}
                                                                    onChange={formContext.checkboxListChange}
                                                                    checked={formContext.newProduct.warningsList.includes("FRUCTOSE")}/>Fructose</label>
                        <label htmlFor={"warning-nuts"}> <input type={"checkbox"} id={"product-warnings"}
                                                                name={"warningsList"}
                                                                value={"NUTS"}
                                                                onChange={formContext.checkboxListChange}
                                                                checked={formContext.newProduct.warningsList.includes("NUTS")}/>Nüsse</label>

                    </div>
                </div>
                <button type={"submit"}>Speichern</button>
            </form>
        </div>
    )
}