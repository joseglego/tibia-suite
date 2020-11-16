const fetchHTML = require('../../utils/fetchHTML')
const getWorlds = require('../getWorlds')

const worldsPage = require('../../../test/stubs/worldsPage.js')
const worldsResponse = require('../../../test/stubs/worldsResponse.json')

jest.mock('../../utils/fetchHTML')

describe('getWorlds', () => {
  it('get list of worlds from web page', async () => {
    fetchHTML.mockResolvedValue(worldsPage)

    const worlds = await getWorlds()
    expect(worlds).toEqual(worldsResponse)
  })
})
