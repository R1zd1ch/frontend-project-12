// prettier-ignore
import {
  Nav,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../slices/channelsSlice';
import { open } from '../slices/modalSlice';

// prettier-ignore
const Removable = ({ id, name }) => {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.channels.currentChannelId);

  const handleOpenRemove = () => {
    const item = {
      id,
    };

    dispatch(open({ type: 'remove', item }));
  };
  const handleOpenRename = () => {
    const item = {
      id,
      name,
    };

    dispatch(open({ type: 'rename', item }));
  };

  return (
    <Dropdown as={ButtonGroup} className="d-flex" drop="down" align="end">
      <Button
        variant={id === currentId ? 'secondary' : ''}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => {
          dispatch(setCurrentChannelId(id));
        }}
      >
        <span className="me-1">#</span>
        {' '}
        {name}
      </Button>
      <Dropdown.Toggle split variant={id === currentId ? 'secondary' : ''} />
      <Dropdown.Menu>
        <Dropdown.Item as="button" onClick={handleOpenRemove}>
          Удалить
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleOpenRename}>
          Переименовать
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// prettier-ignore
const NonRemovable = ({ id, name }) => {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.channels.currentChannelId);

  return (
    <Button
      variant={id === currentId ? 'secondary' : ''}
      className="w-100 rounded-0 text-start"
      onClick={() => {
        dispatch(setCurrentChannelId(id));
      }}
    >
      <span className="me-1">#</span>
      {' '}
      {name}
    </Button>
  );
};

const ChannelButton = ({ id, name, removable }) => (
  <Nav.Item as="li" className="w-100">
    {removable ? <Removable id={id} name={name} /> : <NonRemovable id={id} name={name} />}
  </Nav.Item>
);

export default ChannelButton;
