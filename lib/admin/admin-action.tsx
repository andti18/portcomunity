"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductType } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const approveProductAction = async (productId: ProductType["id"]) => {
    console.log("Approved", productId);

    try {
        await db
        .update(products)
        .set({ status: "approved" })
        .where(eq(products.id, productId))
        
        revalidatePath("/admin");

        return {
            success: true,
            message: "Product approved successfully",
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to approve product"
        }
    }

}

export const rejectProductAction = async (productId: ProductType["id"]) => {
    try {
        await db
        .update(products)
        .set({ status: "rejected" })
        .where(eq(products.id, productId))
        
        revalidatePath("/admin");

        return {
            success: true,
            message: "Product rejected successfully",
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to reject product"
        }
    }
}