export const categoryMenuList = [
  {
    id: 1,
    title: "Телефони",
    src: "/smart phone icon.png",
    href: "/shop/smart-phones",
  },
  {
    id: 2,
    title: "Планшети",
    src: "/tablet icon.png",
    href: "/shop/tablets",
  },
  {
    id: 3,
    title: "Мишки",
    src: "/mouse icon.png",
    href: "/shop/mouses",
  },
  {
    id: 4,
    title: "Камери",
    src: "/camera icon.png",
    href: "/shop/cameras",
  },
  {
    id: 5,
    title: "Годинники",
    src: "/smart watch.png",
    href: "/shop/watches",
  },
  {
    id: 6,
    title: "Ноутбуки",
    src: "/laptop icon.png",
    href: "/shop/laptops",
  },
  {
    id: 7,
    title: "ПК",
    src: "/pc icon.png",
    href: "/shop/computers",
  },
  {
    id: 8,
    title: "Принтери",
    src: "/printers icon.png",
    href: "/shop/printers",
  },
  {
    id: 9,
    title: "Навушники",
    src: "/ear buds icon.png",
    href: "/shop/earbuds",
  },
  {
    id: 10,
    title: "Навушники",
    src: "/headphone icon.png",
    href: "/shop/headphones",
  },
];

export const incentives = [
  {
    name: "Безкоштовна доставка",
    description:
      "Наша доставка абсолютно безкоштовна і це дуже подобається нашим клієнтам.",
    imageSrc: "/shipping icon.png",
  },
  {
    name: "Підтримка клієнтів 24/7",
    description:
      "Наша підтримка працює цілодобово, щоб відповісти на будь-яке ваше запитання.",
    imageSrc: "/support icon.png",
  },
  {
    name: "Швидкий кошик для покупок",
    description:
      "Ми маємо надзвичайно швидкий досвід покупок, і вам це сподобається.",
    imageSrc: "/fast shopping icon.png",
  },
];

export const navigation = {
  sale: [
    { name: "Новини", href: "#" },
    { name: "Знижки", href: "#" },
    { name: "Акції", href: "#" },
  ],
  about: [
    { name: "Про RadioTech", href: "#" },
    { name: "Працюйте з нами", href: "#" },
    { name: "Профіль компанії", href: "#" },
  ],
  buy: [
    { name: "Карта лояльності RadioTech", href: "#" },
    { name: "Умови використання", href: "#" },
    { name: "Політика конфіденційності", href: "#" },
    { name: "Скарги", href: "#" },
    { name: "Партнери", href: "#" },
  ],
  help: [
    { name: "Контакти", href: "#" },
    { name: "Як купувати в RadioTech", href: "#" },
    { name: "Часті питання", href: "#" },
  ],
};

export const isValidNameOrLastname = (input: string) => {
  // Simple name or lastname regex format check
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input: string) => {
  // simple email address format check
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};

export const isValidCardNumber = (input: string) => {
  // Remove all non-digit characters
  const cleanedInput = input.replace(/[^0-9]/g, "");
  // test for credit card number between 13 and 19 characters
  const regex = /^\d{13,19}$/;
  return regex.test(cleanedInput);
};

export const isValidCreditCardExpirationDate = (input: string) => {
  // simple expiration date format check
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(input);
};

export const isValidCreditCardCVVOrCVC = (input: string) => {
  // simple CVV or CVC format check
  const regex = /^[0-9]{3,4}$/;
  return regex.test(input);
};
