import {ChangeEvent, createContext, FormEvent, ReactElement, useContext, useEffect, useState} from "react";
import {dummyProduct, Product} from "../model/product";
import {ProductProvider} from "../ProductContext";
import {useNavigate} from "react-router-dom";


export const FormProvider = createContext<{
    dummy: Product,
    newProduct: Product,
    inputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    checkboxChange: (event: ChangeEvent<HTMLInputElement>) => void,
    checkboxListChange: (event: ChangeEvent<HTMLInputElement>) => void,
    selectChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    save: (event: FormEvent<HTMLFormElement>) => void,
    post: (event: FormEvent<HTMLFormElement>) => void
    reset: () => void
}>({
    dummy: dummyProduct,
    newProduct: dummyProduct,
    inputChange: () => {},
    checkboxChange: () => {},
    checkboxListChange: () => {},
    selectChange: () => {},
    save: () => {},
    post: () => {},
    reset: () => {}
})

export default function FormContext(props: { children: ReactElement }) {

    const context = useContext(ProductProvider)
    const [newProduct, setNewProduct] = useState<Product>(context.currentProduct)
    const navigate = useNavigate()

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
        navigate("/menu")
    }

    function onPost(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        context.post(newProduct)
        navigate("/menu")
    }

    function resetForm(): void {
        context.reset()
    }

    return (
        <FormProvider.Provider value={{
            dummy: dummyProduct,
            newProduct: newProduct,
            inputChange: onInputChange,
            checkboxChange: onCheckBoxChange,
            checkboxListChange: onCheckBoxChangeWhenList,
            selectChange: onSelectChange,
            save: onSave,
            post: onPost,
            reset: resetForm
        }}>
            {props.children}
        </FormProvider.Provider>
    )
}