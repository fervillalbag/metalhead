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

export const GET_REVIEW_HOME_ITEM = gql`
  query getReviewHomeItem($id: String) {
    getReviewHomeItem(id: $id) {
      id
      name
      description {
        id
        text
      }
      avatar
    }
  }
`;
