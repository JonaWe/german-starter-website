import React, { useCallback, useState } from 'react';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Accept, useDropzone } from 'react-dropzone';

import { storage } from '../../../../firebase/clientApp';
import FileItem from './FileItem';
import FileSelectError from './FileSelectError';

interface FileUploader {
  accept: Accept;
  maxFiles: number;
  maxSize?: number;
  files: any[];
  onChange: (file: any[]) => void;
}

export default function FilePicker({
  accept,
  maxFiles,
  maxSize = 1024000,
  onChange,
  files,
}: FileUploader) {
  const [myFiles, setMyFiles] = useState<any[]>([]);

  const uploadFile = async (file: any) => {
    // Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = ref(storage, 'tickets/' + file.name);
    setMyFiles(myFiles);

    const uploadTask = await uploadBytes(mountainImagesRef, file);

    getDownloadURL(uploadTask.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      onChange([...files, ...acceptedFiles]);
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept,
      maxFiles: maxFiles - files.length,
      maxSize: maxSize,
    });

  console.log(fileRejections);

  return (
    <>
      {files.length < maxFiles && (
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
        {files.map((file, i) => (
          <FileItem
            onRemove={() => {
              onChange(files.filter((f) => f.name !== file.name));
            }}
            key={i}
            name={file.name}
            size={file.size}
            error={false}
          />
        ))}
      </ul>
      <ul className="mt-2">
        {fileRejections &&
          fileRejections.map(({ errors }) => (
            <FileSelectError
              errors={errors}
              accept={accept}
              maxSize={maxSize}
            />
          ))}
      </ul>
    </>
  );
}
