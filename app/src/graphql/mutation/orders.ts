import { gql } from "@apollo/client";

export const DELETE_ORDER = gql`
  mutation deleteListProducts($id: String!) {
    deleteListProducts(id: $id) {
      message
      success
    }
  }
`;
