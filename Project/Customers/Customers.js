import { useState, useEffect } from 'react';
import BuyProductComp from '../Products/BuyProduct';
import utils from '../Firebase and Utils/Utils';
import {Link} from 'react-router-dom';


function CustomersComp() {

  const [customers, setCustomers] = useState([]);
  const [buyingCustomer, setBuyingCustomer] = useState({});

  // Get all customers data and all the products purchased by each customer with date of purchase
  const getCustomersAndHistory = async () => {
    let products = await utils.getProducts();
    let purchases = await utils.getPurchases();
    let tempCustomers = await utils.getCustomers();
    tempCustomers.forEach(cust => {
      let costomerPurchases = purchases.filter(purch => purch.customerId === cust.id);
      cust.products = [];
      cust.dates = costomerPurchases.map(purch => purch.date);
      products.forEach(prod => {
        let customerProductPurchases = costomerPurchases.filter(purch => purch.productId === prod.id);
        if (customerProductPurchases.length > 0) {
          let obj = {};
          obj.id = prod.id;
          obj.name = prod.name;
          cust.products.push(obj);
        }
      });
    });
    setCustomers(tempCustomers);
  }

  // Get all customers data and purchases on mount only
  useEffect(() => {
    getCustomersAndHistory();
  }, []);


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h3>Customers Page</h3>
      <table border="1" width='600px'>
        {
          customers.length > 0 && customers.map(cust =>
            {
              return <thead key={cust.id}>
                <td><Link to={"/customer/" + cust.id}>{cust.fname} {cust.lname}</Link></td>
                <td>{cust.city}</td>
                <td>{cust.products.map(prod => {
                  return <div>
                    <Link to={"/product/" + prod.id}>{prod.name}</Link>
                    </div>
                })
                }</td>
                <td>{cust.dates.map(pDate => {
                  return <div key={pDate}>
                    {pDate.toDate().toLocaleDateString('en-US')}
                    </div>
                })
                }</td>
                <td><input type="button" value="Buy a Product" onClick={() => setBuyingCustomer(cust)}/></td>
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

export default CustomersComp;
