import { getChannelId, Channel, accessNavs } from '../src'
import { KenoteConfig, Navigation } from '../types'
import { loadData } from '../src/utils.server'

let channels: KenoteConfig.Channel[] = []

describe('Channel ->\n', () => {

  beforeAll( () => {
    channels = <KenoteConfig.Channel[]> loadData('tests/config/channels', 'array')
  })

  test('Function: gerChannelId = (\'/account/baseinfo\') => 1', () => {
    let channelId: number = getChannelId(channels, '/account/baseinfo')
    expect(channelId).toBe(1)
  })

  test('Function: gerChannelId = (\'/account/baseinfo2\') => -1', () => {
    let channelId: number = getChannelId(channels, '/account/baseinfo2')
    expect(channelId).toBe(-1)
  })

  test('Function: accessNavs = (navs, [\'/account/baseinfo\']) => navs', () => {
    let channel: KenoteConfig.Channel = channels[0]
    let navs: Navigation[] = accessNavs(channel.navs, ['/account/baseinfo'])
    let nav: Navigation | undefined = new Channel(channel).find('/account/baseinfo', navs)
    expect(nav && nav.disabled).toBe(false)
  })

  test('Class: new Channel(channel).find = (\'/account/baseinfo\') => \{ index\: \'/account/baseinfo\', name\: \'基本资料\' \}', () => {
    let channel: Channel = new Channel(channels[0])
    let nav: Navigation | undefined = channel.find('/account/baseinfo')
    expect(nav).toMatchObject({
      index: '/account/baseinfo',
      name: '基本资料',
    })
  })

  afterAll( () => {
    channels = []
  })
})
