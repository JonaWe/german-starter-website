import React, { useCallback, useEffect, useState } from 'react';

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
  storageRef: StorageReference;
}

export default function FileUploader({
  accept,
  maxFiles,
  maxSize,
  storageRef,
}: FileUploader) {
  const [myFiles, setMyFiles] = useState<any[]>([]);

  const uploadFile = (file: any) => {
    // Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = ref(storage, 'tickets/' + file.name);

    const uploadTask = uploadBytesResumable(mountainImagesRef, file);

    const newFiles = [
      ...myFiles,
      {
        name: file.name,
        loading: true,
        error: false,
      },
    ];

    setMyFiles(newFiles);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });

        const changedIndex = newFiles
          .map((file) => file.name)
          .indexOf(file.name);

        console.log(changedIndex);
        console.log('before: ', newFiles);

        const cpNewFiles = [...newFiles];

        cpNewFiles[changedIndex].loading = false;

        console.log('after: ', newFiles);

        setMyFiles(cpNewFiles);
      }
    );
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
          className={`h-20 border-2 border-dashed flex items-center justify-center p-3 transition-all cursor-pointer ${
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
