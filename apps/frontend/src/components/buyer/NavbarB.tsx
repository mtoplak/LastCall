import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from 'context/AuthContext';
import { darkTheme } from 'assets/styles/styles';
import { useCartContext } from 'context/CartContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

function NavbarB() {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const { cartProducts } = useCartContext();
	const navigate = useNavigate();

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const { user, logOut, role } = useUserAuth();
	//console.log(role)
	//console.log(user);
	//console.log(user?.email);
	//console.log(user?.accessToken);
	//console.log(user?.stsTokenManager?.accessToken);

	const handleLogOut = async () => {
		try {
			await logOut();
			navigate('/');
			window.location.reload();
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Link to="/">
							<Typography
								variant="h6"
								noWrap
								component="span"
								sx={{
									mr: 2,
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								LastCall
							</Typography>
						</Link>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'flex', md: 'none' },
							}}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								<Link to={'/products'}>
									<Button
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											color: 'white',
											display: 'block',
										}}
									>
										Products
									</Button>
								</Link>
								<Link to="/suppliers">
									<Button
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											color: 'white',
											display: 'block',
										}}
									>
										Suppliers
									</Button>
								</Link>
								{user && role === 'buyer' && (
									<Link to="/orders">
										<Button
											onClick={handleCloseNavMenu}
											sx={{
												my: 2,
												color: 'white',
												display: 'block',
											}}
										>
											My orders
										</Button>
									</Link>
								)}
							</Menu>
						</Box>
						<Link to="/">
							<Typography
								variant="h5"
								noWrap
								component="span"
								sx={{
									mr: 2,
									display: { xs: 'flex', md: 'none' },
									flexGrow: 1,
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								LastCall
							</Typography>
						</Link>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
							}}
						>
							<Link to={'/products'}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Products
								</Button>
							</Link>
							<Link to="/suppliers">
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Suppliers
								</Button>
							</Link>
							{user && role === 'buyer' && (
								<>
									<Link to="/orders">
										<Button
											onClick={handleCloseNavMenu}
											sx={{
												my: 2,
												color: 'white',
												display: 'block',
											}}
										>
											My orders
										</Button>
									</Link>
								</>
							)}
						</Box>
						{user && role === 'buyer' && (
							<Link to={'/cart'} onClick={handleCloseNavMenu}>
								<Button
									sx={{
										my: 2,
										color: 'white',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Badge
										badgeContent={cartProducts.length}
										color="error"
										variant="standard"
										sx={{ marginRight: '0.5rem' }}
									>
										<ShoppingCartIcon />
									</Badge>
								</Button>
							</Link>
						)}
						{user && role === 'buyer' ? (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<IconButton
										onClick={handleOpenUserMenu}
										sx={{ p: 0 }}
									>
										<Avatar
											alt={user?.email.toUpperCase()}
											src="/static/images/avatar/2.jpg"
										/>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem onClick={handleLogOut}>
										<Typography textAlign="center">
											Log out
										</Typography>
									</MenuItem>
								</Menu>
							</Box>
						) : (
							<Link to={'/buy/signin'}>
								<Button
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Sign in
								</Button>
							</Link>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
}
export default NavbarB;
