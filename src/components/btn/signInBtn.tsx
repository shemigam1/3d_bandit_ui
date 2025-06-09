import { Link } from "react-router-dom";

function SignInButton() {
	return (
		<Link
			to="/login"
			className=" dark:bg-Neutral-700 bg-Neutral-100 rounded-full cursor-pointer py-1 px-3 tracking-tight text-md"
		>
			Sign In
		</Link>
	);
}

export default SignInButton;
