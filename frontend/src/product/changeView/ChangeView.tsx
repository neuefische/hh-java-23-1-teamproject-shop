import "./ChangeView.css"
import {useContext, useEffect} from "react";
import {ProductProvider} from "../../context/ProductContext";
import {useParams} from "react-router-dom";
import FormView from "../form/FormView";

export default function ChangeView() {

    const context = useContext(ProductProvider)
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            context.getById(id)
        }
    }, [])


    return (
        <FormView toPost={false}/>
    )
}