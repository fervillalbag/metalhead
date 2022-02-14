/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 90,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    URL_API: process.env.URL_API,
    URL_CLOUDINARY_RES: process.env.URL_CLOUDINARY_RES,
    CLOUDINARY_NAME_PRESET_ABOUT_HOME:
      process.env.CLOUDINARY_NAME_PRESET_ABOUT_HOME,
    CLOUDINARY_NAME_PRESET_HEADER_HOME:
      process.env.CLOUDINARY_NAME_PRESET_HEADER_HOME,
    CLOUDINARY_NAME_PRESET_PRODUCTS_HOME:
      process.env.CLOUDINARY_NAME_PRESET_PRODUCTS_HOME,
    CLOUDINARY_NAME_PRESET_REVIEWS_HOME:
      process.env.CLOUDINARY_NAME_PRESET_REVIEWS_HOME,
    CLOUDINARY_NAME_PRESET_BANNER: process.env.CLOUDINARY_NAME_PRESET_BANNER,
  },
};
