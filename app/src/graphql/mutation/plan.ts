import { gql } from "@apollo/client";

export const UPDATE_PLAN_ITEM = gql`
  mutation updatePlan($input: PlanInput) {
    updatePlan(input: $input) {
      message
      success
    }
  }
`;

export const DELETE_PLAN_ITEM = gql`
  mutation deletePlan($id: ID!) {
    deletePlan(id: $id) {
      message
      success
    }
  }
`;

export const CREATE_PLAN_ITEM = gql`
  mutation createPlan($input: PlanInput!) {
    createPlan(input: $input) {
      message
      success
    }
  }
`;
