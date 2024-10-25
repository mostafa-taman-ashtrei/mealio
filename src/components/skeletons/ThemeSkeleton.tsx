import { Skeleton } from "@/components/ui/skeleton";

const ThemeSkeleton = () => {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Header Section */}
            <div className="space-y-4 mb-8">
                <Skeleton className="h-12 w-48 mx-auto" />
                <Skeleton className="h-4 w-64 mx-auto" />
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="space-y-4 border rounded-lg p-4">
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <Skeleton className="h-6 w-3/4" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemeSkeleton;
