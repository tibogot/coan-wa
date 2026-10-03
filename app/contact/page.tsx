import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact COAN West Africa Limited in Abuja for construction and engineering project inquiries.",
  openGraph: {
    title: "Contact | COAN West Africa Limited",
    description:
      "Get in touch with COANWA for civil, electrical, and mechanical engineering projects across West Africa.",
  },
};

export default function Page() {
  return <ContactPage />;
}
