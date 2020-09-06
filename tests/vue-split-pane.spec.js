import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import VueSplitPane from '../src/VueSplitPane.vue';

test('renders vue split pane component', () => {
  const { getByText, queryByText } = render(VueSplitPane, {
    scopedSlots: {
      left: '<section slot="left">Left Pane</section>',
      right: '<section slot="right">Right Pane</section>',
    },
  });

  expect(queryByText('Center Pane')).not.toBeInTheDocument();

  getByText('Left Pane');
  getByText('Right Pane');
});
