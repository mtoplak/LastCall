import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useUserAuth } from 'context/AuthContext';
import Unauthorized from './Unauthorized';

jest.mock('context/AuthContext');

jest.mock('components/seller/NavbarS', () => {
	return () => <div>NavbarS</div>;
});

jest.mock('components/buyer/NavbarB', () => {
	return () => <div>NavbarB</div>;
});

describe('Unauthorized component', () => {
	beforeEach(() => {
		(useUserAuth as jest.Mock).mockReturnValue({ role: 'buyer' });
	});

	it('should render the component with the correct title and text', () => {
		render(
			<MemoryRouter>
				<Unauthorized />
			</MemoryRouter>
		);

		const title = screen.getByRole('heading', { level: 1 });
		expect(title).toHaveTextContent('Hold up! Error 401 - Unauthorized 😥');

		const text = screen.getByText(
			/With an unwavering commitment to enhancing the beverage industry/i
		);
		expect(text).toBeInTheDocument();
	});

	it('should render the "Sign in" and "Sign up" buttons', () => {
		render(
			<MemoryRouter>
				<Unauthorized />
			</MemoryRouter>
		);

		const signInButton = screen.getByRole('button', { name: /Sign in/i });
		expect(signInButton).toBeInTheDocument();

		const signUpButton = screen.getByRole('button', { name: /Sign up/i });
		expect(signUpButton).toBeInTheDocument();
	});

	it('renders the seller navbar if the role is "seller"', () => {
		jest.spyOn(
			require('context/AuthContext'),
			'useUserAuth'
		).mockImplementation(() => ({ role: 'seller' }));

		render(
			<MemoryRouter>
				<Unauthorized />
			</MemoryRouter>
		);

		expect(screen.getByText('NavbarS')).toBeInTheDocument();
	});

	it('renders the buyer navbar if the role is "buyer"', () => {
		jest.spyOn(
			require('context/AuthContext'),
			'useUserAuth'
		).mockImplementation(() => ({ role: 'buyer' }));

		render(
			<MemoryRouter>
				<Unauthorized />
			</MemoryRouter>
		);

		expect(screen.getByText('NavbarB')).toBeInTheDocument();
	});
});
