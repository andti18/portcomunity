import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";

export type FormState = {
    success: boolean;
    errors?: {
        name?: string[];
        slug?: string[];
        description?: string[];
        tagline?: string[];
        website?: string[];
        tags?: string[];
    };
    message: string;
};

export type ProductType = InferSelectModel<typeof products>;