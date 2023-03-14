import { QueryClient, dehydrate, useQuery } from "react-query";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Container } from "reactstrap";
import { fetchFakeProducts } from "@/lib/fetcher";
import { IProduct } from "../store";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("products", fetchFakeProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Tables = () => {
  const {
    data: values,
    isLoading,
    refetch,
    error,
  } = useQuery<IProduct[] | undefined>({
    queryKey: ["products"],
    queryFn: () => fetchFakeProducts(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    //initialData: products,
    //enabled: false,
  });

  const columnsMUI: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "price", headerName: "Price", type: "number", width: 90 },
  ];

  //const values = useMemo(() => [data], []);
  const data = React.useMemo(() => values, []);

  //const columns = React.useMemo(() => [data?.map((product) => Header: "test", accessor: "")], []);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Title",
        accessor: "title", // accessor is the "key" in the data
      },
      {
        Header: "Category",
        accessor: "category", // accessor is the "key" in the data
      },
      {
        Header: "Price",
        accessor: "price", // accessor is the "key" in the data
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Container>
      <Container style={{ height: 400, width: "100%", marginTop: "5%" }}>
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </Container>
      <Container style={{ height: 500, width: "100%", marginTop: "5%" }}>
        {data && (
          <DataGrid
            rows={values}
            columns={columnsMUI}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        )}
      </Container>
    </Container>
  );
};

export default Tables;
