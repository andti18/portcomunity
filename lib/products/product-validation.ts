import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(3, "Product name is at least 3 character.").max(120, "Product name must be less than 120 characters."),
    slug: z.string().min(3, "Slug must be at least 3 characters.").max(140, "Slug must be less than 140 characters.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)."),
    tagline: z.string().max(200, "Tagline must be less than 200 characters."),
    description: z.string().optional(),
    websiteUrl: z.string().min(1, "Website URL is required."),
    tags: z.string().min(1, "At least one tag is required.").transform((str) => str.split(",").map(tag => tag.trim().toLowerCase()))
});