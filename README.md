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