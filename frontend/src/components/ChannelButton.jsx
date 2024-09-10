import { Nav, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../slices/channelsSlice';

const Removable = ({ id, name }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <Dropdown as={ButtonGroup} drop="down" align="end">
      <Button
        variant={id === currentChannelId ? 'secondary' : ''}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => {
          dispatch(setCurrentChannelId(id));
        }}
      >
        <span className="me-1">#</span> {name}
      </Button>
      <Dropdown.Toggle split variant={id === currentChannelId ? 'secondary' : ''} />
      <Dropdown.Menu>
        <Dropdown.Item as="button">Удалить</Dropdown.Item>
        <Dropdown.Item as="button">Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const NonRemovable = ({ id, name }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <Button
      variant={id === currentChannelId ? 'secondary' : ''}
      className="w-100 rounded-0 text-start"
      onClick={() => {
        dispatch(setCurrentChannelId(id));
      }}
    >
      <span className="me-1">#</span> {name}
    </Button>
  );
};

const ChannelButton = ({ id, name, removable }) => {
  <Nav.Item as="li" className="w-100">
    {removable ? <Removable id={id} name={name} /> : <NonRemovable id={id} name={name} />}
  </Nav.Item>;
};

export default ChannelButton;
