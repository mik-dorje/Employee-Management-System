import {
  AppBar,
  Box,
  Button,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

import laptopImg from "../images/laptop.png";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);

  return (
    <div>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          minHeight: "90vh",
        }}
      >
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
              Home
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            // background: "blue",
            mt: 2,
            p: 1,
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Box
            sx={{
              flex: { xs: 0.5, md: 0.6 },
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                bgcolor: "#bf8b59",
                color: "white",
                borderRadius: 5,
                p: 0.8,
                alignSelf: "start",
                boxShadow: 3,
              }}
            >
              Welcome {auth.user} !!
            </Typography>
            <Typography
              variant="h7"
              sx={{ mt: { xs: 6, md: 7 }, textAlign: "justify" }}
            >
              Home pages are located in the root directory of the website. Many
              home pages act as a virtual directory for a site — they provide
              top-level menus where visitors can go deeper into various areas of
              the site. For instance, a typical website has a homepage with menu
              items like “about,” “contact,” “products,” “services,” “press” or
              “news.” In addition, the home page often serves to orient visitors
              by providing titles, headlines and images and visuals that show
              what the website is about, and in some cases, who owns it and
              maintains it. One of the best examples is the average business
              website, which has the business name in a prominent place, and
              often features the logo, while also showing pictures related to
              that business, for instance, who works there, what the business
              produces.
            </Typography>
            <Stack
              direction="row"
              spacing={5}
              sx={{
                mt: { xs: 6, md: 7 },
              }}
            >
              <Button
                variant="outlined"
                startIcon={<SendIcon />}
                sx={{
                  border: "none",
                  outline: "3px solid #bf8b59",
                  color: " #bf8b59",
                  width: "120px",

                  "&:hover": {
                    border: "none",
                    backgroundColor: " #bf8b59",
                    color: "white",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                Hire
              </Button>
              <Button
                variant="outlined"
                endIcon={<DeleteIcon />}
                sx={{
                  border: "none",
                  outline: "3px solid #bf8b59",
                  color: " #bf8b59",
                  width: "120px",

                  "&:hover": {
                    border: "none",
                    backgroundColor: " #bf8b59",
                    color: "white",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                Remove
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              flex: { xs: 0.5, md: 0.4 },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={laptopImg} alt="laptop" width="100%" />
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default Home;
