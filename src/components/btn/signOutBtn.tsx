import { useNavigate } from "react-router-dom";

// import { AuthContext } from "../../../context/AuthProvider";
// import { useContext } from "react";
import { Link } from "react-router-dom";

function SignOutButton() {
	// const { signOutUser, loading } = useContext(AuthContext)
	const navigate = useNavigate();
	const handleSignOut = async () => {
		try {
			// signOutUser().then(() => {
			//     navigate('/signin');
			// })
			// alert('User signed out successfully');
			navigate("/login");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};
	return (
		<Link
			to="/signup"
			className=" dark:bg-Neutral-700 bg-Neutral-100 rounded-full cursor-pointer py-1 px-3 tracking-tight text-md"
			onClick={handleSignOut}
		>
			Sign Out
		</Link>
	);
}

export default SignOutButton;
