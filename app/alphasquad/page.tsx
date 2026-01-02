import EliteTeamMember from "@/components/EliteTeamMember/EliteTeamMember";
import EliteTop from "@/components/EliteTop/EliteTop";
import JoinElite from "@/components/JoinElite/JoinElite";

export default function Home() {
  return (
    <div className="bg-white">
      <EliteTop />
      <JoinElite />
      <EliteTeamMember />
    </div>
  );
}
