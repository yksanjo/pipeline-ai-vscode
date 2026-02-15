const vscode = require('vscode');

function activate(context) {
  const generateCmd = vscode.commands.registerCommand('pipeline-ai.generate', async () => {
    const config = vscode.workspace.getConfiguration('pipelineAI');
    const defaultLang = config.get('defaultLanguage', 'nodejs');
    const defaultPlatform = config.get('defaultPlatform', 'github-actions');

    const description = await vscode.window.showInputBox({
      prompt: 'Describe your pipeline needs',
      placeHolder: 'e.g., Build and test a Node.js app'
    });

    if (!description) return;

    const language = await vscode.window.showQuickPick(
      ['nodejs', 'python', 'go', 'ruby', 'java', 'rust', 'php'],
      { placeHolder: 'Select language', default: defaultLang }
    );

    if (!language) return;

    const platform = await vscode.window.showQuickPick(
      ['github-actions', 'gitlab-ci', 'circleci', 'jenkins', 'aws-codepipeline'],
      { placeHolder: 'Select platform', default: defaultPlatform }
    );

    if (!platform) return;

    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Generating pipeline...',
      cancellable: false
    }, async () => {
      const content = generateMockPipeline(language, platform);
      const filePath = getFilePath(platform);
      const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

      if (!workspacePath) {
        vscode.window.showErrorMessage('No workspace folder open');
        return;
      }

      const fullPath = vscode.Uri.joinPath(workspacePath, filePath);
      const dirPath = vscode.Uri.joinPath(workspacePath, filePath.split('/').slice(0, -1).join('/'));
      
      await vscode.workspace.fs.createDirectory(dirPath).catch(() => {});
      await vscode.workspace.fs.writeFile(fullPath, Buffer.from(content, 'utf8'));

      const doc = await vscode.workspace.openTextDocument(fullPath);
      await vscode.window.showTextDocument(doc);
      vscode.window.showInformationMessage(`Pipeline generated: ${filePath}`);
    });
  });

  context.subscriptions.push(generateCmd);
}

function getFilePath(platform) {
  switch (platform) {
    case 'github-actions': return '.github/workflows/ci-cd.yml';
    case 'gitlab-ci': return '.gitlab-ci.yml';
    case 'circleci': return '.circleci/config.yml';
    case 'jenkins': return 'Jenkinsfile';
    default: return 'pipeline.yml';
  }
}

function generateMockPipeline(language, platform) {
  if (platform === 'github-actions') {
    return `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup ${language}
      uses: actions/setup-${language === 'nodejs' ? 'node@v4' : 'unknown@v1'}
    - name: Install dependencies
      run: ${language === 'nodejs' ? 'npm ci' : 'echo "Install"'}
    - name: Test
      run: ${language === 'nodejs' ? 'npm test' : 'echo "Test"'}`;
  }
  return `stages:
  - build
  - test

build:
  stage: build
  script:
    - echo "Building ${language}..."`;
}

module.exports = { activate, deactivate: () => {} };
