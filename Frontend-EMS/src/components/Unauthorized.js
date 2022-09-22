import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";

const Unauthorized = () => {
  return (
    <Paper
      variant="outlined"
      // elevation={3}
      sx={{
        p: 2,
        minHeight: "90vh",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            background: "#bf8b59",
            borderRadius: "5px",
            textAlign: "center",
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
              Access Denied
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper
          elevation={3}
          sx={{
            minHeight: "76vh",
            m: 1,
            p: 3,
            display: "grid",
            placeContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#bf8b59" }}>
            No Authorization
          </Typography>
        </Paper>
      </Box>
    </Paper>
  );
};

export default Unauthorized;
