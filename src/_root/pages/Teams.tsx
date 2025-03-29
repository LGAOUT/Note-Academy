import { CreateTeams } from "@/components/shared/Create-teams";
import { TeamCard } from "@/components/shared/TeamCard";
import { Button } from "@/components/ui";
import { useUserContext } from "@/context/AuthContext";
import { AddIcon } from "@/icons/add";
import { useGetUserTeams } from "@/lib/react-query/queries";
import { Team } from "@/types";

export const Teams = () => {
  const { user } = useUserContext();
  const { data: teams } = useGetUserTeams(user.id);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {teams &&
            teams.documents.map((team) => {
              return <TeamCard team={{...team as any, id: team.$id}} />;
            })}
        </div>
      </div>

      <div className="home-creators">
        {/* <Button className="Button-bold text-light-1 flex  flex-row gap-2">
          <AddIcon className="h-4 w-4" />
          CREATE TEAMS
        </Button> */}

        <CreateTeams />
      </div>
    </div>
  );
};
