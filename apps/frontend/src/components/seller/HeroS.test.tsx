import { render } from '@testing-library/react';
import HeroS from './HeroS';

describe('Hero component', () => {
	it('should render', () => {
		const { container } = render(<HeroS />);
		expect(container).toMatchSnapshot();
	});
});
