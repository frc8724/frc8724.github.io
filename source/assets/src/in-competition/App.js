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

  const root = useRef(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(root, show, {
    onClose: () => toggle(false),
  });

  if (eventError) return null;

  if (!event) {
    return (
      <div className="bg-gray-800 rounded-md flex flex-col items-center justify-center mb-5 p-7">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="bg-gray-800 rounded-md flex flex-col items-stretch justify-center mb-5 p-7 h-[40rem]"
      ref={root}
    >
      <div className="flex items-center justify-between mb-7">
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

      <div className="flex flex-1">
        <div className="mr-7 rounded-md bg-gray-900 basis-48 overflow-auto py-3 px-2">
          {rankings ? (
            rankings.length == 0 ? (
              <div className="h-full flex items-center justify-center uppercase font-bold text-xs text-gray-400">
                No rankings yet.
              </div>
            ) : (
              <>
                <h3 className="uppercase font-bold text-gray-400 text-xs mb-2 px-2">
                  Rankings
                </h3>
                <Rankings
                  teams={rankings.map((t) => t.team_key.replace("frc", ""))}
                />
              </>
            )
          ) : (
            <div className="h-full flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
        <TwitchStream
          className="flex-1 rounded-md overflow-clip"
          channel={twitchChannel}
          width="100%"
          height="100%"
        />
      </div>

      {matches && <MatchList matches={matches} />}
    </div>
  );
}
