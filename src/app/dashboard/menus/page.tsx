import Container from "@/components/general/Container";
import MenuGrid from "./components/MenuGrid";
import { Separator } from "@/components/ui/separator";

const MenuPage = () => {
    return (
        <Container>
            <div className="col-span-2 mt-4 w-full space-y-2">
                <div>
                    <h3 className="text-2xl font-medium">Menu Gallery</h3>
                </div>

                <Separator />
            </div>

            <MenuGrid menuName="Breakfast Menu" />
        </Container>

    );
};

export default MenuPage;