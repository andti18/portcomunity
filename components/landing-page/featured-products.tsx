"use cache";
import SectionHeader from "../common/section-header";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import ProductCard from "../products/product-card";
import { getFeaturedProducts } from "../../lib/products/product-select";

export default async function FeaturedProducts() {
    const featuredProducts = await getFeaturedProducts();
    return (
        <section className="py-20 bg-muted/20">
            <div className="wrapper">
                <div className="flex items-center justify-between mb-8">
                    <SectionHeader 
                    title="Featured Products" 
                    icon={StarIcon} 
                    description="Discover our most popular products" />
                    <Button variant="outline" asChild className="hiden sm:flex"><Link href="/explore">View All <ArrowUpRightIcon className="size-4"></ArrowUpRightIcon></Link></Button>
                </div>
                <div className="grid-wrapper">
                    {featuredProducts.map((product) => <ProductCard key={product.id} product=
                    {product} />)}
                </div>
            </div>
        </section>
    );
}
