import React, { useState } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";
import { useNavigate } from "react-router-dom";

export const Login:React.FC = () => {
  const navigate = useNavigate()
  const { setAuthenticated } = useAppContext();
  const [isLoading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      try {
        await Auth.signIn(values.email, values.password);
        alert("Logged in");
        navigate("/");
        setAuthenticated(true);
      } catch (error) {
        setLoading(false);
        console.log("error signing in", error);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <div className="login">
      <div className="form">
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="email"
              className="email"
            >
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
              <Form.Control
                type="password"
                {...getFieldProps("password")}
              />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </Form.Group>

            <Button type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};
