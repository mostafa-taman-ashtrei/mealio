import Image from "next/image";
import { MenuWithItems } from "@/types/restaurant";

type ModernThemeProps = {
    menu: MenuWithItems;
}

const ModernTheme: React.FC<ModernThemeProps> = ({ menu }) => {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">{menu.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menu.menuItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4">
                        <Image
                            src={item.images[0]?.url}
                            alt={item.name}
                            width={500}
                            height={500}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-lg font-bold mt-2">${item.price}</p>
                        {item.discounts.length > 0 && (
                            <div className="mt-2 flex gap-2">
                                {item.discounts.map(discount => (
                                    <span key={discount.id} className="bg-primary/10 text-primary px-2 py-1 rounded">
                                        {discount.value}% OFF
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};



export default ModernTheme;