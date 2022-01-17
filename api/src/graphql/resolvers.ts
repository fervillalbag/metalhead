import headerHome from "../controllers/headerHome";
import userController from "../controllers/user";
import growthController from "../controllers/growth";
import reviewController from "../controllers/review";
import aboutController from "../controllers/about";
import productController from "../controllers/product";
import planController from "../controllers/plan";
import reviewInfoController from "../controllers/reviewInfo";

const resolvers = {
  Query: {
    // Users
    getUsers: () => userController.getUsers(),
    getUser: (_: any, { id }: { id: string }) =>
      userController.getUser(id),

    // Header Home
    getHeaderHome: () => headerHome.getHeaderHome(),

    // Growth
    getGrowthInfoHome: () => growthController.getGrowthHome(),

    // Review
    getReviewHome: () => reviewController.getReviewHome(),
    getReviewInfoHome: () => reviewInfoController.getReviewInfoHome(),

    // About
    getAboutPage: () => aboutController.getAboutPage(),

    // Product
    getProducts: () => productController.getProducts(),
    getProduct: (_: any, { id }: { id: string }) =>
      productController.getProduct(id),

    // Plans
    getPlans: () => planController.getPlans(),
  },

  Mutation: {
    // Users
    createUser: (_: any, { input }: any) =>
      userController.createUser(input),

    // Header Home
    createHeaderHome: (_: any, { input }: { input: any }) =>
      headerHome.createHeaderHome(input),
    updateHeaderHome: (_: any, { input }: { input: any }) =>
      headerHome.updateHeaderHome(input),

    // Growth
    createGrowthInfoHome: (_: any, { input }: { input: any }) =>
      growthController.createGrowthHome(input),
    updateGrowthInfoHome: (_: any, { input }: { input: any }) =>
      growthController.updateGrowthHome(input),

    // Review
    createReviewHomeInfo: (_: any, { input }: { input: any }) =>
      reviewInfoController.createReviewHomeInfo(input),
    updateReviewHomeInfo: (_: any, { input }: { input: any }) =>
      reviewInfoController.updateReviewHomeInfo(input),
    createReviewHome: (_: any, { input }: { input: any }) =>
      reviewController.createReviewHome(input),
    updateReviewHome: (_: any, { input }: { input: any }) =>
      reviewController.updateReviewHome(input),
    deleteReviewHome: (_: any, { id }: { id: any }) =>
      reviewController.deleteReviewHome(id),

    // About
    createAboutPage: (_: any, { input }: { input: any }) =>
      aboutController.createAboutPage(input),
    updateAboutPage: (_: any, { input }: { input: any }) =>
      aboutController.updateAboutPage(input),

    // Product
    createProduct: (_: any, { input }: { input: any }) =>
      productController.createProduct(input),
    updateProduct: (_: any, { input }: { input: any }) =>
      productController.updateProduct(input),
    deleteProduct: (_: any, { id }: { id: any }) =>
      productController.deleteProduct(id),

    // Product
    createPlan: (_: any, { input }: { input: any }) =>
      planController.createPlan(input),
    updatePlan: (_: any, { input }: { input: any }) =>
      planController.updatePlan(input),
    deletePlan: (_: any, { id }: { id: string }) =>
      planController.deletePlan(id),
  },
};

export default resolvers;
