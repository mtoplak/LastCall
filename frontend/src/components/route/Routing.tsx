import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from "../homepage/Homepage";
const Routing = () => {
    return(
        <Routes>
            <Route path="/" element={<Homepage />} />
            
        </Routes>
    );
}
export default Routing;