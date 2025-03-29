import { useGetTeam } from "@/lib/react-query/queries";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui";

export const TeamPage = () => {
    const navigate = useNavigate();
  // const { id } = useParams();
  // const { data: post, isLoading } = useGetPostById(id);
  const { id } = useParams();

  const { data: team, isLoading, error } = useGetTeam(id);

  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error loading team data</div>;
  }
  return (
    <div className="flex flex-1">
      <div className="team_container">
        <div className="w-full h-44">
        <img
              src={team?.cover_picture || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="bg-cover w-full h-full"
            />
        </div> 
        <div>
            <Button onClick={()=> navigate(`/teams/${id}/create`)}>create new post</Button>
        </div>
      </div>

      <div className="home-creators">
      <h3 className="h3-bold text-light-1">Add members</h3>

</div>
    </div>
  );
};
