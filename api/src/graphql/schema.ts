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

  type GrowthItem {
    id: ID
    title: String
    description: [Description]
  }

  type GrowthHome {
    id: ID
    title: String
    description: [Description]
    items: [GrowthItem]
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

  # Inputs

  input CreateUser {
    name: String
    lastname: String
    password: String
    email: String
    username: String
  }

  input DescriptionInput {
    id: ID
    text: String
  }

  input HeaderHomeInput {
    title: String
    description: [DescriptionInput]
    image: String
  }

  input GrowthItemInput {
    id: String
    title: String
    description: [DescriptionInput]
  }

  input GrowthHomeInput {
    title: String
    description: [DescriptionInput]
    items: [GrowthItemInput]
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

  # Query

  type Query {
    # User
    getUsers: [User]
    getUser(id: ID!): User

    # Header Home
    getHeaderHome: HeaderHome

    # Growth
    getGrowthHome: GrowthHome

    # Review
    getReviewHome: [Review]
    getReviewInfoHome: ReviewInfo

    # About
    getAboutPage: AboutPage

    # Product
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
    createGrowthHome(input: GrowthHomeInput!): MutationResponse
    updateGrowthHome(input: GrowthHomeInput): MutationResponse

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
