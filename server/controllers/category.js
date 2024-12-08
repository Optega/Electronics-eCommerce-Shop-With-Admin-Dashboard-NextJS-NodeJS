const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCategory(request, response) {
  try {
    const { title, image, slug } = request.body;
    const category = await prisma.category.create({
      data: {
        title,
        image,
        slug,
      },
    });
    return response.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return response.status(500).json({ error: "Error creating category" });
  }
}

async function updateCategory(request, response) {
  try {
    const { id } = request.params;
    const { title, image, slug } = request.body;

    const existingCategory = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingCategory) {
      return response.status(404).json({ error: "Category not found" });
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: existingCategory.id,
      },
      data: {
        title,
        image,
        slug,
      },
    });

    return response.status(200).json(updatedCategory);
  } catch (error) {
    return response.status(500).json({ error: "Error updating category" });
  }
}

async function deleteCategory(request, response) {
  try {
    const { id } = request.params;
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting category" });
  }
}

async function getCategory(request, response) {
  const { id } = request.params;
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  if (!category) {
    return response.status(404).json({ error: "Category not found" });
  }
  return response.status(200).json(category);
}

async function getCategoryByTitle(request, response) {
  const { title } = request.params;
  const category = await prisma.category.findUnique({
    where: {
      title: title,
    },
  });
  if (!category) {
    return response.status(404).json({ error: "Category not found" });
  }
  return response.status(200).json(category);
}

async function getCategoryBySlug(request, response) {
  const { slug } = request.params;
  const category = await prisma.category.findUnique({
    where: {
      slug: slug,
    },
  });
  if (!category) {
    return response.status(404).json({ error: "Category not found" });
  }
  return response.status(200).json(category);
}

async function getAllCategories(request, response) {
  try {
    const categories = await prisma.category.findMany({});
    return response.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return response.status(500).json({ error: "Error fetching categories" });
  }
}

async function uploadCategoryImage(request, response) {
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).json({ message: "No files uploaded." });
  }

  // Get file from a request
  const uploadedFile = request.files.uploadedFile;

  // Using mv method for moving file to the directory on the server
  uploadedFile.mv("../public/images/icons/" + uploadedFile.name, (err) => {
    if (err) {
      return response.status(500).send(err);
    }

    response.status(200).json({ message: "File uploaded successfully" });
  });
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategoryByTitle,
  getCategoryBySlug,
  getAllCategories,
  uploadCategoryImage,
};
