import { UserProfile } from "@clerk/nextjs";

const Profile = () => {
  return (
    <div className="flex flex-col items-center p-12">
      <UserProfile />
    </div>
  );
};
export default Profile;
