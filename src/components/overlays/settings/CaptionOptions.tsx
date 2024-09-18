import { useVideo } from "../../Provider/VideoProvider";
import fetchAndParseCaption from "../../../lib/fetchAndParseCaption";
import { CaptionType } from "../../../@types";

function CaptionOptions() {
  const { captions, setPlayerState } = useVideo();

  async function handleSelectCaption(this: CaptionType) {
    setPlayerState((prev) => ({
      ...prev,
      currentCaption: this,
      settingItemOpen: null,
    }));
    fetchAndParseCaption(this.src).then((data) =>
      setPlayerState((prev) => ({ ...prev, currentCaptionData: data }))
    );
  }

  if (!captions) return null;

  return (
    <>
      <div
        className="setting-option-header"
        onClick={() =>
          setPlayerState((prev) => ({ ...prev, settingItemOpen: null }))
        }
      >
        Caption
      </div>
      <div className="setting-option-choice-container">
        <div
          className="setting-option-choice"
          onClick={() => {
            setPlayerState((prev) => ({
              ...prev,
              currentCaption: null,
              settingItemOpen: null,
            }));
          }}
        >
          <span>Off</span>
        </div>
        {captions.map((caption) => (
          <div
            key={caption.srclang}
            className="setting-option-choice"
            onClick={handleSelectCaption.bind(caption)}
          >
            <span>{caption.srclang}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default CaptionOptions;
