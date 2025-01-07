# GitHub User Activity CLI

## Project Overview

The **GitHub User Activity CLI** is a simple command-line application that allows you to fetch and display a GitHub user's recent activity directly in your terminal. This tool is ideal for practicing Node.js skills, including working with APIs, handling JSON data, and building CLI applications.

---

## Features

- Fetch recent GitHub user activity via the [GitHub API](https://api.github.com).
- Display activity in a structured table format.
- Filter activity by event type (e.g., `PushEvent`).
- Limit the number of displayed events.
- Fetch and display general profile information of a GitHub user.
- Handles errors gracefully, including invalid usernames or API failures.

---

## Requirements

- Node.js v18 or later.
- `type`: `module` enabled in the `package.json`.

### Libraries Used

- [`chalk`](https://www.npmjs.com/package/chalk): For styling terminal output.
- [`ora`](https://www.npmjs.com/package/ora): For creating terminal spinners.
- [`cli-table3`](https://www.npmjs.com/package/cli-table3): For displaying data in a tabular format.
- [`commander`](https://www.npmjs.com/package/commander): For handling CLI commands and options.
- [`node-fetch`](https://www.npmjs.com/package/node-fetch): For making API requests.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/github-user-activity.git
   cd github-user-activity
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   node src/index.js <username>
   ```

---

## Usage

### Basic Command

Fetch the activity of a GitHub user:

```bash
node src/index.js <username>
```

Example:

```bash
node src/index.js kamranahmedse
```

### Options

- `--profile`: Display general information about the user profile.
- `-t, --type <type>`: Filter events by a specific type (e.g., `PushEvent`).
- `-l, --limit <number>`: Limit the number of displayed events.

#### Examples

1. Fetch profile information:

   ```bash
   node src/index.js <username> --profile
   ```

2. Fetch and filter by event type:

   ```bash
   node src/index.js <username> -t PushEvent
   ```

3. Fetch and limit the number of displayed events:

   ```bash
   node src/index.js <username> -l 5
   ```

4. Combine options:
   ```bash
   node src/index.js <username> -t PushEvent -l 3
   ```

---

## Project Structure

```
.github-user-activity
├── src
│   ├── commands
│   │   ├── fetchUserActivity.js
│   │   └── fetchUserProfile.js
│   ├── utils
│   │   ├── api.js
│   │   └── logger.js
│   └── index.js
├── package.json
└── README.md
```

### Key Files

1. **`src/index.js`**: Entry point for the CLI.
2. **`src/commands/`**: Contains command implementations for fetching user activity and profile information.
3. **`src/utils/api.js`**: Handles API calls to GitHub.
4. **`src/utils/logger.js`**: Provides logging functions for styled terminal output.

---

## API Reference

### Endpoints Used

1. **User Events Endpoint**:

   ```
   https://api.github.com/users/<username>/events
   ```

   - Fetches a user's public events.
   - Example: [https://api.github.com/users/kamranahmedse/events](https://api.github.com/users/kamranahmedse/events).

2. **User Profile Endpoint**:
   ```
   https://api.github.com/users/<username>
   ```
   - Fetches general information about a GitHub user.
   - Example: [https://api.github.com/users/kamranahmedse](https://api.github.com/users/kamranahmedse).

---

## Error Handling

- Invalid username: Displays a warning message and stops execution.
- API failures (e.g., rate limiting): Displays an error message and logs the issue.
- Empty results: Notifies the user if no events match the filter criteria.

---

## Future Enhancements

- Cache results locally to reduce API requests.
- Add support for pagination.
- Include more detailed event information (e.g., commit messages for `PushEvent`).
- Allow filtering by date range.
- Add tests to validate CLI functionality.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
