import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';

import { buildCustomTabUrl, CUSTOM_TAB_SLUGS } from '../utils/customTabUtils';
import messages from './messages';

import '../../components/NavigationBar/navBar.scss';
import '../styles/CustomCourseTabsNavigation.scss';

const CustomCourseTabsNavigation = ({
  activeTabSlug,
  className,
  courseId: courseIdProp,
  tabs: tabsProp,
}) => {
  const intl = useIntl();
  const {
    tabs: storeTabs,
    courseId: storeCourseId,
  } = useSelector(state => state.courseTabs);

  const tabs = tabsProp || storeTabs || [];
  const courseId = courseIdProp || storeCourseId;
  const resolvedActiveTabSlug = activeTabSlug || 'discussion';

  const customTabs = [
    {
      slug: CUSTOM_TAB_SLUGS.hangout,
      title: intl.formatMessage(messages.hangout),
      url: buildCustomTabUrl(courseId, CUSTOM_TAB_SLUGS.hangout),
    },
    {
      slug: CUSTOM_TAB_SLUGS.updates,
      title: intl.formatMessage(messages.updates),
      url: buildCustomTabUrl(courseId, CUSTOM_TAB_SLUGS.updates),
    },
    {
      slug: CUSTOM_TAB_SLUGS.bookmark,
      title: intl.formatMessage(messages.bookmark),
      url: buildCustomTabUrl(courseId, CUSTOM_TAB_SLUGS.bookmark),
    },
    {
      slug: CUSTOM_TAB_SLUGS.leaderboard,
      title: intl.formatMessage(messages.leaderboard),
      url: buildCustomTabUrl(courseId, CUSTOM_TAB_SLUGS.leaderboard),
    },
    {
      slug: CUSTOM_TAB_SLUGS.live_session,
      title: intl.formatMessage(messages.liveSession),
      url: buildCustomTabUrl(courseId, CUSTOM_TAB_SLUGS.live_session),
    },
  ].filter(tab => Boolean(tab.url));

  const normalizeTabSlug = (slug) => (
    slug === 'livesession' ? CUSTOM_TAB_SLUGS.live_session : slug
  );

  const normalizedTabs = tabs.map((tab) => {
    const slug = normalizeTabSlug(tab.slug);

    if (slug === CUSTOM_TAB_SLUGS.live_session) {
      return {
        ...tab,
        slug,
        url: buildCustomTabUrl(courseId, CUSTOM_TAB_SLUGS.live_session) || tab.url,
      };
    }

    if (slug === CUSTOM_TAB_SLUGS.leaderboard) {
      return {
        ...tab,
        slug,
        url: buildCustomTabUrl(courseId, CUSTOM_TAB_SLUGS.leaderboard) || tab.url,
      };
    }

    return { ...tab, slug };
  });

  const existingSlugs = new Set(normalizedTabs.map(tab => tab.slug));
  const mergedTabs = [
    ...normalizedTabs,
    ...customTabs.filter(tab => !existingSlugs.has(tab.slug)),
  ];

  return (
    <div
      id="courseTabsNavigation"
      className={classNames('course-tabs-navigation custom-course-tabs-navigation px-4 bg-white', className)}
    >
      {!!mergedTabs.length && (
        <nav
          className="nav nav-underline-tabs custom-course-tabs-navigation__nav"
          aria-label={intl.formatMessage(messages.courseMaterial)}
        >
          {mergedTabs.map(({ url, title, slug }) => (
            <a
              key={slug}
              className={classNames(
                'nav-item flex-shrink-0 nav-link custom-course-tabs-navigation__link',
                { active: slug === resolvedActiveTabSlug },
              )}
              href={url}
            >
              {title}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
};

CustomCourseTabsNavigation.propTypes = {
  activeTabSlug: PropTypes.string,
  className: PropTypes.string,
  courseId: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
};

CustomCourseTabsNavigation.defaultProps = {
  activeTabSlug: 'discussion',
  className: null,
  courseId: undefined,
  tabs: undefined,
};

export default CustomCourseTabsNavigation;
