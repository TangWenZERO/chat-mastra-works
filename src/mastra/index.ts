import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
// import { LibSQLStore } from "@mastra/libsql";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { weatherAgent } from "./agents/weather-agent";
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";
// 检查运行环境
const isWorkerEnv =
  typeof navigator !== "undefined" &&
  navigator.userAgent.includes("Cloudflare-Workers");

const dbConfig = isWorkerEnv
  ? { url: "libsql://:memory:" } // Worker 环境使用内存数据库
  : { url: "file:./local.db" }; // Node 环境可以使用文件数据库

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  // storage: new LibSQLStore(dbConfig),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  deployer: new CloudflareDeployer({
    projectName: "hello-mastra",
    env: {
      NODE_ENV: "production",
    },
  }),
});
