import {Link} from 'react-router-dom';


function MenuComp() {
  return (
    <div className="App" style={ {width: "600px", border: "solid"}}>
        <Link to="/Products">Products</Link><br/>
        <Link to="/Customers">Customers</Link><br/>
        <Link to="/Purchases">Purchases</Link><br/>
    </div>
  );
}

export default MenuComp;
