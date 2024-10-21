import React from "react";
import ReactVideo from "..";
import "../dist/style.css";

const source = [
  {
    src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.360.m3u8",
    quality: "360p",
  },
  {
    src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.480.m3u8",
    quality: "480p",
  },
  {
    src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.720.m3u8",
    quality: "720p",
  },
  {
    src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.1080.m3u8",
    quality: "1080p",
  },
  {
    src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.m3u8",
    quality: "default",
  },
];
const chapters = [
  {
    name: "opening interval",
    startTime: 54.711,
    endTime: 145.111,
    skipAble: true,
    color: "yellow",
  },
  {
    name: "ending interval",
    startTime: 1292.583,
    endTime: 1370.829,
    skipAble: false,
    color: "pink",
  },
  {
    name: "mixed ed",
    startTime: 1424.042,
    endTime: 1435,
    skipAble: true,
    color: "blue",
  },
];

function App() {
  return (
    <div>
      <ReactVideo
        source={source}
        chapters={chapters}
        showSkipableChapter={true}
        onReady={() => console.log("onReady")}
        onPlay={() => console.log("onPlay")}
        onPause={() => console.log("onPause")}
        onBuffer={() => console.log("onBuffer")}
        onBufferEnd={() => console.log("onBufferEnd")}
        onEnablePIP={() => console.log("onEnablePIP")}
        onDisablePIP={() => console.log("onDisablePIP")}
        onEnded={() => console.log("onEnded")}
        onError={() => console.log("onError")}
        onPlaybackRateChange={() => console.log("onPlaybackRateChange")}
        onProgress={() => console.log("onProgress")}
        onQualityChange={() => console.log("onQualityChange")}
        onSeek={() => console.log("onSeek")}
        onStart={() => console.log("onStart")}
      />
    </div>
  );
}

export default App;
