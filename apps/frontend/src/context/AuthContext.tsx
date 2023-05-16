import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	sendPasswordResetEmail,
} from 'firebase/auth';

const AuthContext = createContext({
	signUp: async (email: string, password: string): Promise<any> => {},
	signIn: async (email: string, password: string): Promise<any> => {},
	logOut: async (): Promise<any> => {},
	resetPassword: async (email: string): Promise<any> => {},
	user: null as User | null,
});

export function AuthContextProviver({ children }: { children: any }) {
	const [user, setUser] = useState<User | null>(null);

	async function signUp(email: string, password: string) {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			return { success: true, response };
		} catch (error) {
			return { success: false, error };
		}
	}

	async function signIn(email: string, password: string) {
		try {
			const response = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			return { success: true, response };
		} catch (error) {
			return { success: false, error };
		}
	}

	async function logOut() {
		try {
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
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log('Auth state changed');
			console.log('Current user: ');
			console.log(currentUser);
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, signUp, signIn, logOut, resetPassword }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(AuthContext);
}
