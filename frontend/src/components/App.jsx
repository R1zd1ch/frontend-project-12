import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './Root';
import NotFound from './NotFound';
import LoginPage from './LoginPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
