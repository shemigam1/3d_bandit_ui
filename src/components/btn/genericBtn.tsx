import type { ReactNode } from "react";

export default function GenericBtn({
	text,
	type,
	onClick,
}: {
	text: ReactNode;
	type: "submit" | undefined;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<>
			<button
				type={type}
				onClick={onClick}
				className="bg-[#bf7df1] p-2 mt-3 text-white text-lg rounded-lg mx-1"
			>
				{text}
			</button>
		</>
	);
}
