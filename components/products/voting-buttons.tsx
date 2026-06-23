"use client";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon} from "lucide-react";
import { cn } from "../../lib/utils";
import { downvoteProductAction, upvoteProductAction } from "@/lib/products/product-action";
import { useOptimistic, useTransition } from "react";

export default function VotingButtons({ 
    hasVoted,
    voteCount : initialVoteCount,
    productId,
}: { 
    hasVoted?: boolean; 
    voteCount: number; 
    productId: number;
}) {
    const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
        initialVoteCount,
        (currentCount, change: number) => 
            Math.max(0, currentCount + change)
    );

    const [isPending, startTransition] = useTransition();

    const handleUpvote = async () => {
        startTransition(async () => {
            setOptimisticVoteCount(1); // Optimistically increment the vote count
            await upvoteProductAction(productId);
        });
    };
    const handleDownvote = async () => {
        startTransition(async () => {
            setOptimisticVoteCount(-1); // Optimistically decrement the vote count
            await downvoteProductAction(productId);
        });
    };
    return (
        <div className="flex flex-col items-center 
        gap-1 shrink-0" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
            <Button onClick={handleUpvote} disabled={isPending} variant="ghost" size="icon-sm" className={cn("h-8 w-8 text-primary", hasVoted ? "bg-primary text-primary hover:bg-primary/20" : "hover:bg-primary/10 hover:text-primary")}>
                <ChevronUpIcon className="size-5" />
            </Button>
            <span className="text-sm font-semibold transition-colors text-foreground">
                {optimisticVoteCount}
            </span>
            <Button onClick={handleDownvote} disabled={isPending} variant="ghost" size="icon-sm" className={cn("h-8 w-8 text-primary", hasVoted ? "hover:text-destructive" : "opacity-50 cursor-not-allowed")}>
                <ChevronDownIcon className="size-5" />
            </Button>
        </div>
    );
}
                