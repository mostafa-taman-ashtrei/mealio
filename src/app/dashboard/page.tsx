import Container from "@/components/general/Container";
import MenuGrid from "./components/MenuGrid";
import { Separator } from "@/components/ui/separator";

const Dashboard: React.FC = () => {

    return (
        <Container>
            <div className="col-span-2 mt-4 w-full space-y-2">
                <div>
                    <h3 className="text-2xl font-medium">File Gallery</h3>
                </div>

                <Separator className="bg-primary/10" />
            </div>

            <MenuGrid menuName="Breakfast Menu" />
        </Container>

    );
};

export default Dashboard;