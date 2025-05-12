/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "lucide-react";
import React, { useState } from "react";
import { LuPencil, LuPlus, LuSearch, LuTrash2 } from "react-icons/lu";
import { DeleteConfirmationDialog } from "./dialog/confirm-dialog";

type AllEntitiesProps = {
  data: any[];
  tableHeader: string[];
};

export default function AllEntities({ data, tableHeader }: AllEntitiesProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Dummy function
  const handleDelete = () => {
    console.log("product deleted");
  };

  return (
    <div className="bg-white w-full rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-custom-black">All Products</h1>
        <Button className="bg-custom-rose-900 text-white rounded-lg px-4 py-2 flex items-center gap-2">
          <LuPlus /> Add a new product
          {/* <Link href="/dashboard/products/create"></Link> */}
        </Button>
      </div>

      {/* Search bar */}
      <div className="w-full border border-black/15 flex items-center rounded-lg p-4 mb-4">
        <LuSearch className="mr-2 text-black/15" />
        <Input
          type="text"
          placeholder="Search for a product..."
          className="w-full p-0 h-auto bg-transparent rounded-none border-none focus:border-none focus:outline-none ring-0 focus-visible:ring-0"
        />
      </div>

      {/* Table */}
      <Table className="rounded-lg">
        <TableHeader className="bg-custom-white rounded-lg">
          <TableRow className="text-sm font-medium">
            {tableHeader.map((header, index) => (
              <TableHead key={index} className="text-custom-black-500 capitalize">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((product) => (
              <TableRow key={product._id}>
                {/* Dynamic cells matching headers */}
                {tableHeader.map((header) => {
                  switch (header) {
                    case "name":
                      return (
                        <TableCell key={`${product._id}-name`} className="font-medium">
                          {product.title}
                        </TableCell>
                      );
                    case "price":
                      return (
                        <TableCell key={`${product._id}-price`}>{product.price} EGP</TableCell>
                      );
                    case "stock":
                      return (
                        <TableCell key={`${product._id}-stock`}>
                          {product.quantity || "N/A"}
                        </TableCell>
                      );
                    case "sales":
                      return (
                        <TableCell key={`${product._id}-sales`}>{product.sold || 0}</TableCell>
                      );
                    case "rating":
                      return (
                        <TableCell key={`${product._id}-rating`}>
                          {product.rateAvg ? (
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-gray-900">
                                {product.rateAvg}/5
                              </span>
                              <span className="text-sm text-gray-500">({product.rateCount})</span>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                      );
                    case "":
                      return (
                        <TableCell
                          key={`${product._id}-actions`}
                          className="text-right flex items-center"
                        >
                          <Button className="bg-custom-blue/10 rounded-lg px-2 py-1 flex items-center text-custom-blue mr-2">
                            <LuPencil className="mr-1" /> Edit
                          </Button>
                          <Button onClick={() => setDeleteDialogOpen(true)} className="bg-custom-red/10 rounded-lg px-2 py-1 flex items-center text-custom-red">
                            <LuTrash2 className="mr-1" /> Delete
                          </Button>
                        </TableCell>
                      );
                    default:
                      return null;
                  }
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={tableHeader.length} className="h-24 text-center">
                No products available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DeleteConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          itemName="product"
        />
    </div>
  );
}
