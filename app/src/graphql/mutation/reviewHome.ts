import { gql } from "@apollo/client";

export const UPDATE_REVIEW_HOME_ITEM = gql`
  mutation updateReviewHome($input: ReviewInput) {
    updateReviewHome(input: $input) {
      message
      success
    }
  }
`;
