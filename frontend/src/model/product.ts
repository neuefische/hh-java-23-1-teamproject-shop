export type Product = {
    id: string,
    name: string,
    price: number,
    productCategory: "APPETIZER" | "MAIN_DISH" | "SALAD" | "DESSERT" | "SNACK" | "DRINK",
    imageURL: string
    warningsList : warning[]
    vegan: boolean

}

export type warning = "GLUTEN" | "LACTOSE" | "FRUCTOSE" | "NUTS"