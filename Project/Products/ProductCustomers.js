import {Link} from 'react-router-dom';
import { useState } from 'react';
import BuyProductComp from './BuyProduct';


// This component displays the customers and their details for a given product
function ProductCustomersComp(props) {

  const [buyingCustomer, setBuyingCustomer] = useState({});


  return (
    <div className="App" style={ {width: "600px", border: "solid"}}>
      <table border="1" width='600px'>
        {
          props.customersData.map(customer =>
            {
              return <thead key={customer.id}>
                <td><Link to={"/customer/" + customer.id}>{customer.fname} {customer.lname}</Link></td>
                <td>{customer.dates.map(pDate => {
                  return <div>
                    {pDate.toDate().toLocaleDateString('en-US')}
                    </div>
                })
                }</td>                
                <td><input type="button" value="Add" onClick={() => setBuyingCustomer(customer)}/></td>
              </thead>
            })
        }
      </table>  
      {
        Object.keys(buyingCustomer).length > 0 && 
        <BuyProductComp customer={buyingCustomer} key={buyingCustomer.id} callBack={() => setBuyingCustomer({})}/>
      }
    </div>);
}

export default ProductCustomersComp;
