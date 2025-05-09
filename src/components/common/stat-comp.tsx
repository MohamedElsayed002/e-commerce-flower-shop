import { LucideIcon } from "lucide-react"; // or your icon library

interface StatsCompProps {
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number | undefined;
  text?: string;
  color?: string; // Optional custom color
  bgColor?: string
}

export function StatsComp({ icon: Icon, value, text, color,bgColor }: StatsCompProps) {
  return (
    <div className={`w-[213px] h-[129px] border bg-[${bgColor}] p-2 space-y-3 rounded-lg`}>
      <Icon className={color} style={{ color }} width={35} height={35} />
      <h1 className="font-bold text-2xl" style={{ color }}>
        {value}
      </h1>
      <p className="text-[#2E2E30]">{text}</p>
    </div>
  );
}