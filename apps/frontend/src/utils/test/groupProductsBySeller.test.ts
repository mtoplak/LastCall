import { groupProductsBySeller } from "../groupProductsBySeller";

describe("Group Products By Seller", () => {
    it("should return grouped products by seller", () => {
        const cart = [
            { product: { seller: { _id: 1 } } },
            { product: { seller: { _id: 2 } } },
            { product: { seller: { _id: 1 } } },
        ]
        const result = groupProductsBySeller(cart)

        expect(result).toEqual({
            1: [
                { product: { seller: { _id: 1 } } },
                { product: { seller: { _id: 1 } } },
            ],
            2: [
                { product: { seller: { _id: 2 } } },
            ],
        });
    })
})