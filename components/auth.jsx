import authStyle from '../styles/auth.js';

const Auth = () => {
  return (
    <div className='auth'>
      <h1>CHEFY</h1>
      <a href="/auth/login">Login with Codechef</a>
      <style jsx>{ authStyle }</style>
    </div>
  );
}

export default Auth;
