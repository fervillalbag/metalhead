import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($input: CreateUser!) {
    createUser(input: $input) {
      message
      success
    }
  }
`;
