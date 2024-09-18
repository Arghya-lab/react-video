import { MouseEvent } from "react";
import { useVideo } from "../Provider/VideoProvider";
import secToMinSec from "../../lib/secToMinSec";

function Chapters() {
  const { videoRef, playerState, chapters, setPlayerState } = useVideo();

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    const clickedElement = e.target as HTMLElement;
    const startTime = Number(clickedElement.dataset.startTime);

    if (videoRef?.current && startTime) {
      videoRef.current.currentTime = startTime;
    }
    setPlayerState((prev) => ({ ...prev, isChapterOverLayOpen: false }));
  };

  if (!playerState.isChapterOverLayOpen || !chapters || chapters.length === 0) {
    return null;
  }

  return (
    <div className="chapters-container" onClick={handleClose}>
      {chapters.map((chapter) => (
        <div key={chapter.name} className="chapter">
          <span>{secToMinSec(chapter.startTime)}</span>
          <button
            data-start-time={chapter.startTime}
            // onClick={() => handleGoToChapter(chapter.startTime)}
          >
            {chapter.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Chapters;
