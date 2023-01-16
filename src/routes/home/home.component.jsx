
import Banner2 from "../../components/home/banner2/banner2.component";
import OwlAuction from "../../components/home/auction-pending/auction-pending.component";
const Home = () => {
  return (
    <div className="bg-adoplight dark:bg-adopdark duration-300">
      <Banner2></Banner2>
      <OwlAuction></OwlAuction>
      <OwlAuction></OwlAuction>
    </div>
  );
};

export default Home;
