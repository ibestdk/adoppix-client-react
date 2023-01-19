import UserProfileInfomation from "../../components/profile/user-infomation";
import OwlAuction from "../../components/home/auction-pending/auction-pending.component";
const UserProfile = () => {
  return (
    <div className=" dark:bg-adopdark min-h-screen bg-adoplight">
      <div className="container  mx-auto">
        <div className=" mx-32">
          <div className="mb-10">
            <UserProfileInfomation />
          </div>
          <div>
            <OwlAuction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
