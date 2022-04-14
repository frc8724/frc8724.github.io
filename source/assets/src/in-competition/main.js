import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";

import App from "./App";

async function fetcher(url) {
  // const response = await fetch(
  //   (process.env.NODE_ENV === "production"
  //     ? "https://in-competition.mayhemrobotics.org"
  //     : "http://localhost:3000") + url
  // );

  const response = await fetch(
    "https://in-competition.mayhemrobotics.org" + url
  );

  if (!response.ok) {
    throw { status: response.status };
  }

  return await response.json();
}

let root;

document.addEventListener("turbo:load", () => {
  const rootElement = document.getElementById("in-competition-root");

  if (!rootElement) return;

  root = ReactDOM.createRoot(rootElement);
  root.render(
    <SWRConfig value={{ fetcher, refreshInterval: 10000 }}>
      <App />
    </SWRConfig>
  );
});

document.addEventListener("turbo:before-render", () => {
  root?.unmount();
});
