import { render, screen, waitFor } from '@testing-library/react';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import { useUserAuth } from 'context/AuthContext';
import BuyerProtectedRoute from './BuyerProtectedRoute';

jest.mock('context/AuthContext');

describe('BuyerProtectedRoute component', () => {
	const defaultUserAuthMock = {
		user: { id: 1 },
		isLoading: false,
		role: 'buyer',
		signUp: jest.fn(),
		signIn: jest.fn(),
		logOut: jest.fn(),
		resetPassword: jest.fn(),
		verifyEmail: jest.fn(),
		deleteAccount: jest.fn(),
	};

	beforeEach(() => {
		(
			useUserAuth as jest.MockedFunction<typeof useUserAuth>
		).mockReturnValue(defaultUserAuthMock);
	});

	it('should render the children if the user is a buyer and logged in', () => {
		render(
			<MemoryRouter initialEntries={['/orders']}>
				<BuyerProtectedRoute>
					<h1>Protected content</h1>
				</BuyerProtectedRoute>
			</MemoryRouter>
		);

		const protectedContent = screen.getByRole('heading', {
			name: /protected content/i,
		});
		expect(protectedContent).toBeInTheDocument();
	});

	it('should redirect to the unauthorized page if the user is not a buyer', async () => {
		(
			useUserAuth as jest.MockedFunction<typeof useUserAuth>
		).mockReturnValue({
			...defaultUserAuthMock,
			user: { id: 1 },
			isLoading: false,
			role: 'seller',
		});

		render(
			<HashRouter>
				<BuyerProtectedRoute>
					<h1>Protected content</h1>
				</BuyerProtectedRoute>
			</HashRouter>
		);

		await waitFor(() =>
			expect(window.location.href).toContain('/unauthorized')
		);
	});

	it('should redirect to the buyer sign-in page if the user is not logged in', async () => {
		(
			useUserAuth as jest.MockedFunction<typeof useUserAuth>
		).mockReturnValue({
			...defaultUserAuthMock,
			user: null,
			isLoading: false,
			role: 'buyer',
		});

		// console.log(useUserAuth().user);
		// console.log(useUserAuth().role);

		render(
			<HashRouter>
				<BuyerProtectedRoute>
					<h1>Protected content</h1>
				</BuyerProtectedRoute>
			</HashRouter>
		);

		await waitFor(() =>
			expect(window.location.href).toContain('/buy/signin')
		);
	});
});
