import PropTypes from 'prop-types';
import Timers from '../components/Timers';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBarAuth from '../components/NavBarAuth';
import Notepad from '../components/Notepad';

function ViewDirectorBasedOnUserAuthStatus({ component: Component, pageProps }) {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return <Loading />;
  }

  if (user) {
    return (
      <>
        <NavBarAuth />
        <Timers />
        <div className="main-container">
          <div className="side-panel">
            <Notepad />
          </div>
          <div className="content-container">
            <Component {...pageProps} />
          </div>
        </div>
      </>
    );
  }

  return <Signin />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
