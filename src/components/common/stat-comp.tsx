import { LucideIcon } from "lucide-react"; // or your icon library

interface StatsCompProps {
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number | undefined;
  text?: string;
  color?: string;
  bgColor?: string;
  currency?: string;
}

export function StatsComp({ icon: Icon, value, text, color, bgColor, currency }: StatsCompProps) {
  return (
    <div className={`w-[213px] h-[129px] border bg-[${bgColor}] p-2 space-y-3 rounded-lg`}>
      
      {/* Icon */}
      <Icon className={color} style={{ color }} width={35} height={35} />

      {/* Title */}
      <h1 className="font-bold text-2xl inline-flex items-baseline gap-1" style={{ color }}>
        {value}
        {currency && <span className="text-sm">{currency}</span>}
      </h1>

      {/* Text */}
      <p className="text-[#2E2E30]">{text}</p>
    </div>
  );
}
