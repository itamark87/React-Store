import firebase from './firebaseApp';


const getProducts = async () => {
  let data = await firebase.firestore().collection('products').get();
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

const getCustomers = async () => {
  let data = await firebase.firestore().collection('customers').get();
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

const getPurchases = async () => {
  let data = await firebase.firestore().collection('purchases').get();
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
  const data = await firebase.firestore().collection('purchases').where(key, '==', id).get();
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

const getProduct = async (productId) =>
{
  let doc = await firebase.firestore().collection('products').doc(productId).get();
  let obj = {...doc.data()};
  return obj;
}

const updateProduct = async (product) =>
{
  await firebase.firestore().collection('products').doc(product.id).set(product);  
  alert('Product Updated!');
}

const deleteProduct = async (productId) =>
{
  await firebase.firestore().collection('products').doc(productId).delete() ;
  alert('Product Removed!');
}

const getCustomer = async (customerId) =>
{
  let doc =  await firebase.firestore().collection('customers').doc(customerId).get();
  let obj = {...doc.data()};
  return obj;
}

const updateCustomer = async (customer) =>
{
  await firebase.firestore().collection('customers').doc(customer.id).set(customer);  
  alert('Customer Updated!');
}

const deleteCustomer = async (customerId) =>
{
  await firebase.firestore().collection('customers').doc(customerId).delete();
  alert('Customer Removed!');
}

const deletePurchase = async (purchaseId) =>
{
  await firebase.firestore().collection('purchases').doc(purchaseId).delete();
}

// Could also be named "buyProduct"
const addPurchase = async (customerId, productId) => {
  let firebaseTime = firebase.firestore.Timestamp.now();
  let obj = {customerId: customerId, productId: productId, date: firebaseTime};
  await firebase.firestore().collection('purchases').add(obj);
  alert('Product was purchasd!');
}

export default {getProducts, getCustomers, getPurchases, getProduct, getPurchasesByKey, updateProduct, deleteProduct, deletePurchase, getCustomer, deleteCustomer, updateCustomer, addPurchase};