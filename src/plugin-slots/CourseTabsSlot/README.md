# `discussions_mfe_course_tabs_plugin_slot`

Extends course tabs navigation with the same custom tabs as the learning MFE
(Hangout, Updates, Bookmark, Leaderboard, Live-Session). Tab clicks navigate
to the matching pages in `frontend-app-learning`.

## Configuration

```jsx
import { PLUGIN_OPERATIONS, DIRECT_PLUGIN } from '@openedx/frontend-plugin-framework';
import { CustomCourseTabsNavigation } from '../../custom-discussions';

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
```
