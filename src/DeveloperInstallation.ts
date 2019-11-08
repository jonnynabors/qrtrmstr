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
import { spawn } from 'child_process';
import * as execa from 'execa';
import * as Listr from 'listr';
import { Observable } from 'rxjs';

export async function DeveloperInstallation() {
  await cachePassword();

  const tasks = new Listr([
    {
      title: 'Installing Homebrew',
      task: async () => {
        return new Observable(observer => {
          spawn('yarn', ['homebrew'])
            .on('exit', () => observer.complete())
            .stdout.on('data', data => observer.next(data.toString()));
        });
      }
    },
    {
      title: 'Making your terminal better with Oh-My-ZSH',
      task: () => {
        return new Observable(observer => {
          spawn('yarn', ['zsh'])
            .on('exit', () => observer.complete())
            .stdout.on('data', data => observer.next(data.toString()));
        });
      }
    }
  ]);
  await tasks.run();
}

async function cachePassword() {
  console.log('Caching password for installations...');
  await execa(`${__dirname}/scripts/cache-password.sh`, { shell: true }).catch(
    () => console.log('An error occurred while caching the password.')
  );
}
