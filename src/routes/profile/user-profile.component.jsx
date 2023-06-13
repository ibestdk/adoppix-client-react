import UserProfileInfomation from "../../components/profile/user-infomation";
import OwlAuction from "../../components/home/auction-pending/auction-pending.component";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactWaterMark from "react-watermark-component";
const UserProfile = () => {
  const [hasUser, setHasUser] = useState(true);
  const [profilePage, setProfilePage] = useState(1);
  const [userPost, setUserPost] = useState([]);
  const [userAuction, setUserAuction] = useState([]);
  const [userAll, setUserAll] = useState([]);
  const { userprofile } = useParams();
  const options = {
    chunkWidth: 200,
    chunkHeight: 60,
    textAlign: "left",
    textBaseline: "bottom",
    globalAlpha: 1,
    font: "14px Microsoft Yahei",
    rotateAngle: -0.26,
    fillStyle: "#1f1f1f",
  };
  useEffect(() => {
    //console.log(userPost);
  }, [userPost]);

  return (
    <div className="dark:bg-adopdark min-h-screen bg-adoplight">
      <div className="sm:container mx-auto">
        {hasUser ? (
          <div className="sm:mx-32">
            <div className="mb-10">
              <UserProfileInfomation
                setHasUser={setHasUser}
                setProfilePage={setProfilePage}
                profilePage={profilePage}
                setUserPost={setUserPost}
                setUserAuction={setUserAuction}
                setUserAll={setUserAll}
              />
            </div>
            <div>
              {profilePage === 1 && (
                <div className=" flex justify-center">
                  {userAll.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4">
                      {userAll.map((all, index) => (
                        <div key={index}>
                        {
                          all.postId ? 
                          <Link
                          to={`/feeds/${all.postId}`}
                          className="h-[180px] w-[180px] lg:h-[240px] lg:w-[240px] hover:scale-105 duration-300"
                          key={index}
                          >
                          <img
                          className="h-[180px] w-[180px] lg:h-[240px] lg:w-[240px] hover:h-[340px] hover:w-[340px] object-cover  "
                          src={`https://pix.adoppix.com/public/${all.images[0]}`}
                          alt=""
                          />
                          </Link>
                          :
                          <Link
                          to={`/auction/${all.auctionId}`}
                          className="h-[180px] w-[180px] lg:h-[240px] lg:w-[240px] hover:scale-105 duration-300"
                          key={index}
                        >
                          {/***    <ReactWaterMark
                        waterMarkText={userprofile}
                            openSecurityDefense
                            options={options}
                          >
                        </ReactWaterMark>*/}
                          <img
                            className="h-[180px] w-[180px] lg:h-[240px] lg:w-[240px] hover:h-[340px] hover:w-[340px] object-cover  "
                            src={`https://pix.adoppix.com/public/${all.image}`}
                            alt=""
                          />
                        </Link>
                        }
                          </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center mt-20 opacity-50">
                      ผู้ใช้ยังไม่ได้โพสต์รูปภาพ
                    </div>
                  )}
                </div>
              )}
              {profilePage === 2 && (
                <div className=" flex justify-center">
                  {userPost.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4">
                      {userPost.map((post, index) => (
                        <Link
                          to={`/feeds/${post.postId}`}
                          className="h-[180px] w-[180px] lg:h-[240px] lg:w-[240px] hover:scale-105 duration-300"
                          key={index}
                        >
                          <img
                            className="h-[180px] w-[180px] lg:h-[240px] lg:w-[240px] hover:h-[340px] hover:w-[340px] object-cover  "
                            src={`https://pix.adoppix.com/public/${post.images[0]}`}
                            alt=""
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center mt-20 opacity-50">
                      ผู้ใช้ยังไม่ได้โพสต์รูปภาพ
                    </div>
                  )}
                </div>
              )}
              {profilePage === 3 && (
                <div className=" flex justify-center">
                  {userAuction.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4">
                      {userAuction.map((auction, index) => (
                        <Link
                          to={`/auction/${auction.auctionId}`}
                          className="h-[180px] w-[180px] lg:h-[240px] lg:w-[240px] hover:scale-105 duration-300"
                          key={index}
                        >
                          {/***    <ReactWaterMark
                        waterMarkText={userprofile}
                            openSecurityDefense
                            options={options}
                          >
                        </ReactWaterMark>*/}
                          <img
                            className="h-[180px] w-[180px] lg:h-[240px] lg:w-[240px] hover:h-[340px] hover:w-[340px] object-cover  "
                            src={`https://pix.adoppix.com/public/${auction.image}`}
                            alt=""
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center mt-20 opacity-50">
                      ผู้ใช้ยังไม่มีการสร้างประมูล
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>ไม่พบผู้ใช้</div>
        )}
      </div>
      <div>
        <img
          className="mx-auto mt-20"
          src="https://media.discordapp.net/attachments/681151360305201169/1032635055169871913/adopchan.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default UserProfile;
