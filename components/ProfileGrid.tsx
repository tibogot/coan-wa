"use client";

import Image from "next/image";

interface ProfileType {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  countries: string[];
}

const PROFILES: ProfileType[] = [
  {
    id: 1,
    name: "Chief Christian Nwogu",
    title: "Chairman",
    description:
      "Leading the company with decades of construction experience and strategic vision.",
    image: "/media/Chairman-scaled-tiny.webp",
    countries: ["Allemagne", "Luxembourg"],
  },
  {
    id: 2,
    name: "Engr. Chukwudi Nwogu",
    title: "Co-Founder & CEO",
    description:
      "Driving innovation and excellence in construction and engineering solutions.",
    image:
      "https://coanwaltd.com/wp-content/uploads/2022/04/MD-scaled-e1692892180900.jpg",
    countries: ["Allemagne", "France"],
  },
  {
    id: 3,
    name: "Nonso Nwogwu",
    title: "Director",
    description:
      "Overseeing strategic operations and ensuring project delivery excellence.",
    image:
      "https://coanwaltd.com/wp-content/uploads/2022/04/pexels-dellon-thomas-1405963.jpg",
    countries: ["France"],
  },
  {
    id: 4,
    name: "Engr Ralf Jonas",
    title: "CTO",
    description:
      "Leading technological innovation and digital transformation initiatives.",
    image:
      "https://coanwaltd.com/wp-content/uploads/2022/04/pexels-dellon-thomas-2474307.jpg",
    countries: ["USA"],
  },
  {
    id: 5,
    name: "Mr Ugwu Osita Sabastine",
    title: "Accountant",
    description:
      "Managing financial operations and ensuring fiscal responsibility.",
    image:
      "https://coanwaltd.com/wp-content/uploads/2018/12/Mr-Ugwu-Osita-Sabastine.jpg",
    countries: ["UK"],
  },
  {
    id: 6,
    name: "Akubor George",
    title: "Secretary",
    description:
      "Coordinating administrative functions and organizational communications.",
    image:
      "https://coanwaltd.com/wp-content/uploads/2022/04/George-Edited.jpg ",
    countries: ["UK"],
  },
  {
    id: 7,
    name: "Mr Osagie Omoragbon",
    title: "Admin Manager",
    description: "Managing daily operations and administrative excellence.",
    image:
      "https://coanwaltd.com/wp-content/uploads/2018/12/Mr-Omoragbon-Paul-Osagie-768x1024.jpg ",
    countries: ["UK"],
  },
];

const ProfilesGrid = () => {
  return (
    <div className="w-full overflow-hidden px-4 py-16 md:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PROFILES.map((profile) => (
          <div
            key={profile.id}
            className="profile-card group relative flex h-[400px] w-full cursor-pointer flex-col md:h-[600px]"
          >
            {/* Profile Image */}
            <div className="group relative h-full w-full overflow-hidden">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              {/* Info Card - moves up on hover to reveal full content */}
              <div className="absolute right-0 bottom-0 left-0 h-16 overflow-hidden transition-all duration-500 ease-out group-hover:h-32 md:h-20 md:group-hover:h-40">
                <div className="bg-secondary absolute right-0 bottom-0 left-0 flex h-32 translate-y-16 flex-col justify-between px-4 py-3 transition-transform duration-500 ease-out group-hover:translate-y-0 md:h-40 md:translate-y-20 md:px-6 md:py-4">
                  <div className="flex flex-col">
                    <h3 className="font-pp-neue-montreal text-left text-lg text-white md:text-2xl">
                      {profile.name}
                    </h3>
                    <p className="font-pp-neue-montreal-mono text-left text-sm text-white/80 uppercase md:text-sm">
                      {profile.title}
                    </p>
                  </div>
                  <div>
                    <p className="font-pp-neue-montreal text-left text-xs text-white/70 md:text-sm">
                      {profile.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilesGrid;
