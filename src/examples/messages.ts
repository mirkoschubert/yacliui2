import { Found, FoundOf, Headline, Message, State } from '../lib/messages'
import { Alignment } from '../lib/utils'

Headline('This is a headline', Alignment.Left)
Headline('This is a headline', Alignment.Center)
Headline('This is a headline', Alignment.Right)

Message('This is a text without any state')
Message('This is a info text', State.Info, true)
Message('This is a info text', State.OK, true)
Message('This is a info text', State.Warning, false)
Message('This is a info text', State.Error, true)

Found(12, ['point', 'points'])
FoundOf(4, ['dot', 'dots'], 10, ['point', 'points'])
