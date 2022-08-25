import {Routes, Route, useNavigate} from 'react-router-dom';
import CustomersComp from './Customers/Customers';
import EditCustomerComp from './Customers/EditCustomer';
import EditProductComp from './Products/EditProduct';
import ProductsComp from './Products/Products';
import PurhcasesComp from './Purchases/Purchases';
import LoginPageComp from './LoginPage';
import MenuComp from './Menu';
import { useEffect } from 'react';


// This is the Main Component from which all the Routes are Configured
function MainPageComp() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
}, [])

  return (
    <div className="App" style={ {width: "600px"} }>
      <h1>Store Management System</h1>
      <Routes>
        <Route path="/login" element={ <LoginPageComp />  } />  
        <Route path="/menu" element={ <MenuComp />  } />  
        <Route path="/products" element={ <ProductsComp />  } />
        <Route path="/customers" element={ <CustomersComp />  } />
        <Route path="/purchases" element={ <PurhcasesComp />  } />
        <Route path="/product/:id" element={ <EditProductComp />  } />
        <Route path="/customer/:id" element={ <EditCustomerComp />  } />
      </Routes>
    </div>
  );
}

export default MainPageComp;
