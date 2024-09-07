import { useUser } from "@/hooks/use-user";
import unknown from "../../../../../assets/unknown.jpeg";

const UserDetails = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-start gap-4 text-[#999] w-full">
      <img
        src={user?.photoUrl || unknown}
        alt={user.username}
        className="w-32 h-32 rounded-full"
        style={{ aspectRatio: "1/1" }}
      />
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">{user.username}</span>
        <span className="text-sm">{user.email}</span>
        <div className="flex items-center gap-1">
          <div className="bg-emerald-600 rounded-full w-3 h-3" />
          <span>Active</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
