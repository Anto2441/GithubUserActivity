import ora from 'ora';
import Table from 'cli-table3';

import { fetchUserActivity } from '../utils/api.js';
import { logger } from '../utils/logger.js';

export async function fetchUserActivityCommand(username, options) {
  const spinner = ora(`Fetching activity for ${username}...`).start();

  try {
    const events = await fetchUserActivity(username);
    spinner.succeed(`Successfully fetched activity for ${username}`);

    if (events.length === 0) {
      logger.warning(`No activity found for user: ${username}`);
      return;
    }

    const filteredEvents = options.type
      ? events.filter((event) => event.type === options.type)
      : events;

    if (filteredEvents.length === 0) {
      logger.warning(`No events found for type: ${options.type}`);
      return;
    }

    const limitedEvents = options.limit
      ? filteredEvents.slice(0, parseInt(options.limit, 10))
      : filteredEvents;

    if (limitedEvents.length === 0) {
      logger.warning(`No events found for type: ${options.type}`);
      return;
    }

    const table = new Table({
      head: ['#', 'Type', 'Repository', 'Date'],
      colWidths: [5, 20, 40, 25],
    });

    limitedEvents.forEach((event, index) => {
      const { type, repo, created_at } = event;
      const repoName = repo?.name || 'unknown repo';
      const date = new Date(created_at).toLocaleString();

      table.push([index + 1, type, repoName, date]);
    });

    logger.info(table.toString());
  } catch (error) {
    spinner.fail('Failed to fetch activity.');
    logger.error(error.message);
  }
}
