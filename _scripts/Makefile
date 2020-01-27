all: build
.PHONY: clean site force-build copy-res
emacs=/cygdrive/c/green/emacs-26.2/bin/emacs.exe
build:
	(cd .. && $(emacs) --batch --no-init-file --load _scripts/org-static-blog.el --funcall org-static-blog-publish)
copy-res:
	(cd .. && $(emacs) --batch --no-init-file --load _scripts/copy-res.el --funcall myweb-copy)
force-build: copy-res
	(cd .. && $(emacs) --batch --no-init-file --load _scripts/org-static-blog.el --funcall force-publish)
clean:
	find .. -type f -name "*.html~" -delete

