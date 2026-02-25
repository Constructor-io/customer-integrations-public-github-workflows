# Customer Integrations Public GitHub Workflows

This repository contains a collection of reusable GitHub Actions workflows that can be shared across multiple repositories within our organization.

## Purpose

The main purpose of this repository is to centralize and maintain common workflows that can be referenced and used by other repositories. This approach helps in:

1. Standardizing processes across projects
2. Reducing duplication of workflow code
3. Simplifying maintenance and updates of shared workflows
4. Ensuring consistency in CI/CD practices

## Usage

To use a workflow from this repository in another project, you can reference it in your workflow file using the `uses` keyword with the following syntax:

```yaml
jobs:
  job_name:
    uses: customer-integrations-public-github-workflows/.github/workflows/workflow-name.yml@main
```

## Available Workflows

### `build.yml`
A reusable workflow for testing Node.js application builds with configurable build commands and optional artifact uploads.

**Inputs:**
- `node-version` (optional): Node.js version to use. Default: `22.18.0`
- `build-command` (optional): Build command to run. Default: `npm run build`
- `upload-artifacts` (optional): Whether to upload build artifacts. Default: `false`
- `artifact-name` (optional): Name for the build artifact. Default: `build`
- `artifact-path` (optional): Path to build artifacts to upload. Default: `build/`
- `artifact-retention-days` (optional): Number of days to retain artifacts. Default: `7`

**Example Usage:**
```yaml
jobs:
  build:
    uses: customer-integrations-public-github-workflows/.github/workflows/build.yml@main
    with:
      node-version: '20.x'
      build-command: 'npm run build'
      upload-artifacts: true
      artifact-name: 'build-output'
      artifact-path: 'dist/'
      artifact-retention-days: 7
```

### `run-lint.yml`
A reusable workflow for running linting checks on Node.js projects.

**Inputs:**
- `node-version` (optional): Node.js version to use. Default: `22.18.0`
- `lint-command` (optional): Lint command to run. Default: `npm run lint`

**Example Usage:**
```yaml
jobs:
  lint:
    uses: customer-integrations-public-github-workflows/.github/workflows/run-lint.yml@main
    with:
      node-version: '20.x'
      lint-command: 'npm run lint'
```

### `dependabot-alerts-to-slack.yml`
A workflow for sending Dependabot alerts to Slack.

### `dependabot-reviewer-rotation.yml`
Assigns individual engineers to Dependabot PRs on a weekly rotation. Ensures security updates get reviewed instead of sitting unattended on a team.

**Adding this to your repo:**
1. Add your team mapping to [`dependabot-reviewer-rotation.yml`](.github/workflows/dependabot-reviewer-rotation.yml)
2. Follow the setup guide: https://constructor.slab.com/posts/how-to-integrate-dependabot-reviewer-rotation-to-your-repository-x75gq8f0

**Caller workflow example:**
```yaml
name: Dependabot Reviewer Rotation

on:
  pull_request:
    types: [opened]

jobs:
  assign-reviewer:
    if: github.actor == 'dependabot[bot]'
    uses: Constructor-io/customer-integrations-public-github-workflows/.github/workflows/dependabot-reviewer-rotation.yml@main
    with:
      teams: 'your-team-name'
```

## Adding New Workflows

When adding new workflows to this repository, please follow these guidelines:

1. **Location**: Place all new workflow files in the `.github/workflows/` directory.

2. **Naming Convention**: Use descriptive, hyphen-separated names for your workflow files, e.g., `my-new-workflow.yml`.

3. **Documentation**:

   - Update this README to include the new workflow under the "Available Workflows" section.
   - Add a brief description of what the workflow does.

4. **Reusability**: Ensure that the new workflow is designed to be reusable across different repositories. Use inputs and secrets to make the workflow configurable.

5. **Testing**: Before submitting a pull request, test the workflow in a separate repository to ensure it works as expected.

6. **Pull Request**: Submit a pull request with your new workflow, including any necessary updates to the README and other documentation.
