import Content from "../../components/leaderboardtabs";
import Layout from "../dashboard/layout";

export default function Leaderboard() {
  return (
    <div
      data-theme="dark"
      className="bg-background text-foreground dark:text-white font-Poppins"
    >
      <Layout>
        <Content />
      </Layout>
    </div>
  );
}
