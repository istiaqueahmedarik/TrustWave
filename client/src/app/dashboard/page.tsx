import Content from "./content"
import Layout from "./layout"

export default function Dashboard() {
  return (
    <div data-theme="dark"
      className="bg-background text-foreground dark:text-white font-Poppins"
    >
        <Content />
    </div>
  )
}

