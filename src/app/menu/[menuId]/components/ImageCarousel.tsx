import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import { Image } from "@prisma/client";
import { default as NextImage } from "next/image";

type ImageCarouselProps = {
    images: Image[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    return (
        <Carousel
            orientation="vertical"
            className="w-full"
            opts={{
                align: "start",
                loop: true
            }}
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
        >
            <CarouselContent className="h-[470px]">
                {images.map((image) => (
                    <CarouselItem key={image.id}>
                        <div className="p-1">
                            <Card>

                                <NextImage
                                    src={image.url}
                                    width={1000}
                                    height={1000}
                                    alt=""

                                    className="flex aspect-square items-center justify-center  w-full"
                                />

                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {images.length > 1 && <CarouselNext />}
            {images.length > 1 && <CarouselPrevious />}
        </Carousel>
    );
};

export default ImageCarousel;