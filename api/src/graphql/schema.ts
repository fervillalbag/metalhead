import { gql } from "apollo-server";

const typeDefs = gql`
  # Types

  type User {
    id: ID
    name: String
    lastname: String
    username: String
    email: String
    password: String
    avatar: String
    role: String
    createdAt: String
  }

  type MutationResponse {
    message: String
    success: Boolean
  }

  type Description {
    id: ID
    text: String
  }

  type HeaderHome {
    id: ID
    title: String
    description: [Description]
    image: String
    createdAt: String
  }

  type GrowthInfoHome {
    id: ID
    title: String
    description: [Description]
    createdAt: String
  }

  type GrowthHome {
    id: ID
    title: String
    description: [Description]
    createdAt: String
  }

  type ReviewInfo {
    id: ID
    title: String
    description: [Description]
    createdAt: String
  }

  type Review {
    id: ID
    name: String
    avatar: String
    description: [Description]
  }

  type AboutPage {
    id: ID
    title: String
    description: [Description]
    image: String
  }

  type Product {
    id: ID
    name: String
    code: Int
    quantity: Int
    price: Int
    image: String
    description: [Description]
    createdAt: String
  }

  type PlansItem {
    id: ID
    text: String
    status: Boolean
  }

  type Plan {
    id: ID
    slug: String
    name: String
    url: String
    status: Boolean
    price: Int
    items: [PlansItem]
    createdAt: String
  }

  type PlanInfo {
    id: ID
    title: String
    description: [Description]
    createdAt: String
  }

  type ProductInfo {
    id: String
    title: String
    description: [Description]
    createdAt: String
  }

  type Slide {
    id: String
    image: String
    createdAt: String
  }

  # Inputs

  input CreateUser {
    name: String
    lastname: String
    password: String
    email: String
    username: String
  }

  input DescriptionInput {
    id: String
    text: String
  }

  input HeaderHomeInput {
    id: ID
    title: String
    description: [DescriptionInput]
    image: String
  }

  input GrowthInput {
    id: ID
    title: String
    description: [DescriptionInput]
  }

  input GrowthHomeInfoInput {
    id: String
    title: String
    description: [DescriptionInput]
  }

  input ReviewInput {
    id: ID
    name: String
    avatar: String
    description: [DescriptionInput]
  }

  input ReviewHomeInfoInput {
    id: ID
    title: String
    description: [DescriptionInput]
  }

  input AboutPageInput {
    id: String
    title: String
    description: [DescriptionInput]
    image: String
  }

  input ProductInput {
    id: String
    name: String
    quantity: Int
    code: Int
    price: Int
    image: String
    description: [DescriptionInput]
  }

  input PlansItemInput {
    id: ID
    text: String
    status: Boolean
  }

  input PlanInput {
    id: String
    slug: String
    name: String
    status: Boolean
    url: String
    price: Int
    items: [PlansItemInput]
  }

  input ProductInfoInput {
    id: String
    title: String
    description: [DescriptionInput]
  }

  input PlanInfoInput {
    id: String
    title: String
    description: [DescriptionInput]
  }

  input SlideInput {
    image: String
    createdAt: String
  }

  # Query

  type Query {
    # User
    getUsers: [User]
    getUser(id: ID!): User

    # Header Home
    getHeaderHome: HeaderHome

    # Growth
    getGrowthInfoHome: GrowthInfoHome
    getGrowthHome: [GrowthHome]
    getGrowthHomeItem(id: String!): GrowthHome

    # Review
    getReviewHome: [Review]
    getReviewInfoHome: ReviewInfo
    getReviewHomeItem(id: String): Review

    # About
    getAboutPage: AboutPage

    # Product
    getProductInfo: ProductInfo

    getProducts: [Product]
    getProduct(id: ID!): Product

    # Plan
    getPlanInfo: PlanInfo

    getPlans: [Plan]
    getPlan(id: String, slug: String): Plan
  }

  type Mutation {
    # User
    createUser(input: CreateUser!): MutationResponse

    # Header Home
    createHeaderHome(input: HeaderHomeInput!): MutationResponse
    updateHeaderHome(input: HeaderHomeInput): MutationResponse

    # Growth
    createGrowthInfoHome(
      input: GrowthHomeInfoInput!
    ): MutationResponse
    updateGrowthInfoHome(input: GrowthHomeInfoInput): MutationResponse

    createGrowthHome(input: GrowthInput!): MutationResponse
    updateGrowthHome(input: GrowthInput): MutationResponse
    deleteGrowthHome(id: ID!): MutationResponse

    # Review
    createReviewHomeInfo(
      input: ReviewHomeInfoInput!
    ): MutationResponse
    updateReviewHomeInfo(input: ReviewHomeInfoInput): MutationResponse

    createReviewHome(input: ReviewInput!): MutationResponse
    updateReviewHome(input: ReviewInput): MutationResponse
    deleteReviewHome(id: ID!): MutationResponse

    # About
    createAboutPage(input: AboutPageInput!): MutationResponse
    updateAboutPage(input: AboutPageInput): MutationResponse

    # Product
    createProductInfo(input: ProductInfoInput!): MutationResponse
    updateProductInfo(input: ProductInfoInput): MutationResponse

    createProduct(input: ProductInput!): MutationResponse
    updateProduct(input: ProductInput): MutationResponse
    deleteProduct(id: ID!): MutationResponse

    # Plan
    createPlanInfo(input: PlanInfoInput!): MutationResponse
    updatePlanInfo(input: PlanInfoInput): MutationResponse

    createPlan(input: PlanInput!): MutationResponse
    updatePlan(input: PlanInput): MutationResponse
    deletePlan(id: ID!): MutationResponse

    # Slide
    createSlide(input: SlideInput!): MutationResponse
    deleteSlide(id: String!): MutationResponse
  }
`;

export default typeDefs;
