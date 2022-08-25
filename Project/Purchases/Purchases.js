import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import utils from '../Firebase and Utils/Utils';
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


// Main Component of Purchases for Displaying and Searching Within all Purchases Made in Store
function PurhcasesComp() {
  
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  
  const [shownPurchases, setShownPurchases] = useState([]);
  
  const [search, setSearch] = useState({productId: '', customerId: '', date: ''});
  
  const navigate = useNavigate();


  // Get all purchases data from db
  const getPurchases = async () => {
    let tempPurchases = await utils.getPurchases();
    setPurchases(tempPurchases);  
  }

  // Get all customers data from db
  const getCustomers = async () => {
    let tempCustomers = await utils.getCustomers();
    setCustomers(tempCustomers);  
  }

  // Get all products data form db
  const getProducts = async () => {
    let tempProducts =  await utils.getProducts();
    setProducts(tempProducts);  
  }


  // Get all the data on mount only
  useEffect(() => {
    getCustomers();
    getProducts();
    getPurchases();
  }, []);


  // This function starts with a temporary array of all the purchases and is reduced by the user's chosen filters
  const doSearch = () => {
    let tempPurchases = purchases;
    if (search.date !== '') {
      const start = new Date(search.date);
      var day = 60 * 60 * 24 * 1000;
      const end = new Date(start.getTime() + day);
      const timestampStart = Timestamp.fromDate(start);
      const timestampEnd = Timestamp.fromDate(end);
      tempPurchases = tempPurchases.filter(purch => purch.date >= timestampStart && purch.date < timestampEnd);
    }
    if (search.customerId !== '') {
      tempPurchases = tempPurchases.filter(purch => purch.customerId === search.customerId);
    }
    if (search.productId !== '') {
      tempPurchases = tempPurchases.filter(purch => purch.productId === search.productId);
    }
    tempPurchases.map(purch => {
      let tempCust = customers.filter(cust => cust.id === purch.customerId)[0];
      let tempProd = products.filter(prod => prod.id === purch.productId)[0];
      purch.fname = tempCust.fname;
      purch.lname = tempCust.lname;
      purch.prodName = tempProd.name;
    })
    setShownPurchases(tempPurchases);
  }


  return (
    <div className="App" style={ {width: "600px", border: "solid"}}>
      <h3>Purchases Page</h3>
      Search by Product:  
      <select name="products" defaultValue={0} onChange={e => setSearch({...search, productId: e.target.value})}>
        <option value={''}>All Products</option>
        {
        products.length > 0 && products.map((prod) => {
          return <option value={prod.id} key={prod.id}>{prod.name}</option>
        })
        }
      </select> <br/>
      Search by Customer: 
      <select name="customers" onChange={e => setSearch({...search, customerId: e.target.value})}>
      <option value={''}>All Customers</option>
      {
      customers.length > 0 && customers.map((cust) => {
        return <option value={cust.id} key={cust.id}>{cust.fname} {cust.lname}</option>
      })
      }
      </select> <br/>
      Search by Date: 
      <input type="text" placeholder="yyyy-mm-dd" onChange={e => setSearch({...search, date: e.target.value})}/> <br/> <br/>
      <input type="button" value="Search" onClick={() => doSearch()}/> <br/> <br/>
      <table border="1" width='600px'>
      {
        shownPurchases.length > 0 && shownPurchases.map(purch =>
          {
            return <thead key={purch.id}>
              <td><Link to={"/customer/" + purch.customerId}>{purch.fname} {purch.lname}</Link></td>
              <td><Link to={"/product/" + purch.productId}>{purch.prodName}</Link></td>
              <td>{String(purch.date.toDate().toLocaleDateString('en-US'))}</td>
            </thead>
          })
      }
      </table> 
      <br/><br/>
      <input type="button" value="Back to Menu" onClick={() => navigate('/menu')} />
      <br/><br/>
    </div>
  );
}

export default PurhcasesComp;