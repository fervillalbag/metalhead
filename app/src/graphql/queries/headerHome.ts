import { gql } from "@apollo/client";

export const GET_HEADER_HOME = gql`
  query getHeaderHome {
    getHeaderHome {
      id
      title
      description {
        id
        text
      }
      image
      createdAt
    }
  }
`;
