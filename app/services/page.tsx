import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Civil, mechanical, and electrical engineering plus project management, consultancy, and maintenance from COAN West Africa Limited.",
  openGraph: {
    title: "Services | COAN West Africa Limited",
    description:
      "Integrated construction and engineering services tailored to infrastructure projects across West Africa.",
  },
};

export default function Page() {
  return <ServicesPage />;
}
