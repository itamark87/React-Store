import {Link} from 'react-router-dom';
import ProductCustomersComp from './ProductCustomers';


// A Child of "Products" Component for Displaying each Product's Information
function ProductComp(props) {
  return (
    <div className="App" style={ {width: "600px", border: "solid"}}>
      <h3><Link to={"/product/" + props.product.id}>{props.product.name}</Link></h3>
      Price: {props.product.price} <br/>
      Quantity: {props.product.quantity} <br/> <br/>
      {
        props.product.customers.length > 0 && <ProductCustomersComp customersData={props.product.customers} />
      }
    </div>);
} 

export default ProductComp;
