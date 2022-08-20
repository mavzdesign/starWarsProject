import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import "./StarWars.css";
import logo from "../../asset/logo.png";
import Tables from "../Table/Table";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import swal from "sweetalert";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function StarWars() {
  const endpoint = "https://swapi.dev/api/";

  const [allMovies, setallMovies] = useState([]);
  const [rows, setrows] = useState([]);
  const [storerows, setstorerows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [showTable, setshowTable] = React.useState(false);
  const [filterValue, setfilterValue] = React.useState("Filter by Gender");
  const [title, settitle] = useState("Star Wars Movies");
  const [openingCrawl, setopeningCrawl] = useState("");

  useEffect(() => {
    setOpen(!open);
    axios
      .get(`${endpoint}films/`, {
        headers: {
          Authorization: "",
        },
      })
      .then((res) => {
        const sortmovies = res?.data?.results.sort(
          (a, b) => b.release_date - a.release_date
        );

        setallMovies(sortmovies);
        setOpen(false);
      })
      .catch(() => {
        setOpen(false);

        swal({
          title: "An error occurred!",
          text: "Ensure your internet connectity is on",
          icon: "error",
          button: false,
        });
      });
  }, []);
  function createData(name, gender, height) {
    return {
      name,
      gender,
      height,
    };
  }

  const updateRow = (data) => {
    if (data.length !== 0) {
      setOpen(!open);

      const endpoint = data[0]?.characters;
      const newRow = [];

      for (let index = 0; index < endpoint.length; index++) {
        const element = endpoint[index];

        axios
          .get(element, {
            headers: {
              Authorization: "",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              newRow.push(
                createData(res?.data.name, res?.data.gender, res?.data.height)
              );
            }
          })
          .catch(() => {
            setOpen(!open);
            swal({
              title: "An error occurred!",
              text: "Ensure your internet connectity is on",
              icon: "error",
              button: false,
            });
          });
      }

      setTimeout(() => {
        setrows(newRow);
        setshowTable(true);
        setOpen(false);
        setstorerows(newRow);
      }, 5000);
    }
  };
  const updateTitle = (data) => {
    settitle(data);
  };
  const rest = () => {
    settitle("Star Wars Movies");
    setrows([]);
    setshowTable(false);
    setstorerows([]);
  };
  const updateCrawl = (crawl) => {
    setopeningCrawl(crawl);
  };

  const handleSelect = (event) => {
    if (event.target.value === "all") {
      setrows(storerows);
      // setshowTable(true);
    } else {
      setrows(storerows.filter((x) => x.gender === event.target.value));
    }
  };

  const FilterDrop = () => {
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            input={<OutlinedInput />}
            value={filterValue}
            renderValue={(selected) => {
              return selected;
            }}
            label="filterByGender"
            onChange={handleSelect}
            style={{
              backgroundColor: "var(--main)",
              color: "black",
              border: "none",
            }}
          >
            <MenuItem value="all">All </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="hermaphrodite">Hermaphrodite</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="top_logo">
        {" "}
        <img src={logo} alt="" onClick={rest} />{" "}
      </div>

      <Dropdown
        data={allMovies}
        openingCrawl={updateCrawl}
        rows={rows}
        updateRow={updateRow}
        title={title}
        settitle={updateTitle}
      />

      <section className="project_main">
        {showTable ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px 0px",
              }}
            >
              <marquee
                scrolldelay="200"
                width="50%"
                height="200"
                direction="up"
                className="marquee"
              >
                {openingCrawl}
              </marquee>
            </div>

            <div className="table_and_Filter">
              <FilterDrop />
              <Tables rows={rows} />
            </div>
          </>
        ) : (
          <img src={logo} alt="" />
        )}
      </section>
    </>
  );
}
