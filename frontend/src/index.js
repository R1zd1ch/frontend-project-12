import './assets/application.scss';
import './index.css';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init());
};

app();
