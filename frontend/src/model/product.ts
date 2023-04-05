export type Product = {
    id: string,
    name: string,
    price: number,
    productCategory: "APPETIZER" | "MAIN_DISH" | "SALAD" | "DESSERT" | "SNACK" | "DRINK",
    imageURL: string
    warnings : ("GLUTEN" | "LACTOSE" | "FRUCTOSE" | "NUTS")[]
    vegan: boolean

}