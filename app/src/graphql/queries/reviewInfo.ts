import { gql } from "@apollo/client";

export const GET_REVIEW_INFO = gql`
  query GetReviewInfoHome {
    getReviewInfoHome {
      id
      title
      description {
        id
        text
      }
      createdAt
    }
  }
`;
