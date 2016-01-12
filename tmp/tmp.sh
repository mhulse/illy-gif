#!/bin/sh

ROOT=$(cd "$(dirname "${BASH_SOURCE}")"; pwd -P);
cd "$ROOT";
convert -delay 35 -loop 0 *.png tmp.gif;
qlmanage -p tmp.gif >& /dev/null;
