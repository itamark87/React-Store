import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import utils from '../Firebase and Utils/Utils';
import {Link} from 'react-router-dom';


function EditCustomerComp() {

  const params = useParams();

  const [customer, setCustomer] = useState({});
  const [customerProducts, setCustomerProducts] = useState([]);
  const [customerPurchases, setCustomerPurchases] = useState([]);


  // Get customer's data and all the products he/she purchased with dates
  const getCustomerAndItsProducts = async () =>
  {
    let tempCustomer = await utils.getCustomer(params.id);
    tempCustomer.id = params.id;
    let tempCustomerPurchases = await utils.getPurchasesByKey('customerId', params.id);
    let products = await utils.getProducts();
    let tempCustomerProducts = [];
    products.forEach(prod => {
      let customerProductPurchases = tempCustomerPurchases.filter(purch => purch.productId === prod.id);
      if (customerProductPurchases.length > 0) {
        let obj = {};
        obj.id = prod.id;
        obj.name = prod.name;
        tempCustomerProducts.push(obj);
      }
    });
    setCustomerProducts(tempCustomerProducts);
    setCustomerPurchases(tempCustomerPurchases);
    setCustomer(tempCustomer);
  }


  // Get customer's data and purchases on mount only
  useEffect(() => {
    getCustomerAndItsProducts();
  }, []);

  
  // Remove customer from db including all purchases associated with her/him
  const deleteCustomer = async () => {
    await utils.deleteCustomer(params.id);
    customerPurchases.forEach(purch => utils.deletePurchase(purch.id));
  }

  return (
    <div className="App" style={{width: "600px", border: "solid"}}>
      <h3>Edit Customer ID {params.id}</h3>
      {
        Object.keys(customer).length === 0
        &&
        <h4>Loading...</h4>
      }
      First Name: <input type="text" value={customer.fname} onChange={e => setCustomer({...customer, fname: e.target.value})} disabled={Object.keys(customer).length === 0} /> <br/>
      Last Name: <input type="text" value={customer.lname} onChange={e => setCustomer({...customer, lname: e.target.value})} disabled={Object.keys(customer).length === 0} /> 
      <br/>
      City: <input type="text" value={customer.city} onChange={e => setCustomer({...customer, city: e.target.value})} disabled={Object.keys(customer).length === 0} /> 
      <br/>
      <input type="button" value="Update" disabled={Object.keys(customer).length === 0} onClick={() => utils.updateCustomer(customer)} />
      <input type="button" value="Delete" disabled={Object.keys(customer).length === 0} onClick={() => deleteCustomer()} /> <br/> <br/>
      {
        customerProducts.length > 0 &&
        <div>Products this customer has bought:</div>
      }
      {
        Object.keys(customer) > 0 && customerProducts.length === 0 &&
        <div>This customer hasn't bought anything yet</div>
      }
      <table border="1" width='600px'>
        {
            customerProducts.length > 0 && customerProducts.map(prod =>
            {
              return <thead key={prod.id}>
                <td><Link to={"/product/" + prod.id}>{prod.name}</Link></td>
              </thead>
            })
        }
      </table>
    </div>);
}

export default EditCustomerComp;
