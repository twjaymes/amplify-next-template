"use client";

import React, { useState } from "react";
import { Amplify } from "aws-amplify";
import { uploadData } from "aws-amplify/storage";
import outputs from "@/amplify_outputs.json";
import "./../app/app.css";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

export default function StoragePage() {
  const [file, setFile] = useState<File | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    try {
      const result = await uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
      });
      console.log("File uploaded successfully:", result);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Check the console for details.");
    }
  };

  return (
    <main>
      <h1>Amplify Storage Page</h1>
      <div>
      <h2>Upload Image</h2>
        {/* Add label for input */}
        <label htmlFor="file-upload">Select a file to upload:</label>
        <input
          id="file-upload"
          type="file"
          onChange={handleChange}
          title="Select a file to upload"
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </main>
  );
}