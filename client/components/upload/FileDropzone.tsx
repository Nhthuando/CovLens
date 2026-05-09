'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export function FileDropzone({ onFileSelect, isLoading, error }: FileDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.name.endsWith('.zip')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <Card
      className={`border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50 bg-card'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        className="hidden"
        disabled={isLoading}
      />

      <div className="space-y-3">
        <div className="text-4xl">📦</div>
        <div>
          <h3 className="font-semibold text-foreground text-lg">Upload ZIP File</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop your source code ZIP here, or click to select
          </p>
        </div>

        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? 'Uploading...' : 'Select ZIP File'}
        </Button>

        {error && <StatusBadge status="error" message={error} />}
      </div>
    </Card>
  );
}
