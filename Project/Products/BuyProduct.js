import { useState, useEffect } from 'react';
import utils from '../Firebase and Utils/Utils';


// A Child of "Customers"/"ProductCustomers" Component for Buying Products for a Given Customer
function BuyProductComp(props) {

  const [products, setProducts] = useState([]);
  const [chosenProduct, setChosenProduct] = useState(0);


  // Get all products data and set chosenProduct to be the first on that array
  const getProducts = async () => {
    let tempProducts = await utils.getProducts();
    setProducts(tempProducts); 
    setChosenProduct(tempProducts[0].id);
  }


  // Get all products data on mount only
  // Closes this component if no auth key is found
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (!authToken) {
      alert("You do not have necessary permissions!")
      props.callBack();
    }
    getProducts();
  }, []);


  return (
    <div className="App" style={ {width: "600px", border: "solid"}}>
      <h4>Buy Product for {props.customer.fname} {props.customer.lname}</h4>
      <select name="products" onChange={e => setChosenProduct(e.target.value)}>
        {
        products.map((prod) => {
          return <option value={prod.id} key={prod.id}>{prod.name} {prod.price}$</option>
        })
        }
      </select>
      <input type="button" value="Buy" onClick={() => utils.addPurchase(props.customer.id, chosenProduct)} disabled={chosenProduct === 0}/> <br/> <br/>
      <input type="button" value="Finish" onClick={() => props.callBack()}/><br/><br/>
    </div>);
}

export default BuyProductComp;
