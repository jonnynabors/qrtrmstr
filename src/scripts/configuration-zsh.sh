echo 'Downloading and install oh-my-zsh'
# TODO: Test if this works out of the box with a new machine
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" "" --unattended

echo 'Setting up Bat, for prettier terminals https://github.com/sharkdp/bat#installation'
brew install bat

if grep -Fxq "alias cat=bat" ~/.zshrc
then
    echo "Not aliasing cat to bat because you've already done that!"
else
    echo "Aliasing cat to bat!"
    echo "alias cat=bat" >> ~/.zshrc
fi
