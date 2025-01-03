"use client";
import { CustomButton, DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // getting all categories to be displayed on the all categories page
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4">
      <DashboardSidebar />
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center mb-5">All Categories</h1>
        <div className="flex justify-end mb-5">
          <Link href="/admin/categories/new">
            <CustomButton
              buttonType="button"
              customWidth="110px"
              paddingX={10}
              paddingY={5}
              textSize="base"
              text="Add new category"
            />
          </Link>
        </div>
        <div className="xl:ml-5 w-full max-xl:mt-5 overflow-auto w-full h-[80vh]">
          <table className="table table-md table-pin-cols">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Image</th>
                <th>Title</th>
                <th>Slug</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((category: Category) => (
                  <tr key={nanoid()}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>

                    <td>
                      <div>
                        <Image src={`/images/icons/${category?.image}`} width={48} height={48} alt={category?.title} />
                      </div>
                    </td>

                    <td>
                      <div>
                        <p>{category?.title}</p>
                      </div>
                    </td>

                    <td>
                      <div>
                        <p>{category?.slug}</p>
                      </div>
                    </td>

                    <th>
                      <Link href={`/admin/categories/${category?.id}`} className="btn btn-ghost btn-xs">
                        details
                      </Link>
                    </th>
                  </tr>
                ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Title</th>
                <th>Slug</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategory;
