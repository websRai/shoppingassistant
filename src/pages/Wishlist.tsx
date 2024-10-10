import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import config from '../config';

const fetchWishlist = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${config.apiUrl}/api/users/1/wishlist`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Wishlist: React.FC = () => {
  const { data: wishlist, isLoading, error } = useQuery('wishlist', fetchWishlist);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item: any) => (
          <Link key={item.id} to={`/products/${item.product.id}`} className="block">
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
                <p className="text-gray-600 mb-2">${item.product.price.toFixed(2)}</p>
                <p className="text-gray-500 text-sm">{item.product.description.substring(0, 100)}...</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;