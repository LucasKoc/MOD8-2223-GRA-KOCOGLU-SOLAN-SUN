function createPagination(page, size, count) {
  size = Number.parseInt(size)
  size = Number.isNaN(size) || size < 1 ? this.defaultPageSize : Math.min(size, this.maximumPageSize)

  const firstPage = 1
  const lastPage = Math.max(1, Math.ceil(count / size))

  page = Number.parseInt(page)
  page = Number.isNaN(page) ? firstPage : Math.max(firstPage, Math.min(page, lastPage))

  const previousPage = page > firstPage ? page - 1 : undefined
  const nextPage = page < lastPage ? page + 1 : undefined

  return { page, size, firstPage, previousPage, nextPage, lastPage, count }
}

function createPageLinks(pagination, path, query) {
  path = path ?? ''

  // Create shallow copy of query.
  query = Object.assign({}, query)

  if (pagination.size !== this.defaultPageSize) {
    query.size = pagination.size
  } else {
    delete query.size
  }

  const links = {}

  query.page = pagination.firstPage
  links.firstPage = this.createPageLink(path, query)

  if (pagination.previousPage) {
    query.page = pagination.previousPage
    links.previousPage = this.createPageLink(path, query)
  }

  if (pagination.nextPage) {
    query.page = pagination.nextPage
    links.nextPage = this.createPageLink(path, query)
  }

  query.page = pagination.lastPage
  links.lastPage = this.createPageLink(path, query)

  return links
}

function createPageLink(path, query) {
  const parameters = []

  for (const property in query) {
    const value = query[property]
    if (value !== undefined && value !== null && !(property === 'page' && value === 1)) {
      parameters.push(`${property}=${value}`)
    }
  }

  return `${path}?${parameters.join('&')}`
}

export function createPaginator(defaultPageSize, maximumPageSize) {
  defaultPageSize = defaultPageSize >= 1 ? defaultPageSize : 20
  maximumPageSize = maximumPageSize >= defaultPageSize ? maximumPageSize : 100
  return Object.freeze({ defaultPageSize, maximumPageSize, createPagination, createPageLinks, createPageLink })
}

export default createPaginator
