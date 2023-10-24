import { IDrink } from "models/drink";

interface GroupedProduct {
	product: IDrink;
	quantity: number;
}

interface SellerGroup {
	[seller: string]: GroupedProduct[];
}

export const groupProductsBySeller = (cart: any) => {
	const groupedProducts: SellerGroup = {};
	for (const item of cart) {
		const seller = item.product.seller._id;
		if (!groupedProducts[seller]) {
			groupedProducts[seller] = [];
		}
		groupedProducts[seller].push(item);
	}
	return groupedProducts;
};