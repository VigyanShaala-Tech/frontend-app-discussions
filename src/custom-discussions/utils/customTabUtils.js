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

/**
 * Build absolute learning-MFE URLs for custom tabs so clicks leave discussions
 * and open the matching tab page in frontend-app-learning.
 *
 * Example:
 * http://apps.local.openedx.io:2000/learning/course/course-v1:OpenedX+DemoX+DemoCourse/hangout
 */
export const buildCustomTabUrl = (courseId, tabSlug) => {
  const pathKey = PATH_KEY_BY_SLUG[tabSlug];
  const pathTemplate = pathKey ? CUSTOM_TAB_PATHS[pathKey] : null;

  if (!courseId || !pathTemplate) {
    return null;
  }

  // Keep course id readable (: and +) — do not encodeURIComponent.
  const coursePath = pathTemplate.replace(':courseId', courseId);
  const learningBaseUrl = (getConfig().LEARNING_BASE_URL || '').replace(/\/$/, '');

  if (!learningBaseUrl) {
    return `/learning${coursePath}`;
  }

  // LEARNING_BASE_URL may be host only (…:2000) or already include /learning.
  if (learningBaseUrl.endsWith('/learning')) {
    return `${learningBaseUrl}${coursePath}`;
  }

  return `${learningBaseUrl}/learning${coursePath}`;
};
