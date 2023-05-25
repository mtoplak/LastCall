import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useContext,
} from 'react';
import api from 'services/api';
import { useUserAuth } from './AuthContext';

interface CartContextProps {
	numOfProductsInCart: number;
	setNumOfProductsInCart: Dispatch<SetStateAction<number>>;
}

const initialCartContextValue: CartContextProps = {
	numOfProductsInCart: 0,
	setNumOfProductsInCart: () => {},
};

const CartContext = React.createContext(initialCartContextValue);

export const CartContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [numOfProductsInCart, setNumOfProductsInCart] = useState<number>(
		initialCartContextValue.numOfProductsInCart
	);
	const { user } = useUserAuth();

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const response = await api.post('/buyers/getcart', {
					email: user?.email,
				});
				setNumOfProductsInCart(response.data.cart.length);
			} catch (error: any) {
				console.log(error.message);
			}
		};

		fetchCart();
	}, [user]);

	return (
		<CartContext.Provider
			value={{ numOfProductsInCart, setNumOfProductsInCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => {
	return useContext(CartContext);
};
