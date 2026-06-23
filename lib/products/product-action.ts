"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { z } from "zod";
import { FormState } from "@/types";
import { sql } from "drizzle-orm/sql/sql";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

export const addProductAction = async (
    prevState: FormState | undefined,
    formData: FormData
): Promise<FormState> => {
    console.log(formData);
    //auth

    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            return {
                success: false,
                message: "Unauthorized.",
            }
        }

        if (!orgId) {
            return {
                success: false,
                message: "You must be a member of an organization to submit a product.",
                errors: undefined,
            }
        }

        //user email
        const user = await currentUser();
        const userEmail = user?.emailAddresses[0]?.emailAddress || "unknown";
        
        //data
        const rawFormData = Object.fromEntries(formData.entries());

        //validation
        const validatedData = productSchema.safeParse(rawFormData);
        
        if (!validatedData.success) {
            console.log(validatedData.error.flatten().fieldErrors);
            return {
                success: false,
                errors: validatedData.error.flatten().fieldErrors,
                message: "Invalid Data."
            }
        }

        const {name, slug, tagline, description, websiteUrl, tags} = validatedData.data;
        const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];
        
        //transform data
        await db.insert(products).values({
            name,
            slug,
            tagline,
            description,
            websiteUrl,
            tags: tagsArray,
            status: "pending",
            submittedBy: userEmail,
            organizationId: orgId,
            userId,
        });
        
        return {
            success: true,
            message: "Product added successfully.",
            errors: undefined,
        }
    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.flatten().fieldErrors,
                message: "Failed to add product."
            }
        }

        return {
            success: false,
            errors: undefined,
            message: "An unexpected error occurred."
        }
    }

}

export const upvoteProductAction = async (productId: number) => {
    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            console.log("user not logged in")
            return {
                success: false,
                message: "Unauthorized.",
            }
        }

        if (!orgId) {
            console.log("user not in org")
            return {
                success: false,
                message: "You must be a member of an organization to submit a product.",
            }
        }

        await db.update(products).set({
            voteCount: sql`GREATEST(0, vote_count + 1)`,
        })
        .where(eq(products.id, productId));
        
        revalidatePath("/"); // Refresh the page to show updated vote count
        return {
            success: true,
            message: "Product upvoted successfully.",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to upvote product.",
            voteCount: 0,
        }
    }
}

export const downvoteProductAction = async (productId: number) => {
    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            console.log("user not logged in")
            return {
                success: false,
                message: "Unauthorized.",
            }
        }

        if (!orgId) {
            console.log("user not in org")
            return {
                success: false,
                message: "You must be a member of an organization to submit a product.",
            }
        }

        await db.update(products).set({
            voteCount: sql`GREATEST(0, vote_count - 1)`,
        })
        .where(eq(products.id, productId));
        
        revalidatePath("/"); // Refresh the page to show updated vote count
        return {
            success: true,
            message: "Product downvoted successfully.",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to downvote product.",
            voteCount: 0,
        }
    }
}