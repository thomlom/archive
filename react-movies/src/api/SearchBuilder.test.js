import SearchBuilder, { BASE_URL } from './SearchBuilder'

it('Should have BASE_URL as the initial url', () => {
  let search = new SearchBuilder()
  expect(search.url).toEqual(BASE_URL)
})

it('Should set the title correctly', () => {
  let search = new SearchBuilder()
  let titleParam = "&s=gladiator"
  expect(search.url).not.toContain(titleParam)
  search.title('gladiator')
  expect(search.url).toContain(titleParam)
})

