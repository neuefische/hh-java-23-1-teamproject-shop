import FormView from "../form/FormView";
import {useContext, useEffect} from "react";
import {FormProvider} from "../FormContext";


export default function AddView() {

    const formContext = useContext(FormProvider)

    useEffect(() => formContext.reset, [])

    return (
        <FormView toPost={true}/>
    )
}