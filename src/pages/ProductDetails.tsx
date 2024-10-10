import React from 'react';
import { useQuery, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import config from '../config';

const fetchProduct = async (id: string) => {
  const response = await fetch(`${config.apiUrl}/api/products/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const addToWishlist = async (productId: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${config.apiUrl}/api/users/1/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok) {
    throw new Error('Failed to add to wishlist');
  }
  return response.json();
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery(['product', id], () => fetchProduct(id!));

  const wishlistMutation = useMutation(addToWishlist);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {(error as Error).message}</div>;

  const handleAddToWishlist = () => {
    wishlistMutation.mutate(id!);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button
            onClick={handleAddToWishlist}
            className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
          >
            <Heart className="mr-2" /> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;