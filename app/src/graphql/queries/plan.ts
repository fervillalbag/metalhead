import { gql } from "@apollo/client";

export const GET_PLANS = gql`
  query getPlans {
    getPlans {
      id
      slug
      status
      name
      price
      url
      items {
        id
        text
        status
      }
      createdAt
    }
  }
`;

export const GET_PLAN = gql`
  query getPlan($id: String, $slug: String) {
    getPlan(id: $id, slug: $slug) {
      id
      name
      price
      url
      status
      items {
        id
        status
        text
      }
      createdAt
    }
  }
`;
