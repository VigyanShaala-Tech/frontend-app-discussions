import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { StrictMode } from 'react';

// eslint-disable-next-line import/no-unresolved
import { createRoot } from 'react-dom/client';

import {
  APP_INIT_ERROR, APP_READY, initialize, mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

import Head from './components/Head/Head';
import { DiscussionsHome } from './discussions';
import messages from './i18n';
import store from './store';
import { useState, useEffect } from 'react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import RestrictionPage from './restriction-page/RestrictionPage';
import { getConfig } from '@edx/frontend-platform';

import './index.scss';

const RestrictionWrapper = () => {
  const [hasProfileCompleted, setHasProfileCompleted] = useState(true);
  const [canAccessPage, setCanAccessPage] = useState(true);

  useEffect(() => {
    const { LMS_BASE_URL } = getConfig();

    const loadProfileCompletion = async () => {
      try {
        const client = getAuthenticatedHttpClient();
        const { data } = await client.get(`${LMS_BASE_URL}/profile/progress/?role=student`);
        if (data?.percentage === 100) {
          setHasProfileCompleted(true);
        } else {
          setHasProfileCompleted(false);
        }
        setCanAccessPage(data.hidden);

      } catch (err) {
        console.error('Failed to load profile progress:', err);
        setHasProfileCompleted(false);
      }
    };

    loadProfileCompletion();
  }, []);

  if (!hasProfileCompleted && !canAccessPage) {
    return <RestrictionPage />;
  }
};

const rootNode = createRoot(document.getElementById('root'));
subscribe(APP_READY, () => {
  rootNode.render(
    <StrictMode>
      <AppProvider store={store}>
        <RestrictionWrapper />
        <Head />
        <DiscussionsHome />
      </AppProvider>
    </StrictMode>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  rootNode.render(<ErrorPage message={error.message} />);
});

initialize({
  requireAuthenticatedUser: true,
  messages,
  handlers: {
    config: () => {
      mergeConfig({
        LEARNING_BASE_URL: process.env.LEARNING_BASE_URL,
        LEARNER_FEEDBACK_URL: process.env.LEARNER_FEEDBACK_URL,
        STAFF_FEEDBACK_URL: process.env.STAFF_FEEDBACK_URL,
        ENABLE_PROFILE_IMAGE: process.env.ENABLE_PROFILE_IMAGE,
      }, 'DiscussionsConfig');
    },
  },
});
