"use client";

import { useState } from "react";
import { GalleryCarouselDialog } from "../../../../../components/features/dashboard/dialog/gallery-dialog";
import { DeleteConfirmationDialog } from "../../../../../components/features/dashboard/dialog/confirm-dialog";

// This is a dummy product page.
// It is used to test the functionality.
export default function ProductItem() {
  const ProductImage = {
    images: [
      "/assets/images/gift-box-1.png",
      "/assets/images/gift-box-2.png",
      "/assets/images/about-us/person1.jpg",
      "/assets/images/about-us/person2.jpg",
      "/assets/images/gift-box-3.png",
    ],
  };
  // State
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Dummy function
  const handleDelete = () => {
    console.log("product deleted");
  };

  return (
    <>
      <div>
        <button
          onClick={() => setGalleryOpen(true)}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Show Images
        </button>

        <GalleryCarouselDialog
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          images={ProductImage.images}
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
          itemName="product"
        />
      </div>
    </>
  );
}
