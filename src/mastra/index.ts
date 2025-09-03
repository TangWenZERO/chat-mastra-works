import { Mastra } from "@mastra/core/mastra";
// import { PinoLogger } from "@mastra/loggers";
// import { LibSQLStore } from "@mastra/libsql";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { weatherAgent } from "./agents/weather-agent";
import { keywordAgent } from "./agents/keyword-agent";
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, keywordAgent },
  // storage: new LibSQLStore({
  //   // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
  //   url: ":memory:",
  // }),
  // logger: new PinoLogger({
  //   name: "Mastra",
  //   level: "info",
  // }),
  deployer: new CloudflareDeployer({
    projectName: "hello-mastra",
    env: {
      NODE_ENV: "production",
    },
  }),
  // 添加CORS配置
  server: {
    cors: {
      origin: "*",
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"],
      exposeHeaders: ["Content-Length", "X-Requested-With"],
    },
  },
});
