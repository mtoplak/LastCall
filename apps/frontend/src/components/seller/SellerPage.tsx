import { ISeller } from 'models/seller';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';

function SellerPage() {
	const [seller, setSller] = useState<ISeller>();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/sellers/' + id);
				console.log(response.data);
				setSller(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchData();
	}, [id]);

	return <div>SellerPage... to do</div>;
}

export default SellerPage;
