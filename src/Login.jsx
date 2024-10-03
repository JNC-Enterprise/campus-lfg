import './Login.css'

function Login() {
  return(
    <div className="input-container">
      <div className="login-form">
        <div>
          <label className="login-label">USERNAME </label>
          <input className="login-input" type="text"></input>
        </div>
        <div >
          <label className="login-label">PASSWORD </label>
          <input className="login-input" type="password"></input>
        </div>
      </div>
    </div>
  );
  
}


export default Login