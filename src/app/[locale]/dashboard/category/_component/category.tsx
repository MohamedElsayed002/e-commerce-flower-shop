"use client";

import { useState } from "react";
import { GalleryCarouselDialog } from "../../../../../components/features/dashboard/dialog/gallery-dialog";
import { DeleteConfirmationDialog } from "../../../../../components/features/dashboard/dialog/confirm-dialog";

// This is a dummy category page.
// It's used to test dialog functionality.

export default function CategoryItem() {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const CategoryImage = {
    images: [
      "/assets/images/about-us/person1.jpg",
      "/assets/images/about-us/person2.jpg",
      "/assets/images/gift-box-1.png",
      "/assets/images/about-us/person3.jpg",
    ],
  };
  const handleDelete = () => {
    console.log("Category deleted");
  };

  return (
    <>
      <div>
        <button
          onClick={() => setOpen(true)}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Show Images
        </button>

        <GalleryCarouselDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          images={CategoryImage.images}
        />
      </div>

      <div>
        <button
          onClick={() => setDeleteDialogOpen(true)}
          className="mt-2 bg-flamingo text-white px-4 py-2 rounded"
        >
          Delete
        </button>

        <DeleteConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          itemName="category"
        />
      </div>
    </>
  );
}
