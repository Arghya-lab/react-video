import { useVideo } from "../Provider/VideoProvider";

function LoadingPoster() {
  const { loadingPoster, playerState } = useVideo();

  if (!playerState.startOnPlay) return null;

  return (
    <div className="loading-poster-container">
      <img className="loading-poster" src={loadingPoster} />
    </div>
  );
}

export default LoadingPoster;
