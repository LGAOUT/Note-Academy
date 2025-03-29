import { useToast } from "@/components/ui/use-toast";
import { Loader, UserCard } from "@/components/shared";
import { useGetUsers, userGetFollowing } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { useEffect } from "react";

const AllUsers = () => {
  const { toast } = useToast();
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
  const { user } = useUserContext();
  const { data: followersList, refetch } = userGetFollowing(user.id);

  useEffect(() => {
    return () => {
      refetch();
      }
  }, [refetch]);

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard
                  user={creator}
                  isFollowed={
                    !!followersList?.documents.filter(
                      (follower) => creator.$id === follower.user
                    ).length
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
