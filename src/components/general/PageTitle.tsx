import { cn } from "@/lib/utils";

type PageTitleProps = {
    text: string;
    className?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ text, className }) => {
    return (
        <h2 className={cn(
            "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            className
        )}
        >
            {text}
        </h2>
    );
};

export default PageTitle;