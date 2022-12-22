import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@chakra-ui/react";
// import { output } from "../hooks/useGetAllUsers";
import DataTable from "./DataTable";

export default function Main() {
  const GET_USERS = gql`
    query AllUsers {
      AllUsers {
        id
        first_name
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_USERS); //lazy!
  function dataSegment() {
    if (loading) return <CircularProgress value={30} size="120px" />;
    if (error) {
      console.log(error);
      return <>error! </>;
    }
    console.log(data);

    return <DataTable data={data}></DataTable>;
    // return <></>;
  }
  return (
    <div>
      <div>
        <h1>Click on a button:</h1>
        <button onClick={() => alert(1)}>Get all users</button>
        <button onClick={() => alert(2)}>Get all usersByDiplomaTitle</button>
      </div>
      {dataSegment()}
    </div>
  );
}
