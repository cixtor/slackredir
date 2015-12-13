### Slack-Redir Patcher

Slack, the _"messaging app for teams"_ uses a peculiar technique very common in forums and other board-like websites; they patch every link posted in public and private channels as well as private chat sessions to override the _mouseOver_ and _onClick_ events; this allows them to [1] inject some kind of hotlinking protection, [2] track external links posted in their service, and [3] probably something else that I _(as an outsider)_ do not know.

Some time ago I built [Pastio](http://cixtor.com/pastio) a pastebin-like web service that was later integrated in the internal toolset of my current employer [Sucuri](https://pastebin.sucuri.net/); one of its features is the ability to create private posts which obviously should not be visible outside of our network. When my co-workers share links on Slack _(as we are using this service for our communication)_ the redirection patch _(probably?)_ tracks the private links.

This Chrome extension aims to fix this _(security?)_ issue by re-patching the _mouseOver_ and _onClick_ events in the reflow of the DOM, this way you can click and/or right-click the links posted in the channels or private sessions without leaking sensitive information.

### Slow Experience

Note that due to the way JavaScript works there is no way to accurately detect changes in the DOM, so the reflow of the webpages that occurs when one switches between channels and/or private sessions may not be detected on time, and even if the reflow is detected the code used to power Slack is complex enough to trigger multiple reflows per each action so the extension will trigger the patcher multiple times making the webview significantly slow. Slack is slow by itself so you will not notice the difference.

### Installation

1. Clone or download this repository
2. Using Chromium open this: chrome://extensions/
3. Click the _"Load unpacked extension"_ button
4. Browse your disk and select the extension
5. ???
6. Profit

Additionally, I recommend you to add _"slack-redir.net"_ to your hosts file and point it to a loopback address like _"127.0.0.1"_; this is to prevent the accidental click of a link that was not caught by the extension DOM reflow patcher _(which may happen from time to time)_.

```
$ echo "127.0.0.1  slack-redir.net" | sudo tee -a /etc/hosts
```

### License

```
The MIT License (MIT)

Copyright (c) 2015 CIXTOR

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
