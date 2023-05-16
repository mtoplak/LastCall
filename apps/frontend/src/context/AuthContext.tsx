import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext({
	signUp: async (email: string, password: string): Promise<any> => {},
	signIn: async (email: string, password: string): Promise<any> => {},
});

export function AuthContextProviver({ children }: { children: any }) {
	const [user, setUser] = useState<any>('');

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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log(currentUser);
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ signUp, signIn }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(AuthContext);
}
