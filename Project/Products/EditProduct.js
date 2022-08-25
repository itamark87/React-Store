import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import utils from '../Firebase and Utils/Utils';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


// Edit Product by ID Component for Administrators Use Only
function EditProductComp() {

  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [productCustomers, setProductCustomers] = useState([]);
  const [productPurchases, setProductPurchases] = useState([]);


  // Get product's data and all the customers who purchased it
  const getProductAndItsCustomers = async () =>
  {
    let tempProduct =  await utils.getProduct(params.id);
    tempProduct.id = params.id;
    let tempProductPurchases = await utils.getPurchasesByKey('productId', params.id);
    let customers = await utils.getCustomers();
    let tempProductCustomers = [];
    customers.forEach(cust => {
      let productCustomerPurchases = tempProductPurchases.filter(purch => purch.customerId === cust.id);
      if (productCustomerPurchases.length > 0) {
        let obj = {};
        obj.id = cust.id;
        obj.fname = cust.fname;
        obj.lname = cust.lname;
        tempProductCustomers.push(obj);
      }
    });
    setProductCustomers(tempProductCustomers);
    setProductPurchases(tempProductPurchases);
    setProduct(tempProduct);
  }


  // Get product's data and purchases on mount only
  // Router redirects backwards if no auth key is found
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');
    if (!authToken) {
      alert("You do not have necessary permissions!");
      navigate(-1);
    }
    getProductAndItsCustomers();
  }, []);


  // Remove product from db including all purchases associated with it
  const deleteProduct = async () => {
    await utils.deleteProduct(params.id);
    productPurchases.forEach(purch => utils.deletePurchase(purch.id));
  }


  return (
    <div className="App" style={{width: "600px", border: "solid"}}>
      <h3>Edit Product ID {params.id}</h3>
      {
        Object.keys(product).length === 0
        &&
        <h4>Loading...</h4>
      }
      Name: <input type="text" value={product.name} onChange={e => setProduct({...product, name: e.target.value})} disabled={Object.keys(product).length === 0} /> <br/>
      Price: <input type="text" value={product.price} onChange={e => setProduct({...product, price: +e.target.value})} disabled={Object.keys(product).length === 0} /> <br/>
      Quantity: <input type="text" value={product.quantity} onChange={e => setProduct({...product, quantity: +e.target.value})} disabled={Object.keys(product).length === 0} /> <br/>
      <input type="button" value="Update" disabled={Object.keys(product).length === 0} onClick={() => utils.updateProduct(product)} />
      <input type="button" value="Delete" disabled={Object.keys(product).length === 0} onClick={() => deleteProduct()} /> <br/> <br/>
      {
        productCustomers.length > 0 &&
        <div>Customers who bought this product:</div>
      }
      {
        Object.keys(product) > 0 && productCustomers.length === 0 &&
        <div>No one has bought this product yet</div>
      }
      <table border="1" width='600px'>
        {
            productCustomers.length > 0 && productCustomers.map(cust =>
            {
              return <thead key={cust.id}>
                <td><Link to={"/customer/" + cust.id}>{cust.fname} {cust.lname}</Link></td>
              </thead>
            })
        }
      </table>
      <br/><br/>
      <input type="button" value="Go Back" onClick={() => navigate(-1)} />
      <br/><br/>
    </div>);
}

export default EditProductComp;
