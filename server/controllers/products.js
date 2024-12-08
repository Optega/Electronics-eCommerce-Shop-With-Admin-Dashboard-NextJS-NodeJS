const { PrismaClient } = require("@prisma/client");

let prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

async function getAllProducts(request, response) {
  const { page = 1, sort = "defaultSort", price, rating, inStock, category } = request.query;
  const parsedPage = parseInt(page, 10);

  // Переконатися, що ці фільтри є числами
  const parsedPrice = parseInt(price, 10) || 0;
  const parsedRating = parseInt(rating, 10) || 0;
  const parsedInStock = inStock || "gte";

  // Створення об'єкта для умов фільтрації
  const whereClause = {
    price: {
      lte: parsedPrice,
    },
    rating: {
      gte: parsedRating,
    },
    inStock: {
      [parsedInStock]: 0,
    },
    ...(category && { category: { slug: category } }), // Якщо є фільтр по категорії
  };

  // Створення об'єкта для сортування
  let sortObj = {};
  if (sort === "titleAsc") {
    sortObj = { title: "asc" };
  } else if (sort === "titleDesc") {
    sortObj = { title: "desc" };
  } else if (sort === "lowPrice") {
    sortObj = { price: "asc" };
  } else if (sort === "highPrice") {
    sortObj = { price: "desc" };
  } else {
    sortObj = {}; // Default sorting
  }

  try {
    const products = await prisma.product.findMany({
      where: whereClause,
      skip: (parsedPage - 1) * 12, // Для пагінації
      take: 12,
      orderBy: sortObj,
      include: {
        category: true,
      },
    });

    return response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return response.status(500).json({ error: "Error fetching products" });
  }
}

async function createProduct(request, response) {
  try {
    const {
      slug,
      title,
      mainImage,
      price,
      description,
      manufacturer,
      categoryId,
      inStock,
      sku,
      reviewsCount,
      attributes,
    } = request.body;
    const product = await prisma.product.create({
      data: {
        slug,
        title,
        mainImage,
        price,
        rating: 0,
        description,
        manufacturer,
        categoryId,
        inStock,
        sku,
        reviewsCount,
        attributes,
      },
    });
    return response.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error); // Dodajemo log za proveru
    return response.status(500).json({ error: "Error creating product" });
  }
}

// Method for updating existing product
async function updateProduct(request, response) {
  try {
    const { id } = request.params; // Getting a slug from params
    const {
      slug,
      title,
      mainImage,
      price,
      rating,
      description,
      manufacturer,
      categoryId,
      inStock,
      sku,
      reviewsCount,
      attributes,
    } = request.body;
    // Finding a product by slug
    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return response.status(404).json({ error: "Product not found" });
    }

    // Updating found product
    const updatedProduct = await prisma.product.update({
      where: {
        id, // Using id of the found product
      },
      data: {
        title: title,
        mainImage: mainImage,
        slug: slug,
        price: price,
        rating: rating,
        description: description,
        manufacturer: manufacturer,
        categoryId: categoryId,
        inStock: inStock,
        sku: sku,
        reviewsCount: reviewsCount,
        attributes: attributes,
      },
    });

    return response.status(200).json(updatedProduct);
  } catch (error) {
    return response.status(500).json({ error: "Error updating product" });
  }
}

// Method for deleting a product
async function deleteProduct(request, response) {
  try {
    const { id } = request.params;

    // Check for related records in wishlist table
    const relatedOrderProductItems = await prisma.customer_order_product.findMany({
      where: {
        productId: id,
      },
    });
    if (relatedOrderProductItems.length > 0) {
      return response.status(400).json({
        error: "Cannot delete product because of foreign key constraint. ",
      });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting product" });
  }
}

async function searchProducts(request, response) {
  try {
    const { query } = request.query;
    if (!query) {
      return response.status(400).json({ error: "Query parameter is required" });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
    });

    return response.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    return response.status(500).json({ error: "Error searching products" });
  }
}

async function getProductById(request, response) {
  const { id } = request.params;
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });
  if (!product) {
    return response.status(404).json({ error: "Product not found" });
  }
  return response.status(200).json(product);
}

async function getMinMaxPrices(request, response) {
  try {
    const prices = await prisma.product.findMany({
      select: {
        price: true,
      },
      orderBy: {
        price: "asc",
      },
    });
    if (prices.length === 0) {
      return response.status(404).json({ error: "No prices found" });
    }
    const minPrice = prices[0].price;
    const maxPrice = prices[prices.length - 1].price;
    return response.json({ minPrice, maxPrice });
  } catch (error) {
    console.error("Error getting min and max prices:", error);
    return response.status(500).json({ error: "Error getting min and max prices" });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
  getMinMaxPrices,
};
