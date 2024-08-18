import React, { useMemo, useState } from "react";
import { useVideo } from "../Provider/VideoProvider";
import classNames from "classnames";
import { SubtitleItemType } from "../../lib/fetchAndParseCaption";
import "./caption.scss";

function Caption() {
  const { playerState } = useVideo();
  const [currenText, setCurrenText] = useState<SubtitleItemType | null>(null);
  const [nextTextStartAt, setNextTextStartAt] = useState<number | null>(null);

  useMemo(() => {
    function updateCurrentText() {
      if (playerState.currentCaptionData) {
        const cct = playerState.currentCaptionData.find(
          (item) =>
            item.startTime <= playerState.currentTime &&
            item.endTime >= playerState.currentTime
        );
        setCurrenText(cct || null);

        const nct = playerState.currentCaptionData.find(
          (item) => item.startTime > playerState.currentTime
        );
        setNextTextStartAt((prev) =>
          prev ? nct?.startTime || playerState.duration : nct?.startTime || null
        );
      }
    }

    if (!playerState.currentCaption || !playerState.currentCaptionData) return;

    //  in the current text
    if (
      currenText &&
      currenText.startTime <= playerState.currentTime &&
      currenText.endTime > playerState.currentTime
    )
      return;

    if (
      nextTextStartAt &&
      (!currenText ||
        (currenText && currenText.endTime < playerState.currentTime))
    ) {
      //  next caption text start time is not came
      if (nextTextStartAt > playerState.currentTime) return;

      //  caption text have to update
      if (nextTextStartAt <= playerState.currentTime) {
        updateCurrentText();
        return;
      }
    }

    if (
      // nothing is set
      (!currenText && !nextTextStartAt) ||
      //  user skip back
      (currenText && currenText.startTime > playerState.currentTime)
    ) {
      updateCurrentText();
      return;
    }
  }, [playerState.currentTime]);

  if (!playerState.currentCaption || !playerState.currentCaptionData)
    return null;

  return (
    <div
      className={classNames("caption-text", {
        "control-visible": playerState.isControlVisible,
      })}
    >
      {currenText && <span>{currenText.text}</span>}
    </div>
  );
}

export default Caption;
