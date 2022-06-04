import React, { useRef, useEffect } from "react";

const { Player } = window.Twitch;

export default function TwitchStream({ channel, height, width, className }) {
  const elementRef = useRef(null);

  useEffect(() => {
    new Player(elementRef.current, {
      width,
      height,
      channel,
    });
  }, [channel]);

  return <div className={className} ref={elementRef}></div>;
}
