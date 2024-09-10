import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const MessagesForm = () => (
  <div className="mt-auto px-5 py-3">
    <Form noValidate className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control name="body" aria-label="Новое сообщение" className="border-0 p-0 ps-2" />
        <Button variant="" type="submit" className="btn-group-vertical" disabled>
          <ArrowRightSquare size={20} title="Отправить" />
        </Button>
      </InputGroup>
    </Form>
  </div>
);

export default MessagesForm;
