import { useState, useEffect } from 'react';
import ProductComp from './Product';
import ProductsTotalComp from './ProductsTotal';
import utils from '../Firebase and Utils/Utils';
import { useNavigate } from "react-router-dom";
import { db } from '../Firebase and Utils/firebaseApp';
import { collection, query, onSnapshot } from "firebase/firestore";


// Main Component of Products Department
function ProductsComp() {

  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const navigate = useNavigate();


  // Get all products data and the customers who purchased each product with date of purchase
  const getProductsAndHistory = async () => {
    let customers = await utils.getCustomers();
    let tempPurchases = await utils.getPurchases();
    let tempProducts = await utils.getProducts();
    tempProducts.forEach(prod => {
      prod.customers = [];
      let productPurchases = tempPurchases.filter(purch => purch.productId === prod.id);
      customers.forEach(cust => {
        let productCustomerPurchases = productPurchases.filter(purch => purch.customerId === cust.id);
        if (productCustomerPurchases.length > 0) {
          let obj = {};
          obj.id = cust.id;
          obj.fname = cust.fname;
          obj.lname = cust.lname;
          obj.dates = productCustomerPurchases.map(purch => purch.date);
          prod.customers.push(obj);
        }
      });
    });
    setProducts(tempProducts);
    setPurchases(tempPurchases);
  }


  // Get all products data and purchases on mount and within every purchase made
  useEffect(() => {
    getProductsAndHistory();
    const q = query(collection(db, "purchases"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {getProductsAndHistory()});
  }, []);


  return (
    <div className="App" style={ {width: "600px", border: "solid"}}>
      <h3>Products Page</h3>

      {
        products.length > 0 && <ProductsTotalComp products={products} purchases={purchases} />
      }
      {
        products.map(prod =>
          {
            return <ProductComp product={prod} key={prod.id} />
          })
      }
    <br/><br/>
    <input type="button" value="Back to Menu" onClick={() => navigate('/menu')} />
    <br/><br/>
    </div>);
}

export default ProductsComp;
