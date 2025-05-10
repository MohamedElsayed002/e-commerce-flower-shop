"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useTranslations } from "use-intl";

// Type
type DeleteDialog = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
};

export function DeleteConfirmationDialog({ isOpen, onClose, onConfirm, itemName }: DeleteDialog) {
  // Translation
  const t = useTranslations();

  // Handler confirmtion
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Dialog container */}
      <DialogContent className="text-center max-w-md sm:max-w-lg min-h-[371px] rtl:space-x-reverse">
        {/* Header read on server only */}
        <DialogHeader className="sr-only">
          <DialogTitle>{t("delete-title")}</DialogTitle>
          <DialogDescription>{t("description-dialog")}</DialogDescription>
        </DialogHeader>

        {/* Trash icon */}
        <div className="flex justify-center items-center mt-6">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center">
            <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
              <Trash className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Dialog message*/}
        <p className="mb-6 font-inter font-semibold text-lg">
          {t("delete-message")} {itemName}?
        </p>

        {/* Dialog footer */}
        <DialogFooter className="flex justify-around w-full">
          {/* Cancel button */}
          <Button
            variant="outline"
            onClick={onClose}
            className="w-52 h-10 rounded-md me-2 capitalize text-sm"
          >
            {t("cancel")}
          </Button>

          {/* Confirm button */}
          <Button
            onClick={handleConfirm}
            className="w-52 h-10  bg-flamingo text-sm rounded-md text-white capitalize "
          >
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
