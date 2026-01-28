'use client';

import * as React from 'react';
import { useDropzone, Accept, FileRejection } from 'react-dropzone';
import { File as FileIcon, UploadCloud } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export type DropzoneProps = {
  files?: File[];

  label?: string;
  description?: string;

  accept?: Accept;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;

  onFilesChange?: (files: File[]) => void;
  onFilesRejected?: (rejections: FileRejection[]) => void;

  /** hook cho future upload (optional) */
  onUploadRequest?: (files: File[]) => void;
};

export function Dropzone({
  files = [],

  label = 'Upload files',
  description,

  accept,
  maxSize = 50 * 1024 * 1024,
  multiple = true,
  disabled,

  onFilesChange,
  onFilesRejected,
  onUploadRequest,
}: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxSize,
    multiple,
    disabled,
    onDrop: acceptedFiles => {
      onFilesChange?.(acceptedFiles);
      onUploadRequest?.(acceptedFiles);
    },
    onDropRejected: rejections => {
      onFilesRejected?.(rejections);
    },
  });

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <Card
        {...getRootProps()}
        className={cn(
          'cursor-pointer border-dashed px-6 py-16 text-center transition-colors',
          isDragActive && 'border-primary bg-primary/5',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-3">
          {isDragActive ? (
            <UploadCloud className="text-primary h-10 w-10" />
          ) : (
            <FileIcon className="text-muted-foreground h-10 w-10" />
          )}

          <p className="text-muted-foreground text-sm">
            Drag & drop files here, or click to browse
          </p>

          {description && (
            <p className="text-muted-foreground text-xs">{description}</p>
          )}
        </div>
      </Card>

      {files.length > 0 && (
        <p className="text-muted-foreground text-xs">
          {files.length} file(s) selected
        </p>
      )}
    </div>
  );
}
