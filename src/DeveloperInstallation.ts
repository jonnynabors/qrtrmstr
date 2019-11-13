import { spawn } from 'child_process'
import * as execa from 'execa'
import * as Listr from 'listr'

import { executeTask } from './Makerator'

export async function DeveloperInstallation(types?: { types: string[] }) {
    await cachePassword()
    const tasks = new Listr([
        {
            title: 'Installing Homebrew',
            task: async () => {
                const homebrew = spawn('yarn', ['homebrew'])
                return executeTask(homebrew)
            },
        },
        {
            title: 'Making your terminal better with Oh-My-ZSH',
            task: async () => {
                const zsh = spawn('yarn', ['zsh'])
                return executeTask(zsh)
            },
        },
        {
            title: 'Defining some helpful defaults for Mac OSX',
            task: async () => {
                const mac = spawn('yarn', ['mac'])
                return executeTask(mac)
            },
        },
        {
            title: `Let's get some permissions out of the way`,
            task: async () => {
                const open = spawn('yarn', ['open-apps'])
                return executeTask(open)
            },
        },
        {
            title: 'Setting up git!',
            task: async () => {
                const git = spawn('yarn', ['git'])
                return executeTask(git)
            },
        },
        {
            title: 'jonny',
            task: () => '',
        },
    ])

    await tasks.run()
}

async function cachePassword() {
    console.log('Caching password for installations...')
    await execa(`${__dirname}/scripts/cache-password.sh`, {
        shell: true,
    }).catch(() => console.log('An error occurred while caching the password.'))
}
