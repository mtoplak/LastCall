/*import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux-store';
import { Loading } from 'shared';*/
import Routing from 'components/routing/Routing';
import { BrowserRouter } from 'react-router-dom';


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
