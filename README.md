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

- `dependabot-alerts-to-slack.yml`: A workflow for sending Dependabot alerts to Slack.

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
