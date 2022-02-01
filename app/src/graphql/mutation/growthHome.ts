import { gql } from "@apollo/client";

export const UPDATE_GROWTH_ITEM = gql`
  mutation updateGrowthHome($input: GrowthInput) {
    updateGrowthHome(input: $input) {
      message
      success
    }
  }
`;

export const DELETE_GROWTH_ITEM = gql`
  mutation deleteGrowthHome($id: ID!) {
    deleteGrowthHome(id: $id) {
      message
      success
    }
  }
`;

export const CREATE_GROWTH_ITEM = gql`
  mutation createGrowthHome($input: GrowthInput!) {
    createGrowthHome(input: $input) {
      message
      success
    }
  }
`;
