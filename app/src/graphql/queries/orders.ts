import { gql } from "@apollo/client";

export const GET_ORDER = gql`
  query getListproduct($id: String!, $idUser: String) {
    getListProduct(id: $id, idUser: $idUser) {
      id
      createdAt
      idUser
      status
      products {
        name
        description {
          id
          text
        }
        code
        idUser
        image
        price
        qty
        quantity
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query getListProducts($idUser: String) {
    getListProducts(idUser: $idUser) {
      id
      idUser
      status
      createdAt
      products {
        name
        description {
          id
          text
        }
        code
        idUser
        image
        price
        qty
        quantity
      }
    }
  }
`;
