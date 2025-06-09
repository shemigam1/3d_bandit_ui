// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";

import Upload from "./views/Upload";
import Signup from "./views/Signup";
import Login from "./views/Login";
import { ThemeProvider } from "./utils/ThemeContext";
import Header from "./components/Header";
import AuthProvider from "./utils/AuthContext";
import ProtectedRoute from "./views/ProtectedRoute";

function App() {
	return (
		<>
			<AuthProvider>
				<ThemeProvider>
					<Header />
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Upload />
								</ProtectedRoute>
							}
						/>
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</ThemeProvider>
			</AuthProvider>
		</>
	);
}

export default App;
