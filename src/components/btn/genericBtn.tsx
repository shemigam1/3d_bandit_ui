export default function GenericBtn({ text, type }: { text: string, type: 'submit' | undefined }) {
    return (
        <>
            <button type={type} className="bg-[#bf7df1] p-2 mt-3 text-white text-lg rounded-lg mx-1">{text}</button>
        </>
    )
}