import React, { useMemo, useRef } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import MatchList from "./components/MatchList";
import Rankings from "./components/Rankings";
import TwitchStream from "./components/TwitchStream";
import { useFullscreen, useToggle } from "react-use";

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-transparent border-t-white border-l-white animate-spin rounded-full"></div>
  );
}

export default function App() {
  const { data: event } = useSWRImmutable("/currentEvent");
  const { data: matches } = useSWR(() => "/event/" + event.key + "/matches");
  const { data: rankings } = useSWR(() => "/event/" + event.key + "/rankings");

  const twitchChannel = useMemo(() => event?.webcasts[0].channel, [event]);

  const ref = useRef(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });

  if (!event || !matches || !rankings) return null;

  return (
    <div
      className={`bg-gray-800 ${
        !isFullscreen ? "rounded-md" : ""
      } mb-5 md:p-7 p-5 md:h-[42rem] grid md:grid-rows-[auto_1fr_auto] grid-rows-[auto_auto_auto_20rem] grid-cols-[12rem_1fr] gap-7`}
      ref={ref}
    >
      <div className="col-span-2 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <button
            className="px-3 py-[10px] rounded-full hover:bg-gray-700 transition-colors mr-3"
            onClick={() => toggle()}
            title={isFullscreen ? "Exit full screen" : "Full screen"}
          >
            {isFullscreen ? (
              <i className="fas fa-fw fa-compress"></i>
            ) : (
              <i className="fas fa-fw fa-expand"></i>
            )}
          </button>
          <div>{event?.name}</div>
        </div>
        {!isFullscreen && (
          <a
            href={`https://www.thebluealliance.com/event/${event.key}`}
            target="_blank"
            className="hidden md:block"
          >
            See this event on The Blue Alliance{" "}
            <i className="fas fa-external-link-alt"></i>
          </a>
        )}
      </div>
      {rankings.length > 0 ? (
        <div className="bg-gray-900 rounded-md overflow-auto py-3 px-2 row-start-4 col-span-2 md:row-start-2 md:col-span-1">
          <h3 className="uppercase font-bold text-gray-400 text-xs mb-2 px-2">
            Rankings
          </h3>
          <Rankings
            teams={rankings.map((t) => t.team_key.replace("frc", ""))}
          />
        </div>
      ) : (
        <div className="bg-gray-900 rounded-md overflow-auto py-3 px-2 row-start-4 col-span-2 md:row-start-2 md:col-span-1 flex items-center justify-center">
          <h3 className="uppercase font-bold text-gray-400 text-xs mb-2 px-2">
            No rankings yet.
          </h3>
        </div>
      )}
      <TwitchStream
        className="rounded-md overflow-clip col-span-2 md:col-span-1 aspect-video md:aspect-auto"
        channel={twitchChannel}
        width="100%"
        height="100%"
      />
      <div className="col-span-2 overflow-auto hide-scrollbar">
        {matches && <MatchList matches={matches} />}
      </div>
    </div>
  );
}
