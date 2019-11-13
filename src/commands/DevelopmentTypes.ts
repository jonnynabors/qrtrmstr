import { Command } from '@oclif/command'
import * as inquirer from 'inquirer'

export class DevelopmentTypes extends Command {
    async run() {
        return inquirer.prompt([
            {
                name: 'types',
                message: 'I am interested in setting up my machine for...',
                type: 'checkbox',
                choices: ['Node/JavaScript', 'Java', 'Docker', 'Ruby'],
            },
        ])
    }
}
