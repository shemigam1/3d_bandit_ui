import axios from "axios";
import { useState, useContext, createContext, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
	// Define your user type based on what your API returns
	id: string;
	// password: string;
	email: string;
	// Add other user properties as needed
}

interface AuthContextType {
	token: string;
	id: string | null;
	user: User | null;
	loginAction: (data: { email: string; password: string }) => Promise<void>;
	signupAction: (data: { email: string; password: string }) => Promise<void>;
	logOut: () => void;
}

export interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState(null);
	const [id, setId] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("site") || "");
	const navigate = useNavigate();

	// ...existing code...
	const signupAction = async ({ email, password }: any) => {
		try {
			const response = await axios.post(
				"https://threed-bandit-backend.onrender.com/api/v1/auth/signup",
				// "http://localhost:1738/api/v1/auth/signup",
				{ email, password }, // body as second argument
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const res = response.data;
			// console.log(res);
			// console.log(res.data._id);
			// console.log(res.data.oken);
			if (res) {
				setUser(res.data.user);
				setId(res.data.user._id);
				setToken(res.data.token);
				localStorage.setItem("site", res.data.token);
				navigate("/");
				return;
			}
			throw new Error(res.message);
		} catch (err) {
			// console.error(err);
			throw new Error(err instanceof Error ? err.message : String(err));
		}
	};
	const loginAction = async ({ email, password }: any) => {
		// console.log({ email, password });

		try {
			const response = await axios.post(
				"https://threed-bandit-backend.onrender.com/api/v1/auth/login",
				// "http://localhost:1738/api/v1/auth/login",
				{ email, password }, // body as second argument
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const res = response.data;
			console.log(res);

			if (res) {
				setUser(res.data.user);
				setId(res.data.user.id);
				setToken(res.data.token);
				localStorage.setItem("site", res.data.token);
				navigate("/");
				return;
			}
			throw new Error(res.message);
		} catch (err) {
			console.error(err);
		}
	};
	// ...existing code...

	const logOut = () => {
		setUser(null);
		setToken("");
		localStorage.removeItem("site");
		navigate("/login");
	};

	// const userData = { user: user, token: token };

	return (
		<AuthContext.Provider
			value={{ user, id, token, loginAction, signupAction, logOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
