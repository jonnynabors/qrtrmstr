import { spawn } from 'child_process'
import * as execa from 'execa'
import * as Listr from 'listr'
import { fromEvent, Observable } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'

import { executeTask } from './Makerator'

export async function DeveloperInstallation() {
    await cachePassword()
    const homebrew = spawn('yarn', ['homebrew'])
    const zsh = spawn('yarn', ['zsh'])

    const tasks = new Listr([
        {
            title: 'Installing Homebrew',
            task: async () => {
                return executeTask(homebrew)
            },
        },
        {
            title: 'Making your terminal better with Oh-My-ZSH',
            task: () => {
                return executeTask(zsh)
            },
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
