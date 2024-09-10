import { Col } from 'react-bootstrap';

import MessagesHeader from './MessagesHeader';
import MessagesBox from './MessagesBox';
import MessagesForm from './MessagesForm';

const Messages = () => (
  <Col className="p-0 h-100">
    <div className="d-flex flex-column h-100">
      <MessagesHeader />
      <MessagesBox />
      <MessagesForm />
    </div>
  </Col>
);

export default Messages;
