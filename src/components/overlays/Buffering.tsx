import { useVideo } from "../Provider/VideoProvider";
import classNames from "classnames";
import { LoadingIcon } from "./LoadingIcon";

function Buffering() {
  const { playerState } = useVideo();

  return (
    <div
      className={classNames("buffering-container", {
        "control-visible": playerState.isControlVisible,
        buffering: playerState.buffering && playerState.playing,
      })}
    >
      <LoadingIcon strokeWidth={4.8} />
    </div>
  );
}

export default Buffering;
