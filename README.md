# Illy Gif!

**Preview Illustrator layers as animated gif.**

## Installation

First, install [ImageMagick<sup>®</sup>](http://www.imagemagick.org/) (assuming [Homebrew](http://brew.sh/) is your package manager):

```bash
$ brew install imagemagick
```

Use the below single-line bash command(s) to install this script into your Illustrator `Scripts` folder.

```bash
INSTALL="/Applications/Adobe Illustrator CC 2015/Presets.localized/en_US/Scripts/@mhulse"; mkdir -pv "$INSTALL" && curl -#L https://github.com/mhulse/illy-gif/tarball/master | tar -xzv --strip-components 1 --include="*/*.jsx" --exclude=*/**/* -C "$INSTALL";
```

Run the script from the scripts menu in Illustrator.

Voilà!

---

Copyright © 2015-2016 [Michael Hulse](http://mky.io).

Licensed under the Apache License, Version 2.0 (the “License”); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<img src="https://github.global.ssl.fastly.net/images/icons/emoji/octocat.png">
