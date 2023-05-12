import React from "react";
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Homepage from "../homepage/Homepage";
import Buyer from "components/buyer/Buyer";
const Routing = () => {
    return(
        <BrowserRouter>
            <Route path="/" element={<Homepage />} />
            <Route path="/buyer" element={<Buyer />} />
        </BrowserRouter>
    );
}
export default Routing;