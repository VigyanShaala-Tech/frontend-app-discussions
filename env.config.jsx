import React from 'react';
import { PLUGIN_OPERATIONS, DIRECT_PLUGIN } from '@openedx/frontend-plugin-framework';
import Header from '@edx/frontend-component-header';
import { CustomCourseTabsNavigation } from './src/custom-discussions';

const getPluginSlots = () => ({
  discussions_mfe_header_plugin_slot: {
    plugins: [
      {
        op: PLUGIN_OPERATIONS.Insert,
        widget: {
          id: 'discussions_mfe_header_plugin_slot',
          type: DIRECT_PLUGIN,
          priority: 1,
          RenderWidget: () => <Header />,
        },
      },
    ],
  },
  discussions_mfe_course_tabs_plugin_slot: {
    keepDefault: false,
    plugins: [
      {
        op: PLUGIN_OPERATIONS.Insert,
        widget: {
          id: 'discussions_mfe_course_tabs_plugin_slot',
          type: DIRECT_PLUGIN,
          priority: 1,
          RenderWidget: (props) => <CustomCourseTabsNavigation {...props} />,
        },
      },
    ],
  },
});

const config = {
  ...process.env,
  get pluginSlots() {
    return getPluginSlots();
  },
};

export default config;
