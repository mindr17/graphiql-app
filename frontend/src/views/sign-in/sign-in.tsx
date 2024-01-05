import { protectFromAuthorized } from '@/helpers/auth/protect-from-authorized';

import LoginForm from '../../components/login-form/login-form';

const Signin = async (): Promise<JSX.Element> => {
  await protectFromAuthorized();

  return <LoginForm />;
};

export default Signin;
