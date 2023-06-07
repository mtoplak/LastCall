import { Typography, Box } from '@mui/material';
import CustomContainer from 'components/ui/CustomContainer';
import FooterLink from 'components/ui/FooterLink';
import { useUserAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from 'services/api';

const Footer = () => {
	const { user, role } = useUserAuth();
	const [id, setId] = useState<string>('');

	useEffect(() => {
		const fetchUserId = async () => {
			const response = await api.get(`/sellers/get/${user.email}`);
			setId(response.data._id);
		};

		if (user) {
			fetchUserId();
		}
	}, [user]);

	return (
		<Box sx={{ py: 10, backgroundColor: '#E6F0FF' }}>
			<CustomContainer>
				<CustomContainer>
					<Box>
						<Link to={'/products'}>
							<Typography
								sx={{
									fontSize: '20px',
									color: '#1C1C1D',
									fontWeight: '700',
									mb: 2,
								}}
							>
								Products
							</Typography>
						</Link>
						<FooterLink>Beer</FooterLink>
						<br />
						<FooterLink>Wine</FooterLink>
						<br />
						<FooterLink>Champagne</FooterLink>
						<br />
						<FooterLink>& More</FooterLink>
					</Box>
					{role !== 'buyer' && role !== 'seller' && (
						<Box>
							<Typography
								sx={{
									fontSize: '20px',
									color: '#1C1C1D',
									fontWeight: '700',
									mb: 2,
								}}
							>
								Account
							</Typography>
							<Link to={'/buy/signin'}>
								<FooterLink>Sign in</FooterLink>
							</Link>
							<br />
							<Link to={'/buy/signup'}>
								<FooterLink>Register</FooterLink>
							</Link>
						</Box>
					)}
					<Box>
						<Typography
							sx={{
								fontSize: '20px',
								color: '#1C1C1D',
								fontWeight: '700',
								mb: 2,
							}}
						>
							Company
						</Typography>

						<FooterLink>Partnerships</FooterLink>
						<br />
						<FooterLink>Terms of use</FooterLink>
						<br />
						<FooterLink>Privacy</FooterLink>
						<br />
						<FooterLink>Sitemap</FooterLink>
					</Box>

					{role !== 'seller' && (
						<Box>
							<Typography
								sx={{
									fontSize: '20px',
									color: '#1C1C1D',
									fontWeight: '700',
									mb: 2,
								}}
							>
								Become a seller
							</Typography>
							<Link to={'/sell/signin'}>
								<Typography
									sx={{
										fontSize: '16px',
										color: '#7A7A7E',
										fontWeight: '500',
										cursor: 'pointer',
										'&:hover': {
											color: '#000',
										},
									}}
								>
									Log in
								</Typography>
							</Link>
							<Link to={'/sell/signup'}>
								<Typography
									sx={{
										fontSize: '16px',
										color: '#7A7A7E',
										fontWeight: '500',
										cursor: 'pointer',
										'&:hover': {
											color: '#000',
										},
									}}
								>
									Sign up
								</Typography>
							</Link>
						</Box>
					)}
				</CustomContainer>
			</CustomContainer>
		</Box>
	);
};

export default Footer;
