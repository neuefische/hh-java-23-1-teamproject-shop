import FormView from "../form/FormView";
import {useContext, useEffect} from "react";
import {FormProvider} from "../../context/FormContext";


export default function AddView() {

    const formContext = useContext(FormProvider)

    //eslint-disable-next-line
    useEffect(() => formContext.reset, [])

    return (
        <FormView toPost={true}/>
    )
}