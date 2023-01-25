
import Banner2 from "../../components/home/banner2/banner2.component";
import OwlAuction from "../../components/home/auction-pending/auction-pending.component";
import OwlTemplate from "../../components/owl/owl-template/owl.component";
const Home = () => {
  return (
    <div className="bg-adoplight dark:bg-adopdark duration-300">
      <Banner2></Banner2>
      <OwlTemplate/>
      <OwlAuction></OwlAuction>
    </div>
  );
};

export default Home;
