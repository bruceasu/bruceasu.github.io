#!/bin/sh
PATH=${PATH}:/cygdrive/c/green/emacs-26.2/bin
# emacs --batch --no-init-file --load publish.el --funcall toggle-debug-on-error --funcall org-html-export-to-html --kill
#emacs --batch --no-init-file --load publish.el --funcall toggle-debug-on-error --funcall org-publish-project
#emacs --batch --no-init-file --load publish.el
# org-static-blog-publish
(cd .. && emacs --batch --no-init-file --load _scripts/org-static-blog.el --funcall force-publish)
#(cd .. && emacs --batch --no-init-file --load _scripts/copy-res.el --funcall myweb-copy)
