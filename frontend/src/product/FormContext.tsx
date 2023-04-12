import {ChangeEvent, createContext, FormEvent, ReactElement, useContext, useEffect, useState} from "react";
import {dummyProduct, Product} from "../model/product";
import {ProductProvider} from "../ProductContext";


export const FormProvider = createContext<{
    dummy: Product,
    newProduct: Product,
    inputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    checkboxChange: (event: ChangeEvent<HTMLInputElement>) => void,
    checkboxListChange: (event: ChangeEvent<HTMLInputElement>) => void,
    selectChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    save: (event: FormEvent<HTMLFormElement>) => void
}>({
    dummy: dummyProduct,
    newProduct: dummyProduct,
    inputChange: () => {},
    checkboxChange: () => {},
    checkboxListChange: () => {},
    selectChange: () => {},
    save: () => {}
})

export default function FormContext(props: { children: ReactElement }) {

    const context = useContext(ProductProvider)
    const [newProduct, setNewProduct] = useState<Product>(context.currentProduct)

    useEffect(() => {
        setNewProduct(context.currentProduct)
    }, [context.currentProduct])


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
        } else {
            newWarningsList = newWarningsList.filter(warning => warning !== event.target.value)
        }
        setNewProduct({...newProduct, [event.target.name]: newWarningsList})

    }

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
        setNewProduct({...newProduct, [event.target.name]: event.target.value})
    }

    function onSave(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        context.update(newProduct.id, newProduct)
    }

    return (
        <FormProvider.Provider value={{
            dummy: dummyProduct,
            newProduct: newProduct,
            inputChange: onInputChange,
            checkboxChange: onCheckBoxChange,
            checkboxListChange: onCheckBoxChangeWhenList,
            selectChange: onSelectChange,
            save: onSave
        }}>
            {props.children}
        </FormProvider.Provider>
    )
}