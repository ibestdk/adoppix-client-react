
import Banner2 from "../../components/home/banner2/banner2.component";
import OwlAuction from "../../components/home/auction-pending/auction-pending.component";
import { ArtPending } from "../../components/home/art-pending/art-pending";
import { OwlAuctionNew } from "../../components/home/auction-new/auction-new";
import { ArtRecommend } from "../../components/home/art-recommend/art-recommend";
import { MarketInterView } from "../../components/home/market/market-interview";
import { Category } from "../../components/home/category/category";
const Home = () => {
  return (
    <div className="bg-white dark:bg-adopdark duration-300">
      <Banner2></Banner2>
      <OwlAuction></OwlAuction>
      <OwlAuctionNew/>
      <Category/>
      <MarketInterView/>
      <ArtPending/>
      <ArtRecommend/>
      <div>
      <img className="mx-auto mt-20" src="https://media.discordapp.net/attachments/681151360305201169/1032635055169871913/adopchan.png" alt="" />
      </div>
    </div>
  );
};

export default Home;
