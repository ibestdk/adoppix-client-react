import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlAuction = () => {
  const pendingLists = [
    {
      title: "title name",
      description: "description",
      profileimage:
        "https://cdn.discordapp.com/attachments/681151360305201169/1033781143578873927/302418608_1757199631279919_4575167264398495042_n.jpg",
      username: "ibestdk",
      image:
        "https://i-ogp.pximg.net/c/w1200_q80_a2_g1_u1_cr0:0.038:1:0.777/img-master/img/2020/08/06/17/43/06/83484044_p0_master1200.jpg",
      price: 4564,
    },
    {
      title: "title name",
      description: "description",
      profileimage:
        "https://cdn.discordapp.com/attachments/681151360305201169/1033781143578873927/302418608_1757199631279919_4575167264398495042_n.jpg",
      username: "ibestdk",
      image:
        "https://media.discordapp.net/attachments/801331667586383872/1034379383978328134/100950847_p0.png?width=671&height=671",
      price: 4564,
    },
    {
      title: "title name",
      description: "description",
      profileimage:
        "https://cdn.discordapp.com/attachments/681151360305201169/1033781143578873927/302418608_1757199631279919_4575167264398495042_n.jpg",
      username: "ibestdk",
      image:
        "https://media.discordapp.net/attachments/801331667586383872/1034379386704646194/101003773_p0.png?width=865&height=671",
      price: 4564,
    },
    {
      title: "title name",
      description: "description",
      profileimage:
        "https://cdn.discordapp.com/attachments/681151360305201169/1033781143578873927/302418608_1757199631279919_4575167264398495042_n.jpg",
      username: "ibestdk",
      image:
        "https://cdn.discordapp.com/attachments/681151360305201169/1048957316810158100/17d8dc92ec65e33c617489f9ebe91abf.jpg",
      price: 4564,
    },
    {
      title: "title name",
      description: "description",
      profileimage:
        "https://cdn.discordapp.com/attachments/681151360305201169/1033781143578873927/302418608_1757199631279919_4575167264398495042_n.jpg",
      username: "ibestdk",
      image:
        "https://cdn.discordapp.com/attachments/681151360305201169/1048957317024063568/72ffa6766c07cb1cd8cd8722f30c9fc1.jpg",
      price: 4564,
    },
    {
      title: "title name",
      description: "description",
      profileimage:
        "https://cdn.discordapp.com/attachments/681151360305201169/1033781143578873927/302418608_1757199631279919_4575167264398495042_n.jpg",
      username: "ibestdk",
      image:
        "https://cdn.discordapp.com/attachments/681151360305201169/1048957317275734036/103239814_p0.jpg",
      price: 4564,
    },
    {
      title: "title name",
      description: "description",
      profileimage:
        "https://cdn.discordapp.com/attachments/681151360305201169/1033781143578873927/302418608_1757199631279919_4575167264398495042_n.jpg",
      username: "ibestdk",
      image:
        "https://cdn.discordapp.com/attachments/681151360305201169/1048957317586104421/103338368_p0.png",
      price: 4564,
    },
    {
      title: "title name",
      description: "description",
      profileimage:
        "https://cdn.discordapp.com/attachments/681151360305201169/1033781143578873927/302418608_1757199631279919_4575167264398495042_n.jpg",
      username: "ibestdk",
      image:
        "https://cdn.discordapp.com/attachments/681151360305201169/1048957317921644595/103289577_p0_master1200.jpg",
      price: 4564,
    },
  ];

  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  return (
    <div className=" mt-5 p-5 container m-auto bg-adoplight dark:bg-adopsoftdark rounded-lg">
      <div>
        <h2 className="text-adopsoftdark text-center text-2xl font-bold dark:text-adoplight duration-300">Pending Auction</h2>
      </div>
      <div className="mt-3">
        <OwlCarousel {...options}>
          {pendingLists.map((card, cardIndex) => (
            <div key={cardIndex} className="item m-3  w-[260px] ">
              <img className="w-[250px] h-[300px] object-cover rounded-lg shadow-lg" src={card.image} />
              <h4 className="text-adopsoftdark dark:text-adoplight duration-300">{card.title}</h4>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default OwlAuction;
