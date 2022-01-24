import { gql } from "@apollo/client";

export const UPDATE_ABOUT_INFO = gql`
  mutation updateAboutPage($input: AboutPageInput) {
    updateAboutPage(input: $input) {
      message
      success
    }
  }
`;
