import { useState } from 'react';
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
import { darkTheme } from 'assets/styles/styles';
import { useUserAuth } from 'context/AuthContext';
import { Link } from 'react-router-dom';

//const settings = ['Profile', 'Shopping cart', 'My Orders', 'Logout'];

function NavbarS() {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
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
	//console.log(user);
	//console.log(user?.email);
	//console.log(user?.accessToken);
	//console.log(user?.stsTokenManager?.accessToken);

	const handleLogOut = async () => {
		try {
			await logOut();
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
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
							></IconButton>
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
							></Menu>
						</Box>
						<Typography
							variant="h5"
							noWrap
							component="a"
							href=""
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
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
							}}
						>
							<Link to={'/inventory'}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Orders
								</Button>
							</Link>
							<Link to={'/seller'}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Contact
								</Button>
							</Link>
							<Link to={'/seller/orders'}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Orders
								</Button>
							</Link>
						</Box>
						{user && role === 'seller' ? (
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
									<MenuItem onClick={handleCloseUserMenu}>
										<Typography textAlign="center">
											Profile
										</Typography>
									</MenuItem>
									<MenuItem onClick={handleCloseUserMenu}>
										<Typography textAlign="center">
											My orders
										</Typography>
									</MenuItem>
									<MenuItem onClick={handleLogOut}>
										<Typography textAlign="center">
											Log out
										</Typography>
									</MenuItem>
								</Menu>
							</Box>
						) : (
							<Link to={'/signin'}>
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
export default NavbarS;
