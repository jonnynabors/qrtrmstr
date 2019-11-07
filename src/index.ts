/*
 *   Copyright (c) 2019 Ford Motor Company
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import { Command, flags } from '@oclif/command';
import { title } from './constants';
import { UserType } from './commands/UserType';
import { NetworkType } from './commands/NetworkTypes';
import { MachineType } from './commands/MachineType';
import { DevelopmentTypes } from './commands/DevelopmentTypes';

class Qrtrmstr extends Command {
  static description = 'describe the command here';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' })
  };

  static args = [{ name: 'file' }];
  async run() {
    const { args, flags } = this.parse(Qrtrmstr);

    this.log(`${title}`);

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }

    const user: any = await UserType.run();
    this.log(`you selected ${user.type}`);
    const network: any = await NetworkType.run();
    this.log(`your network is ${network.type}`);
    const machine: any = await MachineType.run();
    this.log(`your machine is a ${machine.type}`);
    const developmentTypes: any = await DevelopmentTypes.run();
    this.log(`your intended types are ${developmentTypes.types}`);
  }
}

export = Qrtrmstr;
