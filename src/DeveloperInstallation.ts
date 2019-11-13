import { spawn } from 'child_process'
import * as execa from 'execa'
import * as Listr from 'listr'
import { fromEvent, Observable } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'

export async function DeveloperInstallation() {
    await cachePassword()
    const homeBrewProcess = spawn('yarn', ['homebrew'])
    const anythingToString = (anything: any) => anything.toString()

    const tasks = new Listr([
        {
            title: 'Installing Homebrew',
            task: async () => {
                return new Observable(observer => {
                    const data$ = fromEvent(homeBrewProcess.stdout, 'data')
                    const complete$ = fromEvent(homeBrewProcess, 'exit')
                    data$
                        .pipe(map(anythingToString), takeUntil(complete$))
                        .subscribe(observer)
                })
            },
        },
        {
            title: 'Making your terminal better with Oh-My-ZSH',
            task: () => {
                return new Observable(observer => {
                    spawn('yarn', ['zsh'])
                        .on('exit', () => observer.complete())
                        .stdout.on('data', data =>
                            observer.next(data.toString())
                        )
                })
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
