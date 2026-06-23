import { SparklesIcon } from "lucide-react";
import SectionHeader from "../../components/common/section-header";
import ProductSubmitForm from "../../components/products/product-submit-form"; 
export default function SubmitPage() {
    return (
        <section className="py-20">
            <div className="wrapper">
                <div className="mb-12">
                    <SectionHeader 
                        title="Submit Your Product"
                        icon={SparklesIcon}
                        description="Share your innovative product with the world and get valuable feedback from our community. Submit your product details, including images, descriptions, and links, to showcase your creation and connect with potential users and collaborators."
                    />
                </div>
                <div className="max-w-2xl mx-auto">
                    <ProductSubmitForm />
                </div>
            </div>
        </section>

    );
}