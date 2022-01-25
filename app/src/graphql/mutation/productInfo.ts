import { gql } from "@apollo/client";

export const UPDATE_PRODUCT_INFO = gql`
  mutation updateProductInfo($input: ProductInfoInput) {
    updateProductInfo(input: $input) {
      message
      success
    }
  }
`;
