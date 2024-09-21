import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BuyProduct() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("UseEffect triggered");
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searched = products?.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Component rendering", search);

  return (
    <div className=" mx-auto px-4 py-8 bg-gray-800 text-white min-h-screen">
        <div className="container mx-auto px-4 py-8 bg-gray-800 text-white min-h-screen">

        
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>
      <input
        placeholder="Search"
        type="search"
        className="border border-gray-700 bg-gray-600 text-white rounded-lg w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {searched.length === 0 ? (
        <p className="text-gray-400">No products found</p>
      ) : (
        searched.map((data) => (
          <Link key={data.id} to={`/product/${data.id}`}>
            <div className="flex items-center p-4  mb-6 bg-gray-700 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300">
              <img
                className="h-20 w-20 object-cover rounded-md"
                src={data.image}
                alt={data.title}
              />
              <div className="ml-4">
                <h1 className="text-lg font-semibold text-gray-200">
                    
                  <div className="flex">
                    <div className="p-1">
                    {data.id})
                    </div>
                    <div className="ml-2 border border-gray-600 rounded-lg p-1">
                    {data.title}
                    </div>
                  </div>
                   
                  
                </h1>
              </div>
            </div>
          </Link>
        ))
      )}
      </div>
    </div>
  );
}

export default BuyProduct;