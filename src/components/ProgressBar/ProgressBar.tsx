import { FaDice, FaTrophy } from "react-icons/fa";
import { MdDomainVerification } from "react-icons/md";

export default function ProgressBar() {
  return (
    <section className="text-gray-400 font-medium flex w-full gap-2">
      <div className="flex flex-col flex-1 items-center text-primary">
        <FaDice size={36} />
        <p className="cursor-default mt-1">Apostas</p>
        <div className="w-full h-1.5 bg-primary rounded-full mt-2"></div>
      </div>
      <div className="flex flex-col flex-1 items-center">
        <MdDomainVerification size={36} />
        <p className="cursor-default mt-1">Sorteio/Apuração</p>
        <div className="w-full h-1.5 bg-gray-300 rounded-full mt-2"></div>
      </div>
      <div className="flex flex-col flex-1 items-center">
        <FaTrophy size={36} />
        <p className="cursor-default mt-1">Premiação</p>
        <div className="w-full h-1.5 bg-gray-300 rounded-full mt-2"></div>
      </div>
    </section>
  );
}
