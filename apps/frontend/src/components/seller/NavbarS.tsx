import { useEffect, useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import api from 'services/api';

function NavbarS() {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [id, setId] = useState<string>('');
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
								<Link to={'/inventory'}>
									<Button
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											color: 'white',
											display: 'block',
										}}
									>
										Inventory
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
								<Link to={'/seller/sales'}>
									<Button
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											color: 'white',
											display: 'block',
										}}
									>
										Sales
									</Button>
								</Link>
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
							<Link to={'/inventory'}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Inventory
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
							<Link to={'/seller/sales'}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Sales
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
									<Link to={`/supplier/${id}`}>
										<MenuItem onClick={handleCloseUserMenu}>
											<Typography textAlign="center">
												My profile
											</Typography>
										</MenuItem>
									</Link>
									<Link to="/sell/editprofile">
										<MenuItem onClick={handleCloseUserMenu}>
											<Typography textAlign="center">
												Edit profile
											</Typography>
										</MenuItem>
									</Link>
									<MenuItem onClick={handleLogOut}>
										<Typography textAlign="center">
											Log out
										</Typography>
									</MenuItem>
								</Menu>
							</Box>
						) : (
							<Link to={'/sell/signin'}>
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
