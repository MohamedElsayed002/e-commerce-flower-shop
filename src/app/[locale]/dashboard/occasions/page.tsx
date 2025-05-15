import { Button } from "@/components/ui/button";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { Input } from "@/components/ui/input";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchOccasions } from "@/lib/apis/occasion.api";
import { SearchBar } from "@/components/common/search-bar";
export default async function OccasionPage({ searchParams }: { searchParams: SearchParams }) {
  // Translations
  const t = await getTranslations();

  // Locale
  const locale = await getLocale();

  // Data
  const data = await fetchOccasions(searchParams);

  return (
    <div className="px-10">
      <div className="flex justify-between items-center">
        {/* Header */}
        <h1>{t("all-occasions-0")}</h1>
        <Button className="bg-custom-rose-900" asChild>
          <Link href={`/${locale}/dashboard/occasions/add-occasion`}>
            <Plus /> {t("add-a-new-occassion")}
          </Link>
        </Button>
      </div>

      {/* Search bar */}
      <SearchBar placeholder="search-for-a-occasion" />

      {/* Table */}
      <Table className="mt-10 w-full px-20 mx-auto">
        <TableHeader className="w-full">
          <TableRow className="flex w-full">
            <TableHead className="flex-1">{t("name")}</TableHead>
            <TableHead className="flex-1">{t("products")}</TableHead>
            <TableHead className="flex-1" />
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {data?.occasions.map((item) => {
            return (
              <TableRow key={item._id} className="flex w-full hover:bg-custom-rose-100">
                <TableCell className="flex-1">{item.name}</TableCell>
                <TableCell className="flex-1">{item.productsCount}</TableCell>
                <TableCell className="flex-1 flex justify-end">
                  <Button
                    size="sm"
                    className="text-stats-orders-primary bg-stats-orders-bg hover:bg-stats-order-bg/20 mr-2 ml-2"
                    asChild
                  >
                    <Link href={`/${locale}/dashboard/occasions/${item._id}/update-occasion`}>
                      <Pencil className="mr-1" />
                      {t("edit")}
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-custom-red hover:bg-custom-red/20 text-custom-red-2"
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
    </div>
  );
}
