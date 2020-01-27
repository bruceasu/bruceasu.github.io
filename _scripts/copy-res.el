(require 'package)
(package-initialize)
(require 'org)
(require 'ox-html)
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
              ;; ("post"
              ;;  :base-directory "../_src"
              ;;  :publishing-directory "../"
              ;;  :recursive t
              ;;  :section-numbers nil
              ;;  :table-of-contents t
              ;;  :base-extension "org"
              ;;  :publishing-function (org-html-publish-to-html)
              ;;  :plain-source t
              ;;  :htmlized-source t
              ;;  :style-include-default nil
              ;;  :html-head "<link rel=\"stylesheet\" href=\"/styles/org-manual.css\" type=\"text/css\" />"
              ;;  ;; :auto-sitemap t
              ;;  ;; :sitemap-title "索引"
              ;;  ;; :sitemap-filename "sitemap.org"
              ;;  :author-info nil
              ;;  :creator-info nil)
          
              ("post-archive"
               :base-directory "_src"
               :publishing-directory "./"
               :base-extension  "css\\|pdf\\|png\\|jpg\\|jpeg\\|gif\\|htm\\|html\\|webp\\|bmp\\|ico"
               :publishing-function org-publish-attachment
               :recursive t
               :author nil)
              ("assets"
               :base-directory "_assets/"
               :publishing-directory "./"
               :base-extension  "css\\|pdf\\|png\\|jpg\\|jpeg\\|gif\\|js\\|json\\|ttf\\|htm\\|html\\|webp\\|bmp\\|ico"
               :publishing-function org-publish-attachment
               :recursive t
               :author nil)
              ("blog"
               :components ("post-archive" "assets"))
              )))

(defun myweb-copy nil
  "Publish myweb static resources."
  (interactive)
  (message "coping the resources...")
  (org-publish-all))
