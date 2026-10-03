import type { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: {
    absolute: "COAN West Africa Limited | Construction & Engineering",
  },
  description:
    "COAN West Africa Limited delivers civil, electrical, and mechanical engineering with 34+ years of infrastructure expertise.",
  openGraph: {
    title: "COAN West Africa Limited | Construction & Engineering",
    description:
      "Integrated construction and engineering solutions across West Africa.",
  },
};

export default function Page() {
  return <HomePage />;
}
