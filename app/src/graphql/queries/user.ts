import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      name
      lastname
      username
      email
      avatar
      role
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      lastname
      username
      email
      avatar
      role
      createdAt
    }
  }
`;
