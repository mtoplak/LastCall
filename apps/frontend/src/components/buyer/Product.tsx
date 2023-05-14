import { IDrink } from 'models/drink';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';

function Product() {
    const [drink, setDrink] = useState<IDrink>();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
        const fetchData = async () => {
			try {
				const response = await api.get('/products/' + id);
				console.log(response.data);
				setDrink(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchData();
	}, [id]);

	return <div>Product</div>;
}

export default Product;
