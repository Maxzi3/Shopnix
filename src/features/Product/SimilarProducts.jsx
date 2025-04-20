import { Link, useSearchParams } from "react-router-dom";
import useProducts from "./useProducts";
import Spinner from "../../UI/Spinner";
import { PAGE_SIZE } from "../../UI/Constant";
import Pagination from "../../UI/Pagination";
import ProductCard from "./ProductCard";
import { formatCurrency } from "../../UI/helpers";

const SimilarProducts = ({ currentSlug, category }) => {
  const { isLoading, products } = useProducts();
  const productList = products?.data || [];

  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // Filter similar products
  const similarProducts = productList.filter(
    (product) => product.slug !== currentSlug && product.category === category
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * PAGE_SIZE;
  const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
  const currentProducts = similarProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (isLoading) return <Spinner />;
  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Similar Products</h2>

      <div className="grid gap-5 md:grid-cols-3">
        {currentProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product.slug}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-lg truncate">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-blue-600 font-bold text-lg">
                {formatCurrency(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Pagination count={similarProducts.length} />
      </div>
    </div>
  );
};

export default SimilarProducts;
