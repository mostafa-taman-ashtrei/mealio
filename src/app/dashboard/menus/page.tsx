import Container from "@/components/general/Container";
import MenuGrid from "./components/MenuGrid";
import PageTitle from "@/components/general/PageTitle";

const MenuPage = () => {
    return (
        <Container>
            <PageTitle text="Menu Gallery" />
            <MenuGrid />
        </Container>
    );
};

export default MenuPage;