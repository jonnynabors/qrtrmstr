import { Command } from '@oclif/command'
import * as inquirer from 'inquirer'

export class DevelopmentTypes extends Command {
    async run() {
        return inquirer.prompt([
            {
                name: 'types',
                message: 'I am interested in setting up my machine for...',
                type: 'checkbox',
                choices: [
                    { name: 'Node/Javascript', value: 'install-node' },
                    { name: 'Ruby', value: 'install-ruby' },
                ],
                validate: answers => {
                    if (answers.length < 1) {
                        return 'You must choose at least one option. Maybe the bottom option for a generic installation?'
                    }
                    return true
                },
            },
        ])
    }
}
