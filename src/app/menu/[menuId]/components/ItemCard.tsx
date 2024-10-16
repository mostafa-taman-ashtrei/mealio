import BowlIcon from "@/assets/images/hero-burger.png";
import Image from "next/image";

const ItemCard: React.FC = () => {
    return (
        <div
            className="group relative cursor-pointer overflow-hidden  px-6 pt-10 pb-8  transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
            <span className="absolute top-10 z-0 h-40 w-40 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]" />
            <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-40 w-40 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-primary">
                    <Image
                        src={BowlIcon}
                        width={1000}
                        height={1000}
                        alt="bowl icon"
                        className="w-36 h-w-36 aspect-square rounded-full"
                    />
                </span>

                <h4 className="text-xl  font-semibold tracking-tight w-40">
                    Ramen Noodles
                </h4>
            </div>
        </div>
    );
};

export default ItemCard;