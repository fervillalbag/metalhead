import { gql } from "@apollo/client";

export const UPDATE_REVIEW_HOME_ITEM = gql`
  mutation updateReviewHome($input: ReviewInput) {
    updateReviewHome(input: $input) {
      message
      success
    }
  }
`;

export const DELETE_REVIEW_HOME_ITEM = gql`
  mutation deleteReviewHome($id: ID!) {
    deleteReviewHome(id: $id) {
      message
      success
    }
  }
`;

export const CREATE_REVIEW_HOME = gql`
  mutation createReviewHome($input: ReviewInput!) {
    createReviewHome(input: $input) {
      message
      success
    }
  }
`;
