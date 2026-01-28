import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Trash2, FileIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface FileItemProps {
  id: string;
  file: File;
  progress?: number;
  onRemove: (id: string) => void;
}

export function FileItem({ id, file, progress = 0, onRemove }: FileItemProps) {
  const isImage = file.type.startsWith('image/');

  const previewUrl = useMemo(() => {
    if (!isImage) return null;
    return URL.createObjectURL(file);
  }, [file, isImage]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="border-border flex flex-col rounded-lg border p-2">
      <div className="flex items-start gap-3">
        {/* Preview */}
        <div className="bg-muted flex h-14 w-18 items-center justify-center overflow-hidden rounded-sm">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={file.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : (
            <FileIcon className="text-muted-foreground h-6 w-6" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-1 pr-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-foreground truncate text-sm">{file.name}</p>
              <p className="text-muted-foreground text-xs">
                {Math.round(file.size / 1024)} KB
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground h-8 w-8 hover:text-red-500"
              onClick={() => onRemove(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-muted-foreground text-xs tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
