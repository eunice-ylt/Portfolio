import {
  BarChart3, FileSearch, Github, Linkedin, Mail, MapPin, MessagesSquare, Network,
  PanelsTopLeft, Phone, Puzzle, Search, ShieldCheck, Target, TrendingUp, UsersRound,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  BarChart3, FileSearch, Github, Linkedin, Mail, MapPin, MessagesSquare, Network,
  PanelsTopLeft, Phone, Puzzle, Search, ShieldCheck, Target, TrendingUp, UsersRound,
};

export const iconNames = Object.keys(icons);

export function Icon({ name, className, size = 28 }: { name: string; className?: string; size?: number }) {
  const Component = icons[name] ?? Network;
  return <Component aria-hidden="true" className={className} size={size} strokeWidth={1.55} />;
}
