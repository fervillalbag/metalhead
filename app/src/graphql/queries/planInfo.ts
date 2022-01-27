import { gql } from "@apollo/client";

export const GET_PLAN_INFO = gql`
  query getPlanInfo {
    getPlanInfo {
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
