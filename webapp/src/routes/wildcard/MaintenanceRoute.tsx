import { Button } from "../../components/common/Button";

export const MaintenanceRoute = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-6xl mx-auto">
      <h1 className="font-bold text-zinc-100 text-5xl">
        🚧 Anisense is Undergoing Maintenance!
      </h1>
      <p className="my-4 text-2xl text-center text-zinc-300">
        This is likely a routine databse sync and we will be back up and running
        within the next 20-30 minutes! If not check our discord to see what's
        up.
      </p>
      <Button isLink to="https://discord.gg/v46nCB2vcA">
        Join our Discord
      </Button>
    </div>
  );
};
