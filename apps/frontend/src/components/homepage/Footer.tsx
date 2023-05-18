import { styled, Typography, Box, Container } from '@mui/material';
import CustomContainer from 'components/ui/CustomContainer';
import FooterLink from 'components/ui/FooterLink';
import React from 'react';

const Footer = () => {
	return (
		<Box sx={{ py: 10, backgroundColor: '#E6F0FF' }}>
			<CustomContainer>
				<CustomContainer>
					<Box>
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

						<FooterLink>Listing</FooterLink>
						<br />
						<FooterLink>Properties</FooterLink>
						<br />
						<FooterLink>Agents</FooterLink>
						<br />
						<FooterLink>Blog</FooterLink>
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
							Resources
						</Typography>

						<FooterLink>Our Homes</FooterLink>
						<br />
						<FooterLink>Stories</FooterLink>
						<br />
						<FooterLink>Video</FooterLink>
						<br />
						<FooterLink>Free Trial</FooterLink>
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
							Get in touch
						</Typography>

						<Typography
							sx={{
								fontSize: '16px',
								color: '#7A7A7E',
								fontWeight: '500',
								mb: 2,
							}}
						>
							You’ll find your next home, in any style you prefer.
						</Typography>
					</Box>
				</CustomContainer>
			</CustomContainer>
		</Box>
	);
};

export default Footer;
