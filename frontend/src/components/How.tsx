interface Props {
  title: string;
  desc: string;
  id: number;
}

const How = ({ id, title, desc }: Props) => {
  return (
    <div className="relative max-w-full sm:max-w-md p-6 bg-[#45823F]/10  rounded-lg shadow-lg m-4 sm:m-6">
      {/* Number Circle */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 flex items-center justify-center bg-green-500/30 rounded-full backdrop-blur-sm">
        <span className="text-white text-lg sm:text-xl font-bold">0{id}</span>
      </div>

      {/* Content */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
        <p className="text-white/90 text-base sm:text-lg">{desc}</p>
      </div>

      {/* Background Circles - Decorative */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-green-500/10 rounded-full -z-10 blur-md sm:blur-lg"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-green-500/10 rounded-full -z-10 blur-md sm:blur-lg"></div>
    </div>
  );
};

export default How;
