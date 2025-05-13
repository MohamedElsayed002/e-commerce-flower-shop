"use client";

import Header, { BreadcrumbItem } from '@/components/layout/dashboard/header';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function UpdateProduct({ params }: { params: { id: string } }) {
const searchParams = useSearchParams();
  const productName = searchParams.get('productName');

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "dashboard", href: "/dashboard" },
    { title: "products", href: "/dashboard/products" },
    { 
      title: `update-product:${productName}`, 
      href: `/dashboard/products/update/${params.id}`,
      isTranslated: true 
    },
  ];

  return (
    <div><Header breadcrumbs={breadcrumbs} /></div>
  )
}
