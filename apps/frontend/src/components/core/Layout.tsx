import Footer from 'components/core/Footer';
//import NavbarB from 'components/buyer/NavbarB';
//import NavbarS from 'components/seller/NavbarS';
//import { useUserAuth } from 'context/AuthContext';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			{children}
			<Footer />
		</>
	);
};

export default Layout;
