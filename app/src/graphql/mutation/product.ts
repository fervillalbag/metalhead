import { gql } from "@apollo/client";

export const UPDATE_PRODUCT_ITEM = gql`
  mutation updateProduct($input: ProductInput!) {
    updateProduct(input: $input) {
      message
      success
    }
  }
`;

export const DELETE_PRODUCT_ITEM = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      message
      success
    }
  }
`;

export const CREATE_PRODUCT_ITEM = gql`
  mutation createProduct($input: ProductInput!) {
    createProduct(input: $input) {
      message
      success
    }
  }
`;
