console.log("cwd: ", process.cwd());
module.exports = {
  apps: [
    {
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      name: "core-api",
      cwd: "core",
      script: "server.ts",
      interpreter: `${process.cwd()}/core/node_modules/.bin/ts-node`,
      // interpreter_args: "--transpile-only",
      instances: 2,
      // autorestart: true,
      // watch: false,
      exec_mode: "cluster",
      env: {
        ...process.env,
        PORT: 3000,
      },
    },

    // running content api results in `PM2 error: SyntaxError: Unexpected token ']'` error
    {
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      name: "content-api",
      cwd: "content",
      script: "server.js",
      instances: 2,
      exec_mode: "cluster", // adding this property triggers the breaking condition
      env: {
        ...process.env,
        NODE_ENV: "production",
        PORT: 3002,
      },
    },
  ],
};
