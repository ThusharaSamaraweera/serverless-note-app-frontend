import { FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import noteService from "../servers/noteService";
import LoadingButton from "../components/LoadingButton";
import { useAppContext } from "../lib/context/contextLib";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewNote = () => {
  const navigate = useNavigate();
  const { authUser } = useAppContext();
  const [isLoading, setLoading] = useState<boolean>(false);

  const NewNoteSchema = Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .min(5, "Too Short!")
      .max(50, "Too Long!"),
    content: Yup.string().required("Required").max(250, "Too Long!"),
  });

  const initialValues = {
    title: "",
    content: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: NewNoteSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const newNote = await noteService.createNoteService({
          userId: authUser.id,
          ...values,
        });
        if (newNote.status === "success") {
          navigate("/");
        }
      } catch (error: any) {
        toast.error(error.message);
        console.log(error);
      }
      setLoading(false);
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <div className="create-new-note">
      <div className="mb-3">
        <h1>Create New Note</h1>
      </div>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="my-2">
            <Form.Label>Title</Form.Label>
            <Form.Control autoFocus type="text" {...getFieldProps("title")} />
            {errors.title && touched.title && (
              <div className="error">{errors.title}</div>
            )}
          </Form.Group>

          <Form.Group controlId="content" className="my-2">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              {...getFieldProps("content")}
            />
            {errors.content && touched.content && (
              <div className="error">{errors.content}</div>
            )}
          </Form.Group>

          <LoadingButton
            className="btn btn-success "
            type="submit"
            isLoading={isLoading}
            disabled={false}
          >
            Save
          </LoadingButton>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default NewNote;
