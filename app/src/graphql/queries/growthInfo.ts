import { gql } from "@apollo/client";

export const GET_GROWTH_INFO_HOME = gql`
  query getGrowthInfoHome {
    getGrowthInfoHome {
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
