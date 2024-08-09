import { RiArrowLeftSLine } from "react-icons/ri";

export default function Header() {
  return (
    <header className="bg-[#3fc8d9]">
      <div className="flex items-center lg:px-14 sm:px-10 lg:py-6 py-4">
        <RiArrowLeftSLine className="text-white mr-3 text-xl" />
        <h2 className="text-white font-medium">View Audience</h2>
      </div>
    </header>
  );
}
