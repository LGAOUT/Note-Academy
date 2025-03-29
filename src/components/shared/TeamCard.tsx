import { Team } from "@/types";
import { Link } from "react-router-dom";

interface TeamCardProps {
  team: Team;
}

export const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <div className="team-card w-full h-full">
      <Link to={`/teams/${team.id}`} className="w-full h-full">
        <div className="flex-row flex justify-between w-full items-center">
          <div className="flex flex-row gap-2 items-center">
            <img
              src={
                team.cover_picture || "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-14 h-14"
            />

            <p className="base-medium text-light-1 text-center line-clamp-1">
              {team.name.toUpperCase()}
            </p>
          </div>
          <p className="small-regular text-light-3 text-center line-clamp-1">
            {team.member_counter} member
          </p>
        </div>
      </Link>
    </div>
  );
};
