import headerHome from "../controllers/headerHome";
import userController from "../controllers/user";
import growthInfoController from "../controllers/growthInfo";
import growthController from "../controllers/growth";
import reviewController from "../controllers/review";
import aboutController from "../controllers/about";
import productController from "../controllers/product";
import planController from "../controllers/plan";
import reviewInfoController from "../controllers/reviewInfo";
import productInfoController from "../controllers/productInfo";

import { AboutInfo } from "../types/about";
import { ReviewHome, ReviewInfo } from "../types/review";
import { GrowthHome, GrowthInfo } from "../types/growth";
import { HeaderInfo } from "../types/header";
import { User } from "../types/user";
import { Products } from "../types/products";
import { Plan } from "../types/plan";

const resolvers = {
  Query: {
    // Users
    getUsers: () => userController.getUsers(),
    getUser: (_: any, { id }: { id: string }) =>
      userController.getUser(id),

    // Header Home
    getHeaderHome: () => headerHome.getHeaderHome(),

    // Growth
    getGrowthInfoHome: () => growthInfoController.getGrowthHome(),
    getGrowthHome: () => growthController.getGrowthHome(),
    getGrowthHomeItem: (_: any, { id }: { id: string }) =>
      growthController.getGrowthHomeItem(id),

    // Review
    getReviewHome: () => reviewController.getReviewHome(),
    getReviewInfoHome: () => reviewInfoController.getReviewInfoHome(),
    getReviewHomeItem: (_: any, { id }: { id: string }) =>
      reviewController.getReviewHomeItem(id),

    // About
    getAboutPage: () => aboutController.getAboutPage(),

    // Product
    getProductInfo: () => productInfoController.getProductInfo(),

    getProducts: () => productController.getProducts(),
    getProduct: (_: any, { id }: { id: string }) =>
      productController.getProduct(id),

    // Plans
    getPlan: (_: any, { id, slug }: { id: string; slug: string }) =>
      planController.getPlan(id, slug),
    getPlans: () => planController.getPlans(),
  },

  Mutation: {
    // Users
    createUser: (_: any, { input }: { input: User }) =>
      userController.createUser(input),

    // Header Home
    createHeaderHome: (_: any, { input }: { input: HeaderInfo }) =>
      headerHome.createHeaderHome(input),
    updateHeaderHome: (_: any, { input }: { input: HeaderInfo }) =>
      headerHome.updateHeaderHome(input),

    // Growth
    createGrowthInfoHome: (
      _: any,
      { input }: { input: GrowthInfo }
    ) => growthInfoController.createGrowthHome(input),
    updateGrowthInfoHome: (
      _: any,
      { input }: { input: GrowthInfo }
    ) => growthInfoController.updateGrowthHome(input),

    createGrowthHome: (_: any, { input }: { input: GrowthHome }) =>
      growthController.createGrowthHome(input),
    updateGrowthHome: (_: any, { input }: { input: GrowthHome }) =>
      growthController.updateGrowthHome(input),
    deleteGrowthHome: (_: any, { id }: { id: string }) =>
      growthController.deleteGrowthHome(id),

    // Review
    createReviewHomeInfo: (
      _: any,
      { input }: { input: ReviewInfo }
    ) => reviewInfoController.createReviewHomeInfo(input),
    updateReviewHomeInfo: (
      _: any,
      { input }: { input: ReviewInfo }
    ) => reviewInfoController.updateReviewHomeInfo(input),
    createReviewHome: (_: any, { input }: { input: ReviewHome }) =>
      reviewController.createReviewHome(input),
    updateReviewHome: (_: any, { input }: { input: ReviewHome }) =>
      reviewController.updateReviewHome(input),
    deleteReviewHome: (_: any, { id }: { id: string }) =>
      reviewController.deleteReviewHome(id),

    // About
    createAboutPage: (_: any, { input }: { input: AboutInfo }) =>
      aboutController.createAboutPage(input),
    updateAboutPage: (_: any, { input }: { input: AboutInfo }) =>
      aboutController.updateAboutPage(input),

    // Product
    createProductInfo: (_: any, { input }: { input: any }) =>
      productInfoController.createProductInfo(input),
    updateProductInfo: (_: any, { input }: { input: any }) =>
      productInfoController.updateProductInfo(input),

    createProduct: (_: any, { input }: { input: Products }) =>
      productController.createProduct(input),
    updateProduct: (_: any, { input }: { input: Products }) =>
      productController.updateProduct(input),
    deleteProduct: (_: any, { id }: { id: string }) =>
      productController.deleteProduct(id),

    // Product
    createPlan: (_: any, { input }: { input: Plan }) =>
      planController.createPlan(input),
    updatePlan: (_: any, { input }: { input: Plan }) =>
      planController.updatePlan(input),
    deletePlan: (_: any, { id }: { id: string }) =>
      planController.deletePlan(id),
  },
};

export default resolvers;
