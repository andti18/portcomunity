import{ db } from '@/db';
import { products } from '@/db/schema';
import { count, countDistinct, desc, eq } from "drizzle-orm";
import { connection } from 'next/dist/server/web/exports';

export async function getFeaturedProducts() {
    "use cache";
    const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
    return productsData;
}

export async function getAllApprovedProducts() {
    const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
    return productsData;
}

export async function getApprovedProductCount() {
    const [result] = await db
        .select({ count: count() })
        .from(products)
        .where(eq(products.status, "approved"));
    return result.count;
}

export async function getUserCount() {
    const [result] = await db
        .select({ count: countDistinct(products.userId) })
        .from(products);
    return result.count;
}

export async function getAllProducts() {
    "use cache";
    const productsData = await db
    .select()
    .from(products)
    .orderBy(desc(products.voteCount));
    return productsData;
}

export async function getRecentlyLaunchedProducts() {
    await connection(); 
    const productsData = getAllApprovedProducts();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return (await productsData).filter(
        (product) => 
            product.createdAt && 
            new Date(product.createdAt.toISOString()) >= 
            oneWeekAgo
        );
}

export async function getProductSlug(slug: string) {
    const product = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug));

    return product?.[0] ?? null;
}