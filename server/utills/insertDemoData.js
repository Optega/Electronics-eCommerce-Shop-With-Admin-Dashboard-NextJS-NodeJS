const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const demoUsers = [
  {
    id: "1",
    email: "admin@gmail.com",
    password: "$2a$05$aJrxk.qJDHPiL97a7/Mi5exgxjpWGUCgcCOG6tJ0F3aP072YcHIzG", // password: password
    role: "ADMIN",
  },
  {
    id: "2",
    email: "user@gmail.com",
    password: "$2a$05$aJrxk.qJDHPiL97a7/Mi5exgxjpWGUCgcCOG6tJ0F3aP072YcHIzG", // password: password
    role: "USER",
  },
];

const demoProducts = [
  {
    id: "1",
    slug: "smart-phone-demo",
    title: "Smart phone",
    mainImage: "product1.webp",
    price: 22,
    rating: 5,
    description: "This is smart phone description",
    manufacturer: "Samsung",
    inStock: 0,
    categoryId: "3117a1b0-6369-491e-8b8b-9fdd5ad9912e",
    sku: "rs-101",
    reviewsCount: 1,
    attributes: {
      color: "black",
    },
  },
  {
    id: "2",
    slug: "slr-camera-demo",
    title: "SLR camera",
    mainImage: "product2.webp",
    price: 24,
    rating: 0,
    description: "This is slr description",
    manufacturer: "Canon",
    inStock: 0,
    categoryId: "659a91b9-3ff6-47d5-9830-5e7ac905b961",
    sku: "rs-102",
    reviewsCount: 2,
    attributes: {
      color: "black",
    },
  },
  {
    id: "3",
    slug: "mixed-grinder-demo",
    title: "Mixer grinder",
    mainImage: "product3.webp",
    price: 25,
    rating: 4,
    description: "This is mixed grinder description",
    manufacturer: "ZunVolt",
    inStock: 1,
    categoryId: "da6413b4-22fd-4fbb-9741-d77580dfdcd5",
    sku: "rs-103",
    reviewsCount: 3,
    attributes: {
      color: "black",
    },
  },
  {
    id: "4",
    slug: "phone-gimbal-demo",
    title: "Phone gimbal",
    mainImage: "product4.webp",
    price: 21,
    rating: 5,
    description: "This is phone gimbal description",
    manufacturer: "Samsung",
    inStock: 1,
    categoryId: "ss6412b4-22fd-4fbb-9741-d77580dfdcd2",
    sku: "rs-104",
    reviewsCount: 4,
    attributes: {
      color: "black",
    },
  },
  {
    id: "5",
    slug: "tablet-keyboard-demo",
    title: "Tablet keyboard",
    mainImage: "product5.webp",
    price: 52,
    rating: 4,
    description: "This is tablet keyboard description",
    manufacturer: "Samsung",
    inStock: 1,
    categoryId: "ada699e5-e764-4da0-8d3e-18a8c8c5ed24",
    sku: "rs-105",
    reviewsCount: 5,
    attributes: {
      color: "black",
    },
  },
  {
    id: "6",
    slug: "wireless-earbuds-demo",
    title: "Wireless earbuds",
    mainImage: "product6.webp",
    price: 74,
    rating: 3,
    description: "This is earbuds description",
    manufacturer: "Samsung",
    inStock: 1,
    categoryId: "1cb9439a-ea47-4a33-913b-e9bf935bcc0b",
    sku: "rs-106",
    reviewsCount: 6,
    attributes: {
      color: "black",
    },
  },
  {
    id: "7",
    slug: "party-speakers-demo",
    title: "Party speakers",
    mainImage: "product7.webp",
    price: 35,
    rating: 5,
    description: "This is party speakers description",
    manufacturer: "SOWO",
    inStock: 1,
    categoryId: "fs6412b4-22fd-4fbb-9741-d77512dfdfa3",
    sku: "rs-107",
    reviewsCount: 5,
    attributes: {
      color: "black",
    },
  },
  {
    id: "8",
    slug: "slow-juicer-demo",
    title: "Slow juicer",
    mainImage: "product8.webp",
    price: 69,
    rating: 5,
    description: "Slow juicer desc",
    manufacturer: "Bosch",
    inStock: 1,
    categoryId: "fs6412b4-22fd-4fbb-9741-d77512dfdfa3",
    sku: "rs-108",
    reviewsCount: 4,
    attributes: {
      color: "black",
    },
  },
  {
    id: "9",
    slug: "wireless-headphones-demo",
    title: "Wireless headphones",
    mainImage: "product9.webp",
    price: 89,
    rating: 3,
    description: "This is wireless headphones description",
    manufacturer: "Sony",
    inStock: 1,
    categoryId: "4c2cc9ec-7504-4b7c-8ecd-2379a854a423",
    sku: "rs-109",
    reviewsCount: 3,
    attributes: {
      color: "black",
    },
  },
  {
    id: "10",
    slug: "smart-watch-demo",
    title: "Smart watch",
    mainImage: "product10.webp",
    price: 64,
    rating: 3,
    description: "This is smart watch description",
    manufacturer: "Samsung",
    inStock: 1,
    categoryId: "a6896b67-197c-4b2a-b5e2-93954474d8b4",
    sku: "rs-110",
    reviewsCount: 2,
    attributes: {
      color: "black",
    },
  },
  {
    id: "11",
    slug: "notebook-horizon-demo",
    title: "Notebook horizon",
    mainImage: "product11.webp",
    price: 52,
    rating: 5,
    description: "This is notebook description",
    manufacturer: "HP",
    inStock: 1,
    categoryId: "782e7829-806b-489f-8c3a-2689548d7153",
    sku: "rs-111",
    reviewsCount: 1,
    attributes: {
      color: "black",
    },
  },
  {
    id: "12",
    slug: "mens-trimmer-demo",
    title: "Mens trimmer",
    mainImage: "product12.webp",
    price: 54,
    rating: 5,
    description: "This is trimmer description",
    manufacturer: "Gillete",
    inStock: 0,
    categoryId: "782e7829-806b-489f-8c3a-2689548d7153",
    sku: "rs-112",
    reviewsCount: 0,
    attributes: {
      color: "black",
    },
  },
];

const demoCategories = [
  {
    id: "3117a1b0-6369-491e-8b8b-9fdd5ad9912e",
    title: "Телефони",
    image: "smart phone icon.png",
    slug: "smart-phones",
  },
  {
    id: "ada699e5-e764-4da0-8d3e-18a8c8c5ed24",
    title: "Планшети",
    image: "tablet icon.png",
    slug: "tablets",
  },
  {
    id: "da6413b4-22fd-4fbb-9741-d77580dfdcd5",
    title: "Мишки",
    image: "mouse icon.png",
    slug: "mouses",
  },
  {
    id: "659a91b9-3ff6-47d5-9830-5e7ac905b961",
    title: "Камери",
    image: "camera icon.png",
    slug: "cameras",
  },
  {
    id: "a6896b67-197c-4b2a-b5e2-93954474d8b4",
    title: "Годинники",
    image: "smart watch.png",
    slug: "watches",
  },
  {
    id: "782e7829-806b-489f-8c3a-2689548d7153",
    title: "Ноутбуки",
    image: "laptop icon.png",
    slug: "laptops",
  },
  {
    id: "ss6412b4-22fd-4fbb-9741-d77580dfdcd2",
    title: "ПК",
    image: "pc icon.png",
    slug: "computers",
  },
  {
    id: "fs6412b4-22fd-4fbb-9741-d77512dfdfa3",
    title: "Принтери",
    image: "printers icon.png",
    slug: "printers",
  },
  {
    id: "1cb9439a-ea47-4a33-913b-e9bf935bcc0b",
    title: "Навушники",
    image: "ear buds icon.png",
    slug: "earbuds",
  },
  {
    id: "4c2cc9ec-7504-4b7c-8ecd-2379a854a423",
    title: "Навушники",
    image: "headphone icon.png",
    slug: "headphones",
  },
];

async function insertDemoData() {
  await prisma.category.createMany({
    data: demoCategories,
  });
  console.log("Demo categories inserted successfully!");

  await prisma.product.createMany({
    data: demoProducts,
  });
  console.log("Demo products inserted successfully!");

  await prisma.user.createMany({
    data: demoUsers,
  });
  console.log("Demo users inserted successfully!");
}

insertDemoData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
