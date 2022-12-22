// import { output } from "../hooks/useGetAllUsers";
import DataTable from "./DataTable";

export default function DisplayUsers({ data }: any) {
  //   const [func, { loading, error, data }] = output;
  if (data) return <DataTable data={data} />;
  else return <>empty</>;
}
