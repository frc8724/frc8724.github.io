import React, { useMemo, useRef } from "react";
import useSWR from "swr";
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
  const { data: event, error: eventError } = useSWR("/currentEvent", {
    refreshInterval: 0,
  });
  const { data: matches } = useSWR(() => "/event/" + event.key + "/matches");
  const { data: rankings } = useSWR(() => "/event/" + event.key + "/rankings");

  const twitchChannel = useMemo(() => event?.webcasts[0].channel, [event]);

  const ref = useRef(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });

  if (eventError) return null;

  if (!event || !matches || !rankings) {
    return (
      <div className="bg-gray-800 rounded-md flex flex-col items-center justify-center mb-5 p-7">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="bg-gray-800 rounded-md mb-5 p-7 h-[42rem] grid grid-rows-[auto_1fr_auto] grid-cols-[12rem_1fr] gap-7"
      ref={ref}
    >
      <div className="col-span-2 flex items-center justify-between">
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
        <div>
          <a
            href={`https://www.thebluealliance.com/event/${event.key}`}
            target="_blank"
          >
            See this event on The Blue Alliance{" "}
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
      <div className="bg-gray-900 rounded-md overflow-auto py-3 px-2">
        <h3 className="uppercase font-bold text-gray-400 text-xs mb-2 px-2">
          Rankings
        </h3>
        <Rankings teams={rankings.map((t) => t.team_key.replace("frc", ""))} />
      </div>
      <TwitchStream
        className="rounded-md overflow-clip"
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
