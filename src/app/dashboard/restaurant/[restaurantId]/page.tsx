import Container from "@/components/general/Container";
import PageTitle from "@/components/general/PageTitle";

type RestaurantPageProps = {
    params: {
        restaurantId: string;
    };
};

const RestaurantPage: React.FC<RestaurantPageProps> = ({ params }) => {
    const { restaurantId } = params;

    return (
        <Container className="py-14">
            <PageTitle text="Menu Items" />
            <p className="text-gray-500">These are all your items in the {restaurantId} menu</p>

        </Container>
    );
};

export default RestaurantPage;