import useProducts from "./useProducts";
import Spinner from "../../UI/Spinner";
import ProductCard from "./ProductCard";

const Products = () => {
  const { isLoading, products } = useProducts();
  
  
  if (isLoading) return <Spinner />;
  
  if (!products || !products.data || products.data.length === 0)
    return <p className="text-center text-gray-500">No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:space-y-5  justify-items-center gap-2 max-h-auto mb-[100px]">
      {products.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
