"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteConfirmationDialog } from "@/components/features/dashboard/dialog/confirm-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import useDeleteCategory from "@/hooks/category/use-delete-category";

export function CategoriesTable({ data }: { data: Category[] }) {
  const t = useTranslations();
  const locale = useLocale();

    const {mutate,isPending} = useDeleteCategory()

  // State for dialog control
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<{ id: string; name: string } | null>(null);

  const onDelete = (id: string, name: string) => {
    setCurrentItem({ id, name });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentItem) {
      console.log("Deleting item with ID:", currentItem.id);
      // Add your actual delete logic here (API call, etc.)
      mutate({ categoryId: currentItem.id });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Table className="mt-10 w-full px-20 mx-auto">
        <TableHeader className="w-full">
          <TableRow className="flex w-full">
            <TableHead className="flex-1">{t("name")}</TableHead>
            <TableHead className="flex-1 text-left">{t("products")}</TableHead>
            <TableHead className="flex-1" />
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {data?.map((item) => {
            return (
              <TableRow key={item._id} className="flex w-full hover:bg-custom-rose-100">
                <TableCell className="flex-1">{item.name}</TableCell>
                <TableCell className="flex-1">{item.productsCount}</TableCell>
                <TableCell className="flex-1 flex justify-end">
                  <Button
                    size="sm"
                    className="text-stats-orders-primary bg-stats-orders-bg hover:bg-stats-order-bg/20 mr-2"
                    asChild
                  >
                    <Link href={`/${locale}/dashboard/update-category/${item._id}`}>
                      <Pencil className="mr-1" />
                      {t("edit")}
                    </Link>
                  </Button>
                  <Button
                    onClick={() => onDelete(item._id, item.name)}
                    size="sm"
                    className="bg-[#FF00001A] text-[#D50000]"
                  >
                    <Trash2 className="mr-1" />
                    {t("delete")}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={currentItem?.name || ""}
      />
    </>
  );
}
