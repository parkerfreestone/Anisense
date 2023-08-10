interface HeroProps {
  icon?: string;
  title: string;
  desc: string;
  includeTopMargin: boolean;
}

export const Hero = ({ icon, title, desc, includeTopMargin }: HeroProps) => {
  return (
    <div className="py-15">
      <div
        className={`max-w-6xl mx-auto ${includeTopMargin ? "pt-32" : "pt-8"}`}
      >
        <h1 className="text-zinc-100 text-3xl font-black">{title}</h1>
        <p className="text-zinc-400 text-lg">{desc}</p>
      </div>
    </div>
  );
};
