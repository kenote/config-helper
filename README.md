# config-helper

Configuration helper

[![Build Status][travis-image]][travis-url]
[![Gratipay][licensed-image]][licensed-url]

## Installation

```bash
$ npm install kenote-config-helper
# Or
$ yarn add kenote-config-helper
```

## Usages

### Create Channel

`/data/channels/account.yml`

```yaml
---
# 频道 我的帐户 配置 ####################################################################
######################################################################################

# 频道 ID
id            : 1
# 频道名称
name          : 我的帐户
# 频道标识
label         : account
# 频道描述
description   : 查看和管理自己的信息、活动、安全选项和隐私偏好设置
# 默认打开页面
default       : /account/baseinfo
# 自定义参数
options:
  # 用户方案类型
  plan_type:
    - key           : ditch
      name          : 渠道
    - key           : sendmail
      name          : 系统邮件
# 频道导航
navs:
  # 导航分栏 -- 帐户管理
  - index         : 1-1
    name          : 帐户管理
    icon          : iconfont icon-passport
    children:
      - index         : /account/baseinfo
        name          : 基本资料
      - index         : /account/security
        name          : 安全设置
      - index         : /account/plan
        name          : 方案管理
```

`app.ts`

```typescript
import { KenoteConfig, Channel, getChannelId } from 'kenote-config-helper'
import { loadData } from 'kenote-config-helper/utils.server'

const channels: KenoteConfig.Channel[] = <KenoteConfig.Channel[]> loadData('data/channels', 'array')

const channelId: number = getChannelId('/account/baseinfo')
const channel: KenoteConfig.Channel | undefined = channels.find( _channel => _channel.id === channelId )

if (channel) {
  let nav: Navigation = new Channel(channel).find('/account/baseinfo')
  /** value for nav
   * {
   *   index  : '/account/baseinfo',
   *   name   : '基本资料'
   * }
   **/
}
```

## License

this repo is released under the [MIT License][licensed-url].

[travis-image]: https://travis-ci.com/kenote/config-helper.svg?branch=master
[travis-url]: https://travis-ci.com/kenote/config-helper
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/config-helper/blob/master/LICENSE