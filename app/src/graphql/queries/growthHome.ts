import { gql } from "@apollo/client";

export const GET_GROWTH_HOME = gql`
  query getGrowthHome {
    getGrowthHome {
      id
      title
      description {
        id
        text
      }
      items {
        id
        title
        description {
          id
          text
        }
      }
      createdAt
    }
  }
`;
