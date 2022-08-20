import React from "react";
import "./Table.css";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

export default function Tables({ rows }) {
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "gender",
      numeric: false,
      disablePadding: false,
      label: "Gender",
    },
    {
      id: "heights",
      numeric: false,
      disablePadding: false,
      label: "Heights",
    },
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "center"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            color: "var(--bgcolor)",
            backgroundColor: "var(--main)",
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          align="center"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="center">
                          {row?.gender.charAt(0).toUpperCase() +
                            row?.gender.slice(1)}
                        </TableCell>
                        <TableCell align="center">{row.height}</TableCell>
                      </TableRow>
                    );
                  })}
                <TableRow>
                  <TableCell />
                  <TableCell>Total Number of characters</TableCell>
                  <TableCell align="left">
                    {
                      rows?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )?.length
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell>Sum of Heights</TableCell>
                  <TableCell align="left">
                    {/* Sum of heights in cm */}
                    <span>
                      {rows
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((x) => parseInt(x.height))
                        .filter((element) => typeof element === "number")
                        .reduce((sum, i) => sum + i, 0)}
                      cm
                    </span>
                    {/* Sum of heights in ft and in */}
                    <span>
                      {" "}
                      (
                      {(
                        rows
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((x) => parseInt(x.height))
                          .filter((element) => typeof element === "number")
                          .reduce((sum, i) => sum + i, 0) / 30.48
                      ).toFixed(2)}
                      ft /
                      {(
                        rows
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((x) => parseInt(x.height))
                          .filter((element) => typeof element === "number")
                          .reduce((sum, i) => sum + i, 0) / 2.54
                      ).toFixed(2)}
                      in)
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
