"use client";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { FormField } from "../forms/form-field";
import { Button } from "../ui/button";
import { addProductAction } from "@/lib/products/product-action";
import { useActionState } from "react";
import { FormState } from "@/types";
import { cn } from "@/lib/utils";

const initialState: FormState = {
    success: false,
    errors: undefined,
    message: "",
};

export default function ProductSubmitForm() {
    const [state, formAction, isPending] = useActionState(
        addProductAction, 
        initialState
    );

    const { errors, message, success } = state;
    
    return (
        <form className="space-y-6" action={formAction}>
            {message && (
                <div className={cn(
                    "p-4 rounded-lg border", 
                    success
                    ? "bg-primary/10 border-primary text-primary" 
                    : "bg-destructive/10 border-destructive text-destructive")}
                    role="alert"
                    aria-live="polite"
                    >
                    {message}
                </div>
            )}
            <FormField
                label="Product Name"
                name="name"
                id="name"
                placeholder="Enter product name"
                required
                onChange={() => {}}
                error={errors?.name}
                helpertext=""
            />
            <FormField
                label="Slug"
                name="slug"
                id="slug"
                placeholder="Enter product slug"
                required
                onChange={() => {}}
                error={errors?.slug}
                helpertext="URL-Friendly version of your product name"
            />
            <FormField
                label="Description"
                name="description"
                id="description"
                placeholder="Enter product description"
                required
                onChange={() => {}}
                error={errors?.description}
                textarea
            />
            <FormField
                label="Tagline"
                name="tagline"
                id="tagline"
                placeholder="Enter product tagline"
                required
                onChange={() => {}}
                error={errors?.tagline}
                helpertext=""
            />
            <FormField
                label="Website URL"
                name="websiteUrl"
                id="websiteUrl"
                placeholder="https://example.com"
                required
                onChange={() => {}}
                error={errors?.website}
                helpertext="Enter your product's web or landing page"
            />
            <FormField
                label="Tags"
                name="tags"
                id="tags"
                placeholder="AI, Productivity, Design"
                required
                onChange={() => {}}
                error={errors?.tags}
                helpertext="Enter tags separated by commas"
            />

            <Button className="w-full" size="lg" type="submit">
                {isPending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                ) : (
                    <>
                        <SparklesIcon className="size-4" />
                        Submit Product
                    </>
                )}

            </Button>
        </form>
    )
}