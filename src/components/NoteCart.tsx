import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

type NoteCartProps = {
  noteId: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
}

const NoteCart:React.FC<NoteCartProps> = (props) => {
  const { noteId, title, createdAt, modifiedAt } = props;
  
  return (
    <LinkContainer key={noteId} to={`/notes/${noteId}`} className="py-3">
      <ListGroup.Item action>
        <span className="font-weight-bold">
          {title.trim().split("\n")[0]}
        </span>
        <br />
        <div className="row">
          <div className="text-muted col-12 col-sm-6">
            Created: {new Date(createdAt).toLocaleString()}
          </div>
          <span className="text-muted col-12 col-sm-6">
            updated: {new Date(modifiedAt).toLocaleString()}
          </span>
        </div>
      </ListGroup.Item>
    </LinkContainer>
  );
}

export default NoteCart