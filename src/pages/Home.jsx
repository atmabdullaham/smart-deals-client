import { Suspense } from "react";
import Hero from "../components/Hero";
import LatestProducts from "../components/LatestProducts";

const Home = () => {
  const latestProductsPromise = fetch(
    "http://localhost:3000/latest-products",
  ).then((res) => res.json());
  return (
    <div>
      <Hero />
      <div className="text-secondary">
        <Suspense fallback={"/loading..."}>
          <LatestProducts
            latestProductsPromise={latestProductsPromise}
          ></LatestProducts>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
