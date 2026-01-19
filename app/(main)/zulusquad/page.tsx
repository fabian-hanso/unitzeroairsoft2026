import EliteTeamMember from "@/components/EliteTeamMember/EliteTeamMember";
import JoinElite from "@/components/JoinElite/JoinElite";
import ZuluTop from "@/components/ZuluTop/ZuluTop";

export default function Home() {
  return (
    <div className="bg-white">
      <ZuluTop />
      <JoinElite />
      <EliteTeamMember />
    </div>
  );
}
