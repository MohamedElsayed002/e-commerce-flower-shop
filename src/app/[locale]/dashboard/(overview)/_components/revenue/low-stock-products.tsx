"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

type LowStockProductProps = {
  lowStockProducts: LowStockProduct[];
};

export default function LowStockProducts({ lowStockProducts }: LowStockProductProps) {
  // Translation
  const t = useTranslations();

  return (
    <div className="p-4 w-full bg-white rounded-xl">
      {/* Text */}
      <h2 className="text-xl font-bold mb-4 text-black">{t("low-stock-products")}</h2>

      {/* Scrollarea */}
      <ScrollArea className="h-[200px]">
        <Table>
          <TableBody>
            {lowStockProducts.map((product) => (
              <TableRow key={product._id}>
                {/* Product title */}
                <TableCell className="text-black">{product.title}</TableCell>

                {/* Product quantity */}
                <TableCell
                  className={`text-right font-bold ${
                    product.quantity < 5 ? "text-red-500" : "text-black"
                  }`}
                >
                  {product.quantity} {t("products")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
