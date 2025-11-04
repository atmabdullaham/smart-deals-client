import { Suspense } from "react";
import LatestProducts from "../components/LatestProducts";

const Home = () => {
  const latestProductsPromise = fetch(
    "http://localhost:3000/latest-products"
  ).then((res) => res.json());
  return (
    <div className="text-secondary">
      <Suspense fallback={"/loading..."}>
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
