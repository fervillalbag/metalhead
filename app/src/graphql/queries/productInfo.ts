import { gql } from "@apollo/client";

export const GET_PRODUCT_INFO = gql`
  query getProductInfo {
    getProductInfo {
      id
      title
      description {
        id
        text
      }
      createdAt
    }
  }
`;
