import React, { useState } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import { useAppContext } from "../lib/context/contextLib";
import LoadingButton from "../components/LoadingButton";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthenticated, setAuthUser } = useAppContext();
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
      setLoading(true);
      try {
        const user = await Auth.signIn(values.email, values.password);
        setAuthUser({
          email: values.email,
          id: user?.username,
        });
        setAuthenticated(true);
        navigate("/");
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
        console.log("error signing in", error);
      }
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    isValid,
  } = formik;

  return (
    <div className="login">
      <div className="form">
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="email">
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

            <LoadingButton
              type="submit"
              className="mt-3"
              isLoading={isLoading}
              disabled={!isValid || isSubmitting}
            >
              Login
            </LoadingButton>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};
