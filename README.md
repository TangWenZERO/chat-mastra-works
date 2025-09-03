# Chat-Mastra Works

这是一个基于 [Mastra](https://mastra.ai/) 框架构建的 AI 应用项目，专为部署在 Cloudflare Workers 平台上而设计。

## 项目概述

Chat-Mastra Works 利用 Mastra 框架的强大功能，结合 Cloudflare Workers 的全球分布式网络，提供高性能、低延迟的 AI 应用服务。项目集成了 OpenAI 等 AI 服务，可以快速构建和部署 AI 驱动的应用。

## 技术栈

- [Mastra](https://mastra.ai/): AI 应用开发框架
- Cloudflare Workers: 部署平台
- OpenAI: AI 服务提供商
- LibSQL: 数据库
- TypeScript: 开发语言

## 项目结构

```
.
├── src/                    # 源代码目录
│   └── mastra/             # Mastra 相关代码
│       ├── agents/         # AI Agents
│       ├── tools/          # 工具函数
│       ├── workflows/      # 工作流
│       └── index.ts        # 入口文件
├── .mastra/                # Mastra 构建输出目录
├── .wrangler/              # Wrangler 缓存目录
├── package.json            # 项目配置和依赖
└── wrangler.jsonc          # Cloudflare Workers 配置
```

## 主要依赖

- `@mastra/core`: Mastra 核心库
- `@mastra/deployer-cloudflare`: Cloudflare 部署器
- `@mastra/libsql`: LibSQL 数据库集成
- `@mastra/loggers`: 日志记录工具
- `@ai-sdk/openai`: OpenAI AI 模型集成
- `zod`: 数据验证库

## 环境要求

- Node.js >= 20.9.0
- pnpm (推荐) 或 npm

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

### 本地预览

```bash
pnpm start
```

## 部署指南

### 部署到 Cloudflare Workers (生产环境)

```bash
pnpm deplay
```

### 本地开发模式 (使用 Wrangler)

```bash
pnpm deplay:dev
```

## 配置说明

项目使用 `wrangler.jsonc` 进行 Cloudflare Workers 配置：

- **name**: Worker 名称
- **main**: 入口文件路径
- **compatibility_date**: 兼容性日期
- **compatibility_flags**: 兼容性标志，启用 Node.js 兼容性
- **vars**: 环境变量配置

## 环境变量

在部署时需要配置以下环境变量：

- `OPENAI_API_KEY`: OpenAI API 密钥
- `ENVIRONMENT`: 运行环境 (development/production)

## 注意事项

1. 确保 Node.js 版本 >= 20.9.0
2. 部署前需配置正确的 `OPENAI_API_KEY`
3. 项目使用 ESM 模块系统 (type: "module")
4. 构建输出位于 `.mastra/output/index.mjs`

## 使用 Mastra 接口实现对话（简明）

下面是最小可用的对话接口用法，便于前端直接调用后端的 Mastra Agent。

### 1) 启动后端（本地）

```bash
export OPENAI_API_KEY=sk-xxxx
pnpm dev
```

默认本地地址为 `http://localhost:4112`。

### 2) 对话接口

- 路径: `POST /api/agents/weatherAgent/generate`
- 说明: 传入对话历史 `messages`（支持多轮），Agent 会自动调用内置的 `weatherTool` 获取天气信息并生成回复。

请求体示例（单轮）:

```json
{
  "messages": [{ "role": "user", "content": "帮我查下上海今天的天气" }]
}
```

请求体示例（多轮对话）:

```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "北京今天天气怎么样？" },
    { "role": "assistant", "content": "好的，我来查询北京的天气。" },
    { "role": "user", "content": "那周末适合户外活动吗？" }
  ]
}
```

返回格式会包含生成的文本（字段名可能为 `output` 或其他结构化字段，前端可做兼容处理）。

### 3) curl 快速验证

```bash
curl -X POST http://localhost:4112/api/agents/weatherAgent/generate \
  -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"深圳今天天气如何？"}]}'
```

### 4) 前端最小调用示例（fetch）

```ts
const baseUrl = import.meta.env.VITE_MASTRA_API_URL || "http://localhost:4112";

async function askChat(messages: { role: string; content: string }[]) {
  const res = await fetch(`${baseUrl}/api/agents/weatherAgent/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  if (!res.ok || (data && data.error)) {
    throw new Error(data?.message || "Mastra API error");
  }
  return data.output ?? JSON.stringify(data);
}
```

提示:

- CORS 已在 `src/mastra/index.ts` 中开启，前端可直接请求本地后端；生产环境建议将 `origin` 收紧为你的前端域名。
- 请务必通过环境变量提供 `OPENAI_API_KEY`，避免将密钥写入前端或明文配置。
