import { gql } from "@apollo/client";

export const UPDATE_PLAN_INFO = gql`
  mutation updatePlanInfo($input: PlanInfoInput) {
    updatePlanInfo(input: $input) {
      message
      success
    }
  }
`;
