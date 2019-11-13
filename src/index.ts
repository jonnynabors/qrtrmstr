import { Command, flags } from '@oclif/command'

import { DevelopmentTypes } from './commands/DevelopmentTypes'
import { UserType } from './commands/UserType'
import { title } from './constants'
import { checkNetworkConnectivity } from './utilities/NetworkCheck'
import { DeveloperInstallation } from './DeveloperInstallation'

class Qrtrmstr extends Command {
    static description = 'describe the command here'

    static flags = {
        // add --version flag to show CLI version
        version: flags.version({ char: 'v' }),
        help: flags.help({ char: 'h' }),
        // flag with a value (-n, --name=VALUE)
        name: flags.string({ char: 'n', description: 'name to print' }),
        // flag with no value (-f, --force)
        force: flags.boolean({ char: 'f' }),
    }

    static args = [{ name: 'file' }]
    async run() {
        const { args, flags } = this.parse(Qrtrmstr)

        this.log(`${title}`)

        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`)
        }

        await UserType.run()
        try {
            checkNetworkConnectivity()
        } catch (error) {
            this.log(
                `Hmmm, we're having trouble reaching the internet. Please try again with the proper network settings.`
            )
            return
        }

        const developmentTypes: {
            types: string[]
        } = await DevelopmentTypes.run()

        await DeveloperInstallation(developmentTypes)
    }
}

export = Qrtrmstr
