import { gql } from "@apollo/client";

export const GET_REVIEW_HOME = gql`
  query getReviewHome {
    getReviewHome {
      id
      name
      avatar
      description {
        id
        text
      }
    }
  }
`;
