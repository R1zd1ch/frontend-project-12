import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Button, Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import ChannelButton from './ChannelButton';
import channelsSelectors from '../selectors/channelsSelectors';
import { open } from '../slices/modalSlice';

// prettier-ignore
const Channels = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  const handleOpenAdd = () => {
    dispatch(open({ type: 'add' }));
  };

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button variant="" className="p-0 text-primary btn-group-vertical" onClick={handleOpenAdd}>
          <PlusSquare size={20} />
          <span className="visually-hidden">{t('channels.plus')}</span>
        </Button>
      </div>
      <Nav
        as="ul"
        variant="pills"
        fill
        className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
        id="channels-box"
      >
        {channels.map(({ id, name, removable }) => (
          <ChannelButton key={id} id={id} name={name} removable={removable} />
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
