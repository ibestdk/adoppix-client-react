import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import MarketOwlObject from "./market-owl-object";

const MarketOwl = ({ testClick }) => {
  const categoryData =[
    {
        image: "https://media.discordapp.net/attachments/681151360305201169/1098721073190666390/mori-fantasy-ios-android-img-4.webp",
        title: "AI",
        link: ""
    },
    {
        image: "https://cdn.wallpapersafari.com/9/10/c0yL9u.jpg",
        title: "girl",
        link: ""
    },
    {
        image: "https://t3.ftcdn.net/jpg/03/67/25/32/360_F_367253281_GdsfPiBPOvCFpG1HyLIxNCZxLu5DeInl.jpg",
        title: "selfie",
        link: ""
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQLRm0URitelSdCJF4uWXofTxMstu2FReYw&usqp=CAU",
        title: "เอลฟ์",
        link: ""
    },
    {
        image: "https://thumbs.dreamstime.com/b/high-contrast-image-magician-hand-magic-wand-hat-40621914.jpg",
        title: "เวทย์มนต์",
        link: ""
    },
    {
        image: "https://img.freepik.com/free-vector/hand-drawn-flat-kawaii-girl-illustration_52683-94398.jpg?w=2000",
        title: "จิบิ",
        link: ""
    },
    {
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bojnice-castle-1603142898.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*",
        title: "ปราสาท",
        link: ""
    },
    {
        image: "https://paperpirateship.files.wordpress.com/2017/03/img_0183.png?w=1920",
        title: "ดีไซน์",
        link: ""
    }
]

  // const tagCardClicked = (name) => {
  //   setTagOwlCol(name);
  // }

  const options = {
    loop: true,
    center: true,
    items: 1,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 5000,
    smartSpeed: 600,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 7,
      },
    },
  };

  return (
    <div className="container m-auto bg-adoplight dark:bg-adopsoftdark rounded-lg">
      <div className="">
        <OwlCarousel {...options}>
          {categoryData.map((card, cardIndex) => (
           <MarketOwlObject key={cardIndex} object={card} testClick={testClick} />
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default MarketOwl;
