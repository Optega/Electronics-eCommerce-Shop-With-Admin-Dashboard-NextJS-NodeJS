"use client";
import { DashboardSidebar } from "@/components";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { convertCategoryTitleToSlugFriendly } from "@/utils/categoryFormating";
import Image from "next/image";

const DashboardNewCategoryPage = () => {
  const [categoryInput, setCategoryInput] = useState({
    title: "",
    image: "",
    slug: "",
  });

  const addNewCategory = () => {
    if (categoryInput.title.length > 0) {
      const requestOptions = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: categoryInput.title,
          image: categoryInput.image,
          name: convertCategoryTitleToSlugFriendly(
            categoryInput.slug.length > 0 ? categoryInput.slug : categoryInput.title
          ),
        }),
      };
      // sending API request for creating new cateogry
      fetch(`${process.env.BACKEND_URL}/api/categories`, requestOptions)
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else {
            throw Error("There was an error while creating category");
          }
        })
        .then((data) => {
          toast.success("Category added successfully");
          setCategoryInput({
            title: "",
            image: "",
            slug: "",
          });
        })
        .catch((error) => {
          toast.error("There was an error while creating category");
        });
    } else {
      toast.error("You need to enter values to add a category");
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

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Add new category</h1>
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
              value={categoryInput.slug}
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

        <div className="flex gap-x-2">
          <button
            type="button"
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
            onClick={addNewCategory}
          >
            Create category
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNewCategoryPage;
