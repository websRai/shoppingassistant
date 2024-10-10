import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import config from '../config';

const fetchProducts = async () => {
  const response = await fetch(`${config.apiUrl}/api/products`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ProductList: React.FC = () => {
  const { data: products, isLoading, error } = useQuery('products', fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {(error as Error).message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: any) => (
        <Link key={product.id} to={`/products/${product.id}`} className="block">
          <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">{product.description.substring(0, 100)}...</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;