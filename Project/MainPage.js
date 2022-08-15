import {Routes, Route} from 'react-router-dom';
import CustomersComp from './Customers/Customers';
import EditCustomerComp from './Customers/EditCustomer';
import EditProductComp from './Products/EditProduct';
import MenuComp from "./Menu";
import ProductsComp from './Products/Products';
import PurhcasesComp from './Purchases/Purchases';


// This is the main component from which all the routes are configured
function MainPageComp() {
  return (
    <div className="App" style={ {width: "600px"} }>
      <h1>Store Management System</h1>
      <MenuComp />
      <Routes>
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
