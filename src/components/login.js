import { Button, TextField, Box } from "@mui/material";
import home from "../components/home";
import React from "react";
import "../css/login.css";
import image from "../assets/back.jpg";
import logo from "../assets/logo1.jpg";

const Login = (props) => {
  const [login, toLog] = React.useState(false);
  const [username, SetUsername] = React.useState("");
  const [password, SetPassword] = React.useState("");

  const loginTo = (event) => {
    event.preventDefault();
    if (username === "test" && password === "test123") {
      toLog(true);
      console.log("submitted");
      props.changeState(true);
    } else {
      alert("Username or Password is Wrong...!");
    }
  };

  return (
    <Box
      sx={{
        // backgroundImage: `url(${image})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        height: 720,
        width: 1280,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "0.5rem",
        }}
      >
        <center>
        <div className="fontname">
        <div
              style={{
                backgroundImage: `url(${logo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                height: 100,
                width: 100,
              }}
            ></div>
          Weather App
        </div>
        </center>
        <form onSubmit={loginTo} className="al">
          <table className="tbl">
            <tbody>
              <tr className="spaceUnder">
                <td className="td"
                style={{color:"black"}}>Enter Username</td>
                <td>
                  <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => {
                      SetUsername(e.target.value);
                    }}
                  />
                </td>
              </tr>
              
              <tr className="spaceUnder">
                <td className="td"
                style={{color:"black"}}>Enter password</td>
                <td>
                  <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => {
                      SetPassword(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Box mt={1} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                <center>
              <Button
                size="large"
                fullWidth={true}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </center>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
