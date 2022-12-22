import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useFocusEffect,
} from "@chakra-ui/react";
import { useEffect } from "react";
export default function DataTable(props: { data: any }) {
  console.log(props.data);

  useEffect(() => {
    console.log(props.data);
  }, []);
  console.log(props.data);

  return (
    <p>{props.data}</p>
    // <TableContainer>
    //   <Table variant="simple">
    //     <TableCaption>Imperial to metric conversion factors</TableCaption>

    //     <Thead>
    //       <Tr>
    //         {Object.keys(props.data.AllUsers[0]).map((key, index) => (
    //           //   <p>{key}</p>
    //           <Th key={index + key}>{key}</Th>
    //         ))}
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       {props.data.AllUsers.map(
    //         (user: string, index: number) => (
    //           <Tr>
    //             {Object.values(user).map((value) => (
    //               <>{value}</>
    //             ))}
    //           </Tr>
    //         )
    //         // return <Td key={index}>{value}</Td>;
    //       )}
    //     </Tbody>
    //     {/* <Tfoot>

    //     </Tfoot> */}
    //   </Table>
    // </TableContainer>
  );
}
