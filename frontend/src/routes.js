const apiPath = '/api/v1';
const routes = {
  chatPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
  loginApi: () => `${apiPath}/login`,
  signupApi: () => `${apiPath}/signup`,
  dataApi: () => `${apiPath}/data`,
};
export default routes;
