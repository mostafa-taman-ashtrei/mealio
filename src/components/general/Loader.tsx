import Image from "next/image";
import Logo from "@/assets/logos/logo.png";
import { cn } from "@/lib/utils";

type LoaderProps = {
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ className }) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Image
                src={Logo}
                width={1000}
                height={1000}
                alt="Logo"
                className={cn(
                    "w-64 h-64 animate-bounce",
                    className
                )}
            />
        </div>
    );
};

export default Loader;