import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX, FiCheck } from "react-icons/fi";

const Upload = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [uploadStatus, setUploadStatus] = useState<
		"idle" | "uploading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [uploadResult, setUploadResult] = useState<any>(null);

	const headerData = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.getItem("site")}`,
	};

	const onDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
		// Handle rejected files (e.g., wrong type, too large)
		if (fileRejections.length > 0) {
			const rejection = fileRejections[0];
			if (rejection.errors[0].code === "file-too-large") {
				setErrorMessage("File is too large");
			} else if (rejection.errors[0].code === "file-invalid-type") {
				setErrorMessage("Invalid file type");
			}
			return;
		}

		const file = acceptedFiles[0];
		if (!file) return;

		// Validate file size (10MB max)
		// if (file.size > 10 * 1024 * 1024) {
		// 	setErrorMessage("File size exceeds 10MB limit");
		// 	return;
		// }

		setSelectedFile(file);
		setUploadStatus("idle");
		setUploadProgress(0);
		setErrorMessage("");
		setUploadResult(null);

		// Create preview for images
		if (file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.onerror = () => {
				setErrorMessage("Failed to read image file");
			};
			reader.readAsDataURL(file);
		} else {
			setPreviewUrl(null);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		// maxSize: 10 * 1024 * 1024, // 10MB
		accept: {
			// "image/*": [".jpeg", ".jpg", ".png", ".gif"],
			// "application/pdf": [".pdf"],
			// "model/gltf-binary": [".glb"],
			// "model/gltf+json": [".gltf"],
			// "application/octet-stream": [".obj", ".stl"],
		},
		multiple: true,
	});

	// Cloudinary file upload
	const handleUpload = useCallback(async () => {
		if (!selectedFile) return;

		setUploadStatus("uploading");
		setErrorMessage("");

		try {
			// console.log(localStorage.getItem("site"));

			// First get the signature from your backend
			const signResponse = await fetch(
				"https://threed-bandit-backend.onrender.com/api/v1/3d/get-sign",
				// "http://localhost:1738/api/v1/3d/get-sign",
				{
					headers: headerData,
				}
			);
			const signData = await signResponse.json();
			// console.log(signData);
			// console.log(signData.data.signature);

			if (!signData.data.signature) {
				throw new Error("Failed to get upload signature");
			}

			const { cloudname, apikey, timestamp, signature } = signData.data;
			const url = `https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`;

			const formData = new FormData();
			formData.append("file", selectedFile);
			formData.append("api_key", apikey);
			formData.append("timestamp", timestamp);
			formData.append("signature", signature);
			// formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
			// formData.append("folder", "signed_upload_demo_form");

			const response = await fetch(url, {
				method: "POST",
				body: formData,
				// headers: headerData,
			});

			await fetch(
				"https://threed-bandit-backend.onrender.com/api/v1/3d/create-file",
				// "http://localhost:1738/api/v1/3d/create-file",
				{
					method: "POST",
					headers: headerData,
				}
			);

			if (!response.ok) {
				throw new Error(`Upload failed with status ${response.status}`);
			}

			const result = await response.json();
			setUploadResult(result);
			setUploadStatus("success");
			setUploadProgress(100);
		} catch (error) {
			console.error("Upload error:", error);
			setUploadStatus("error");
			setErrorMessage(error instanceof Error ? error.message : "Upload failed");
		}
	}, [selectedFile]);

	const handleReset = useCallback(() => {
		setSelectedFile(null);
		setPreviewUrl(null);
		setUploadProgress(0);
		setUploadStatus("idle");
		setErrorMessage("");
		setUploadResult(null);
	}, []);

	return (
		<section className="flex justify-center items-center h-screen w-screen bg-neutral-100 dark:bg-neutral-700">
			<div className="h-[75%] w-[75%] py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden p-6 space-y-6 bg-white dark:bg-neutral-800">
					<div className="text-center">
						<h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-100">
							3D File Upload
						</h1>
						<p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">
							Drag & drop a file or click to browse
						</p>
					</div>

					{/* Dropzone Area */}
					<div
						{...getRootProps()}
						className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
							isDragActive
								? "border-[#bf7df1] bg-[#bf7df1]/10"
								: "border-gray-300 dark:border-neutral-600"
						}`}
					>
						<input {...getInputProps()} />
						<div className="flex flex-col items-center justify-center space-y-2">
							<FiUpload className="w-12 h-12 text-gray-400 dark:text-neutral-400" />
							{isDragActive ? (
								<p className="text-sm text-[#bf7df1]">Drop the file here</p>
							) : (
								<>
									<p className="text-sm text-gray-600 dark:text-neutral-300">
										{selectedFile
											? selectedFile.name
											: "Drag & drop a file here, or click to select"}
									</p>
									<p className="text-xs text-gray-500 dark:text-neutral-400">
										Supported formats: images, PDF, GLB, GLTF, OBJ, STL
									</p>
								</>
							)}
						</div>
					</div>

					{/* Preview Section */}
					{previewUrl && (
						<div className="mt-4">
							<h2 className="text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
								Preview:
							</h2>
							<div className="flex justify-center">
								<img
									src={previewUrl}
									alt="Preview"
									className="max-h-48 rounded-md object-contain"
								/>
							</div>
						</div>
					)}

					{/* Error Message */}
					{errorMessage && (
						<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md flex items-start">
							<FiX className="text-red-500 mr-2 flex-shrink-0" />
							<p className="text-red-800 dark:text-red-300 text-sm font-medium">
								{errorMessage}
							</p>
						</div>
					)}

					{/* Upload Progress */}
					{uploadStatus === "uploading" && (
						<div className="space-y-2">
							<div className="w-full bg-gray-200 dark:bg-neutral-600 rounded-full h-2.5">
								<div
									className="bg-[#bf7df1] h-2.5 rounded-full transition-all duration-300"
									style={{ width: `${uploadProgress}%` }}
								></div>
							</div>
							<p className="text-sm text-gray-600 dark:text-neutral-300 text-center">
								Uploading: {uploadProgress}%
							</p>
						</div>
					)}

					{/* Upload Result */}
					{uploadStatus === "success" && uploadResult && (
						<div className="space-y-4">
							<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md flex items-start">
								<FiCheck className="text-green-500 mr-2 flex-shrink-0" />
								<p className="text-green-800 dark:text-green-300 text-sm font-medium">
									File uploaded successfully!
								</p>
							</div>
							<div className="p-4 bg-gray-50 dark:bg-neutral-700 rounded-md">
								<h3 className="text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
									Upload Details:
								</h3>
								<pre className="text-xs text-gray-600 dark:text-neutral-300 overflow-auto max-h-40">
									{JSON.stringify(uploadResult, null, 2)}
								</pre>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex space-x-3">
						<button
							onClick={handleReset}
							disabled={!selectedFile}
							className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium flex items-center justify-center ${
								!selectedFile
									? "bg-gray-100 dark:bg-neutral-700 text-gray-400 dark:text-neutral-500 cursor-not-allowed border-gray-300 dark:border-neutral-600"
									: "bg-white dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-600 border-gray-300 dark:border-neutral-600"
							}`}
						>
							Clear
						</button>
						<button
							onClick={handleUpload}
							disabled={!selectedFile || uploadStatus === "uploading"}
							className={`flex-1 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white flex items-center justify-center ${
								!selectedFile || uploadStatus === "uploading"
									? "bg-blue-300 dark:bg-blue-400/50 cursor-not-allowed"
									: "bg-[#bf7df1] hover:bg-[#a968d9] dark:hover:bg-[#8e4fc2]"
							}`}
						>
							{uploadStatus === "uploading" ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Uploading...
								</>
							) : (
								"Upload"
							)}
						</button>
					</div>

					{/* File Info */}
					{selectedFile && (
						<div className="text-xs text-gray-500 dark:text-neutral-400 mt-2 space-y-1">
							<p className="truncate">
								<span className="font-medium">Name:</span> {selectedFile.name}
							</p>
							<p>
								<span className="font-medium">Type:</span>{" "}
								{selectedFile.type || "Unknown"}
							</p>
							<p>
								<span className="font-medium">Size:</span>{" "}
								{(selectedFile.size / 1024 / 1024).toFixed(2)} MB
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Upload;
