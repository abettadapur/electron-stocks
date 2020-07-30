import { app } from "electron";

export function startApplication() {
  // The Chromium (and by extension, Electron), default policy is to not allow a
  // web page to play a sound before the user has sufficiently interacted with the
  // web page. This makes sense on the web, but Messenger Desktop needs to be able
  // to play sounds before a user has interacted with the app. For example,
  // incoming call sounds, and in theory, message sounds, needs to play even if
  // the user hasn't interacted with app since launching it. So this command line
  // switch disables this default policy.
  app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

  // Our renderer processes are long running and need to be fully active to get new notifications etc
  // Chromium will throttle windows that are not visible by default
  // Disable that functionality here with these two flags.
  app.commandLine.appendSwitch("disable-renderer-backgrounding");
  app.commandLine.appendSwitch("disable-background-timer-throttling");

  // Some experimental web effects do not function in HDR mode, force to SDR mode
  app.commandLine.appendSwitch("force-color-profile", "srgb");

  if (!app.isReady()) {
    // @ts-ignore the official Electron types are wrong for this event. The
    // listener actually takes two args, the first is the Electron.Event and
    // the second is the launchInfo object
    app.on("ready", () => {
      const onReady = require("main/init.ready").default;
      onReady();
    });
  } else {
    // if (isProduction()) {
    //   // warn, we should avoid this
    //   log.warn(
    //     "App missed the ready event in production! Check that asynchrounous functions are not being called in the initialization path"
    //   );
    // }
    const onReady = require("main/init.ready").default;
    onReady(null, null);
  }
}
