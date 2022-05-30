import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_PRIVATE_ACCESS_TOKEN,
});

export { octokit };
