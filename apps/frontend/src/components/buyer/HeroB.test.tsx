import { render } from '@testing-library/react';
import HeroB from './HeroB';

describe('Hero component', () => {
	it('should render', () => {
		const { container } = render(<HeroB />);
		expect(container).toMatchSnapshot();
	});
});