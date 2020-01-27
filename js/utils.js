if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) === prefix;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

var Query = {
    // Query by class
    querySelectorAllByClassName: function (clazz) {
        return document.getElementsByClassName(clazz);
    },

    // Query by selector
    querySelectorAll: function (clazz) {
        return document.querySelectorAll(clazz);
    },

    // Query by id
    getElementById: function (id) {
        if (id.startsWith("#")) {
            return document.querySelector(id);
        } else {
            return document.getElementById(id);
        }
    },

    find: function (el, tag) {
        return el.querySelectorAll(tag);
    },

    // Sibling / Previous / Next Elements

    // All siblings
    siblings: function (el) {
        return Array.prototype.filter.call(
            el.parentNode.children,
            function (child) { return child !== el });
    },

    // Previous sibling
    prev: function (el) {
        return el.previousElementSibling;
    },

    // Next
    next: function (el) {
        return el.nextElementSibling;
    },

    // All previous siblings
    // (optional filter function)
    getPreviousSiblings: function (elem, filter) {
        var sibs = [];
        while (elem = elem.previousSibling) {
            if (elem.nodeType === 3) continue; // ignore text nodes
            if (!filter || filter(elem)) sibs.push(elem);
        }
        return sibs;
    },
    // All next siblings
    // (optional filter function)
    getNextSiblings: function (elem, filter) {
        var sibs = [];
        var nextElem = elem.parentNode.firstChild;
        do {
            if (nextElem.nodeType === 3) continue; // ignore text nodes
            if (nextElem === elem) continue; // ignore elem of target
            if (nextElem === elem.nextElementSibling) {
                if (!filter || filter(elem)) {
                    sibs.push(nextElem);
                    elem = nextElem;
                }
            }
        } while (nextElem = nextElem.nextSibling)
        return sibs;
    },
    // Closest
    // Return the first matched element by provided selector, traversing from current element up through its ancestors in the DOM tree.
    closest: function (selector) {
        // not support ie
        return el.closest(selector);
    },

    // Native - IE10+

    closestForIe: function (el, selector) {
        const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        while (el) {
            if (matchesSelector.call(el, selector)) {
                return el;
            } else {
                el = el.parentElement;
            }
        }
        return null;
    },

    // Parents Until
    // Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.
    parentsUntil: function (el, selector, filter) {
        const result = [];
        const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        // match start from parent
        el = el.parentElement;
        while (el && !matchesSelector.call(el, selector)) {
            if (!filter) {
                result.push(el);
            } else {
                if (matchesSelector.call(el, filter)) {
                    result.push(el);
                }
            }
            el = el.parentElement;
        }
        return result;
    },

    // Iframe Contents
    getContentOfIframe: function (iframe) {
        return iframe.contentDocument;
    },

    // Iframe elements
    getElementsOfIframe: function (iframe, selector) {
        return iframe.contentDocument.querySelectorAll(selector);
    },

    // Get body
    body: function () {
        return document.body;
    },
    // exists
    // Check if an element exists in the DOM
    exists: function (id) {
        var element = document.getElementById(id);
        return (typeof (element) != 'undefined' && element != null);
    }
}



// An example of filter function:
/*
    function exampleFilter(elem) {
    switch (elem.nodeName.toUpperCase()) {
        case 'DIV':
            return true;
        case 'SPAN':
            return true;
        default:
            return false;
    }
}
*/

var Form = {
    //  Form
    // Input / Textarea
    val: function (selector, value) {
        if (value === undefined) {
            return document.querySelector(selector).value;
        } else {
            document.querySelector(selector).value = value;
        }

    },

    // Get index of e.currentTarget between.radio

    getIndexOfRadio: function (selector, e) {
        return Array.prototype.indexOf.call(document.querySelectorAll(selector), e.currentTarget);
    }
}




// Selector containing string(case -sensitive)
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return Array.from(elements).filter(function (element) {
        return RegExp(text).test(element.textContent);
    });
}

var Element = {
    // CSS & Style

    // Get style
    getCss: function (el, name) {
        // NOTE: Known bug, will return 'auto' if style value is 'auto'
        const win = el.ownerDocument.defaultView;
        // null means not to return pseudo styles
        return win.getComputedStyle(el, null)[name];
    },

    // Set style

    setCss: function (el, styles) {
        for (var name in styles) {
            el.style[name] = styles[name];
        }
    },

    // Get / Set class
    // Note that if you want to set multiple styles once, you could refer to setStyles method in oui - dom - utils package.
    // Add class

    addClass: function (el, className) {
        el.classList.add(className);
    },

    // Remove class
    removeClass: function (el, className) {
        el.classList.remove(className);
    },

    // has class
    hasClass: function (el, className) {
        return el.classList.contains(className);
    },

    // Toggle class
    toggleClass: function (el, className) {
        el.classList.toggle(className);
    },
    // Element height
    getHeight: function (el) {
        const styles = window.getComputedStyle(el);
        const height = el.offsetHeight;
        const borderTopWidth = parseFloat(styles.borderTopWidth);
        const borderBottomWidth = parseFloat(styles.borderBottomWidth);
        const paddingTop = parseFloat(styles.paddingTop);
        const paddingBottom = parseFloat(styles.paddingBottom);
        return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
    },

    // Position & Offset
    // Position
    // Get the current coordinates of the element relative to the offset parent.

    position: function (el) {
        return { left: el.offsetLeft, top: el.offsetTop }
    },

    // Offset
    // Get the current coordinates of the element relative to the document.
    getOffset: function (el) {
        const box = el.getBoundingClientRect();

        return {
            top: box.top + window.pageYOffset - document.documentElement.clientTop,
            left: box.left + window.pageXOffset - document.documentElement.clientLeft
        };
    },
    // DOM Manipulation
    //  Remove
    // Remove the element from the DOM.
    remove: function (el) {
        el.parentNode.removeChild(el);
    },

    // Text
    text: function (el, string) {
        if (string === undefined) {
            return el.textContent;
        } else {
            return el.textContent = string;
        }

    },

    // HTML
    html: function (el, htmlString) {
        if (htmlString === undefined)
            return el.innerHTML;
        else
            el.innerHTML = htmlString;
    },

    // Append
    // Append child element after the last child of parent element
    append: function (parent, newEl) {
        if (typeof (newEl) == "string") {
            parent.insertAdjacentHTML('beforeend', newEl);
        } else {
            parent.appendChild(newEl);
        }
    },

    //  Prepend
    prepend: function (parent, newEl) {
        if (typeof (newEl) == "string") {
            parent.insertAdjacentHTML('afterbegin', newEl);
        } else {
            parent.appendChild(newEl);
        }
    },

    // insertBefore
    // Insert a new node before the selected elements

    insertBefore: function (selector, html) {
        if (typeof (selector) == "string") {
            el = document.querySelector(selector);
        } else {
            el = selector;
        }

        if (typeof (html) == "string") {
            el.insertAdjacentHTML('beforebegin ', html);
        } else {
            if (el.parentNode) {
                el.parentNode.insertBefore(html, el);
            }
        }

    },

    // insertAfter
    // Insert a new node after the selected elements
    insertAfter: function (selector, html) {
        if (typeof (selector) == "string") {
            el = document.querySelector(selector);
        } else {
            el = selector;
        }

        if (typeof (html) == "string") {
            el.insertAdjacentHTML('afterend ', html);
        } else {
            if (el.parentNode) {
                el.parentNode.insertBefore(html, el.nextSibling);
            }
        }

    },
    // clone
    // Create a deep copy of an element: it copies the matched element as well as all of its descendant elements and text nodes.
    clone: function (el) {
        return el.cloneNode();
    },
    //  is
    // Return true if it matches the query selector
    is: function (el, selector) {
        return el.matches(selector);
    },
    // Remove all child nodes
    empty: function (el) {
        el.innerHTML = null;
    },
    // Wrap an HTML structure around each element
    wrap: function (selector, tag, className) {
        Array.from(document.querySelectorAll(selector)).forEach(function (el) {
            const wrapper = document.createElement(tag);
            wrapper.className = className;
            el.parentNode.insertBefore(wrapper, el);
            el.parentNode.removeChild(el);
            wrapper.appendChild(el);
        });
    },

    // Remove the parents of the set of matched elements from the DOM
    unwrap: function (selector) {
        Array.from(document.querySelectorAll(selector)).forEach(function (el) {
            let elParentNode = el.parentNode;

            if (elParentNode !== document.body) {
                elParentNode.parentNode.insertBefore(el, elParentNode);
                elParentNode.parentNode.removeChild(elParentNode);
            }
        });
    },

    // Replace each element in the set of matched elements with the provided new content
    replace: function (el, outer) {
        el.parentNode.replaceChild(outer, el);
    },

    // Contains
    // Check to see if a DOM element is a descendant of another DOM element.
    contains: function (el, child) {
        return el !== child && el.contains(child);
    },


    // Attribute getter and setter
    attr: function (el, attr, value) {
        if (value == undefined) {
            return el.getAttribute(attr);
        } else {
            el.setAttribute(attr, val);
        }
    },
    // simple parse
    // Parse a string into HTML / SVG / XML
    parse: function (string) {
        range = document.createRange();
        parse = range.createContextualFragment.bind(range);
        return parse(string);
    },

    // parse
    // parseHTML
    // Parses a string into an array of DOM nodes.
    parseHTML: function (string) {
        const context = document.implementation.createHTMLDocument();

        // Set the base href for the created document so any parsed elements with URLs
        // are based on the document's URL
        const base = context.createElement('base');
        base.href = document.location.href;
        context.head.appendChild(base);

        context.body.innerHTML = string;
        return context.body.children;
    },
}

// Width & Height
// Width and Height are theoretically identical, take Height as example:
// Window height

// window height
function winHeight() {
    // with scrollbar
    return window.document.documentElement.clientHeight;
}
function winInnerHeight() {
    // without scrollbar, behaves like jQuery
    return window.innerHeight;
}

// Document height
function docHeight() {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
        body.offsetHeight,
        body.scrollHeight,
        html.clientHeight,
        html.offsetHeight,
        html.scrollHeight
    );
    return height;
}

// Scroll Top
// Get the current vertical position of the scroll bar for the element.
function scrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}




// Ajax
// Fetch API is the new standard to replace XMLHttpRequest to do ajax.It works on Chrome and Firefox, you can use polyfills to make it work on legacy browsers.
// Try github / fetch on IE9 + or fetch - ie8 on IE8 +, fetch - jsonp to make JSONP requests.
// Load data from the server and place the returned HTML into the matched element.
function encodeForm(data) {
    var arr = [];
    for (key in data) {
        arr.push(key + "=" + encodeURIComponent(data[key]));
    }
    return arr.join("&");
}

var Ajax = {
    load: function (url, completeCallback) {
        fetch(url)
            .then(function (data) {
                completeCallback(data);
            });
    },
    loadTo: function (url, selector) {
        fetch(url)
            .then(function (res) {
                console.log("fetch request ", JSON.stringify(res.ok));
                if (res.ok) {
                    res.text().then(function (txt) {
                        console.log("fetch data", txt);
                        var elem = Element.parse(txt);
                        var el = document.querySelector(selector); //innerHTML = txt;
                        Element.replace(el, elem);
                    });
                } else {
                    console.log('fetch fail');
                }
            }).catch(function (e) {
                console.log("fetch fail");
            });;

    },
    post: function (url, data, dataType, completeCallback, failCallback) {
        dataType = dataType || "json"
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            body: encodeForm(data || {})
        }).then(function (res) {
            console.log("fetch request ", JSON.stringify(res.ok));
            if (res.ok) {
                if (completeCallback) {
                    if (dataType === 'json') {
                        res.json().then(function (json) {
                            console.log("fetch data ", json);
                            completeCallback(json);
                        });
                    } else {
                        res.text().then(function (txt) {
                            console.log("fetch request ", txt);
                            completeCallback(txt)
                        });
                    }

                } else {
                    console.log("fetch request ", JSON.stringify(res.ok));
                }
            } else {
                alert('fetch fail');
            }
        }).catch(function (e) {
            console.log("fetch fail");
            if (failCallback) {
                failCallback(e);
            }

        });
    },
    postJSON: function (url, data, dataType, completeCallback, failCallback) {
        dataType = dataType || "json"
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data || {})
        }).then(function (res) {
            console.log("fetch request ", JSON.stringify(res.ok));
            if (res.ok) {
                if (completeCallback) {
                    if (dataType === 'json') {
                        res.json().then(function (json) {
                            console.log("fetch request ", json);
                            completeCallback(json);
                        });
                    } else {
                        res.text().then(function (txt) {
                            console.log("fetch request ", txt);
                            completeCallback(txt)
                        });
                    }

                } else {
                    console.log("fetch request ", JSON.stringify(res.ok));
                }


            } else {
                alert('fetch fail');
            }
        }).catch(function (e) {
            console.log("fetch fail");
            if (failCallback) {
                failCallback(e);
            }

        });
    }
}

var Events = {
    // For a complete replacement with namespace and delegation, refer to https://github.com/oneuijs/oui-dom-events
    // Document ready by DOMContentLoaded
    // jQuery
    ready: function (eventHandler) {
        // Check if the DOMContentLoaded has already been completed
        if (document.readyState !== 'loading') {
            eventHandler();
        } else {
            document.addEventListener('DOMContentLoaded', eventHandler);
        }
    },

    // Bind an event with on
    on: function (el, eventName, eventHandler) {
        el.addEventListener(eventName, eventHandler);
    },

    // Unbind an event with off
    off: function (el, eventName, eventHandler) {
        el.removeEventListener(eventName, eventHandler);
    },

    // Trigger
    trigger: function (el, eventName, payload) {
        if (window.CustomEvent) {
            const event = new CustomEvent(eventName, { detail: payload });
        } else {
            const event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, payload);
        }
        el.dispatchEvent(event);
    },

}


// Utilities
// Most of jQuery utilities are also found in the native API.Other advanced functions could be chosen from better utilities libraries, focusing on consistency and performance.Lodash is a recommended replacement.
// Basic utilities
var Utilities = {
    isArray: function (array) {
        return Array.isArray(array);
    },

    // isWindow
    isWindow: function (obj) {
        return obj !== null && obj !== undefined && obj === obj.window;
    },

    // inArray
    // Search for a specified value within an array and return its index(or - 1 if not found).

    // jQuery
    inArray: function (item, array) {
        return array.indexOf(item) > -1;
    },

    // isNumeric
    // Determine if the argument passed is numerical.Use typeof to decide the type or the type example for better accuracy.
    isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    // isFunction
    // Determine if the argument passed is a JavaScript function object.
    isFunction: function (item) {
        if (typeof item === 'function') {
            return true;
        }
        var type = Object.prototype.toString.call(item);
        return type === '[object Function]' || type === '[object GeneratorFunction]';
    },

    // isEmptyObject
    // Check to see if an object is empty(contains no enumerable properties).
    isEmptyObject: function (obj) {
        return Object.keys(obj).length === 0;
    },

    // isPlainObject
    // Check to see if an object is a plain object(created using “{}” or “new Object”).
    isPlainObject: function (obj) {
        if (typeof (obj) !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {
            return false;
        }

        if (obj.constructor &&
            !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false;
        }
        return true;
    },

    // type
    // Determine the internal JavaScript[Class] of an object.
    type: function (item) {
        const reTypeOf = /(?:^\[object\s(.*?)\]$)/;
        return Object.prototype.toString.call(item)
            .replace(reTypeOf, '$1')
            .toLowerCase();
    },

    //  makeArray
    // Convert an array - like object into a true JavaScript array.
    makeArray: function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    },


   
    // extend
    // Merge the contents of two or more objects together into a new object, without modifying either argument.object.assign is part of ES6 API, and you could also use a polyfill.
    extend: function (object1, object2) {
        return Object.assign({}, object1, object2);
    },
    // proxy
    // Takes a function and returns a new one that will always have a particular context.
    proxy: function (fn, context) {
        return fn.bind(context);
    },




    // Globaleval
    // Execute some JavaScript code globally.
    Globaleval: function (code) {
        const script = document.createElement('script');
        script.text = code;
        document.head.appendChild(script).parentNode.removeChild(script);
    },
}

var Animation = {
    // Show & Hide
    // type: '' | 'inline' | 'inline-block' | 'inline-table' | 'block';
    // More detail about show method, please refer to https://github.com/oneuijs/oui-dom-utils/blob/master/src/index.js#L363
    show: function (el, type) {

        if (type === undefined) {
            type = ''
        }
        el.style.display = type;
    },
    hide: function (el) {
        el.style.display = 'none';
    },

    // Toggle
    // Display or hide the element.
    toggle: function (el, type) {
        if (el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none') {
            if (type === undefined) {
                type = ''
            }
            el.style.display = type;
        } else {
            el.style.display = 'none';
        }
    },

    // FadeIn & FadeOut
    fadeOut: function (el, ms) {
        if (ms) {
            el.style.transition = 'opacity ' + ms + ' ms';
            el.addEventListener(
                'transitionend',
                function (event) {
                    el.style.display = 'none';
                },
                false
            );
        }
        el.style.opacity = '0';
    },
    fadeIn: function (elem, ms) {
        elem.style.opacity = 0;

        if (ms) {
            let opacity = 0;
            const timer = setInterval(function () {
                opacity += 50 / ms;
                if (opacity >= 1) {
                    clearInterval(timer);
                    opacity = 1;
                }
                elem.style.opacity = opacity;
            }, 50);
        } else {
            elem.style.opacity = 1;
        }
    },

    // FadeTo
    // Adjust the opacity of the element.
    fadeTo: function (el, opacity) {

        el.style.transition = 'opacity 3s'; // assume 'slow' equals 3 seconds
        el.style.opacity = opacity; // '0.15'
    },

    // FadeToggle
    // Display or hide the element by animating their opacity.
    fadeToggle: function (el, opacity) {
        el.style.transition = 'opacity 3s';
        var opacity = el.ownerDocument.defaultView.getComputedStyle(el, null)['opacity'];
        if (opacity === '1') {
            el.style.opacity = '0';
        } else {
            el.style.opacity = '1';
        }
    },

    // SlideUp & SlideDown
    slideUp: function (el) {
        attr(el, originHeight, el.style.height);
        el.style.transition = 'height 3s';
        // slideUp
        el.style.height = '0px';
    },

    slideDown: function (el, originHeight) {
        el.style.transition = 'height 3s';
        el.style.height = attr(el, originHeight);
    },
    //  SlideToggle
    // Display or hide the element with a sliding motion.
    slideToggle: function (el) {
        var originHeight = attr(el, originHeight) || el.style.height;
        el.style.transition = 'height 3s';
        var height = el.ownerDocument.defaultView.getComputedStyle(el, null)['height'];
        if (parseInt(height, 10) === 0) {
            el.style.height = originHeight;
        } else {
            el.style.height = '0px';
        }
    },
}


