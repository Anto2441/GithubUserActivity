import ora from 'ora';
import chalk from 'chalk';
import { fetchUserProfile } from '../utils/api.js';

export async function fetchUserProfileCommand(username) {
  const spinner = ora(`Fetching profile for ${username}...`).start();

  try {
    const profileData = await fetchUserProfile(username);
    spinner.succeed(`Successfully fetched profile for ${username}`);

    if (!profileData) {
      logger.warning(`No profile found for user: ${username}`);
      return;
    }

    console.log(chalk.bold(`\nGitHub Profile for ${username}:`));
    console.log(`${chalk.bold('Name:')} ${profileData.name || 'N/A'}`);
    console.log(`${chalk.bold('Bio:')} ${profileData.bio || 'N/A'}`);
    console.log(
      `${chalk.bold('Public Repositories:')} ${profileData.public_repos}`
    );
    console.log(`${chalk.bold('Followers:')} ${profileData.followers}`);
    console.log(`${chalk.bold('Following:')} ${profileData.following}`);
    console.log(`${chalk.bold('Profile URL:')} ${profileData.html_url}\n`);
  } catch (error) {
    spinner.fail('Failed to fetch profile data.');
    logger.error(error.message);
  }
}
