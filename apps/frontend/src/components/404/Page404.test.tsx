import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useUserAuth } from 'context/AuthContext';
import Page404 from './Page404';

jest.mock('context/AuthContext');

describe('Page404 component', () => {
	beforeEach(() => {
		(useUserAuth as jest.Mock).mockReturnValue({ role: 'buyer' });
	});

	it('should render the component with the correct title and text', () => {
		render(
			<MemoryRouter>
				<Page404 notFound="Product" />
			</MemoryRouter>
		);

		const title = screen.getByRole('heading', { level: 1 });
		expect(title).toHaveTextContent('Error 404 - Product Not Found 😥');

		const text = screen.getByText(
			/With an unwavering commitment to enhancing the beverage industry/i
		);
		expect(text).toBeInTheDocument();
	});

	it('should render the "Go home" button', () => {
		render(
			<MemoryRouter>
				<Page404 />
			</MemoryRouter>
		);

		const button = screen.getByRole('button', { name: /Go home/i });
		expect(button).toBeInTheDocument();
	});

	it('should render the "Go back" button if previousPage prop is provided', () => {
		render(
			<MemoryRouter>
				<Page404 previousPage="test" />
			</MemoryRouter>
		);

		const button = screen.getByRole('button', { name: /Go back/i });
		expect(button).toBeInTheDocument();
	});
});
