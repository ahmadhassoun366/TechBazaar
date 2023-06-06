import React, { useState, useEffect, useContext } from 'react'
// import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../AuthContext';

const Products = () => {

  // const { token } = useContext(AuthProvider);

  let [products, setProdcuts] = useState([])
  const [userId, setUserId] = useState('');
  const { isAuthenticated } = useContext(AuthContext);


  useEffect(() => {
    getProducts()
    // Retrieve the token from localStorage or wherever you have stored it
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user_id; // Assuming the user ID is stored in the 'user_id' claim
      console.log('User ID:', userId);
      // Use the user ID as needed
      localStorage.setItem('userId', userId);

    }

  }, [])

  let getProducts = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/products/', {
      method: 'GET'
    })
    let data = await response.json()

    if (response.status === 200) {
      setProdcuts(data)
    } else if (response.statusText === 'Unauthorized') {
      // logoutUser()
    }
  }

  const addToCart = async (productId,) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      console.log('User: ' + userId);
      console.log('Product: ' + productId); 
      console.log('Token: ' + token);    
      const user= userId
      const product = productId
      const response = await fetch('http://127.0.0.1:8000/api/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
      
        body: JSON.stringify({ user, product }),
      });

      if (response.status === 201) {
        console.log('Product added to cart successfully!');
        alert('Product added successfully!');
        // Perform any additional actions after adding to cart
      } else if (response.status === 401) {
        // Unauthorized, handle logout
        // logoutUser();
      } else {
        console.error('Error adding product to cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };


  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    addToCart(product.id, token, userId);
  };





  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-lg w-3/4 rounded-lg overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full  object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-500">Date: {product.date}</p> 
            {isAuthenticated && (
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-6"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
    
    )
}

export default Products