import { FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import LoadingButton from "./LoadingButton";
import { IProfile } from "../types";
import userService from "../servers/userService";
import { useAppContext } from "../lib/context/contextLib";

const Profile: React.FC = () => {
  const {authUser} = useAppContext();
  const [isLoading, setLoading] = useState<boolean>(false);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    birthDate: Yup.date().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    phoneNumber: Yup.number().required("Required"),
    mobileNumber: Yup.number().required("Required"),
  });

  const initialValues: IProfile = {
    firstName: "",
    lastName: "",
    username: "",
    birthDate: "",
    country: "",
    state: "",
    phoneNumber: 0,
    mobileNumber: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ProfileSchema,
    onSubmit: async (values: IProfile) => {
      setLoading(true);
      try {
        const newUser = await userService.createUserService({userId: "1223", ...values});
        console.log(newUser);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <div>
      <div className="row">
        <h3>Profile</h3>
      </div>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} className="row">
          <Form.Group controlId="firstName" className="col-12 col-sm-6">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              {...getFieldProps("firstName")}
            />
            {errors.firstName && touched.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
          </Form.Group>

          <Form.Group controlId="lastName" className="col-12 col-sm-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" {...getFieldProps("lastName")} />
            {errors.lastName && touched.lastName && (
              <div className="error">{errors.lastName}</div>
            )}
          </Form.Group>

          <Form.Group controlId="username" className="col-12 col-sm-6">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" {...getFieldProps("username")} />
            {errors.username && touched.username && (
              <div className="error">{errors.username}</div>
            )}
          </Form.Group>

          <Form.Group controlId="email" className="col-12 col-sm-6">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" disabled value={authUser.email} />
          </Form.Group>

          <Form.Group controlId="birthDate" className="col-12 col-sm-6">
            <Form.Label>BirthDate</Form.Label>
            <Form.Control type="date" {...getFieldProps("birthDate")} />
            {errors.birthDate && touched.birthDate && (
              <div className="error">{errors.birthDate}</div>
            )}
          </Form.Group>

          <Form.Group controlId="country" className="col-12 col-sm-6">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" {...getFieldProps("country")} />
            {errors.country && touched.country && (
              <div className="error">{errors.country}</div>
            )}
          </Form.Group>

          <Form.Group controlId="state" className="col-12 col-sm-6">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" {...getFieldProps("state")} />
            {errors.state && touched.state && (
              <div className="error">{errors.state}</div>
            )}
          </Form.Group>

          <Form.Group controlId="phoneNumber" className="col-12 col-sm-6">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="tel" {...getFieldProps("phoneNumber")} />
            {errors.phoneNumber && touched.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
            )}
          </Form.Group>

          <Form.Group controlId="mobileNumber" className="col-12 col-sm-6">
            <Form.Label>Mobile number</Form.Label>
            <Form.Control
              autoFocus
              type="tel"
              {...getFieldProps("mobileNumber")}
            />
            {errors.mobileNumber && touched.mobileNumber && (
              <div className="error">{errors.mobileNumber}</div>
            )}
          </Form.Group>

          <LoadingButton
            className="btn btn-success m-3"
            type="submit"
            isLoading={isLoading}
            disabled={false}
          >
            Sign up
          </LoadingButton>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Profile;
