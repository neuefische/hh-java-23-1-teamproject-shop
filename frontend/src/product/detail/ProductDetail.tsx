import {useContext, useEffect} from "react";
import {ProductProvider} from "../../ProductContext";
import {useParams} from "react-router-dom";
import "./ProductDetail.css"

export default function ProductDetail() {

    const context = useContext(ProductProvider)

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            context.getById(id)
        }
    }, [])

    function translateWarnings(): string {
        let translatedWarnings: string = context.currentProduct.warningsList.toString()
                                            .replace("GLUTEN", "Gluten")
                                            .replace("LACTOSE", "Lactose")
                                            .replace("FRUCTOSE", "Fructose")
                                            .replace("NUTS", "Nüsse")
        return translatedWarnings
    }


    function translateCategory(): string {
        let translatedCategory: string = context.currentProduct.productCategory
            .replace("APPETIZER", "Vorspeise")
            .replace("SALAD", "Salat")
            .replace("MAIN_DISH", "Hauptspeise")
            .replace("DESSERT", "Dessert")
            .replace("SNACK", "Snack")
            .replace("DRINK", "Getränk")
        return translatedCategory
    }

    return (
        <div className={"ProductDetail"}>
            <div className={"DetailElement"} id={"detail-image-container"}>
                <img src={context.currentProduct.imageURL} alt={context.currentProduct.name}/>
            </div>
            <div className={"DetailElement"}>
                <label>Kategorie: </label>
                <p>{translateCategory()}</p>
            </div>
            <div className={"DetailElement"}>
                <label>Name: </label>
                <p>{context.currentProduct.name}</p>
            </div>
            <div className={"DetailElement"}>
                <label>Preis: </label>
                <p>{context.currentProduct.price}</p>
            </div>
            <div className={"DetailElement"}>
                <label>Unverträglichkeiten: </label>
                <p>{translateWarnings()}</p>
            </div>
            <div className={"DetailElement"}>
                {context.currentProduct.vegan && <p>vegan</p>}
            </div>
        </div>
    )
}