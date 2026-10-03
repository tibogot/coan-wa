import type { Metadata } from "next";
import GalleryPage from "./GalleryPage";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual look at COAN West Africa Limited construction and engineering work across the region.",
  openGraph: {
    title: "Gallery | COAN West Africa Limited",
    description:
      "Project photography and site work from COAN West Africa Limited.",
  },
};

export default function Page() {
  return <GalleryPage />;
}
