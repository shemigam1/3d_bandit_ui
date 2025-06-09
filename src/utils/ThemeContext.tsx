import { createContext, useState, useEffect } from "react";
import iconSun from "../assets/images/icon-sun.svg";
import iconMoon from "../assets/images/icon-moon.svg";

export interface ThemeContextProps {
	theme: "light" | "dark";
	setTheme: (theme: "light" | "dark") => void;
	themeIcon: string | null;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<"light" | "dark">(
		(localStorage.getItem("theme") as "light" | "dark") ||
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light")
	);

	const [themeIcon, setThemeIcon] = useState<string | null>(null);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			document.documentElement.style.setProperty(
				"--scrollbar-thumb-color",
				"#404254"
			);
			document.documentElement.style.setProperty(
				"--placeholder-color",
				"#E4E4EF"
			);
			console.log("light mode");
			setThemeIcon(iconSun);
		} else {
			document.documentElement.classList.remove("dark");
			document.documentElement.style.setProperty(
				"--scrollbar-thumb-color",
				"#FFFFFF"
			);
			document.documentElement.style.setProperty(
				"--placeholder-color",
				"#2A2B37"
			);
			console.log("dark mode");

			setThemeIcon(iconMoon);
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme, themeIcon }}>
			<div className=" transition-all duration-500  bg-neutral-100  dark:neutral-900  dark:text-Neutral-100 text-Neutral-900 flex flex-col gap-[30px] items-center ">
				{children}
			</div>
		</ThemeContext.Provider>
		//  bg-[url(src/utils/bg-light-theme.png)]  dark:bg-[url(src/utils/bg-dark-theme.png)]
	);
}

export default ThemeContext;
