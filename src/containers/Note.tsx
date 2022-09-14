import React, { useEffect, useState } from "react";
import * as Yup from "yup";

// services
import noteService from "../servers/noteService";

// context
import { useAppContext } from "../lib/context/contextLib";

// types
import { INote } from "../types";
import { useParams } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import LoadingButton from "../components/LoadingButton";
import { Form } from "react-bootstrap";

const Note = () => {
  const { id } = useParams();
  const { authUser } = useAppContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [note, setNote] = useState<INote>({
    userId: "",
    noteId: "",
    title: "",
    content: "",
    createdAt: "",
    modifiedAt: "",
  });

  const getNote = async () => {
    if (!id) {
      return;
    }

    setLoading(true);
    try {
      const note = await noteService.getNoteService(id, authUser.id);
      if (note.status === "success") {
        setNote(note.data);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNote();
  }, [id]);

  const NewNoteSchema = Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .min(5, "Too Short!")
      .max(50, "Too Long!"),
    content: Yup.string().required("Required").max(250, "Too Long!"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: note,
    validationSchema: NewNoteSchema,
    onSubmit: async (values) => {
      setLoading(true);

      setLoading(false);
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;


  return (
    <div>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="my-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              {...getFieldProps("title")}
              disabled={isLoading}
            />
            {errors.title && touched.title && (
              <div className="error">{errors.title}</div>
            )}
          </Form.Group>

          <Form.Group controlId="content" className="my-2">
            <Form.Label>Content</Form.Label>
            <Form.Control
              disabled={isLoading}
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
            disabled={isLoading}
          >
            Update
          </LoadingButton>

          <LoadingButton
            className="btn btn-danger"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Delete
          </LoadingButton>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Note;
