const PARAM_REGEX = /:(?<param>\w+)(?<optional>\?)?/g

export function compileRouteRegex (path) {
  const regex = path.replace(PARAM_REGEX, (_, param, optional = '') => {
    return `(?<${param}>[^/]+)${optional}`
  })

  return new RegExp(`^${regex}$`)
}
