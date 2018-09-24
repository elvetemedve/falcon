import { themed } from '../theme';

export const Text = themed({
  tag: 'p',
  defaultProps: {
    ellipsis: false
  },
  defaultTheme: {
    text: {
      display: 'block',
      pb: 'md',
      m: 'none',
      css: ({ ellipsis }) => (ellipsis ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : {})
    }
  }
});
