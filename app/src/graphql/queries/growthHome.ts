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
      createdAt
    }
  }
`;

export const GET_GROWTH_ITEM = gql`
  query getGrowthHomeItem($id: String!) {
    getGrowthHomeItem(id: $id) {
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
