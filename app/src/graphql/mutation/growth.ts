import { gql } from "@apollo/client";

export const UPDATE_GROWTH_INFO = gql`
  mutation updateGrowthInfoHome($input: GrowthHomeInfoInput) {
    updateGrowthInfoHome(input: $input) {
      message
      success
    }
  }
`;
