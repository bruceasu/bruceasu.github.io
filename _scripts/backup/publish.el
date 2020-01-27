;;; package --- My simple blog

;; Author: Bruce
;; URL: https://github.com/bruceasu/bruceasu.github.io
;; Version: 1.0.0
;; Package-Requires: ((emacs "24.3"))


;;; Commentary:

;; Static blog generators are a dime a dozen. This is one more, which
;; focuses on being simple. All files are simple org-mode files in a
;; directory. The only requirement is that every org file must have a
;; #+TITLE and a #+DATE, and optionally, #+FILETAGS.

;; Set up your blog by customizing org-static-blog's parameters, then
;; call M-x org-static-blog-publish to render the whole blog or
;; M-x org-static-blog-publish-file filename.org to render only only
;; the file filename.org.

;;; Code:


(require 'package)
(package-initialize)
(require 'ox-beamer)
(require 'ox-latex)
(require 'ox-ascii)

(setq org-publish-cache nil)
(setq org-publish-use-timestamps-flag nil)
(setq org-export-with-section-numbers nil)
(setq org-export-with-smart-quotes    t)
;(setq org-export-with-toc             nil)
(setq org-export-with-sub-superscripts '{})
(setq org-html-divs '((preamble  "header" "preamble")
                      (content   "main"   "content")
                      (postamble "footer" "postamble")))
(setq org-html-container-element         "section")
(setq org-html-metadata-timestamp-format "%d %b. %Y")
(setq org-html-checkbox-type             'html)
(setq org-html-html5-fancy               t)
(setq org-html-validation-link           nil)
(setq org-html-doctype                   "html5")

(setq org-export-with-section-numbers nil)
(setq backup-directory-alist '(("." . nil)))

(defvar static-extension "css\\|pdf\\|png\\|jpg\\|gif\\|org\\|htm\\|html")

; List of projects
(setq org-publish-project-alist
      (quote (
              ;; _src/posts my own post
              ;; _src/wiki reprint post
              ;; _src/assets are images and css files that need to be included
              ;; _extra html post
              ;; _draft
              ;; blog is the top-level project that gets published
              ;; This uses the same target directory as the 'doc' project
              ("post"
               :base-directory "../_src"
               :publishing-directory "../"
               :recursive t
               :section-numbers nil
               :table-of-contents t
               :base-extension "org"
               :publishing-function (org-html-publish-to-html)
               :plain-source t
               :htmlized-source t
               :style-include-default nil
               :html-head "<link rel=\"stylesheet\" href=\"/styles/org-manual.css\" type=\"text/css\" />"
               ;; :auto-sitemap t
               ;; :sitemap-title "索引"
               ;; :sitemap-filename "sitemap.org"
               :author-info nil
               :creator-info nil)
              ("post-archive"
               :base-directory "../_src"
               :publishing-directory "../"
               :base-extension  "css\\|pdf\\|png\\|jpg\\|gif\\|htm\\|html"
               :publishing-function org-publish-attachment
               :recursive t
               :author nil)
              ("assets"
               :base-directory "../_assets/"
               :publishing-directory "../"
               :base-extension  "css\\|pdf\\|png\\|jpg\\|gif\\|js\\|json\\|ttf\\|htm\\|html"
               :publishing-function org-publish-attachment
               :recursive t
               :author nil)
              ("blog"
               :components ("post" "post-archive" "assets"))
              )))


(defun myweb-publish nil
  "Publish myweb."
  (interactive)
  (org-publish-all))

(myweb-publish)
