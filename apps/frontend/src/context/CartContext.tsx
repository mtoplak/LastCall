import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useContext,
} from 'react';
import api from 'services/api';
import { useUserAuth } from './AuthContext';
import { IDrink } from 'models/drink';

interface CartProduct {
	product: IDrink & { _id: string };
	quantity: number;
}

interface CartContextProps {
	cartProducts: CartProduct[];
	setCartProducts: Dispatch<SetStateAction<CartProduct[]>>;
}

const initialCartContextValue: CartContextProps = {
	cartProducts: [],
	setCartProducts: () => {},
};

const CartContext = React.createContext(initialCartContextValue);

export const CartContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [cartProducts, setCartProducts] = useState<CartProduct[]>(
		initialCartContextValue.cartProducts
	);
	const { user, role } = useUserAuth();

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const response = await api.post(
					'/cart/get',
					{ email: user.email },
					{
						headers: {
							Authorization: user?.stsTokenManager?.accessToken,
						},
					}
				);
				setCartProducts(response.data.cart);
			} catch (error: any) {
				console.error(error.response.data.message);
			}
		};
		if (user && role === 'buyer') {
			fetchCart();
		}
	}, [user]);

	return (
		<CartContext.Provider value={{ cartProducts, setCartProducts }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => {
	return useContext(CartContext);
};
