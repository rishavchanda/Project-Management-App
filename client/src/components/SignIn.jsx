import {
  Block,
  CloseRounded,
  EmailRounded,
  Visibility,
  VisibilityOff,
  PasswordRounded,
  TroubleshootRounded,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IconButton, Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { openSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import validator from "validator";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { signIn,googleSignIn } from "../api/index";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 360px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 16px 28px;
`;
const OutlinedBox = styled.div`
  height: 44px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.soft2};
  color: ${({ theme }) => theme.soft2};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
    background: ${theme.soft};
    color:'${theme.soft2}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0px 14px;
`;
const GoogleIcon = styled.img`
  width: 22px;
`;
const Divider = styled.div`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.soft};
  font-size: 14px;
  font-weight: 600;
`;
const Line = styled.div`
  width: 80px;
  height: 1px;
  border-radius: 10px;
  margin: 0px 10px;
  background-color: ${({ theme }) => theme.soft};
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2};
  margin: 20px 20px 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  margin: 2px 26px 8px 26px;
  display: block;
  ${({ error, theme }) =>
    error === "" &&
    `    display: none;
    `}
`;

const SignIn = ({ setSignInOpen, setSignUpOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (email !== "") validateEmail();
    if (validator.isEmail(email) && password.length > 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!disabled) {
      dispatch(loginStart());
      setDisabled(true);
      setLoading(true);
      try {
        signIn({ email, password }).then((res) => {
          if (res.status === 200) {
            dispatch(loginSuccess(res.data));
            setLoading(false);
            setDisabled(false);
            setSignInOpen(false);
            dispatch(
              openSnackbar({
                message: "Logged In Successfully",
                severity: "success",
              })
            );
          } else if (res.status === 203) {
            dispatch(loginFailure());
            setLoading(false);
            setDisabled(false);
            setcredentialError(res.data.message);
            dispatch(
              openSnackbar({
                message: "Account Not Verified",
                severity: "error",
              })
            );
          } else {
            dispatch(loginFailure());
            setLoading(false);
            setDisabled(false);
            setcredentialError(`Invalid Credentials : ${res.data.message}`);
          }
        });
      } catch (err) {
        dispatch(loginFailure());
        setLoading(false);
        setDisabled(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      }
    }
    if (email === "" || password === "") {
      dispatch(
        openSnackbar({
          message: "Please fill all the fields",
          severity: "error",
        })
      );
    }
  };

  const [emailError, setEmailError] = useState("");
  const [credentialError, setcredentialError] = useState("");

  const validateEmail = () => {
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter a valid Email Id!");
    }
  };

  //Google SignIn
  const handleGoogleLogin = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        googleSignIn({
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        }).then((res) => {
            if (res.status === 200) {
              dispatch(loginSuccess(res.data));
              setSignInOpen(false);
              dispatch(
                openSnackbar({
                  message: "Logged In Successfully",
                  severity: "success",
                })
              );
            } else {
              dispatch(loginFailure(res.data));
              dispatch(
                openSnackbar({
                  message: res.data.message,
                  severity: "error",
                })
              );
            }
          });
      })
      .catch((err) => {
        dispatch(loginFailure());
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  // setSignUpOpen(false)
  return (
    <Modal open={true} onClose={() => setSignInOpen(false)}>
      <Container>
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "24px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => setSignInOpen(false)}
          />
          <Title>Sign In</Title>
          <OutlinedBox
            googleButton={TroubleshootRounded}
            style={{ margin: "24px" }}
            onClick={handleGoogleLogin}
          >
            <GoogleIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png?20210618182606" />
            Sign In with Google
          </OutlinedBox>
          <Divider>
            <Line />
            or
            <Line />
          </Divider>
          <OutlinedBox style={{ marginTop: "24px" }}>
            <EmailRounded
              sx={{ fontSize: "20px" }}
              style={{ paddingRight: "12px" }}
            />
            <TextInput
              placeholder="Email Id"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </OutlinedBox>
          <Error error={emailError}>{emailError}</Error>
          <OutlinedBox>
            <PasswordRounded
              sx={{ fontSize: "20px" }}
              style={{ paddingRight: "12px" }}
            />
            <TextInput
              placeholder="Password"
              type={values.showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton
              color="inherit"
              onClick={() =>
                setValues({ ...values, showPassword: !values.showPassword })
              }
            >
              {values.showPassword ? (
                <Visibility sx={{ fontSize: "20px" }} />
              ) : (
                <VisibilityOff sx={{ fontSize: "20px" }} />
              )}
            </IconButton>
          </OutlinedBox>
          <Error error={credentialError}>{credentialError}</Error>
          <OutlinedBox
            button={true}
            activeButton={!disabled}
            style={{ marginTop: "6px" }}
            onClick={handleLogin}
          >
            {Loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Sign In"
            )}
          </OutlinedBox>
          <LoginText>
            Don't have an account ?
            <Span
              onClick={() => {
                setSignUpOpen(true);
                setSignInOpen(false);
              }}
              style={{
                fontWeight: "500",
                marginLeft: "6px",
                cursor: "pointer",
              }}
            >
              Create Account
            </Span>
          </LoginText>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default SignIn;
