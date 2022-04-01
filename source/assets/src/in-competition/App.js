import React from "react";
import useSWR from "swr";
import Match from "./components/Match";
import Rankings from "./components/Rankings";
import TwitchStream from "./components/TwitchStream";

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-transparent border-t-white border-l-white animate-spin rounded-full"></div>
  );
}

export default function App() {
  const { data: event, error: eventError } = useSWR("/event");
  const { data: matches } = useSWR("/matches");
  const { data: rankings } = useSWR("/rankings");

  if (eventError) return null;

  if (!event) {
    return (
      <div className="bg-gray-800 rounded-md flex flex-col items-center justify-center mb-5 p-7">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-md flex flex-col items-stretch justify-center mb-5 p-7">
      <div className="flex items-center justify-between mb-7">
        <div>{event?.name}</div>
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

      <div className="flex h-[27rem]">
        <div className="mr-7 rounded-md bg-gray-900 basis-48 overflow-auto py-3 px-2">
          {rankings ? (
            <>
              <h3 className="uppercase font-bold text-gray-400 text-xs mb-2 px-2">
                Rankings
              </h3>
              <Rankings
                teams={rankings.map((t) => t.team_key.replace("frc", ""))}
              />
            </>
          ) : (
            <Spinner />
          )}
        </div>
        <TwitchStream
          className="flex-1 rounded-md overflow-clip"
          channel={event?.webcasts[0].channel}
          width="100%"
          height="100%"
        />
      </div>

      {matches && (
        <div className="mt-7">
          <h3 className="uppercase font-bold text-gray-400 text-xs mb-3">
            Our Matches <i className="fas fa-arrow-right"></i>
          </h3>

          <div className="flex justify-start items-stretch space-x-3 overflow-auto">
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
        </div>
      )}
    </div>
  );
}
