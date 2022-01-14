import { gql } from "@apollo/client";

export const GET_ABOUT_PAGE = gql`
  query getAboutPage {
    getAboutPage {
      id
      title
      image
      description {
        id
        text
      }
    }
  }
`;
