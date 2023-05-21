import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	sendPasswordResetEmail,
	sendEmailVerification,
} from 'firebase/auth';

const AuthContext = createContext({
	signUp: async (email: string, password: string): Promise<any> => {},
	signIn: async (email: string, password: string): Promise<any> => {},
	logOut: async (): Promise<any> => {},
	resetPassword: async (email: string): Promise<any> => {},
	verifyEmail: async (): Promise<any> => {},
	user: null as any,
	isLoading: true,
}); // initial values

export function AuthContextProvider({ children }: { children: any }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // even useful?
	const [isLoading, setIsLoading] = useState(true);

	async function signUp(email: string, password: string) {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const currentUser = auth.currentUser;
			if (currentUser) {
				const response2 = await sendEmailVerification(currentUser); // Send email verification
				console.log(response2);
				return { success: true, response };
			} else {
				throw new Error('User is null');
			}
		} catch (error) {
			return { success: false, error };
		}
	}

	async function verifyEmail() {
		try {
			await sendEmailVerification(user!); // Send email verification
			return { success: true };
		} catch (error) {
			return { success: false, error };
		}
	}

	async function signIn(email: string, password: string) {
		try {
			// check if email is verified first
			/*const isEmailVerified = user?.emailVerified;
			if (!isEmailVerified) {
				throw new Error('Email is not verified');
			}*/
			const response = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const currentUser = auth.currentUser;
			if (currentUser && currentUser.emailVerified) {
				// User is signed in and email is verified
				setUser(currentUser);
				setIsLoggedIn(true);
				return { success: true, response };
			} else if (currentUser && !currentUser.emailVerified) {
				// User is signed in but email is not verified
				throw new Error('Email is not verified!');
			} else {
				throw new Error('User does not exist!');
			}
		} catch (error) {
			return { success: false, error };
		}
	}

	async function logOut() {
		try {
			setUser(null);
			setIsLoggedIn(false);
			return signOut(auth);
		} catch (error) {
			console.log(error);
		}
	}

	async function resetPassword(email: string) {
		try {
			await sendPasswordResetEmail(auth, email);
			return { success: true };
		} catch (error) {
			return { success: false, error };
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			console.log('Auth state changed');
			console.log('Current user: ');
			console.log(currentUser);

			if (currentUser?.emailVerified) {
				try {
					const refreshedToken = await currentUser.getIdToken(true);
					console.log(refreshedToken);
					console.log('Token refreshed');
					setUser(currentUser);
					setIsLoggedIn(true);
					// use the refreshedToken if needed
				} catch (error) {
					console.error('Error refreshing token:', error);
				}
			} else {
				setUser(null);
				setIsLoggedIn(false);
			}
			setIsLoading(false); // Set isLoading to false when the authentication data is loaded
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				signUp,
				signIn,
				logOut,
				resetPassword,
				verifyEmail,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(AuthContext);
}
