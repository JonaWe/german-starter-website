import React, { useCallback, useEffect, useState } from 'react';

import { DocumentReference } from 'firebase-admin/firestore';
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { Accept, useDropzone } from 'react-dropzone';

import { storage } from '../../../firebase/clientApp';
import FileItem from './FileItem';

interface FileUploader {
  accept: Accept;
  maxFiles: number;
  maxSize?: number;
  storageRef?: StorageReference;
  docRef?: DocumentReference;
}

export default function FileUploader({
  accept,
  maxFiles,
  maxSize,
  storageRef,
  docRef,
}: FileUploader) {
  const [myFiles, setMyFiles] = useState<any[]>([]);

  const uploadFile = async (file: any) => {
    // Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = ref(storage, 'tickets/' + file.name);

    const newFiles = [
      ...myFiles,
      {
        name: file.name,
        loading: true,
        error: false,
      },
    ];

    setMyFiles(newFiles);

    const uploadTask = await uploadBytes(mountainImagesRef, file);

    getDownloadURL(uploadTask.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });

    const changedIndex = newFiles.map((file) => file.name).indexOf(file.name);

    const cpNewFiles = [...newFiles];

    cpNewFiles[changedIndex].loading = false;

    setMyFiles(cpNewFiles);
  };

  useEffect(() => {
    console.log('state: ', myFiles);
  }, [myFiles]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      uploadFile(acceptedFiles[0]);
    },
    [myFiles]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept,
      maxFiles,
      multiple: true,
      maxSize: maxSize || 1000000,
    });

  return (
    <>
      {myFiles.length < maxFiles && (
        <div
          {...getRootProps()}
          className={`h-20 border-2 border-dashed flex items-center justify-center p-3 transition-all cursor-pointer mb-2 ${
            isDragActive
              ? 'border-rust-500 bg-rust-500/10'
              : 'border-background-150'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-sm text-sand-500/50">Drop the files here ...</p>
          ) : (
            <p className="text-xs text-sand-500/50 text-center">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>
      )}
      <ul className="flex flex-col gap-y-1">
        {myFiles.map((file) => (
          <FileItem name={file.name} error={false} loading={file.loading} />
        ))}
      </ul>
    </>
  );
}
