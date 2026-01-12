const InfoCard = ({ icon, label, children, className = "" }) => {
  return (
    <div
      className={`bg-base-100 border border-base-300 rounded-xl p-4 space-y-1 ${className}`}
    >
      <div className="flex items-center gap-2 text-primary text-sm font-semibold">
        {icon}
        <span className="uppercase text-xs text-base-content/60">
          {label}
        </span>
      </div>
      <div className="font-medium text-sm">{children}</div>
    </div>
  );
};

export default InfoCard;
