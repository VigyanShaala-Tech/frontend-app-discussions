from tutor import hooks

hooks.Filters.ENV_PATCHES.add_item(
    (
        "mfe-env-config-runtime-definitions-discussions",
        """
        // This file contains configuration for plugins and environment variables.
const { PLUGIN_OPERATIONS, DIRECT_PLUGIN } = await import('@openedx/frontend-plugin-framework');
const { default: Header } = await import('@edx/frontend-component-header');
const { CustomCourseTabsNavigation } = await import('./src/custom-discussions');
{% raw %}
config = {
  ...config,
  ...process.env,
}
config.pluginSlots = {
  discussions_mfe_header_plugin_slot: {
    plugins: [
      {
        op: PLUGIN_OPERATIONS.Insert,
        widget: {
          id: 'discussions_mfe_header_plugin_slot',
          type: DIRECT_PLUGIN,
          priority: 1,
          RenderWidget: (props) => <Header />,
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
};
{% endraw %}
"""
    ))
