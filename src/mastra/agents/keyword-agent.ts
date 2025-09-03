import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
export const keywordAgent = new Agent({
  name: "Weather Agent",
  instructions: `
      你是一个审核员，专门对提供的信息关键词进行审核，并将这些关键词找出来。
      - 审核文案的违规的关键词
      - 找出来的违规关键词列出来，并解释这些词为什么违规
      - 输出格式为markdown 格式
      - 提供这些违规关键词相近的违规词，作为补充，作为例子这些违规词也不能用。
`,
  model: openai("gpt-4o-mini"),
  // memory: new Memory({
  //   storage: new LibSQLStore({
  //     url: 'file:../mastra.db', // path is relative to the .mastra/output directory
  //   }),
  // }),
});
