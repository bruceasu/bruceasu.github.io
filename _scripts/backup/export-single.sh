#!/bin/sh
PATH=${PATH}:/cygdrive/c/green/emacs-26.2/bin
file=${1}
filename=${file%.*}
extension=${file##*.}

emacs --batch -l exp-single.el "${1}" -f org-html-export-to-html --kill
mv ${filename}.html /cygdrive/d/temp/blog/posts/