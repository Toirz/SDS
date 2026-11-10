import { Composition } from "remotion";
import { DatathonPromo } from "./DatathonPromo";
import { DURATION, FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot = () => (
  <Composition
    id="DatathonPromo"
    component={DatathonPromo}
    durationInFrames={DURATION}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
