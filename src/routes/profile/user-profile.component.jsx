import UserProfileInfomation from "../../components/profile/user-infomation";
import OwlAuction from "../../components/home/auction-pending/auction-pending.component";
import { useState, useEffect } from "react";

const UserProfile = () => {
  const [hasUser, setHasUser] = useState(true);
  return (
    <div className=" dark:bg-adopdark min-h-screen bg-adoplight">
      <div className="container  mx-auto">
        {hasUser ? (
          <div className=" mx-32">
            <div>
              <div className="mb-10">
                <UserProfileInfomation setHasUser={setHasUser} />
              </div>
              <div>
                <OwlAuction />
              </div>
            </div>
          </div>
        ) : (
          <div>ไม่พบผู้ใช้</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
