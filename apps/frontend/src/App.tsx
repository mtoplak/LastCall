import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux-store';
import { Loading } from 'shared';
import Routing from 'routes';
import Buyer from 'components/buyer/Buyer';
import Seller from 'components/seller/Seller';
import Homepage from 'components/homepage/Homepage';

function App() {
	return (
		/*
		<Suspense fallback={<Loading />}>
			<Provider store={store}>
				<PersistGate loading={''} persistor={persistor}>
					<Routing />
				</PersistGate>
			</Provider>
		</Suspense>*/
		<Homepage />
	);
}

export default App;
