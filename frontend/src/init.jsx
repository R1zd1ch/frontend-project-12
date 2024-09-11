import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './components/App';
import resources from './locales/index.js';
import store from './slices';
import AuthProvider from './providers/AuthProvider';
import ChatProvider from './providers/ChatProvider';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const socket = io('/', { autoConnect: false });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AuthProvider>
          <ChatProvider socket={socket}>
            <App />
          </ChatProvider>
        </AuthProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default init;
