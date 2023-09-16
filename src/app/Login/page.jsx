import dynamic from 'next/dynamic';
import loading from '../../components/Cargando'
const LogCard = dynamic(() => import('../../components/Login'), { ssr: false, loading: () => <loading/> })
const Login = () => {

  return (
    <>
    <LogCard/>
    </>
  );
};

export default Login;
