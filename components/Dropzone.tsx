"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { read } from "fs";
import React from "react";
import Dropzone from "react-dropzone";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
const DropzoneComponent = () => {
  const [loading, setLoading] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading aboarted");
      reader.onerror = () => console.log("File reading failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;

    if (!user) return;

    setLoading(true);
const toastId = toast.loading("Uploading")
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timeStamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users",user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
    });

    toast.success("Uploaded Successfully"),{
      id: toastId,
    }
    setLoading(false);

  };

  const maxSizee = 20971520;

  return (
    <Dropzone minSize={0} maxSize={maxSizee} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSizee;

        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full flex justify-center items-center text-center p-6 h-32  mt-4 border border-dashed  rounded-lg",
                isDragActive
                  ? "bg-blue-400/50 text-white animate-pulse  "
                  : "bg-slate-100/50 dark:bg-slate-800/70 text-slate-800  dark:text-slate-300 "
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "click to upload file"}
              {isDragActive && !isDragReject && "Drop to upload file"}
              {isDragReject && "file is rejected"}
              {isFileTooLarge && (
                <div className="mt-2 text-red-500">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};

export default DropzoneComponent;
