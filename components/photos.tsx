import Image from "next/image";
import pic1 from "@/public/snaps/1.jpg";
import pic2 from "@/public/snaps/2.jpg";
import pic3 from "@/public/snaps/3.jpg";
import pic4 from "@/public/snaps/4.jpg";
import { GeistMono } from "geist/font/mono";

const photos = [
  { src: pic1, location: "09/25, las vegas" },
  { src: pic3, location: "12/25, el granada" },
  { src: pic4, location: "12/25, san francisco" },
  { src: pic2, location: "05/25, manali, india" },
];

export default function Photos() {
  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full">
        {photos.map((photo) => (
          <div key={photo.location} className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.location}
              fill
              className="object-cover grayscale"
              priority
            />
            <span className={`absolute top-2 left-2 text-xs text-white drop-shadow-md z-10 ${GeistMono.className}`}>
              {photo.location}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
