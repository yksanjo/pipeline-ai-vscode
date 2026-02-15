# 🔧 Pipeline AI - VS Code Extension

Generate CI/CD pipelines directly from VS Code using AI.

## Features

- 🎯 **Generate pipelines from VS Code** - No CLI needed
- 🤖 **AI-Powered** - Uses GPT-4 for intelligent generation
- 📁 **Auto file creation** - Creates pipeline files in correct locations
- ⚙️ **Configurable** - Set default language and platform

## Installation

1. Open VS Code
2. Search for "Pipeline AI" in Extensions marketplace
3. Click Install

Or manually:
```bash
code --install-extension yksanjo.pipeline-ai-vscode
```

## Usage

1. Open a workspace folder
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type "Pipeline AI: Generate Pipeline"
4. Follow the prompts

## Configuration

In VS Code settings (`settings.json`):

```json
{
  "pipelineAI.openAIKey": "your-api-key",
  "pipelineAI.defaultLanguage": "nodejs",
  "pipelineAI.defaultPlatform": "github-actions"
}
```

Or via Settings UI:
- `pipelineAI.openAIKey` - OpenAI API Key
- `pipelineAI.defaultLanguage` - Default programming language
- `pipelineAI.defaultPlatform` - Default CI/CD platform

## Commands

- `Pipeline AI: Generate Pipeline` - Generate a new pipeline
- `Pipeline AI: Select Language` - Choose default language
- `Pipeline AI: Select Platform` - Choose default platform

## Requirements

- VS Code 1.85+
- OpenAI API Key (optional, uses fallback templates)

## License

MIT
