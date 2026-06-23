import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, EyeIcon, RocketIcon, SparklesIcon, UserIcon } from "lucide-react";
import StatsCard from "./stats-card";
import Link from "next/link";
const LiveBadge = () => {
    return (
        <Badge variant="outline" className="px-4 py-2 mb-8 text-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-muted-foreground">Join the community</span>
        </Badge>
    );
};

const statsData = [
    {
        icon: RocketIcon, value: "2.5k+", label: "Projects Shared"
    },
        {
        icon: UserIcon, value: "10k+", label: "Active Creators", hashBorder: true,
    },
        {
        icon: EyeIcon, value: "50k+", label: "Monthly Visitor"
    }
]
export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
            <div className="wrapper">
                <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
                    <LiveBadge />
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">Share What You&apos;ve Built, Discover What&apos; Launching</h1>
                    <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">Share your projects with the world and discover new ones.</p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Button asChild size="lg" className="text-base px-8 shadow-lg">
                            <Link href="/submit">
                                <SparklesIcon className="size-5" />
                                Share Your Project
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            className="text-base px-8 shadow-lg"
                            variant="secondary"
                            >
                            <Link href="/explore">
                                Explore Projects <ArrowRightIcon className="size-5" />
                            </Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full mx-auto">
                        {statsData.map((stat, index) => (
                            <StatsCard key={stat.label} {...stat} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}