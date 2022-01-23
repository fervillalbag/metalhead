import { gql } from "@apollo/client";

export const UPDATE_HEADER_INFO = gql`
  mutation updateHeaderHome($input: HeaderHomeInput) {
    updateHeaderHome(input: $input) {
      message
      success
    }
  }
`;
