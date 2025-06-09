import { Link } from "react-router-dom";

function SignUpButton() {
  return (
    <Link to="/signup" className=" dark:bg-Neutral-700 bg-Neutral-100 rounded-full cursor-pointer py-1 px-3 tracking-tight text-md">
      Sign Up
    </Link>
  );
}

export default SignUpButton;
