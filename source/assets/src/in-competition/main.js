import React from "react";
import ReactDOM from "react-dom/client";
import useSWR, { SWRConfig } from "swr";
import Match from "./components/Match";
import TwitchStream from "./components/TwitchStream";

function App() {
  const { data: event } = useSWR("/event");
  const { data: matches } = useSWR("/matches");

  if (!event) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-md flex flex-col items-center justify-center mb-5 p-7">
      <div className="flex-1 basis-0 mb-7">{event?.name}</div>

      <TwitchStream
        className="w-full aspect-video"
        channel={event.webcasts[0].channel}
        width="100%"
        height="100%"
      />

      {matches && (
        <div className="flex justify-start items-stretch space-x-3 mt-7 w-full overflow-auto">
          {matches
            .filter((m) => m.comp_level == "qm")
            .sort((a, b) => a.time - b.time)
            .map((match) => (
              <Match
                competitionLevel="Qualification"
                matchNumber={match.match_number}
                key={match.key}
                redScore={match.alliances.red.score}
                blueScore={match.alliances.blue.score}
              />
            ))}
        </div>
      )}
    </div>
  );
}

const root = document.getElementById("in-competition-root");

if (root) {
  ReactDOM.createRoot(root).render(
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(
            (process.env.NODE_ENV === "production"
              ? "https://in-competition.mayhemrobotics.org"
              : "http://localhost:3000") + resource,
            init
          ).then((res) => res.json()),
      }}
    >
      <App />
    </SWRConfig>
  );
}
