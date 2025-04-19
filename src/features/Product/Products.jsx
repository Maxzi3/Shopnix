import useProducts from "./useProducts";
import Spinner from "../../UI/Spinner";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams();
const { isLoading, products } = useProducts();
const product = products?.data || [];

const searchTerm = searchParams.get("search")?.toLowerCase() || "";
const categoryFilter = searchParams.get("category") || "all";

const filteredProducts = product.filter((product) => {
  const matchesSearch = product.name.toLowerCase().includes(searchTerm);
  const matchesCategory =
    categoryFilter === "all" || product.category === categoryFilter;

  return matchesSearch && matchesCategory;
});

if (isLoading) return <Spinner />;

if (!filteredProducts.length)
  return <p className="text-center text-gray-500">No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:space-y-5 justify-items-center gap-2 max-h-auto mb-[100px]">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
