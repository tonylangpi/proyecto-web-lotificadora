import dynamic from 'next/dynamic';
import Spin from '../../components/Cargando';
const LogCard = dynamic(() => import('../../components/Login'), { ssr: false, loading: () => <Spin/> })
const Login = () => {

  return (
    <>
    <LogCard/>
    </>
  );
};

export default Login;
