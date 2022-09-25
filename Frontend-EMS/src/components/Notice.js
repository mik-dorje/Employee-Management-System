import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";

const Notice = () => {
  const randomNotices = `Concerns greatest margaret him absolute entrance. Door neat week do find past he. Be no surprise he honoured indulged.Unpacked endeavor six steepest had husbands her. Painted no or affixed it so civilly. Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four. Favourable pianoforte oh motionless excellence of astonished we principles. Warrant present garrets limited cordial in inquiry to. Supported me sweetness behaviour shameless excellent so arranging. Friendship contrasted solicitude insipidity in introduced literature it. He seemed denote except as oppose do spring my. Between any may mention evening age shortly can ability regular. Friendship contrasted solicitude insipidity in introduced literature it. He seemed denote except as oppose do spring my. 
`;

  const noticeList = randomNotices.split(".");
  noticeList.pop();
  const noticeElement = noticeList.map((notice) => (
    <li key={notice}>
      <span>{notice}</span>
    </li>
  ));

  return (
    <Paper
      variant="outlined"
      // elevation={3}
      sx={{
        p: 1,
        // minHeight: "40vh",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            height: "50px",
            background: "#bf8b59",
            borderRadius: "5px",
            display: "grid",
            placeContent: "center",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              Noticeboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper
          elevation={3}
          sx={{
            minHeight: "75vh",
            m: 1,
            p: 2,
          }}
        >
          {noticeElement}
        </Paper>
      </Box>
    </Paper>
  );
};

export default Notice;
