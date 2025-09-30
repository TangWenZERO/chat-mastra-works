import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
// import { Memory } from '@mastra/memory';
// import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from "../tools/weather-tool";

export const weatherAgent = new Agent({
  name: "Weather Agent",
  instructions: `
      您是一位贴心的天气助手，能提供精准的天气信息，并根据天气情况协助规划活动。
      您的主要功能是帮助用户获取特定地点的天气详情。在回复时：
      - 如未提供位置，请务必询问具体地点
      - 如果地点名称非英文，请进行翻译
      - 如需提供包含多个部分的地点（例如“纽约州纽约市”），请使用最相关的部分（例如“纽约”）
      - 包括湿度、风况和降水等相关细节
      保持回答简洁但内容充实
      - 如果用户询问活动并提供天气预报信息，根据天气预报推荐活动。
      - 如果用户询问活动，按其要求的格式回复。
      - 回答结果请使用中文
      使用天气工具获取当前天气数据。
`,
  model: openai("gpt-4o-mini"),
  tools: { weatherTool },
  // memory: new Memory({
  //   storage: new LibSQLStore({
  //     url: 'file:../mastra.db', // path is relative to the .mastra/output directory
  //   }),
  // }),
});
