import GenericBtn from "../components/btn/genericBtn";
import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
import google from "../assets/images/icons8-google.svg";
import { useAuth } from "../utils/AuthContext";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const auth = useAuth();
	const loginWithEmailAndPassword = async (e: FormEvent) => {
		e.preventDefault();
		if (auth && email && password) {
			await auth.loginAction({ email, password });
			return;
		} else {
			// alert("Please provide valid input");
		}
	};

	return (
		<main className="flex flex-col w-full h-screen items-center gap-[40px] max-xl:gap-[40px] pt-[32px] max-xl:pt-[16px] px-[225px] max-xl:px-[32px] max-sm:px-[16px]">
			<section className="   h-full w-full sm:w-3/5 md:w-4/5 lg:w-3/5 flex flex-col justify-center items-center">
				<div className="flex md:w-[65%] w-[85%] h-full flex-col justify-center">
					<div className="flex flex-col gap-5">
						<h1 className="text-4xl dark:text-Neutral-100 text-Neutral-900 mx-auto">
							Log in to your account
						</h1>

						<div className="">
							<button
								// onClick={signInWithGoogle}
								className="flex justify-center gap-2 border dark:border-Neutral-100 border-Neutral-900 px-3 py-2 rounded-xl w-full"
								// target="_blank"
							>
								<img src={google} alt="google icon" />
								<p>Sign in with Google</p>
							</button>
						</div>

						<div className="flex justify-center dark:text-Neutral-100 text-Neutral-900 text-2xl">
							<p>OR</p>
						</div>

						<form
							onSubmit={loginWithEmailAndPassword}
							action=""
							className="flex flex-col gap-3"
						>
							<div className="flex flex-col gap-2">
								<label
									className="text-2xl dark:text-Neutral-100 text-Neutral-900"
									htmlFor="email"
								>
									Email
								</label>
								<input
									type="email"
									className="border border-[#878787] p-2 rounded-xl bg-[#EDEDED] dark:text-Neutral-900 text-Neutral-100"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									id="email"
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label
									className="text-2xl dark:text-Neutral-100 text-Neutral-900"
									htmlFor="password"
								>
									Password
								</label>
								<input
									type="password"
									className="border border-[#878787] p-2 rounded-xl bg-[#EDEDED] dark:text-Neutral-900 text-Neutral-100"
									name="password"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									id="password"
									required
								/>
							</div>

							<GenericBtn text={"Log in"} type={"submit"} />
						</form>
						<div className="flex justify-center">
							<Link to="/signup">
								<p className="font-semibold">
									Have an account?{" "}
									<span className="text-[#bf7df1] font-semibold cursor-pointer">
										Sign up
									</span>
								</p>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Login;
