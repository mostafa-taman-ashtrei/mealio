import Image from "next/image";

const About: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 sm:py-12 md:px-12 md:py-24" id="about">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 p-10 prose">
                    <h1 className="text-5xl text-gray-600">
                        Bring
                        {" "}
                        <span className="text-primary">Your Menu {" "}</span>
                        to life.
                    </h1>
                    <p className="text-xl font-light mt-8 leading-relaxed">
                        Nullam tincidunt felis eget blandit aliquam. Nunc vel mollis lorem. Phasellus pharetra commodo ultricies. Mauris scelerisque elit sed arcu consectetur hendrerit et sit amet ligula.
                    </p>

                    <p className="text-xl font-light mt-8 leading-relaxed">
                        Nullam tincidunt felis eget blandit aliquam. Nunc vel mollis lorem. Phasellus pharetra commodo ultricies. Mauris scelerisque elit sed arcu consectetur hendrerit et sit amet ligula.
                    </p>
                </div>

                <div className="w-full lg:w-2/3 py-8 px-10 grid grid-cols-4 gap-4">
                    <div className="h-64 col-span-4 sm:col-span-4 relative">
                        <Image
                            width={1000}
                            height={1000}
                            src="https://images.unsplash.com/photo-1560963805-6c64417e3413?q=80&w=1736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="food image"
                            className="absolute inset-0 h-full w-full object-cover rounded-xl"
                        />
                    </div>

                    <div className="h-64 col-span-4 sm:col-span-2 relative">
                        <Image
                            width={1000}
                            height={1000}
                            src="https://images.unsplash.com/photo-1542528180-a1208c5169a5?q=80&w=1777&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="food image"
                            className="absolute inset-0 h-full w-full object-cover rounded-xl"
                        />
                    </div>

                    <div className="h-64 col-span-4 sm:col-span-2 relative">
                        <Image
                            width={1000}
                            height={1000}
                            src="https://images.unsplash.com/photo-1473923377535-0002805f57e8?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="food image"
                            className="absolute inset-0 h-full w-full object-cover rounded-xl"
                        />
                    </div>

                    <div className="h-64 col-span-4 sm:col-span-3 relative">
                        <Image
                            width={1000}
                            height={1000}
                            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="food image"
                            className="absolute inset-0 h-full w-full object-cover rounded-xl"
                        />
                    </div>

                    <div className="h-64 col-span-4 sm:col-span-1 relative">
                        <Image
                            width={1000}
                            height={1000}
                            src="https://images.unsplash.com/photo-1476887334197-56adbf254e1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="food image"
                            className="absolute inset-0 h-full w-full object-cover rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;