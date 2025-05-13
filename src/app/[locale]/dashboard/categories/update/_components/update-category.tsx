// "use client";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Image, Loader } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useUpdateCategory } from "@/hooks/dashboard/use-updatecategory";
// import { GalleryCarouselDialog } from "@/components/features/dashboard/dialog/gallery-dialog";
// import { useState } from "react";
// import { useTranslations } from "next-intl";

// export default function UpdateCategory() {
//   const ProductImage = {
//     images: [
//       "/assets/images/gift-box-1.png",
//       "/assets/images/gift-box-2.png",
//       "/assets/images/about-us/person1.jpg",
//       "/assets/images/about-us/person2.jpg",
//       "/assets/images/gift-box-3.png",
//     ],
//   };

//   const t = useTranslations();
//   // State
//   const [galleryOpen, setGalleryOpen] = useState(false);

//   // Validation schema
//   const Schema = z.object({
//     name: z.string({ required_error: t("name-required") }).min(2, {
//       message: t("name-min-length"),
//     }),
//   });

//   type Inputs = z.infer<typeof Schema>;

//   const form = useForm({
//     defaultValues: {
//       name: "",
//     },
//     resolver: zodResolver(Schema),
//   });

//   // Update category
//   const { updateCategory, isLoading } = useUpdateCategory();

//   // Handle form submission
//   const onSubmit = async (data: Inputs) => {
//     const formData = new FormData();
//     formData.append("name", data.name);

//     await updateCategory(formData);
//   };

//   return (
//     <div className="bg-white w-full  rounded-md p-6 shadow-sm">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem className="mb-6">
//                 {/* Label */}
//                 <FormLabel className="captalize font-medium text-sm font-inter">
//                   {t("label-name")}
//                   <span className="text-custom-rose-900">*</span>
//                 </FormLabel>

//                 <FormControl>
//                   {/* Input */}
//                   <Input
//                     placeholder="Flowers"
//                     {...field}
//                     type="text"
//                     className=" w-4/5  border-blue-gray-100 border-2 rounded-lg"
//                   />
//                 </FormControl>

//                 {/* Message */}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex justify-end w-4/5">
// <div className="text-stats-orders-primary flex items-center gap-2  border-2 border-blue-gray-100 rounded-md p-2">
//               <Image className="w-4 h-4" />
//               <buttong5
//                 type="button"
//                 onClick={() => setGalleryOpen(true)}
//                 className="text-stats-orders-primary hover:underline capitalize"
//               >
//                 {t("dialog-image")}
//               </buttong5>
//             </div>
//           </div>
//           <GalleryCarouselDialog
//             isOpen={galleryOpen}
//             onClose={() => setGalleryOpen(false)}
//             images={ProductImage.images}
//           />

//           {/* Button  */}
//           <Button
//             disabled={!form.formState.isValid}
//             type="submit"
//             className="bg-custom-rose-900 w-4/5  text-white h-10 rounded-lg mt-16 capitalize font-semibold text-sm"
//           >
//             {isLoading ? <Loader className="text-center" /> : "Update Category"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }

"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Image, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateCategory } from "@/hooks/dashboard/use-updatecategory";
import { GalleryCarouselDialog } from "@/components/features/dashboard/dialog/gallery-dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCategoryById } from "@/hooks/dashboard/use-category-by-id";

export default function UpdateCategoryPage({ params }: { params: { id: string } }) {
  console.log("params", params);

  // Translation
  const t = useTranslations();

  // State
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Mutation
  const { updateCategory, isLoading } = useUpdateCategory();

  const { data: category } = useCategoryById(params.id);

  console.log("category", category);

  // Validation schema
  const Schema = z.object({
    name: z.string({ required_error: t("name-required") }).min(2, {
      message: t("name-min-length"),
    }),
    image: z.any(),
  });

  type Inputs = z.infer<typeof Schema>;
  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    values: category ? { name: category.name } : { name: "" },
  });
  // Handle form submission
  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    // formData?.append("image", data.image[0]);
    await updateCategory({ id: params.id, data: formData });
  };

  return (
    <div className="bg-white w-full rounded-md p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-6">
                {/* Label */}
                <FormLabel className="captalize font-medium text-sm font-inter">
                  {t("label-name")}
                  <span className="text-custom-rose-900">*</span>
                </FormLabel>
                <FormControl>
                  {/* Input */}
                  <Input
                    placeholder="Flowers"
                    {...field}
                    type="text"
                    className="w-4/5 border-blue-gray-100 border-2 rounded-lg"
                  />
                </FormControl>

                {/* Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end w-4/5">
            <div className="text-stats-orders-primary flex items-center gap-2  border-2 border-blue-gray-100 rounded-md p-2">
              <Image className="w-4 h-4" />
              <button
                type="button"
                onClick={() => setGalleryOpen(true)}
                className="text-stats-orders-primary hover:underline capitalize"
              >
                {t("dialog-image")}
              </button>
            </div>
          </div>
          <GalleryCarouselDialog
            isOpen={galleryOpen}
            onClose={() => setGalleryOpen(false)}
            images={category?.image ? [category.image] : []}
          />

          <Button
            disabled={!form.formState.isValid}
            type="submit"
            className="bg-custom-rose-900 w-4/5 text-white h-10 rounded-lg mt-16 capitalize font-semibold text-sm"
          >
            {isLoading ? <Loader className="text-center" /> : "Update Category"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
