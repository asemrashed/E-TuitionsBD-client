const InfoCard = ({ icon, label, children, className = "" }) => {
  return (
    <div
      className={`bg-base-100 dark:bg-[#1a222d] border border-base-300 dark:border-gray-800 rounded-xl p-4 space-y-1 ${className}`}
    >
      <div className="flex items-center gap-2 text-primary text-sm font-semibold">
        {icon}
        <span className="uppercase text-xs text-gray-500 dark:text-gray-400">
          {label}
        </span>
      </div>
      <div className="font-medium text-sm">{children}</div>
    </div>
  );
};

export default InfoCard;
