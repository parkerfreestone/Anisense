import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { ChevronLeft } from "lucide-react";

export const ErrorRoute = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto max-w-6xl">
      <h1 className="text-6xl text-zinc-100 font-black mb-12">🌸 Oops!</h1>
      <p className="text-3xl text-zinc-300 text-center">
        Sorry, an unexpected error has occured. Likely because{" "}
        <Link
          to="https://github.com/parkerfreestone"
          className="text-emerald-400 underline"
        >
          The Maintainer
        </Link>{" "}
        is bad at writing code! Feel free to report it, or just go about your
        day.
      </p>
      <div className="flex items-center gap-4 my-6">
        <Button size="lg" onClick={() => navigate(-1)} icon={<ChevronLeft />}>
          Back
        </Button>
        <Button isLink size="lg" to="https://discord.gg/v46nCB2vcA">
          Join our Discord
        </Button>
      </div>
      <p className="text-xl text-red-300 p-6 mt-12 border border-red-300 rounded-lg">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
