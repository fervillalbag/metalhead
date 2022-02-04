import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      code
      quantity
      image
      price
      description {
        id
        text
      }
      createdAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      code
      quantity
      image
      price
      createdAt
      description {
        id
        text
      }
    }
  }
`;
