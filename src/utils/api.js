import fetch from 'node-fetch';

const GITHUB_API_URL = 'https://api.github.com';

export async function fetchUserActivity(username) {
  const url = `${GITHUB_API_URL}/users/${username}/events`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub activity for ${username}.`);
  }

  const events = await response.json();

  return events;
}

export async function fetchUserProfile(username) {
  const url = `${GITHUB_API_URL}/users/${username}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch GitHub profile for ${username}. Status: ${response.status}`
    );
  }

  const profileData = await response.json();

  return profileData;
}
