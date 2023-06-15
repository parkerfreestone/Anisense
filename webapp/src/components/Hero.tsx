interface HeroProps {
  icon?: string;
  title: string;
  desc: string;
}

export const Hero = ({ icon, title, desc }: HeroProps) => {
  return (
    <div className="py-15">
      <div className="max-w-6xl mx-auto pt-32">
        <h1 className="text-zinc-100 text-3xl font-bold">{title}</h1>
        <p className="text-zinc-400 text-lg">{desc}</p>
      </div>
    </div>
  );
};
