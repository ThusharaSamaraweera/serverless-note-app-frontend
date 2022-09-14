import { FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import LoadingButton from "../components/LoadingButton";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/context/contextLib";

const Signup = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState < any | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [confirmationPasswordError, setConfirmationPasswordError] =
    useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const { setAuthenticated } = useAppContext();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmationPassword: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmationPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values: any) => {
      if (values.password !== values.confirmationPassword) {
        setConfirmationPasswordError("Passwords do not match");
        return;
      }
      setConfirmationPasswordError("");
      console.log(values);
      setLoading(true);
      try {
        const newUser = await Auth.signUp({
          username: values.email,
          password: values.password
        });
        console.log(newUser);
        setNewUser(newUser);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    getFieldProps,
  } = formik;

  const renderForm = () => {
    return (
      <div className="form">
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                {...getFieldProps("email")}
              />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" {...getFieldProps("password")} />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                {...getFieldProps("confirmationPassword")}
              />
              {Boolean(confirmationPasswordError) && (
                <div className="error">{confirmationPasswordError}</div>
              )}
            </Form.Group>

            <LoadingButton
              className="btn btn-primary"
              type="submit"
              isLoading={isLoading}
              disabled={false}
            >
              Signup
            </LoadingButton>
          </Form>
        </FormikProvider>
      </div>
    );
  };

  const handleConfirmationSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    console.log(values)
    try {
      await Auth.confirmSignUp(values.email, confirmationCode);
      await Auth.signIn(values.email, values.password);
      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      setAuthenticated(false);
      setLoading(false);
      console.log(error);
    }
  };

  const renderConfirmationForm = () => {
    return (
      <div className="form">
        <Form onSubmit={handleConfirmationSubmit}>
          <Form.Group controlId="confirmationCode">
            <Form.Label>Confirmation Code</Form.Label>
            <Form.Control
              autoFocus
              type="tel"
              onChange={(e) => setConfirmationCode(e.target.value)}
              value={confirmationCode}
            />
            <Form.Text muted>Please check your email for the code.</Form.Text>
          </Form.Group>
          <LoadingButton
            type="submit"
            className="btn btn-success"
            isLoading={isLoading}
            disabled={false}
          >
            Verify
          </LoadingButton>
        </Form>
      </div>
    );
  };

  return (
    <div className="signup">{newUser === null ? renderForm() : renderConfirmationForm()}</div>
  );
};

export default Signup;
