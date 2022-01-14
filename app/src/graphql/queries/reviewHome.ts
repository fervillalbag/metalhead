import { gql } from "@apollo/client";

export const GET_REVIEW_HOME = gql`
  query getReviewHome {
    getReviewHome {
      id
      title
      reviews {
        id
        name
        avatar
        description {
          id
          text
        }
      }
    }
  }
`;
