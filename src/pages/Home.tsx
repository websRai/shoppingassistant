import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Personal Shopping Assistant</h1>
      <p className="text-xl mb-8">Find the best products tailored to your needs and budget.</p>
      <Link to="/products" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Start Shopping
      </Link>
    </div>
  );
};

export default Home;