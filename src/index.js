#!/usr/bin/env node

import { Command } from 'commander';

import { fetchUserActivityCommand } from './commands/fetchUserActivityCommand.js';
import { fetchUserProfileCommand } from './commands/fetchUserProfileCommand.js';

const program = new Command();

program
  .name('github-user-activity')
  .description('Fetch user activity from GitHub')
  .version('1.0.0');

program
  .argument('<username>', 'GitHub username to fetch activity for')
  .option('--profile', 'Fetch user profile')
  .option('-t, --type <type>', 'Filter events by type (e.g., PushEvent)')
  .option(
    '-l, --limit <number>',
    'Limit the number of events displayed',
    parseInt
  )
  .action(async (username, options) => {
    const { limit, profile, type } = options;
    if (profile) {
      await fetchUserProfileCommand(username);
    } else {
      await fetchUserActivityCommand(username, { type, limit });
    }
  });

program.parse(process.argv);
