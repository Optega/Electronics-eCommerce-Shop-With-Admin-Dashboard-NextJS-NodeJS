"use client";
import { Checkbox, CustomButton, DashboardSidebar, SectionTitle } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Markdown from "react-markdown";
import toast from "react-hot-toast";
import { convertCategoryTitleToSlugFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import { nanoid } from "nanoid";

interface DashboardProductDetailsProps {
  params: { id: number };
}

const DashboardProductDetails = ({ params: { id } }: DashboardProductDetailsProps) => {
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();
  const [otherImages, setOtherImages] = useState<OtherImages[]>([]);
  const [addNew, setAddNew] = useState<boolean>(false);
  const router = useRouter();

  // functionality for deleting product
  const deleteProduct = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`${process.env.BACKEND_URL}/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status !== 204) {
          if (response.status === 400) {
            toast.error("Cannot delete the product because of foreign key constraint");
          } else {
            throw Error("There was an error while deleting product");
          }
        } else {
          toast.success("Product deleted successfully");
          router.push("/admin/products");
        }
      })
      .catch((error) => {
        toast.error("There was an error while deleting product");
      });
  };

  // functionality for updating product
  const updateProduct = async () => {
    if (
      product?.title === "" ||
      product?.slug === "" ||
      product?.price.toString() === "" ||
      product?.manufacturer === "" ||
      product?.description === "" ||
      product?.sku === "" ||
      product?.reviewsCount.toString() === ""
    ) {
      toast.error("You need to enter values in input fields");
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`${process.env.BACKEND_URL}/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error("There was an error while updating product");
        }
      })
      .then((data) => {
        toast.success("Product successfully updated");
        if (addNew) {
          router.push(`/admin/products/new`);
        }
      })
      .catch((error) => {
        toast.error("There was an error while updating product");
      });
  };

  // functionality for uploading main image file
  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/main-image`, {
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

  // fetching main product data including other product images
  const fetchProductData = useCallback(async () => {
    fetch(`${process.env.BACKEND_URL}/api/products/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      });

    const imagesData = await fetch(`${process.env.BACKEND_URL}/api/images/${id}`, {
      cache: "no-store",
    });
    const images = await imagesData.json();
    setOtherImages((currentImages) => images);
  }, [id]);

  // fetching all product categories. It will be used for displaying categories in select category input
  const fetchCategories = async () => {
    fetch(`${process.env.BACKEND_URL}/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchProductData();
  }, [id, fetchProductData]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 w-full max-xl:px-5">
        <h1 className="text-3xl font-semibold">Product details</h1>
        {/* Product name input div - start */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product name:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.title || ""}
              onChange={(e) => setProduct({ ...product!, title: e.target.value })}
            />
          </label>
        </div>
        {/* Product name input div - end */}
        {/* Product price input div - start */}

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product price:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.price || "0"}
              onChange={(e) => setProduct({ ...product!, price: Number(e.target.value) })}
            />
          </label>
        </div>
        {/* Product price input div - end */}
        {/* Product manufacturer input div - start */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Manufacturer:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.manufacturer || ""}
              onChange={(e) => setProduct({ ...product!, manufacturer: e.target.value })}
            />
          </label>
        </div>
        {/* Product manufacturer input div - end */}
        {/* Product slug input div - start */}

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Slug:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={(product?.slug && convertSlugToURLFriendly(product?.slug)) || ""}
              onChange={(e) =>
                setProduct({
                  ...product!,
                  slug: convertSlugToURLFriendly(e.target.value),
                })
              }
            />
          </label>
        </div>
        {/* Product slug input div - end */}
        {/* Product inStock select input div - start */}

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Is product in stock?</span>
            </div>
            <select
              className="select select-bordered"
              value={product?.inStock == 0 ? 0 : 1}
              onChange={(e) => {
                setProduct({ ...product!, inStock: Number(e.target.value) });
              }}
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </label>
        </div>
        {/* Product inStock select input div - end */}
        {/* Product category select input div - start */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category:</span>
            </div>
            <select
              className="select select-bordered"
              value={product?.categoryId || categories?.[0]?.id}
              onChange={(e) =>
                setProduct({
                  ...product!,
                  categoryId: e.target.value,
                })
              }
            >
              {categories &&
                categories.map((category: Category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.title}
                  </option>
                ))}
            </select>
          </label>
        </div>
        {/* Product category select input div - end */}

        {/* Product unit input div - start */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product unit:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.unit || ""}
              onChange={(e) => setProduct({ ...product!, unit: e.target.value })}
            />
          </label>
        </div>
        {/* Product unit select input div - end */}

        {/* Product sku input div - start */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product SKU:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.sku || ""}
              onChange={(e) => setProduct({ ...product!, sku: e.target.value })}
            />
          </label>
        </div>
        {/* Product sku input div - end */}

        {/* Product review count input div - start */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product review count:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.reviewsCount || "0"}
              onChange={(e) =>
                setProduct({
                  ...product!,
                  reviewsCount: Number(e.target.value),
                })
              }
            />
          </label>
        </div>
        {/* Product review count input div - end */}

        {/* Main image file upload div - start */}
        <div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-lg w-full max-w-sm"
            onChange={(e) => {
              const selectedFile = e.target.files ? e.target.files[0] : null;

              if (selectedFile) {
                uploadFile(selectedFile);
                setProduct({ ...product!, mainImage: selectedFile.name });
              }
            }}
          />
          {product?.mainImage && (
            <Image
              src={`/images/products/` + product?.mainImage}
              alt={product?.title}
              className="m-w-[100px] m-h-[100px] mt-2"
              width={100}
              height={100}
            />
          )}
        </div>
        {/* Main image file upload div - end */}
        {/* Other images file upload div - start */}
        <div className="flex gap-x-1">
          {otherImages &&
            otherImages.map((image) => (
              <Image
                src={`/images/products/${image.image}`}
                key={nanoid()}
                alt="product image"
                width={100}
                height={100}
                className="w-auto h-auto"
              />
            ))}
        </div>
        {/* Other images file upload div - end */}
        {/* Product description div - start */}
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Product description:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              value={product?.description || ""}
              onChange={(e) => setProduct({ ...product!, description: e.target.value })}
            ></textarea>
          </label>
        </div>

        <div>
          <div className="label">
            <span className="label-text">Preview:</span>
          </div>
          <div className="prose max-w-full">
            <Markdown>{product?.description || ""}</Markdown>
          </div>
        </div>
        {/* Product description div - end */}

        {/* Product attributes div - start */}
        <div>
          <div className="label">
            <span className="label-text">Product attributes:</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table text-xl text-center max-[500px]:text-base">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {product?.attributes &&
                  product.attributes.map((attribute, index) => (
                    <tr key={index}>
                      <th>
                        <input
                          type="text"
                          className="input input-bordered w-full max-w-xs"
                          value={attribute.name || ""}
                          onChange={(e) => {
                            setProduct({
                              ...product!,
                              attributes: product.attributes.map((attr) =>
                                attr.name === attribute.name ? { ...attr, name: e.target.value } : attr
                              ),
                            });
                          }}
                        />
                      </th>
                      <td>
                        <input
                          type="text"
                          className="input input-bordered w-full max-w-xs"
                          value={attribute.value || ""}
                          onChange={(e) => {
                            setProduct({
                              ...product!,
                              attributes: product.attributes.map((attr) =>
                                attr.name === attribute.name ? { ...attr, value: e.target.value } : attr
                              ),
                            });
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="uppercase bg-red-600 p-2 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
                          onClick={() => {
                            setProduct({
                              ...product!,
                              attributes: product.attributes.filter((attr) => attr.name !== attribute.name),
                            });
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className="uppercase bg-blue-500 p-2 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
                      onClick={() =>
                        setProduct({
                          ...product!,
                          attributes: [...(product?.attributes || []), { name: "", value: "" }],
                        })
                      }
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Product attributes div - end */}

        <div>
          <Checkbox stateValue={addNew} setStateValue={setAddNew} text="Add new product?" />
        </div>

        {/* Action buttons div - start */}
        <div className="flex gap-x-2 max-sm:flex-col">
          <button
            type="button"
            onClick={updateProduct}
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
          >
            Update product
          </button>
          <button
            type="button"
            className="uppercase bg-red-600 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
            onClick={deleteProduct}
          >
            Delete product
          </button>
        </div>
        {/* Action buttons div - end */}
        <p className="text-xl max-sm:text-lg text-error">
          To delete the product you first need to delete all its records in orders (customer_order_product table).
        </p>
      </div>
    </div>
  );
};

export default DashboardProductDetails;
