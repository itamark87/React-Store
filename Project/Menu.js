import {Link, useNavigate} from 'react-router-dom';


// Menu Page Component for Navigation between Store's Departments
function MenuComp() {

  const navigate = useNavigate();

  // Remove administrator's Auth Token and redirect back to Login Page
  const logOut = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  }

  return (
    <div className="App" style={ {width: "600px", border: "solid"}}>
        <br/><Link to="/Products"><h3>Products</h3></Link>
        <Link to="/Customers"><h3>Customers</h3></Link>
        <Link to="/Purchases"><h3>Purchases</h3></Link><br/>
        <input type="button" value="Log Out" onClick={() => logOut()} /><br/><br/>
    </div>
  );
}

export default MenuComp;
