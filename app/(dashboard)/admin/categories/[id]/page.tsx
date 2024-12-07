"use client";
import { DashboardSidebar } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCategorySlug } from "@/utils/categoryFormating";
import { convertCategoryTitleToSlugFriendly } from "@/utils/categoryFormating";
import Image from "next/image";

interface DashboardSingleCategoryProps {
  params: { id: number };
}

const DashboardSingleCategory = ({ params: { id } }: DashboardSingleCategoryProps) => {
  const [categoryInput, setCategoryInput] = useState<{
    title: string;
    image: string;
    slug: string;
  }>({
    title: "",
    image: "",
    slug: "",
  });
  const router = useRouter();

  const deleteCategory = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    // sending API request for deleting a category
    fetch(`${process.env.BACKEND_URL}/api/categories/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Category deleted successfully");
          router.push("/admin/categories");
        } else {
          throw Error("There was an error deleting a category");
        }
      })
      .catch((error) => {
        toast.error("There was an error deleting category");
      });
  };

  const updateCategory = async () => {
    if (categoryInput.title.length > 0) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: categoryInput.title,
          image: categoryInput.image,
          slug: convertCategoryTitleToSlugFriendly(
            categoryInput.slug.length > 0 ? categoryInput.slug : categoryInput.title
          ),
        }),
      };
      // sending API request for updating a category
      fetch(`${process.env.BACKEND_URL}/api/categories/${id}`, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw Error("Error updating a category");
          }
        })
        .then((data) => toast.success("Category successfully updated"))
        .catch((error) => {
          toast.error("There was an error while updating a category");
        });
    } else {
      toast.error("For updating a category you must enter all values");
      return;
    }
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/categories/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("File uploaded successfully.");
      } else {
        toast.error("File upload unsuccessful.");
      }
    } catch (error) {
      console.error("There was an error while during request sending:", error);
      toast.error("There was an error during request sending");
    }
  };

  useEffect(() => {
    // sending API request for getting single categroy
    fetch(`${process.env.BACKEND_URL}/api/categories/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategoryInput({
          title: data?.title,
          image: data?.image,
          slug: data?.slug,
        });
      });
  }, [id]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Category details</h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category title:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={categoryInput.title}
              onChange={(e) => setCategoryInput({ ...categoryInput, title: e.target.value })}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category slug:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={formatCategorySlug(categoryInput.slug)}
              onChange={(e) => setCategoryInput({ ...categoryInput, slug: e.target.value })}
            />
          </label>
        </div>

        <div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-lg w-full max-w-sm"
            onChange={(e) => {
              const selectedFile = e.target.files ? e.target.files[0] : null;

              if (selectedFile) {
                uploadFile(selectedFile);
                setCategoryInput({ ...categoryInput, image: selectedFile.name });
              }
            }}
          />
          {categoryInput?.image && (
            <Image
              src={`/images/icons/` + categoryInput?.image}
              alt={categoryInput?.title}
              className="m-w-[100px] m-h-[100px] mt-2"
              width={100}
              height={100}
            />
          )}
        </div>

        <div className="flex gap-x-2 max-sm:flex-col">
          <button
            type="button"
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
            onClick={updateCategory}
          >
            Update category
          </button>
          <button
            type="button"
            className="uppercase bg-red-600 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
            onClick={deleteCategory}
          >
            Delete category
          </button>
        </div>
        <p className="text-xl text-error max-sm:text-lg">
          Note: if you delete this category, you will delete all products associated with the category.
        </p>
      </div>
    </div>
  );
};

export default DashboardSingleCategory;
