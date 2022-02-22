import { gql } from "@apollo/client";

export const DELETE_ORDER = gql`
  mutation deleteListProducts($id: String!) {
    deleteListProducts(id: $id) {
      message
      success
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateDataOrder($input: ResponseListProductInput!) {
    updateDataOrder(input: $input) {
      message
      success
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation createListProducts($input: [ListProductInput]!) {
    createListProducts(input: $input) {
      message
      success
    }
  }
`;
