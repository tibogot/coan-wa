import type { Metadata } from "next";
import ProjectsPage from "./ProjectsPage";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore COANWA road construction and engineering infrastructure projects across Abuja and West Africa.",
  openGraph: {
    title: "Projects | COAN West Africa Limited",
    description:
      "Portfolio of ongoing and completed construction projects by COAN West Africa Limited.",
  },
};

export default function Page() {
  return <ProjectsPage />;
}
