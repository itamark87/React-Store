import { useState, useEffect } from 'react';


// A Child of "Products" Component for Displaying Total Income of Store by Summing the Total Amounts of Purchased Products
function ProductsTotalComp(props) {

  const [payments, setPayments] = useState([]);


  // Put together an array with the price of the product of each purchase
  const getpayments = () => {
    let tempPayments = [];
    props.purchases.forEach(purch =>
      {
        let productId = purch.productId;
        let tempProd = props.products.filter(prod => prod.id === productId)[0];
        tempPayments.push(tempProd.price);
      });

    setPayments(tempPayments);  
  }


  // Initiate the purchases price array on mount and with every change in props
  useEffect(() => {
    getpayments();
  }, [props]);


  return (
    <div className="App" style={ {width: "600px", border: "solid"}}>
      Total Store Income: {payments.reduce((a, b) => a + b, 0)}
    </div>);
}

export default ProductsTotalComp;
