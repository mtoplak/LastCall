import { useEffect } from 'react';
import NavbarB from '../NavbarB';
import SignInB from './SignInB';

function SignInPage() {
	useEffect(() => {
		document.title = 'Sign In';
	}, []);
	return (
		<>
			<NavbarB />
			<SignInB />
		</>
	);
}

export default SignInPage;
