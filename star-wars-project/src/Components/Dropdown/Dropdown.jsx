import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Dropdown.css";
import Button from "@mui/material/Button";

export default function Dropdown({
  data,
  updateRow,
  title,
  settitle,
  openingCrawl,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    settitle(event);

    const charEndpoint = data.filter((x) => x.title === event);
    updateRow(charEndpoint);
    openingCrawl(charEndpoint[0]?.opening_crawl);
  };

  return (
    <div className="con">
      <div
        id="basic-button"
        onClick={handleClick}
        className="selectMovie"
      >
        <Button
          style={{
            color: "black",
            fontWeight: "800",
            padding: "10px 100px",
            backgroundColor: "var(--main)",
          }}
          className="title"
        >
          {title}
        </Button>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(title)}
        style={{ left: "calc(50% - 130px)", top: "6px" }}
       
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            gap: "2px",
            minWidth: "220px",
            textAlign: "center",
          }}
        >
          {data.length !== 0 ? (
            <>
              {data.map((item, key) => {
                return (
                  <>
                    <MenuItem
                      style={{
                        width: "100%",
                        justifyContent: "flex-start",
                        padding: "10px",
                      }}
                      key={item.title}
                      onClick={() => handleClose(item.title)}
                    >
                      <span style={{ marginLeft: "10px" }}>{item.title}</span>
                    </MenuItem>
                  </>
                );
              })}
            </>
          ) : (
            <span>No data to display</span>
          )}
        </div>
      </Menu>
    </div>
  );
}
