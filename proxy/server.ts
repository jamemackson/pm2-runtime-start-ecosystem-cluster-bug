import waitOn from "wait-on";
import shell from "shelljs";

import { version } from "../package.json";

const PORT_CORE = 3001;
const PORT_CONTENT = 3002;

export class Frankenproxy {
  /**
   *
   */
  constructor() {
    // initialize the internal properties
    // this.log = P().child({ version });
  }

  start(startNginx: boolean = true) {
    console.log(
      `starting Frankenapp... ${startNginx ? "with " : "without"} nginx`
    );
    this.waitForPortsToOpen(
      startNginx ? this.startNginx : this.logServerStarted
    );
  }

  waitForPortsToOpen(callback: Function = undefined) {
    const opts = {
      resources: [
        `tcp:localhost:${PORT_CORE}`,
        `tcp:localhost:${PORT_CONTENT}`,
      ],
      delay: 1000, // initial delay in ms, default 0
      interval: 250, // poll interval in ms, default 250ms
      simultaneous: 1, // limit to 1 connection per resource at a time
      timeout: 55000, // timeout in ms, default Infinity
      tcpTimeout: 1000, // tcp timeout in ms, default 300ms
      validateStatus: function (status: number) {
        return status >= 200 && status < 300; // default if not provided
      },
    };

    waitOn(opts)
      .then(function () {
        console.log("application ports are open.");
        // once here, all resources are available
        if (callback) callback();
      })
      .catch(function (err) {
        console.error("app NOT initialized. error: ", err);
        shell.exit(1);
      });
  }

  startNginx() {
    console.log("starting nginx...");
    shell.exec("bin/start-nginx-solo");
  }

  logServerStarted() {
    console.log("server started... ");
  }
}

export const app = new Frankenproxy();

// start with nginx only when we're running in heroku
const startNginx =
  process.env.HEROKU_APP_NAME || process.env.HEROKU_TEST_RUN_BRANCH
    ? true
    : false;

app.start(startNginx);
