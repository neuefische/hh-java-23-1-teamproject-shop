

export type Order = {

    productIds: Map<string, number>

}

export const dummyOrder: Order = {

    productIds: new Map<string, number>()

}