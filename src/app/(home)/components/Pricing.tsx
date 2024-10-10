import { CheckCircle2, Flame, Sparkle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const Pricing: React.FC = () => {
    return (
        <div className="max-w-6xl max-lg:max-w-xl mx-auto" id="pricing">
            <h2 className="text-4xl font-extrabold text-center mb-16">
                Choose the {" "}
                <span className="text-primary">Plan</span>
                {" "} that suits you
            </h2>

            <div className="grid lg:grid-cols-3 items-center gap-8 mt-12 max-sm:max-w-sm max-sm:mx-auto">
                <div className="bg-gray-200 dark:bg-gray-800 h-max rounded-lg p-6">
                    <div className="flex flex-row gap-3">
                        <Flame className="text-primary" />
                        <h3 className="text-lg font-bold">Free Forever</h3>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        <h2 className="text-4xl border-b-4 border-primary pb-2">$0</h2>
                        <h6 className="text-sm font-bold">Per Month</h6>
                    </div>

                    <div className="mt-6">
                        <p className="text-xs">Ideal for individuals who need quick access to basic features.</p>

                        <Button className="rounded-full w-full my-2 font-bold text-lg hover:scale-110 hover:underline transition-all duration-500">
                            Get Started
                        </Button>
                    </div>

                    <div className="mt-3">
                        <ul className="space-y-4">
                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-primary" />
                                10 Menu Items
                            </li>

                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-primary" />
                                Basic Analytics
                            </li>

                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-primary" />
                                Limited Template Collections
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-primary dark:bg-primary text-white rounded-lg p-6">
                    <div className="flex flex-row gap-3">
                        <Sparkle />
                        <h3 className="text-lg font-bold">Pro</h3>
                    </div>

                    <div className="mt-6 flex gap-4 items-center">
                        <h2 className="text-4xl border-b-4 border-gray-800 pb-2">$12.99</h2>
                        <h6 className="text-sm font-bold">Per Month</h6>
                    </div>

                    <div className="mt-6">
                        <p className="text-xs">Ideal for individuals who are looking to take their business to the next level.</p>
                        <Button className="rounded-full w-full my-2 font-bold text-lg bg-gray-800 hover:bg-gray-900 hover:scale-110 hover:underline transition-all duration-500">
                            Get Started
                        </Button>
                    </div>

                    <div className="mt-6">
                        <ul className="space-y-4">
                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-gray-800" />
                                50+ Template Collection
                            </li>

                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-gray-800" />
                                Unlimited Menu Items
                            </li>

                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-gray-800" />
                                Custom QR codes
                            </li>

                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-gray-800" />
                                Advanced Analystics
                            </li>

                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-gray-800" />
                                Email Marketing Campaigns
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-200 dark:bg-gray-800  h-max rounded-lg p-6">
                    <div className="flex flex-row gap-3">
                        <Sparkles className="text-primary" />
                        <h3 className="text-lg font-bold">Ultra</h3>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        <h2 className="text-4xl border-b-4 border-primary pb-2">$24.99</h2>
                        <h6 className="text-sm font-bold">Per Month</h6>

                    </div>

                    <div className="mt-6">
                        <p className="text-xs">Ideal for those who want to all the features. This plan includes all the feature in Pro</p>
                        <Button className="rounded-full w-full my-2 font-bold text-lg text-white hover:scale-110 hover:underline transition-all duration-500">
                            Get Started
                        </Button>
                    </div>


                    <div className="mt-3">
                        <ul className="space-y-4">
                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-primary" />
                                Online Orders
                            </li>

                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-primary" />
                                WhatsApp Integration
                            </li>

                            <li className="flex gap-2 items-center text-sm">
                                <CheckCircle2 className="text-primary" />
                                Custom Template Designs
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;