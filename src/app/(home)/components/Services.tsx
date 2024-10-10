import { ChartPie, GalleryVerticalEnd, QrCode } from "lucide-react";

const Services: React.FC = () => {
    return (

        <div className="max-w-6xl mx-auto py-16 px-4" id="services">
            <h2 className="text-4xl font-extrabold text-center mb-16">
                Discover Our {" "}
                <span className="text-primary">Features</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:max-w-md mx-auto">
                <div className="rounded-2xl overflow-hidden shadow-md hover:scale-95 transition-all shadow-primary bg-white dark:bg-gray-800">
                    <div className="p-8">
                        <div className="flex flex-row gap-4 items-center">
                            <GalleryVerticalEnd className="text-primary" size={40} />
                            <h3 className="text-2xl font-semibold">Customization</h3>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mt-4">Tailor your meanu to suit your needs and reflect your brand.</p>
                    </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-md hover:scale-95 transition-all shadow-primary bg-white dark:bg-gray-800">
                    <div className="p-8">
                        <div className="flex flex-row gap-4 items-center">
                            <QrCode className="text-primary" size={40} />
                            <h3 className="text-2xl font-semibold">Link Generations</h3>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mt-4">Generate and share your menus easily with the magic of QR codes.</p>
                    </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-md hover:scale-95 transition-all shadow-primary bg-white dark:bg-gray-800">
                    <div className="p-8">
                        <div className="flex flex-row gap-4 items-center">
                            <ChartPie className="text-primary" size={40} />
                            <h3 className="text-2xl font-semibold">Analytics</h3>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mt-4">Track your orders and analyize market trends to always stay ahead.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;