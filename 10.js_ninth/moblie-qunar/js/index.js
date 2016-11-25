// JavaScript Document
(function (e) {
    var t = {id: "7a4212f4ba74bed3754a7d1322b44a92", filename: "pages.js", exports: {}};
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function (e, t, n) {
        "use strict";
        if ("document" in self && !("classList" in document.createElement("_"))) {
            (function (e) {
                if (!("Element" in e))return;
                var t = "classList", n = "prototype", r = e.Element[n], i = Object, s = String[n].trim || function () {
                        return this.replace(/^\s+|\s+$/g, "")
                    }, o = Array[n].indexOf || function (e) {
                        var t = 0, n = this.length;
                        for (; t < n; t++) {
                            if (t in this && this[t] === e) {
                                return t
                            }
                        }
                        return -1
                    }, u = function (e, t) {
                    this.name = e;
                    this.code = DOMException[e];
                    this.message = t
                }, a = function (e, t) {
                    if (t === "") {
                        throw new u("SYNTAX_ERR", "An invalid or illegal string was specified")
                    }
                    if (/\s/.test(t)) {
                        throw new u("INVALID_CHARACTER_ERR", "String contains an invalid character")
                    }
                    return o.call(e, t)
                }, f = function (e) {
                    var t = s.call(e.getAttribute("class") || ""), n = t ? t.split(/\s+/) : [], r = 0, i = n.length;
                    for (; r < i; r++) {
                        this.push(n[r])
                    }
                    this._updateClassName = function () {
                        e.setAttribute("class", this.toString())
                    }
                }, l = f[n] = [], c = function () {
                    return new f(this)
                };
                u[n] = Error[n];
                l.item = function (e) {
                    return this[e] || null
                };
                l.contains = function (e) {
                    e += "";
                    return a(this, e) !== -1
                };
                l.add = function () {
                    var e = arguments, t = 0, n = e.length, r, i = false;
                    do {
                        r = e[t] + "";
                        if (a(this, r) === -1) {
                            this.push(r);
                            i = true
                        }
                    } while (++t < n);
                    if (i) {
                        this._updateClassName()
                    }
                };
                l.remove = function () {
                    var e = arguments, t = 0, n = e.length, r, i = false;
                    do {
                        r = e[t] + "";
                        var s = a(this, r);
                        if (s !== -1) {
                            this.splice(s, 1);
                            i = true
                        }
                    } while (++t < n);
                    if (i) {
                        this._updateClassName()
                    }
                };
                l.toggle = function (e, t) {
                    e += "";
                    var n = this.contains(e), r = n ? t !== true && "remove" : t !== false && "add";
                    if (r) {
                        this[r](e)
                    }
                    return !n
                };
                l.toString = function () {
                    return this.join(" ")
                };
                if (i.defineProperty) {
                    var h = {get: c, enumerable: true, configurable: true};
                    try {
                        i.defineProperty(r, t, h)
                    } catch (p) {
                        if (p.number === -2146823252) {
                            h.enumerable = false;
                            i.defineProperty(r, t, h)
                        }
                    }
                } else if (i[n].__defineGetter__) {
                    r.__defineGetter__(t, c)
                }
            })(self)
        }
        var r = function (e, t, n) {
            if (!t || !Array.isArray(t) || !t.length)return;
            this.progress = e;
            this.items = t;
            this.prefix = n.prefix || "";
            this.complete = n.complete || false
        };
        r.prototype.load = function () {
            var e = 0;
            var t = this.items;
            var n = this.items.length;
            var r = this.complete;
            var i = this;
            t.forEach(function (t) {
                var s = new Image;
                s.onload = s.onerror = s.onabort = function () {
                    if (++e === n && typeof r === "function")r.call(i);
                    i.progress.innerText = Math.floor(100 * e / n) + "%"
                };
                s.src = i.prefix + t
            })
        };
        var i = function (e, t, n) {
            this.options = n || {};
            this.current = 0;
            this.pageX;
            this.pageY;
            this.height;
            this.width;
            this.flag;
            this.move;
            this.$el = e;
            this.swipe = t || "X";
            this.resize().init().bindEvents()
        };
        i.prototype.init = function (e) {
            var t = e ? this.$el.children[e] : this.$el.firstElementChild;
            if (!t)throw"ERROR";
            t.classList.add("moving");
            t.style.webkitTransform = "translate3d(0,0,0)";
            setTimeout(function () {
                t.classList.remove("moving");
                t.classList.add("play")
            }, 300);
            return this
        };
        i.prototype.bindEvents = function () {
            var e = this;
            window.addEventListener("resize orientationchange", this.resize.bind(this), false);
            "touchstart touchmove touchend touchcancel".split(" ").forEach(function (t) {
                e.$el.addEventListener(t, e[t].bind(e), false)
            })
        };
        i.prototype.getCurrent = function () {
            return this.$el.children[this.current]
        };
        i.prototype.resize = function () {
            this.width = this.$el.parentNode.clientWidth;
            this.height = this.$el.parentNode.clientHeight;
            return this
        };
        i.prototype.random = function () {
            var e = this.$el.children.length;
            var t = this.current;
            var n = [];
            var r;
            for (var i = 0; i < e; i++) {
                if (i !== t)n.push(i.toString())
            }
            r = Math.floor(Math.random() * n.length);
            this.go(+n[r])
        };
        i.prototype.touchstart = function (e) {
            var t = e.touches[0];
            this.flag = null;
            this.move = 0;
            this.pageX = t.pageX;
            this.pageY = t.pageY
        };
        i.prototype.touchmove = function (e) {
            var t = e.touches[0];
            var n = t.pageX - this.pageX;
            var r = t.pageY - this.pageY;
            var i = this.getCurrent();
            var s = i.nextElementSibling;
            var o = i.previousElementSibling;
            if (!this.flag) {
                this.flag = Math.abs(n) > Math.abs(r) ? "X" : "Y";
                if (this.flag === this.swipe) {
                    i.classList.add("moving");
                    s && s.classList.add("moving");
                    o && o.classList.add("moving")
                }
            }
            if (this.flag === this.swipe) {
                e.preventDefault();
                e.stopPropagation();
                switch (this.swipe) {
                    case"X":
                        this.move = n;
                        this.setX(i, n);
                        s && this.setX(s, n + this.width);
                        o && this.setX(o, n - this.width);
                        break;
                    case"Y":
                        this.move = r;
                        this.setY(i, r);
                        s && this.setY(s, r + this.height);
                        o && this.setY(o, r - this.height);
                        break
                }
            }
        };
        i.prototype.touchend = function (e) {
            var t = 50;
            var n = this.move;
            var r = this.getCurrent();
            var i = r.nextElementSibling;
            var s = r.previousElementSibling;
            r.classList.remove("moving");
            i && i.classList.remove("moving");
            s && s.classList.remove("moving");
            if (!this.flag)return;
            e.preventDefault();
            if (n < -t && i)return this.next();
            if (n > t && s)return this.prev();
            this.reset()
        };
        i.prototype.touchcancel = function (e) {
            var t = this.getCurrent();
            var n = t.nextElementSibling;
            var r = t.previousElementSibling;
            t.classList.remove("moving");
            n && n.classList.remove("moving");
            r && r.classList.remove("moving");
            this.reset()
        };
        i.prototype.setX = function (e, t, n) {
            e && (e.style.webkitTransform = "translate3d(" + t + (n || "px") + ",0,0)")
        };
        i.prototype.setY = function (e, t, n) {
            e && (e.style.webkitTransform = "translate3d(0," + t + (n || "px") + ",0)")
        };
        i.prototype.setCurrent = function (e, t) {
            e && (e.style.webkitTransform = "translate3d(0,0,0)");
            if (t) {
                this.current = t;
                this.$current = this.$el.children[t]
            }
        };
        i.prototype.next = function () {
            this.go(this.current + 1)
        };
        i.prototype.prev = function () {
            this.go(this.current - 1)
        };
        i.prototype.reset = function () {
            var e = this.width;
            var t = this.height;
            var n = this.swipe;
            var r = this.getCurrent();
            var i = r.previousElementSibling;
            var s = r.nextElementSibling;
            this.setCurrent(r);
            i && this["set" + n](i, -(n === "X" ? e : t));
            s && this["set" + n](s, n === "X" ? e : t)
        };
        i.prototype.go = function (e) {
            var t = this.options.onFinish;
            var n = this.getCurrent();
            var r = this.$el.childElementCount;
            var i = this.$el.children[e];
            var s = e < this.current ? -1 : 1;
            if (e === this.current || e < 0 || e >= r)return;
            if (t && typeof t === "function")t.call(this, e);
            this.current = e;
            this["set" + this.swipe](n, -s * (this.swipe === "X" ? this.width : this.height));
            this.setCurrent(i, e);
            this.finish(n, i)
        };
        i.prototype.finish = function (e, t) {
            this.flag = null;
            setTimeout(function () {
                e && e.classList.remove("play");
                t && t.classList.add("play")
            }, 300)
        };
        t.exports = {preload: r, pageslide: i}
    }(t.exports, t, e);
    e.____MODULES["7a4212f4ba74bed3754a7d1322b44a92"] = t.exports
})(this);
(function (e) {
    var t = {id: "098ba88e4c59474ac242977c70e13827", filename: "index.js", exports: {}};
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function (t, n, r) {
        function o(e) {
            return document.querySelector(e)
        }

        function u(e) {
            return document.querySelectorAll(e)
        }

        var i = e.____MODULES["7a4212f4ba74bed3754a7d1322b44a92"].preload, s = e.____MODULES["7a4212f4ba74bed3754a7d1322b44a92"].pageslide;
        document.addEventListener("touchmove", function (e) {
            e.preventDefault()
        });
        var a = {};
        (new i(o("#progress"), ["home_text.png", "track.png", "sun.png", "dev_people.png", "fe_people.png", "qa_people.png", "pm_people.png", "uc_people.png", "bg_dev.png", "bg_fe.png", "bg_qa.png", "bg_pm.png", "bg_uc.png", "welfare1.png", "welfare2.png", "welfare3.png", "popup.png"], {
            prefix: "images/",
            complete: function () {
                var e = o("#loader");
                var t = o("#pages");
                var n = u(".page-job");
                t.classList.remove("d-n");
                a = new s(o(".pages"), "Y");
                setTimeout(function () {
                    e.style.display = "none"
                }, 300)
            }
        })).load();
        !function () {
            var e = function () {
                function t(t) {
                    var n = e, r = t.split("\r\n");
                    var i = !!n.cssRules ? n.cssRules.length : 0;
                    for (var s = 0; s < r.length; ++s) {
                        n.insertRule(r[s], i++)
                    }
                    return i
                }

                var e = function () {
                    var e = document.getElementsByTagName("head")[0];
                    var t = document.createElement("style");
                    t.type = "text/css";
                    e.appendChild(t);
                    return document.styleSheets[document.styleSheets.length - 1]
                }();
                return {add: t}
            }();
            var t = function () {
                var e = document.createElement("div");
                e.style.cssText = "-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;";
                if (e.style.webkitTransition) {
                    return "-webkit-"
                } else if (e.style.mozTransition) {
                    return "-moz-"
                } else if (e.style.oTransition) {
                    return "-o-"
                } else if (e.style.msTransition) {
                    return "-ms-"
                } else {
                    return ""
                }
            }();
            var n = function () {
                var n = document.createElement("div"), r = document.createElement("i"), i = document.createElement("div");
                i.style.cssText = "position:absolute; width:100%; height:100%; overflow:hidden; left:0; top:0; z-index:9999; background-color:#45b19a; display:none;", n.style.cssText = "position:absolute; left:50%; top:50%; width:250px; height:150px; margin:-75px 0 0 -125px; text-align:center; color:#ffffff;", r.style.cssText = "position:relative; display:block; width:74px; height:110px; background:url(images/phone.png) 0 0 no-repeat; background-size:100%; margin:0 auto; " + t + "transform:rotate(-90deg); " + t + "animation:TOUCH_DRAG_IPHONE 1.6s ease-in infinite;";
                e.add("@" + t + "keyframes TOUCH_DRAG_IPHONE{0%{" + t + "transform:rotate(-90deg);}25%{" + t + "transform:rotate(0deg);}50%{" + t + "transform:rotate(0deg);}75%{" + t + "transform:rotate(-90deg);}100%{" + t + "transform:rotate(-90deg);}}");
                document.body.appendChild(i), i.appendChild(n), n.appendChild(r);
                var s = document.createTextNode("为了更好的体验，请使用竖屏浏览");
                n.appendChild(document.createElement("br")), n.appendChild(s);
                var o = function (e, t, i) {
                    if (typeof e == "string")n.style.cssText = e;
                    if (typeof t == "string")r.style.cssText = t;
                    if (typeof i == "string")s.nodeValue = i
                };
                var u = function () {
                    i.style.display = "block"
                };
                var a = function () {
                    i.style.display = "none"
                };
                return {show: u, hide: a, setCssText: o}
            }();
            var r = "onorientationchange" in window;
            var i = document.documentElement.clientHeight, s = document.documentElement.clientWidth;
            if (r) {
                if (window.orientation != "0")n.show();
                window.addEventListener("orientationchange", function () {
                    if (window.orientation != "0") {
                        n.show()
                    } else {
                        n.hide()
                    }
                }, false)
            } else {
                if (i < s)n.show()
            }
            window.addEventListener("resize", function () {
                i = document.documentElement.clientHeight, s = document.documentElement.clientWidth;
                if (!r) {
                    if (i < s) {
                        n.show()
                    } else {
                        n.hide()
                    }
                }
            }, false);
            var u = o("#goHome");
            u.addEventListener("click", function () {
                a.go(0)
            }, false)
        }()
    }(t.exports, t, e);
    e.____MODULES["098ba88e4c59474ac242977c70e13827"] = t.exports
})(this)