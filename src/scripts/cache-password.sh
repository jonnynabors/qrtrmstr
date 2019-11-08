#!/usr/bin/env bash
# stops the execution of a script if a command or pipeline has an error 
set -e

# invalidates the user's cached credentials.  In other words, the next time sudo is run a password will be required.
sudo -K
sudo true;
clear