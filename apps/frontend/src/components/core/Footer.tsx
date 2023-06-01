import { Typography, Box } from '@mui/material';
import CustomContainer from 'components/ui/CustomContainer';
import FooterLink from 'components/ui/FooterLink';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<Box sx={{ py: 10, backgroundColor: '#E6F0FF' }}>
			<CustomContainer>
				<CustomContainer>
					<Box>
						<Link to={'/'}>
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

					<Box>
						<Link to={'/buy/signin'}>
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
						</Link>

						<FooterLink>My account</FooterLink>
						<br />
						<FooterLink>Sign in</FooterLink>
						<br />
						<FooterLink>Register</FooterLink>
					</Box>

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

						<Link to={'/seller'}>
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
								Click here to become a seller.
							</Typography>
						</Link>
					</Box>
				</CustomContainer>
			</CustomContainer>
		</Box>
	);
};

export default Footer;
