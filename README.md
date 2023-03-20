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

| Command | Description |
|---|---|
| `/autoplay` | Turn `on/off` the autoplay mode.<br>This mode on will play the `first` song it found in the related list. |
| `/jump` | Jump to specific song (`forward or backward`) by choosing it in the dropdown menu. |
| `/pause` | `Pause/Resume` the song temporarily.<br>**Note**: This can be use to handle both _pause/resume_ option. |
| `/play [URL/name]` | Play song base on input URL or name.<br>The name option will search **the most accordant song** and **add it to the queue**.<br><br>Example: `/play flowers miley` will play the song [Miley Cyrus - Flowers (Lyrics)](https://www.youtube.com/watch?v=xleJPaDWpwc) or the remains. |
| `/previous` | Play the previous song in the queue (The queue won't show those songs up due to the command `/jump` added). |
| `/queue` | Show the songs queue and some common information. |
| `/repeat [mode]` | Repeat base on input mode. There are 3 mode now: **Song**, **Queue**, **Disable**. <br>**Song** mode: Repeat a _single song_. (If your song get stuck, try to disable the repeat mode first).<br>**Queue** mode: Repeat a _whole queue_.<br>**Disable** mode: Turn _off_ the repeat mode.<br><br>Example: `/repeat Queue`.  |
| `/search [query]` | Same as `/play` command. But you can choose a song to `play/add to queue` in the list including 5 most related song.<br><br>Example: `/search flowers miley` will show up to 5 video for you to choose. |
| `/seek [duration]` | Seek to the specific duration in the current song.<br><br>Example: `/seek 100`. Seek to the position 1m40s (1 minute 40 seconds) |
| `/shuffle` | Shuffle the queue order. The first one can be the last one or somewhere else in the queue. |
| `/skip` | Play the next song in the queue. |
| `/stop` | Stop playing song and clear the whole queue. |
| `/volume` | Adjust the song volumn (It will be set back to `100` after having a new queue. |