import {
  AppBar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Chart from "react-apexcharts";
import { barData } from "./staticData";

import AdminImg from "../../images/admin.jpg";
import UserImg from "../../images/user.png";

const USERS_URL = "/users";

const Dashboard = () => {
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get(USERS_URL);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

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
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/*Start Main Dashboard */}
        <Paper
          elevation={3}
          sx={{
            minHeight: "76vh",
            m: 1,
            p: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            // background: "linear-gradient(120deg, #B8C6DB,#F5F7fA)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{}}>
              <Chart
                options={barData.options}
                series={barData.series}
                type="bar"
                width="500"
                height="255"
              />
            </Box>
            <Chart
              options={barData.options}
              series={barData.series}
              type="line"
              width="500"
              height="255"
            />
          </Box>

          {/* card section */}
          <Box sx={{ display: "flex", gap: 1, p: 2 }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Card sx={{ p: 1, boxShadow: 3, minHeight: "300" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="80"
                      image={AdminImg}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="div">
                        Admin Card
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "justify" }}
                      >
                        A system administrator, or sysadmin, or admin is a
                        person who is responsible for the upkeep, configuration.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ p: 1, boxShadow: 3, minHeight: "300" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="80"
                      image={UserImg}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="div">
                        User Card
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "justify" }}
                      >
                        A user is a person who utilizes a computer · A user
                        often has a user account and is identified to the
                        system.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ p: 1, boxShadow: 3, minHeight: "300" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="80"
                      image={AdminImg}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="div">
                        Admin Card
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "justify" }}
                      >
                        A system administrator, or sysadmin, or admin is a
                        person who is responsible for the upkeep, configuration.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ p: 1, boxShadow: 3, minHeight: "300" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="80"
                      image={UserImg}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="div">
                        User Card
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "justify" }}
                      >
                        A user is a person who utilizes a computer · A user
                        often has a user account and is identified to the
                        system.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        {/* End Main Dashboard */}
      </Box>
    </Paper>
  );
};

export default Dashboard;
