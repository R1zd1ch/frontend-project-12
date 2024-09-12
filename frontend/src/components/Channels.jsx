import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import ChannelButton from './ChannelButton';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { open } from '../slices/modalSlice';

// prettier-ignore
const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  const handleOpenAdd = () => {
    dispatch(open({ type: 'add' }));
  };

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button variant="" className="p-0 text-primary btn-group-vertical" onClick={handleOpenAdd}>
          <PlusSquare size={20} title="+" />
        </Button>
      </div>
      <Nav
        as="ul"
        variant="pills"
        fill
        className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
        id="channels-box"
      >
        {channels
          && channels.map(({ id, name, removable }) => (
            <ChannelButton key={id} id={id} name={name} removable={removable} />
          ))}
      </Nav>
    </Col>
  );
};

export default Channels;
