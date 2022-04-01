import React from "react";

export default function Rankings({ teams }) {
  return (
    <ol>
      {teams.map((team, index) => {
        return (
          <li
            key={team}
            className={`flex items-center px-2 py-1 rounded ${
              team == 8724 ? "border-2 border-red-600" : ""
            }`}
          >
            <div className="text-gray-400 mr-auto">#{index + 1}</div>
            <a
              href={`https://www.thebluealliance.com/team/${team}`}
              target="_blank"
              className="text-white"
            >
              {team}
            </a>
            <img
              src={`https://in-competition.mayhemrobotics.org/avatar/${team}`}
              className="w-5 ml-2 rounded"
            />
          </li>
        );
      })}
    </ol>
  );
}
