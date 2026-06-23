
import FeaturedProducts from "@/components/landing-page/featured-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import ProductSkeleton from "@/components/products/product-skeleton";
import { getApprovedProductCount, getUserCount } from "@/lib/products/product-select";
import { Suspense } from "react";

async function HeroSectionWrapper() {
    const productCount = await getApprovedProductCount();
    const userCount = await getUserCount();
    return <HeroSection productCount={productCount} userCount={userCount} />;
}

export default async function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading count data...</div>}>
        <HeroSectionWrapper />
      </Suspense>
      
      <FeaturedProducts />

      <Suspense fallback={<ProductSkeleton />}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}
