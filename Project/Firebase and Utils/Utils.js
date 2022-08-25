import { db } from './firebaseApp';
import { collection, getDocs, doc, getDoc, setDoc, query, where, Timestamp, addDoc, deleteDoc } from "firebase/firestore";


// Get all products and their data
const getProducts = async () => {
  const data = await getDocs(collection(db, "products"));
  let prodData = [];
  data.forEach(doc =>
    {
      let obj = { 
                  id : doc.id,
                  name : doc.data().name,
                  price : doc.data().price,
                  quantity : doc.data().quantity
                };

      prodData.push(obj);
    });

    return prodData;
}

// Get all customers and their data
const getCustomers = async () => {
  const data = await getDocs(collection(db, "customers"));
  let customersData = [];
  data.forEach(doc =>
    {
      let obj = { 
                  id : doc.id,
                  fname : doc.data().fname,
                  lname : doc.data().lname,
                  city : doc.data().city,
                  products: [],
                  dates: []
                };

      customersData.push(obj);
    });

    return customersData;
}

// Get all purchases and their data
const getPurchases = async () => {
  const data = await getDocs(collection(db, "purchases"));
  let purchasesData = [];
  data.forEach(doc =>
    {
      let obj = { 
                  id : doc.id,
                  customerId : doc.data().customerId,
                  productId : doc.data().productId,
                  date : doc.data().date
                };

      purchasesData.push(obj);
    });

  return purchasesData;
}

// Get all purchases associated with a specific customer or a specific product, depending on key
const getPurchasesByKey = async (key, id) => {
  const q = query(collection(db, "purchases"), where(key, '==', id));
  const data = await getDocs(q);
  let purchasesByKey = [];
  data.forEach(doc =>
    {
      let obj = { 
                  id : doc.id,
                  customerId : doc.data().customerId,
                  productId : doc.data().productId,
                  date : doc.data().date
                };

      purchasesByKey.push(obj);
    });

  return purchasesByKey;
}

// Get product's data by ID
const getProduct = async (productId) =>
{
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);
  let obj = {...docSnap.data()};
  return obj;
}

// Update product with the given payload
const updateProduct = async (product) =>
{
  await setDoc(doc(db, "products", product.id), product);
  alert('Product Updated!');
}

// Delete product by ID
const deleteProduct = async (productId) =>
{
  await deleteDoc(doc(db, "products", productId));
  alert('Product Removed!');
}

// Get customer's data by ID
const getCustomer = async (customerId) =>
{
  const docRef = doc(db, "customers", customerId);
  const docSnap = await getDoc(docRef);
  let obj = {...docSnap.data()};
  return obj;
}

// Update customer with the given payload
const updateCustomer = async (customer) =>
{
  await setDoc(doc(db, "customers", customer.id), customer);
  alert('Customer Updated!');
}

// Delete customer by ID
const deleteCustomer = async (customerId) =>
{
  await deleteDoc(doc(db, "customers", customerId));
  alert('Customer Removed!');
}

// Delete purchase by ID
const deletePurchase = async (purchaseId) =>
{
  await deleteDoc(doc(db, "purchases", purchaseId));
}

// Add a new document to purchases collection
// Could also be named "buyProduct"
const addPurchase = async (customerId, productId) => {
  let firebaseTime = Timestamp.now();
  let obj = {customerId: customerId, productId: productId, date: firebaseTime};
  const docRef = await addDoc(collection(db, "purchases"), obj);
  alert('Product was purchasd!');
}

export default {getProducts, getCustomers, getPurchases, getProduct, getPurchasesByKey, updateProduct, deleteProduct, deletePurchase, getCustomer, deleteCustomer, updateCustomer, addPurchase};