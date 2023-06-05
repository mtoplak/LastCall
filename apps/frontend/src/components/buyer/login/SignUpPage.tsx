import { useEffect } from 'react';
import NavbarB from '../NavbarB';
import SignUpB from './SignUpB';

function SignUpPage() {
	useEffect(() => {
		document.title = 'Sign Up | Buyer';
	}, []);
	return (
		<>
			<NavbarB />
			<SignUpB />
		</>
	);
}

export default SignUpPage;
