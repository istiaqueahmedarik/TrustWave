import Layout from "../dashboard/layout";
import Content from "./payment-form";

export default function Dashboard() {
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
