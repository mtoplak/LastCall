/*import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux-store';
import { Loading } from 'shared';*/
import Layout from 'components/core/Layout';
import Routing from 'components/routing/Routing';
import { AuthContextProvider } from 'context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { CartContextProvider } from 'context/CartContext';

/*
<Suspense fallback={<Loading />}>
	<Provider store={store}>
		<PersistGate loading={''} persistor={persistor}>
			<Routing />
		</PersistGate>
	</Provider>
</Suspense>
*/

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<CartContextProvider>
					<Layout>
						<Routing />
					</Layout>
				</CartContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
