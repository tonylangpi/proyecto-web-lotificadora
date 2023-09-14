import dynamic from 'next/dynamic';
const LogCard = dynamic(() => import('../../components/Login'), { ssr: false, loading: () => <h1>Cargando...</h1> })
const Login = () => {

  return (
    <>
    <LogCard/>
    </>
  );
};

export default Login;
