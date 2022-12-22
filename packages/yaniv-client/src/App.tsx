// Import everything needed to use the `useQuery` hook
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
} from "@chakra-ui/react";
import { MouseEvent, MouseEventHandler, useEffect } from "react";

import { DeleteIcon, SearchIcon, CheckIcon } from "@chakra-ui/icons";
// import { output } from "./hooks/useGetAllUsers";
// import Header from "./components/Header";
// import Main from "./components/Main";

const GET_USERS = gql`
  query a {
    GetAllUsers {
      id
      first_name
      last_name
    }
  }
`;
const GET_DIPLOMAS = gql`
  query b {
    GetAllDiplomas {
      id
      title
    }
  }
`;
export default function App(val: any) {
  // function useGetAllUsers() {
  //   // const { loading, error, data } = useQuery(GET_USERS);
  //   return { loading, error, data };
  // }
  // const DIPLOMAS_SUBSCRIPTION = gql`
  //   subscription OnDiplomaAdded($diplomaId: number!) {
  //     diplomaAdded(diplomaId: $diplomaId) {
  //       id
  //       title
  //     }
  //   }
  // `;

  const [getUsersFunc, { loading, error, data }] = useLazyQuery(GET_USERS);

  useEffect(() => {
    getUsersFunc();
    console.log("error ---------", error?.message);
  }, []);
  function DisplayAllUsers() {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Tbody>
            <Tr>
              {Object.keys(data?.GetAllUsers[0] ?? {})?.map((key: any) => {
                console.log(key);

                return (
                  <Td className="myTh" key={key}>
                    {key}
                  </Td>
                );
              })}
            </Tr>
            {data?.GetAllUsers?.map((row: any, index: number) => {
              if (index === 1) console.log(row);

              return (
                <Tr key={index}>
                  {Object.values(row).map((value: any, index: number) => {
                    return (
                      <Td key={index} onClick={(e: any) => {}}>
                        <input
                          defaultValue={value}
                          onChange={(e) => {
                            e.target.classList.add("changedFields");
                          }}
                        ></input>
                        <IconButton
                          aria-label="Search database"
                          icon={<CheckIcon />}
                        />
                      </Td>
                    );
                  })}
                  <Td>
                    <IconButton
                      aria-label="Search database"
                      icon={<DeleteIcon onClick={async (e) => {}} />}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
  // return <>{JSON.stringify(data)}</>;

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      {DisplayAllUsers()}
    </div>
  );
}
