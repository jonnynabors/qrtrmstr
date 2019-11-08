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

import { DevelopmentTypes } from './commands/DevelopmentTypes';
import { MachineType } from './commands/MachineType';
import { NetworkType } from './commands/NetworkTypes';
import { UserType } from './commands/UserType';
import { title } from './constants';
import { checkNetworkConnectivity } from './utilities/NetworkCheck';
import { DeveloperInstallation } from './DeveloperInstallation';

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

    await UserType.run();
    await NetworkType.run();
    // TODO: Tell the user to set/unset appropriate proxies
    try {
      checkNetworkConnectivity();
    } catch (error) {
      this.log(
        `Hmmm, we're having trouble reaching the internet. Please try again with the proper network settings.`
      );
      return;
    }

    const machine: any = await MachineType.run();
    if (machine.type === 'Windows') {
      this.log(
        `Unfortunately, Windows is not currently supported. If you'd like to see Windows support, please open a Pull Request.`
      );
      return;
    }
    const developmentTypes: any = await DevelopmentTypes.run();
    this.log(`your intended types are ${developmentTypes.types}`);

    await DeveloperInstallation();
  }
}

export = Qrtrmstr;
