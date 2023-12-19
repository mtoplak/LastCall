import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import { RootStore } from 'mobx-store';

const Page1: FC = () => {
	const rootStore = new RootStore();

	const { REACT_APP_TESTVAR } = process.env;

	return (
		<div className="root">
			<div>
				ENvironment var -{' '}
				<span className="text">{REACT_APP_TESTVAR}</span>
			</div>
			<div style={{ margin: '10px 0px' }}>
				<p>
					This component exported from <b>@core/lib</b>
				</p>
			</div>
			<div>Doubler Value: {rootStore.doubler.counterValue}</div>
			<Button onClick={() => rootStore.doubler.increment()}>
				Increment
			</Button>
		</div>
	);
};

export default observer(Page1);
