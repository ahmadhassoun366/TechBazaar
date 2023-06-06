import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../AuthContext';



const Cart = () => {

    const { isAuthenticated } = useContext(AuthContext);
    const [productData, setProductData] = useState({});
    let [carts, setCarts] = useState([])

useEffect(() => {
  if (isAuthenticated) {
    getCarts()
  }
    // Retrieve the token from localStorage or wherever you have stored it
    const userId = localStorage.getItem('userId');
    console.log("printing user id for fetching: "+ userId)
  }, [isAuthenticated])

  let getCarts = async () => {
    const userId = localStorage.getItem('userId');
    console.log("printing user id again for fetching: " + userId);
    
    let response = await fetch(`http://127.0.0.1:8000/api/mycart/${userId}/`, {
      method: 'GET'
    });
    
    let data = await response.json();
  
    if (response.status === 200) {
      const productIds = data.map((cart) => cart.product);
      const productDataResponse = await fetch(`http://127.0.0.1:8000/api/products/`);
      const productData = await productDataResponse.json();
      console.log(productData);

      productData.forEach((product) => {
        console.log(product.id);
      });

      const productNamesMap = {};
      productData.forEach((product) => {
        productNamesMap[product.id] = {
          title: product.title,
          image: product.image
        };
      });
      console.log(productNamesMap);
      
      const updatedCarts = data.map((cart) => ({
        ...cart,
        title: productNamesMap[cart.product]?.title || 'Unknown Product',
        imageName: productNamesMap[cart.product]?.image || ''
      }));

      setCarts(updatedCarts); // Update the carts with product names
    } else if (response.statusText === 'Unauthorized') {
      // logoutUser()
    }
  };

  const deleteCart = async (cartId) => {
    try {
        console.log("printing cart")
        console.log(cartId)

      const response = await fetch(`http://127.0.0.1:8000/api/cart/${cartId}/`, {
        method: 'DELETE',
        
      });

      if (response.status === 204) {
        console.log('Product deleted successfully!');
        alert('Product deleted successfully!');
        setCarts(carts.filter((cart) => cart.id !== cartId));
        
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  const handleOrder = async () => {
    const email = prompt('Enter your email to confirm the order:');
    const location = prompt('Enter your location:');

    try {
      await fetch('http://127.0.0.1:8000/api/send_order_email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, location }),
      });

      console.log('Order placed successfully!');
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
    {carts.map((cart) => (
      <div key={cart.id} className="bg-white shadow-lg w-3/4 rounded-lg overflow-hidden">
        <div className="p-6">
        {cart.imageName && (
        <img
          src={cart.imageName}
          alt={cart.productName}
          className="w-full  object-cover"
                  />
  )}
        <p className="text-gray-900 text-xl">Product: {cart.title}</p>
        
          <p className="text-gray-600 mb-4">User ID:{cart.user}</p>
          <div className="flex justify-center items-center gap-20">
          <button            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-lg mt-6"
            onClick={() => handleOrder()}
            >
            Order
          </button>
          <button
            onClick={() => deleteCart(cart.id)}
            className="bg-red-500 hover:bg-red-600  text-white py-2 px-8 rounded-lg mt-6"
          >
            Delete
          </button>

          </div>
          
        </div>
      </div>
    ))}
  </div>  )
}

export default Cart