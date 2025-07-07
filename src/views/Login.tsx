// import GenericBtn from "../components/btn/genericBtn";
import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
// import google from "../assets/images/icons8-google.svg";
import { useAuth } from "../utils/AuthContext";
import { ToastContainer, toast } from "react-toastify";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [isLoading, setIsLoading] = useState(false);

	const auth = useAuth();
	const loginWithEmailAndPassword = async (e: FormEvent) => {
		e.preventDefault();
		if (auth && email && password) {
			try {
				await auth.loginAction({ email, password });
				notify("success");
			} catch (error) {
				notify("error");
			}
			return;
		} else {
			notify("error");
		}
	};

	function notify(status: string): void {
		if (status === "success") {
			toast("Success!");
		} else {
			toast("Something went wrong!");
		}
	}

	return (
		<main className="flex flex-col w-full h-screen items-center gap-[40px] max-xl:gap-[40px] pt-[32px] max-xl:pt-[16px] px-[225px] max-xl:px-[32px] max-sm:px-[16px]">
			<section className="h-full w-full sm:w-3/5 md:w-4/5 lg:w-3/5 flex flex-col justify-center items-center">
				<div className="flex md:w-[65%] w-[85%] h-full flex-col justify-center">
					<div className="flex flex-col gap-5">
						<h1 className="text-4xl dark:text-Neutral-100 text-Neutral-900 mx-auto">
							Log in to your account
						</h1>

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

							<button
								type={"submit"}
								className="bg-[#bf7df1] p-2 mt-3 text-white text-lg rounded-lg mx-1"
							>
								{"Sign Up"}
							</button>
							<ToastContainer />
							{/* /> */}
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
