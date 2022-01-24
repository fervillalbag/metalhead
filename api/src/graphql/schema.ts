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
    name: String
    url: String
    price: Int
    items: [PlansItem]
    createdAt: String
  }

  type ProductInfo {
    id: String
    title: String
    description: [Description]
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
    name: String
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
    name: String
    url: String
    price: Int
    items: [PlansItemInput]
  }

  input ProductInfoInput {
    id: String
    title: String
    description: [DescriptionInput]
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
    getPlans: [Plan]
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
    createPlan(input: PlanInput!): MutationResponse
    updatePlan(input: PlanInput): MutationResponse
    deletePlan(id: ID!): MutationResponse
  }
`;

export default typeDefs;
