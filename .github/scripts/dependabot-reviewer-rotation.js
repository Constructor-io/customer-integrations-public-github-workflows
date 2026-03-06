export default async ({ github, context }) => {
  const team = process.env.TEAM_SLUG;
  const debug = process.env.DEBUG === 'true';
  const org = 'Constructor-io';

  if (debug) {
    console.log(`Fetching members for team: ${org}/${team}`);
  }

  // Fetch team members from GitHub
  let engineers = [];
  try {
    const { data: members } = await github.rest.teams.listMembersInOrg({
      org,
      team_slug: team,
    });
    engineers = members.map((m) => m.login).sort();
  } catch (error) {
    console.log(`Failed to fetch team members: ${error.message}`);
    console.log('Falling back to dependabot.yml/CODEOWNERS assignment');
    return;
  }

  if (engineers.length === 0) {
    if (debug) {
      console.log(`No members found in team: ${team}`);
    }
    console.log('Falling back to dependabot.yml/CODEOWNERS assignment');
    return;
  }

  if (debug) {
    console.log(`Team members: ${engineers.join(', ')}`);
  }

  // Calculate rotation based on week number
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);

  const assigneeIndex = weekNumber % engineers.length;
  const assignee = engineers[assigneeIndex];

  if (debug) {
    console.log(
      `Week ${weekNumber}: Assigning to ${assignee} (index ${assigneeIndex} of ${engineers.length} engineers)`,
    );
  }

  // Get PR number from context
  const prNumber = context.payload.pull_request?.number;
  if (!prNumber) {
    console.log('No PR number found in context');
    return;
  }

  // Assign reviewer and assignee
  try {
    await github.rest.pulls.requestReviewers({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: prNumber,
      reviewers: [assignee],
    });
    if (debug) {
      console.log(`Requested review from ${assignee}`);
    }
  } catch (error) {
    console.log(`Failed to request reviewer: ${error.message}`);
  }

  try {
    await github.rest.issues.addAssignees({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
      assignees: [assignee],
    });
    if (debug) {
      console.log(`Assigned PR to ${assignee}`);
    }
  } catch (error) {
    console.log(`Failed to assign: ${error.message}`);
  }
};
