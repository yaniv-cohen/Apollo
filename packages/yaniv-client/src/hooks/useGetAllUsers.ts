// import { gql, useQuery } from "@apollo/client";

import { gql, useMutation } from "@apollo/client";

export const MyComponent = (id: number) => {
  const [mutateFunction, { data, loading, error }] = useMutation(DELETE_USER);
};

// Define mutation
const DELETE_USER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation DeleteUser {
    currentValue
  }
`;
