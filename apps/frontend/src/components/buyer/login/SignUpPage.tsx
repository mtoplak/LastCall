import { useEffect } from 'react';
import NavbarB from '../NavbarB';
import SignUpB from './SignUpB';

function SignUpPage() {
	useEffect(() => {
		document.title = 'Sign Up | Buyer';
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<NavbarB />
			<SignUpB />
		</>
	);
}

export default SignUpPage;
