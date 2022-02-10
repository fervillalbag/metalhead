import { gql } from "@apollo/client";

export const GET_SLIDES = gql`
  query getSlides {
    getSlides {
      id
      image
      createdAt
    }
  }
`;
