import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import leoProfanity from 'leo-profanity';

import App from './components/App';
import resources from './locales/index.js';
import store from './slices';

import AuthProvider from './providers/AuthProvider';
import ChatProvider from './providers/ChatProvider';
import routes from './routes.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'testenv',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const profanityRu = leoProfanity.getDictionary('ru');
  leoProfanity.add(profanityRu);

  const socket = io(routes.chatPage(), { autoConnect: false });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary errorMessage="Error in React render">
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <ChatProvider socket={socket}>
                <App />
              </ChatProvider>
            </AuthProvider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
