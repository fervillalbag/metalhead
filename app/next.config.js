/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 90,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    URL_CLOUDINARY_RES:
      "https://api.cloudinary.com/v1_1/dbp9am0cx/image/upload",
    CLOUDINARY_NAME_PRESET_ABOUT_HOME: "aboutpage",
    CLOUDINARY_NAME_PRESET_HEADER_HOME: "headerInfo",
    CLOUDINARY_NAME_PRESET_PRODUCTS_HOME: "products",
    CLOUDINARY_NAME_PRESET_REVIEWS_HOME: "reviewItem",
    CLOUDINARY_NAME_PRESET_BANNER: "banner",
  },
};
