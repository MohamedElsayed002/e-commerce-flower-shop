interface StatsCompProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number | undefined;
  text?: string;
  color?: string; 
  bgColor?: string; 
  currency?: string;
}

export function StatsComp({ icon: Icon, value, text, color = "text-current", bgColor = "bg-transparent", currency }: StatsCompProps) {
  return (
    <div className={`w-[213px] h-[129px] border ${bgColor} p-2 space-y-3 rounded-lg`}>
      {/* Icon */}
      <Icon className={color} width={35} height={35} />

      {/* Title */}
      <h1 className={`font-bold text-2xl inline-flex items-baseline gap-1 ${color}`}>
        {value}
        {currency && <span className="text-sm">{currency}</span>}
      </h1>

      {/* Text */}
      <p className="text-stats-text-textColor">{text}</p>
    </div>
  );
}