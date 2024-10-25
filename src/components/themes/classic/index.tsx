import Image from "next/image";
import { MenuWithItems } from "@/types/restaurant";

const ClassicTheme: React.FC<{ menu: MenuWithItems }> = ({ menu }) => {
    return (
        <div className=" max-w-4xl mx-auto p-8 bg-blue-500">
            <h1 className="text-3xl font-serif text-center mb-8 text-brown">{menu.name}</h1>
            <div className="space-y-12">
                {menu.menuItems.map(item => (
                    <div key={item.id} className="flex gap-6 items-start border-b border-brown/20 pb-6">
                        {item.images[0] && (
                            <Image
                                src={item.images[0].url}
                                alt={item.name}
                                width={500}
                                height={500}
                                className="w-32 h-32 object-cover rounded-full"
                            />
                        )}
                        <div className="flex-1">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl font-serif">{item.name}</h3>
                                <div className="border-b border-dotted border-brown flex-1 mx-4" />
                                <span className="text-xl font-serif">${item.price}</span>
                            </div>
                            <p className="text-brown/80 mt-2">{item.description}</p>
                            {item.discounts.length > 0 && (
                                <span className="inline-block mt-2 text-red-700">
                                    Special: {item.discounts[0].value}% off
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassicTheme;
