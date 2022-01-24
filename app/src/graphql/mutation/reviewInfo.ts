import { gql } from "@apollo/client";

export const UPDATE_REVIEW_INFO = gql`
  mutation updateReviewHomeInfo($input: ReviewHomeInfoInput) {
    updateReviewHomeInfo(input: $input) {
      message
      success
    }
  }
`;
