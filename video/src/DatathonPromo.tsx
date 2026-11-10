import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, staticFile } from "remotion";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { LogoTrack } from "./components/Logo";
import { Particles } from "./components/Particles";
import { CallToAction } from "./scenes/CallToAction";
import { Facts } from "./scenes/Facts";
import { Opening } from "./scenes/Opening";
import { Prizes } from "./scenes/Prizes";
import { Timeline } from "./scenes/Timeline";
import { Tracks } from "./scenes/Tracks";
import { colors, fontFamily } from "./theme";

loadFont({ family: "Inter", url: staticFile("fonts/InterVariable.woff2"), weight: "100 900" });

export const DatathonPromo = () => (
  <AbsoluteFill style={{ fontFamily, color: colors.text, fontFeatureSettings: '"cv11", "ss01"' }}>
    <Background />
    <Particles />
    <Opening />
    <LogoTrack />
    <Header />
    <Tracks />
    <Timeline />
    <Facts />
    <Prizes />
    <CallToAction />
  </AbsoluteFill>
);
