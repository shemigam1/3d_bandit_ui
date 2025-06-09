import { useLocation } from "react-router-dom";
import SignInButton from "./btn/signInBtn";
import SignOutButton from "./btn/signOutBtn";
import SignUpButton from "./btn/signUpBtn";
import Theme from "./Theme";

function Header() {
	const location = useLocation();
	const currentUrl = location.pathname;
	// console.log(currentUrl);

	return (
		<header className="flex justify-end items-center w-full pt-[16px]  px-[225px] max-xl:px-[32px] max-sm:px-[16px] bg-neutral-100  dark:neutral-900">
			<div className="flex items-center gap-3">
				<Theme />
				{(currentUrl === "/login" || currentUrl === "/home") && (
					<SignUpButton />
				)}
				{currentUrl === "/signup" && <SignInButton />}
				{currentUrl === "/" && <SignOutButton />}
			</div>
		</header>
	);
}

export default Header;
