# 无能

## Environment setup

```bash
sudo apt-get install git

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install v18.14.1

sudo apt install ffmpeg

sudo apt-get install build-essential

sudo apt-get install libtool-bin

```

### Project setup

```bash
git clone https://gitlab.com/quangpao/wuneng-bot.git

cd wuneng-bot

npm install

cat > .env (input your TOKENID and ClientID)

node .
```
