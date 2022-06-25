import bytes from 'bytes';
import { Accept, FileError } from 'react-dropzone';

import useLocalization from '../../../../hooks/useLocalization';

enum FileErrorCodes {
  TooLarge = 'file-too-large',
  InvalidType = 'file-invalid-type',
}

export default function FileSelectError({
  accept,
  errors,
  maxSize,
}: {
  accept: Accept;
  maxSize: number;
  errors: FileError[];
}) {
  const t = useLocalization();
  const allowedTypes = Object.keys(accept)
    .map((type) => type.split('/')[1])
    .join(', ');

  const errorText =
    errors[0].code === FileErrorCodes.TooLarge
      ? t.from.general.errors.file.tooLarge.replace(
          '${size}',
          bytes.format(maxSize)
        )
      : FileErrorCodes.InvalidType
      ? t.from.general.errors.file.type.replace('${types}', allowedTypes)
      : errors[0].message;

  return <div className={`text-red-500 text-xs`}>{errorText}</div>;
}
