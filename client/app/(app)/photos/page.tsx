"use client";

import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PhotosPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Photos</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view all your uploaded photos
          </p>
        </div>
        <Button className="gap-2">
          <UploadCloud className="size-4" />
          <span>Upload</span>
        </Button>
      </div>

      {/* Empty State / Photo Grid Container */}
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
          <UploadCloud className="size-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No photos uploaded yet</h3>
        <p className="mb-4 mt-1 text-sm text-muted-foreground">
          Upload your photos to start building your library.
        </p>
      </div>
    </div>
  );
}