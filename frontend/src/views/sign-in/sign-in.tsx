import { protectPageFrom } from '@/helpers/auth/protect-page-from';

import LoginForm from '../../components/login-form/login-form';

const Signin = async (): Promise<JSX.Element> => {
  await protectPageFrom('authorized');

  return <LoginForm />;
};

export default Signin;
