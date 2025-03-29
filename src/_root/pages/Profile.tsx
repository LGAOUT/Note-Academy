import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { Button } from "@/components/ui";
import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import {
  useFollow,
  useGetUserById,
  userGetFollowers,
  userGetFollowing,
  useUnFollow,
} from "@/lib/react-query/queries";
import { GridPostList, Loader } from "@/components/shared";
import { useEffect, useState } from "react";
import Feedback from "./Feedback";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

// Function to render badge based on user level
const renderBadge = (level: string) => {
  let badgeColor = "";
  let badgeLabel = "";

  switch (level) {
    case "Débutant":
      badgeColor = "bg-sky-500 text-white border border-blue-500";
      badgeLabel = "D";
      break;
    case "Intermédiaire":
      badgeColor = "bg-yellow-500 text-white border border-yellow-500";
      badgeLabel = "I";
      break;
    case "Avancé":
      badgeColor = "bg-green-500 text-white border border-green-500";
      badgeLabel = "A";
      break;
    case "Expert":
      badgeColor = "bg-orange-500 text-white border border-red-500";
      badgeLabel = "E";
      break;
    default:
      badgeColor = "bg-gray-500 text-white border border-gray-500";
      badgeLabel = "N/A";
  }

  return (
    <div className={`inline-flex items-center justify-center ${badgeColor} text-xs px-2 py-1 rounded-full ml-2`}>
      {badgeLabel}
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const [isFollowed, setIsFollowed] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState(0);

  const { data: profile } = useGetUserById(id || "");
  const { mutateAsync: follow } = useFollow();
  const { mutateAsync: unFollow } = useUnFollow();

  const { data: followersList } = userGetFollowers(
    user.id == id ? user.id : (id as string)
  );
  const { data: followingList } = userGetFollowing(
    user.id == id ? user.id : (id as string)
  );
  useEffect(() => {
    if (profile && user && profile.$id && followersList) {
      setTotalFollowers(followersList.total);
      setIsFollowed(
        !!followersList?.documents.filter(
          (followerData) =>
            followerData.follower == user.id && followerData.user == profile.$id 
        ).length
      );
    }
  }, [user, profile, followersList]);
  const handleFollow = async () => {
    const isFollow = await follow({
      follower: user.id,
      user: profile?.$id as string,
    });
    setIsFollowed(isFollow);
    setTotalFollowers(oldTotal => isFollow ? oldTotal + 1 : oldTotal);
  };

  const handleUnFollow = async () => {
    const isUnfollow = await unFollow({
      follower: user.id,
      user: profile?.$id as string,
    });

    setIsFollowed(!isUnfollow);
    setTotalFollowers(oldTotal => isUnfollow ? oldTotal -1 : oldTotal);
  };

  if (!profile)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              profile.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full flex items-center">
                {profile.name} {renderBadge("Expert")} {/* Display level Avancé */}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{profile.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={profile.posts.length} label="Posts" />
              <StatBlock value={totalFollowers} label="Followers" />
              <StatBlock value={followingList?.total || 0} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {profile.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== profile.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${profile.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== profile.$id && "hidden"
                }`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <Button
                type="button"
                className="shad-button_primary px-8"
                onClick={!isFollowed ? handleFollow : handleUnFollow}>
                {!isFollowed ? "Follow" : "Unfollow"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {profile.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab  ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
          <Link
            to={`/profile/${id}/feedback`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/feedback` && "!bg-dark-3"
            }`}
          >
            <img src={"/assets/icons/feedback.svg"} alt="feedback" width={20} height={20} />
            Feedbacks
          </Link>
        </div>
      )}

      <Routes>
        <Route index element={<GridPostList posts={profile.posts} showUser={false} />} />
        {profile.$id === user.id && (
          <>
            <Route path="/liked-posts" element={<LikedPosts />} />
            <Route path="/feedback" element={<Feedback />} /> {/* Add this line */}
          </>
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
