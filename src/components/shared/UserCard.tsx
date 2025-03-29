import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useFollow,
  userGetFollowers,
  userGetFollowing,
  useUnFollow,
} from "@/lib/react-query/queries";
import { useEffect, useState } from "react";

type UserCardProps = {
  user: Models.Document;
  isFollowed: boolean;
};

const UserCard = ({ user, isFollowed }: UserCardProps) => {
  const { user: currentUser } = useUserContext();
  const { mutateAsync: follow } = useFollow();
  const [isFollow, setIsFollowed] = useState(isFollowed);

  
  const { mutateAsync: unFollow } = useUnFollow();

  const handleFollow = async (creatorId: string) => {
    const isFollow = await follow({
      follower: currentUser.id,
      user: creatorId,
    });
    setIsFollowed(isFollow);
  };

  const handleUnFollow = async (creatorId: string) => {
    const isUnfollow = await unFollow({
      follower: currentUser.id,
      user: creatorId,
    });

    setIsFollowed(!isUnfollow);
  };

  return (
    <div className="user-card w-full h-full flex justify-center">
      <Link to={`/profile/${user.$id}`} className="flex-center flex-col gap-1">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-14 h-14"
        />

        <div className="flex-center flex-col gap-1">
          <p className="base-medium text-light-1 text-center line-clamp-1">
            {user.name}
          </p>
          <p className="small-regular text-light-3 text-center line-clamp-1">
            @{user.username}
          </p>
        </div>
      </Link>
      <Button
        type="button"
        size="sm"
        className="shad-button_primary px-5"
        onClick={() => {
          if (user && user.$id) {
            if (!isFollow) {
              handleFollow(user.$id);
            } else {
              handleUnFollow(user.$id);
            }
          }
        }}>
        {isFollow ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default UserCard;
