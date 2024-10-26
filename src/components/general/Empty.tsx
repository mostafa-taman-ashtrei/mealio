import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const Empty: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    action
}) => {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            {Icon && (
                <Icon className="h-12 w-12 text-muted-foreground" />
            )}
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
            {action && (
                <Button onClick={action.onClick}>
                    {action.label}
                </Button>
            )}
        </div>
    );
};

export default Empty;