import { cn } from "@/lib/utils";

type ContainerProps = {
    className?: string;
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className, children }) => {
    return (
        <div
            className={cn(
                "mx-auto w-full py-14 max-w-screen-xl px-2.5 md:px-20",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Container;