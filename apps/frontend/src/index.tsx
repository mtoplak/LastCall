import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'assets/styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

/*  
    If using without TS, use the following line
    const root = createRoot(container); 
*/

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

reportWebVitals();
