import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom";


// Login Component for Administrator Login. Shows Only When No Auth Key is Found
function LoginPageComp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  // Auto fill administrator credential (AVAILABLE IN TEST VERSION ONLY)
  const fillCredentials = (key) => {
    setEmail(key + "@" + key + ".com");
    setPassword("123456");
  }
  

  // Administrator credentials check and login using Firebase Authentification methods
  // Save Auth Token using session storage
  const loginUser = () => {
    signInWithEmailAndPassword(getAuth(), email, password).then((response) => {
      navigate('/menu');
      sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
    })
  }


  // Check for Auth Token on mount and redirect to menu page if it is found
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      navigate('/menu');
    }
  }, []);


  return (
    <div className="App" style={ {width: "600px"} }>
      <h2>Login as Adminstrator</h2>
      * Logging in as an administrator gives access to editing the data *<br/>
      * Guests do not need username/password and have view only permissions *<br/> <br/>
      <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} /> <br/>
      <input type="text" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} /> <br/>
      <input type="button" value="Admin Login" onClick={() => loginUser()} />
      <input type="button" value="Guest Login" onClick={() => navigate('/menu')} /> <br/><br/>
      This is a test version. Click below to auto fill credetials for administrator access:
      <div onClick={() => fillCredentials('admin')} style={{cursor:'pointer', color:'red'}}>Admin Credetials</div>
    </div>
  );
}

export default LoginPageComp;
