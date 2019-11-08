if hash brew 2>/dev/null; then
  echo "Homebrew is already installed!"
else
  echo "Installing Homebrew..."
  yes '' | ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

echo "Ensuring you have the latest Homebrew..."
brew update

echo "Ensuring your Homebrew directory is writable..."
sudo chown -R $(whoami) /usr/local/bin

echo "Installing Homebrew services..."
brew tap homebrew/services

echo "Upgrading existing brews..."
brew upgrade

echo "Cleaning up your Homebrew installation..."
brew cleanup

# TODO: Check to see if you need to do this with a fresh homebrew installation
# echo
# echo "Adding Homebrew's sbin to your PATH..."
# echo 'export PATH="/usr/local/sbin:$PATH"' >> ~/.bash_profile