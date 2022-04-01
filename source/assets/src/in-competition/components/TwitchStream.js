import React, { useRef, useEffect } from "react";

const { Embed } = window.Twitch;

export default function TwitchStream({ channel, height, width, className }) {
  const elementRef = useRef(null);

  useEffect(() => {
    new Embed(elementRef.current, {
      width,
      height,
      channel,
      layout: "video",
    });
  }, [channel]);

  return <div className={className} ref={elementRef}></div>;
}
