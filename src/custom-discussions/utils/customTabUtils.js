import { getConfig } from '@edx/frontend-platform';

import { CUSTOM_TAB_PATHS } from '../constants/customTabRoutes';

export const CUSTOM_TAB_SLUGS = {
  hangout: 'hangout',
  updates: 'updates',
  bookmark: 'bookmark',
  leaderboard: 'leaderboard',
  live_session: 'live_session',
};

const PATH_KEY_BY_SLUG = {
  [CUSTOM_TAB_SLUGS.hangout]: 'hangout',
  [CUSTOM_TAB_SLUGS.updates]: 'updates',
  [CUSTOM_TAB_SLUGS.bookmark]: 'bookmark',
  [CUSTOM_TAB_SLUGS.leaderboard]: 'leaderboard',
  [CUSTOM_TAB_SLUGS.live_session]: 'liveSession',
};

export const buildCustomTabUrl = (courseId, tabSlug) => {
  const pathKey = PATH_KEY_BY_SLUG[tabSlug];
  const pathTemplate = pathKey ? CUSTOM_TAB_PATHS[pathKey] : null;

  if (!courseId || !pathTemplate) {
    return null;
  }

  const coursePath = pathTemplate.replace(':courseId', courseId);
  const learningBaseUrl = (getConfig().LEARNING_BASE_URL || '').replace(/\/$/, '');

  if (!learningBaseUrl) {
    return `/learning${coursePath}`;
  }

  if (learningBaseUrl.endsWith('/learning')) {
    return `${learningBaseUrl}${coursePath}`;
  }

  return `${learningBaseUrl}/learning${coursePath}`;
};
