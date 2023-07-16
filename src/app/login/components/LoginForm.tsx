"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

//services
import { login } from "../../services/login";

const LoginForm = function LoginForm() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { push } = useRouter();
  const [error, setError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const req = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    login(req).then((response: any) => {
      if (
        response &&
        response.validUser &&
        response.validUser[0] &&
        response.validUser[0].u_ut_id === 1
      ) {
        push("/admin/dashboard");
      } else if (
        response &&
        response.validUser &&
        response.validUser[0] &&
        response.validUser[0].u_ut_id === 2
      ) {
        push("/");
      } else {
        setError(true);
      }
    });
  };

  const handleRegister = () => {
    push("/register");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                inputRef={emailRef}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
              {/* {loginStore.error && (
              <Error>Not sign in. Please check your credentials</Error>
            )} */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button onClick={() => handleRegister()}>
                {"Don't have an account? Sign Up"}
              </Button>
            </Box>
          </Box>
          {error && (
            <Alert severity="error">
              Not sign in. Please check your credentials
            </Alert>
          )}
        </Container>
      )}
    </>
  );
};

export default LoginForm;
