import { client } from './util/client-config'
export default client

import dogCommand from './commands/fun/dog'
dogCommand.run()

import setprefixCommand from './commands/config/set-prefix'
setprefixCommand.run()