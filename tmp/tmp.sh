#!/usr/bin/env bash

cd ~/dev/github/mhulse/illy-gif/tmp/;
convert -delay 35 -loop 0 -dispose Background -duplicate 1,-2-1 -quiet -layers OptimizePlus *.png tmp.gif;
qlmanage -p tmp.gif >& /dev/null;
exit;
