import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux-store';
import { Loading } from 'shared';
import Routing from 'components/routing/Routing';
import { BrowserRouter } from 'react-router-dom';
import LoginB from 'components/buyer/login/LoginB';
import LoginS from 'components/seller/login/LoginS';
import RegisterS from 'components/seller/login/RegisterS';
import RegisterB from 'components/buyer/login/RegisterB';

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
			<Routing />
		</BrowserRouter>
	);
}

export default App;
