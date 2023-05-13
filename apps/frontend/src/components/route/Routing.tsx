import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import Buyer from 'components/buyer/Buyer';
const Routing = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/buyer" element={<Buyer />} />
				<Route path="/seller" element={<Homepage />} />
			</Routes>
		</>
	);
};
export default Routing;
