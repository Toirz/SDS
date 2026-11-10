import { Config } from "@remotion/cli/config";

// Share the website's public folder so the logo and Inter font stay in one place.
Config.setPublicDir("../public");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
