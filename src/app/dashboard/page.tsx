import ActivityChart from "./components/ActivityChart";
import Container from "@/components/general/Container";
import PageGrid from "./components/PageGrid";
import { Separator } from "@/components/ui/separator";

const Dashboard: React.FC = () => {

    return (
        <Container>
            <div className="col-span-2 mt-4 w-full space-y-2">
                <div>
                    <h3 className="text-2xl font-medium">Activity</h3>
                </div>

                <Separator />
            </div>

            <div className="flex flex-col justify-center py-4">
                <PageGrid />
                <ActivityChart />
            </div>
        </Container>
    );
};

export default Dashboard;