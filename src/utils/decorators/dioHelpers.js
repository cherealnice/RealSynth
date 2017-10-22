export const withHelpers = (helpers = {}) => (
  Component => (props = {}) => (
    <Component {...props} {...helpers} />
  )
)
