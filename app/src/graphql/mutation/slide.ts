import { gql } from "@apollo/client";

export const CREATE_SLIDE = gql`
  mutation createSlide($input: SlideInput!) {
    createSlide(input: $input) {
      message
      success
    }
  }
`;

export const DELETE_SLIDE = gql`
  mutation deleteSlide($id: String!) {
    deleteSlide(id: $id) {
      message
      success
    }
  }
`;
