// Lazy load
!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((n =
        "undefined" != typeof globalThis ? globalThis : n || self).LazyLoad =
        t());
})(this, function () {
  "use strict";
  function n() {
    return (
      (n =
        Object.assign ||
        function (n) {
          for (var t = 1; t < arguments.length; t++) {
            var e = arguments[t];
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
          }
          return n;
        }),
      n.apply(this, arguments)
    );
  }
  var t = "undefined" != typeof window,
    e =
      (t && !("onscroll" in window)) ||
      ("undefined" != typeof navigator &&
        /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
    i = t && "IntersectionObserver" in window,
    o = t && "classList" in document.createElement("p"),
    a = t && window.devicePixelRatio > 1,
    r = {
      elements_selector: ".lazy",
      container: e || t ? document : null,
      threshold: 300,
      thresholds: null,
      data_src: "src",
      data_srcset: "srcset",
      data_sizes: "sizes",
      data_bg: "bg",
      data_bg_hidpi: "bg-hidpi",
      data_bg_multi: "bg-multi",
      data_bg_multi_hidpi: "bg-multi-hidpi",
      data_bg_set: "bg-set",
      data_poster: "poster",
      class_applied: "applied",
      class_loading: "loading",
      class_loaded: "loaded",
      class_error: "error",
      class_entered: "entered",
      class_exited: "exited",
      unobserve_completed: !0,
      unobserve_entered: !1,
      cancel_on_exit: !0,
      callback_enter: null,
      callback_exit: null,
      callback_applied: null,
      callback_loading: null,
      callback_loaded: null,
      callback_error: null,
      callback_finish: null,
      callback_cancel: null,
      use_native: !1,
      restore_on_error: !1,
    },
    c = function (t) {
      return n({}, r, t);
    },
    l = function (n, t) {
      var e,
        i = "LazyLoad::Initialized",
        o = new n(t);
      try {
        e = new CustomEvent(i, { detail: { instance: o } });
      } catch (n) {
        (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
          instance: o,
        });
      }
      window.dispatchEvent(e);
    },
    u = "src",
    s = "srcset",
    d = "sizes",
    f = "poster",
    _ = "llOriginalAttrs",
    g = "data",
    v = "loading",
    b = "loaded",
    m = "applied",
    p = "error",
    h = "native",
    E = "data-",
    I = "ll-status",
    y = function (n, t) {
      return n.getAttribute(E + t);
    },
    k = function (n) {
      return y(n, I);
    },
    w = function (n, t) {
      return (function (n, t, e) {
        var i = "data-ll-status";
        null !== e ? n.setAttribute(i, e) : n.removeAttribute(i);
      })(n, 0, t);
    },
    A = function (n) {
      return w(n, null);
    },
    L = function (n) {
      return null === k(n);
    },
    O = function (n) {
      return k(n) === h;
    },
    x = [v, b, m, p],
    C = function (n, t, e, i) {
      n && (void 0 === i ? (void 0 === e ? n(t) : n(t, e)) : n(t, e, i));
    },
    N = function (n, t) {
      o ? n.classList.add(t) : (n.className += (n.className ? " " : "") + t);
    },
    M = function (n, t) {
      o
        ? n.classList.remove(t)
        : (n.className = n.className
            .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
            .replace(/^\s+/, "")
            .replace(/\s+$/, ""));
    },
    z = function (n) {
      return n.llTempImage;
    },
    T = function (n, t) {
      if (t) {
        var e = t._observer;
        e && e.unobserve(n);
      }
    },
    R = function (n, t) {
      n && (n.loadingCount += t);
    },
    G = function (n, t) {
      n && (n.toLoadCount = t);
    },
    j = function (n) {
      for (var t, e = [], i = 0; (t = n.children[i]); i += 1)
        "SOURCE" === t.tagName && e.push(t);
      return e;
    },
    D = function (n, t) {
      var e = n.parentNode;
      e && "PICTURE" === e.tagName && j(e).forEach(t);
    },
    H = function (n, t) {
      j(n).forEach(t);
    },
    V = [u],
    F = [u, f],
    B = [u, s, d],
    J = [g],
    P = function (n) {
      return !!n[_];
    },
    S = function (n) {
      return n[_];
    },
    U = function (n) {
      return delete n[_];
    },
    $ = function (n, t) {
      if (!P(n)) {
        var e = {};
        t.forEach(function (t) {
          e[t] = n.getAttribute(t);
        }),
          (n[_] = e);
      }
    },
    q = function (n, t) {
      if (P(n)) {
        var e = S(n);
        t.forEach(function (t) {
          !(function (n, t, e) {
            e ? n.setAttribute(t, e) : n.removeAttribute(t);
          })(n, t, e[t]);
        });
      }
    },
    K = function (n, t, e) {
      N(n, t.class_applied),
        w(n, m),
        e && (t.unobserve_completed && T(n, t), C(t.callback_applied, n, e));
    },
    Q = function (n, t, e) {
      N(n, t.class_loading),
        w(n, v),
        e && (R(e, 1), C(t.callback_loading, n, e));
    },
    W = function (n, t, e) {
      e && n.setAttribute(t, e);
    },
    X = function (n, t) {
      W(n, d, y(n, t.data_sizes)),
        W(n, s, y(n, t.data_srcset)),
        W(n, u, y(n, t.data_src));
    },
    Y = {
      IMG: function (n, t) {
        D(n, function (n) {
          $(n, B), X(n, t);
        }),
          $(n, B),
          X(n, t);
      },
      IFRAME: function (n, t) {
        $(n, V), W(n, u, y(n, t.data_src));
      },
      VIDEO: function (n, t) {
        H(n, function (n) {
          $(n, V), W(n, u, y(n, t.data_src));
        }),
          $(n, F),
          W(n, f, y(n, t.data_poster)),
          W(n, u, y(n, t.data_src)),
          n.load();
      },
      OBJECT: function (n, t) {
        $(n, J), W(n, g, y(n, t.data_src));
      },
    },
    Z = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
    nn = function (n, t) {
      !t ||
        (function (n) {
          return n.loadingCount > 0;
        })(t) ||
        (function (n) {
          return n.toLoadCount > 0;
        })(t) ||
        C(n.callback_finish, t);
    },
    tn = function (n, t, e) {
      n.addEventListener(t, e), (n.llEvLisnrs[t] = e);
    },
    en = function (n, t, e) {
      n.removeEventListener(t, e);
    },
    on = function (n) {
      return !!n.llEvLisnrs;
    },
    an = function (n) {
      if (on(n)) {
        var t = n.llEvLisnrs;
        for (var e in t) {
          var i = t[e];
          en(n, e, i);
        }
        delete n.llEvLisnrs;
      }
    },
    rn = function (n, t, e) {
      !(function (n) {
        delete n.llTempImage;
      })(n),
        R(e, -1),
        (function (n) {
          n && (n.toLoadCount -= 1);
        })(e),
        M(n, t.class_loading),
        t.unobserve_completed && T(n, e);
    },
    cn = function (n, t, e) {
      var i = z(n) || n;
      on(i) ||
        (function (n, t, e) {
          on(n) || (n.llEvLisnrs = {});
          var i = "VIDEO" === n.tagName ? "loadeddata" : "load";
          tn(n, i, t), tn(n, "error", e);
        })(
          i,
          function (o) {
            !(function (n, t, e, i) {
              var o = O(t);
              rn(t, e, i),
                N(t, e.class_loaded),
                w(t, b),
                C(e.callback_loaded, t, i),
                o || nn(e, i);
            })(0, n, t, e),
              an(i);
          },
          function (o) {
            !(function (n, t, e, i) {
              var o = O(t);
              rn(t, e, i),
                N(t, e.class_error),
                w(t, p),
                C(e.callback_error, t, i),
                e.restore_on_error && q(t, B),
                o || nn(e, i);
            })(0, n, t, e),
              an(i);
          }
        );
    },
    ln = function (n, t, e) {
      !(function (n) {
        return Z.indexOf(n.tagName) > -1;
      })(n)
        ? (function (n, t, e) {
            !(function (n) {
              n.llTempImage = document.createElement("IMG");
            })(n),
              cn(n, t, e),
              (function (n) {
                P(n) || (n[_] = { backgroundImage: n.style.backgroundImage });
              })(n),
              (function (n, t, e) {
                var i = y(n, t.data_bg),
                  o = y(n, t.data_bg_hidpi),
                  r = a && o ? o : i;
                r &&
                  ((n.style.backgroundImage = 'url("'.concat(r, '")')),
                  z(n).setAttribute(u, r),
                  Q(n, t, e));
              })(n, t, e),
              (function (n, t, e) {
                var i = y(n, t.data_bg_multi),
                  o = y(n, t.data_bg_multi_hidpi),
                  r = a && o ? o : i;
                r && ((n.style.backgroundImage = r), K(n, t, e));
              })(n, t, e),
              (function (n, t, e) {
                var i = y(n, t.data_bg_set);
                if (i) {
                  var o = i.split("|"),
                    a = o.map(function (n) {
                      return "image-set(".concat(n, ")");
                    });
                  (n.style.backgroundImage = a.join()),
                    "" === n.style.backgroundImage &&
                      ((a = o.map(function (n) {
                        return "-webkit-image-set(".concat(n, ")");
                      })),
                      (n.style.backgroundImage = a.join())),
                    K(n, t, e);
                }
              })(n, t, e);
          })(n, t, e)
        : (function (n, t, e) {
            cn(n, t, e),
              (function (n, t, e) {
                var i = Y[n.tagName];
                i && (i(n, t), Q(n, t, e));
              })(n, t, e);
          })(n, t, e);
    },
    un = function (n) {
      n.removeAttribute(u), n.removeAttribute(s), n.removeAttribute(d);
    },
    sn = function (n) {
      D(n, function (n) {
        q(n, B);
      }),
        q(n, B);
    },
    dn = {
      IMG: sn,
      IFRAME: function (n) {
        q(n, V);
      },
      VIDEO: function (n) {
        H(n, function (n) {
          q(n, V);
        }),
          q(n, F),
          n.load();
      },
      OBJECT: function (n) {
        q(n, J);
      },
    },
    fn = function (n, t) {
      (function (n) {
        var t = dn[n.tagName];
        t
          ? t(n)
          : (function (n) {
              if (P(n)) {
                var t = S(n);
                n.style.backgroundImage = t.backgroundImage;
              }
            })(n);
      })(n),
        (function (n, t) {
          L(n) ||
            O(n) ||
            (M(n, t.class_entered),
            M(n, t.class_exited),
            M(n, t.class_applied),
            M(n, t.class_loading),
            M(n, t.class_loaded),
            M(n, t.class_error));
        })(n, t),
        A(n),
        U(n);
    },
    _n = ["IMG", "IFRAME", "VIDEO"],
    gn = function (n) {
      return n.use_native && "loading" in HTMLImageElement.prototype;
    },
    vn = function (n, t, e) {
      n.forEach(function (n) {
        return (function (n) {
          return n.isIntersecting || n.intersectionRatio > 0;
        })(n)
          ? (function (n, t, e, i) {
              var o = (function (n) {
                return x.indexOf(k(n)) >= 0;
              })(n);
              w(n, "entered"),
                N(n, e.class_entered),
                M(n, e.class_exited),
                (function (n, t, e) {
                  t.unobserve_entered && T(n, e);
                })(n, e, i),
                C(e.callback_enter, n, t, i),
                o || ln(n, e, i);
            })(n.target, n, t, e)
          : (function (n, t, e, i) {
              L(n) ||
                (N(n, e.class_exited),
                (function (n, t, e, i) {
                  e.cancel_on_exit &&
                    (function (n) {
                      return k(n) === v;
                    })(n) &&
                    "IMG" === n.tagName &&
                    (an(n),
                    (function (n) {
                      D(n, function (n) {
                        un(n);
                      }),
                        un(n);
                    })(n),
                    sn(n),
                    M(n, e.class_loading),
                    R(i, -1),
                    A(n),
                    C(e.callback_cancel, n, t, i));
                })(n, t, e, i),
                C(e.callback_exit, n, t, i));
            })(n.target, n, t, e);
      });
    },
    bn = function (n) {
      return Array.prototype.slice.call(n);
    },
    mn = function (n) {
      return n.container.querySelectorAll(n.elements_selector);
    },
    pn = function (n) {
      return (function (n) {
        return k(n) === p;
      })(n);
    },
    hn = function (n, t) {
      return (function (n) {
        return bn(n).filter(L);
      })(n || mn(t));
    },
    En = function (n, e) {
      var o = c(n);
      (this._settings = o),
        (this.loadingCount = 0),
        (function (n, t) {
          i &&
            !gn(n) &&
            (t._observer = new IntersectionObserver(
              function (e) {
                vn(e, n, t);
              },
              (function (n) {
                return {
                  root: n.container === document ? null : n.container,
                  rootMargin: n.thresholds || n.threshold + "px",
                };
              })(n)
            ));
        })(o, this),
        (function (n, e) {
          t &&
            ((e._onlineHandler = function () {
              !(function (n, t) {
                var e;
                ((e = mn(n)), bn(e).filter(pn)).forEach(function (t) {
                  M(t, n.class_error), A(t);
                }),
                  t.update();
              })(n, e);
            }),
            window.addEventListener("online", e._onlineHandler));
        })(o, this),
        this.update(e);
    };
  return (
    (En.prototype = {
      update: function (n) {
        var t,
          o,
          a = this._settings,
          r = hn(n, a);
        G(this, r.length),
          !e && i
            ? gn(a)
              ? (function (n, t, e) {
                  n.forEach(function (n) {
                    -1 !== _n.indexOf(n.tagName) &&
                      (function (n, t, e) {
                        n.setAttribute("loading", "lazy"),
                          cn(n, t, e),
                          (function (n, t) {
                            var e = Y[n.tagName];
                            e && e(n, t);
                          })(n, t),
                          w(n, h);
                      })(n, t, e);
                  }),
                    G(e, 0);
                })(r, a, this)
              : ((o = r),
                (function (n) {
                  n.disconnect();
                })((t = this._observer)),
                (function (n, t) {
                  t.forEach(function (t) {
                    n.observe(t);
                  });
                })(t, o))
            : this.loadAll(r);
      },
      destroy: function () {
        this._observer && this._observer.disconnect(),
          t && window.removeEventListener("online", this._onlineHandler),
          mn(this._settings).forEach(function (n) {
            U(n);
          }),
          delete this._observer,
          delete this._settings,
          delete this._onlineHandler,
          delete this.loadingCount,
          delete this.toLoadCount;
      },
      loadAll: function (n) {
        var t = this,
          e = this._settings;
        hn(n, e).forEach(function (n) {
          T(n, t), ln(n, e, t);
        });
      },
      restoreAll: function () {
        var n = this._settings;
        mn(n).forEach(function (t) {
          fn(t, n);
        });
      },
    }),
    (En.load = function (n, t) {
      var e = c(t);
      ln(n, e);
    }),
    (En.resetStatus = function (n) {
      A(n);
    }),
    t &&
      (function (n, t) {
        if (t)
          if (t.length) for (var e, i = 0; (e = t[i]); i += 1) l(n, e);
          else l(n, t);
      })(En, window.lazyLoadOptions),
    En
  );
});

jQuery(function () {
  // Avatar upload

  jQuery(".avatar-upload").on("click", function (e) {
    e.preventDefault();
    jQuery(".builder__ava").click();
  });

  jQuery(".avatar-remove").on("click", function (e) {
    e.preventDefault();

    jQuery(this).hide();
    jQuery(".avatar-input").val("");
    jQuery("#user_avatar").attr("value", "");
    jQuery(".builder__ava img").attr(
      "src",
      "/wp-content/themes/main/img/icons/user_avatar.svg"
    );
    jQuery(".builder__ava").addClass("builder__ava_icon");
  });

  jQuery(".clipboard-copy").on("click", function (e) {
    e.preventDefault();
    if (jQuery(this).attr("data-copy")) {
      navigator.clipboard.writeText(jQuery(this).attr("data-copy"));
      // jQuery(this).text('Copied');
      // setTimeout(function() {
      //     jQuery(this).text('Copy URL');
      // }, 3000);
    }
  });

  var lazyLoadInstance = new LazyLoad();

  // .. More tags for hubs

  jQuery(document)
    .on("mouseover", ".card__tags", function (e) {
      jQuery(this).addClass("card__tags_show");
    })
    .on("mouseout", ".card__tags", function () {
      jQuery(this).removeClass("card__tags_show");
    });

  // Tabs
  jQuery(".tabs-trigger").on("click", function () {
    var tab = jQuery(this).attr("data-tab"),
      load_speed = 200;

    if (jQuery(this).hasClass("button_violet")) {
      jQuery(".tabs-trigger").removeClass("tabs-trigger_active");
      jQuery('.tabs-trigger[data-tab="' + tab + '"]').addClass(
        "tabs-trigger_active"
      );
      document
        .getElementById("tabs")
        .scrollIntoView({ block: "start", behavior: "smooth" });
    } else {
      jQuery(this).siblings(".tabs-trigger").removeClass("tabs-trigger_active");
      jQuery(this).addClass("tabs-trigger_active");
    }
    jQuery('.tabs-item[data-tab="' + tab + '"]')
      .parent()
      .children(".tabs-item_active")
      .fadeOut(load_speed, function () {
        setTimeout(jQuery(this).removeClass("tabs-item_active"), load_speed);

        jQuery('.tabs-item[data-tab="' + tab + '"]').fadeIn(
          load_speed,
          function () {
            setTimeout(jQuery(this).addClass("tabs-item_active"), load_speed);
          }
        );
      });
    window.history.replaceState({}, "", "?");
  });

  // Sticky homepage header
  var hero = document.getElementById("content-slider");
  if (hero) {
    function slider_sticky() {
      if (window.pageYOffset >= 50) {
        hero.classList.add("content__slider_sticky");
      } else {
        hero.classList.remove("content__slider_sticky");
      }
    }
    if (window.innerWidth > 766 && hero) {
      window.addEventListener("scroll", function () {
        slider_sticky();
      });
    }

    // Sliders changing homepage
    function change_slide(next_slider) {
      jQuery(".hero__bullet").removeClass("hero__bullet_active");
      next_slider.addClass("hero__bullet_active");

      var current_slide = next_slider.attr("data-slide"),
        current__info = jQuery(".hero__information_active"),
        current__gradient = jQuery(".hero__gradient_active");
      current__bg = jQuery(".hero-bg_active");

      jQuery('.hero__information[data-slide="' + current_slide + '"]').css(
        "z-index",
        1
      );
      jQuery('.hero__gradient[data-slide="' + current_slide + '"]').css(
        "z-index",
        1
      );
      jQuery('.hero-bg[data-slide="' + current_slide + '"]').css("z-index", 0);

      function animation__delay() {
        current__info.removeClass("hero__information_active");
        current__gradient.removeClass("hero__gradient_active");
        current__bg.removeClass("hero-bg_active");
        jQuery(
          '.hero__information[data-slide="' + current_slide + '"]'
        ).addClass("hero__information_active");
        jQuery('.hero__gradient[data-slide="' + current_slide + '"]').addClass(
          "hero__gradient_active"
        );
        jQuery('.hero-bg[data-slide="' + current_slide + '"]').addClass(
          "hero-bg_active"
        );
      }
      setTimeout(animation__delay, 10);

      function animation__hideOld() {
        current__info.css("z-index", 0);
        current__gradient.css("z-index", 0);
        current__bg.css("z-index", -1);
      }
      setTimeout(animation__hideOld, 400);

      // jQuery('.section_week:visible').hide();
      // jQuery('.section_week[data-slide="'+current_slide+'"]').fadeIn(400);
    }

    jQuery(".hero__link")
      .on("mouseover", function () {
        jQuery(".content__slider").addClass("content__slider_hovered");
      })
      .on("mouseout", function () {
        jQuery(".content__slider").removeClass("content__slider_hovered");
      });

    jQuery(".hero__bullet").on("click", function (e) {
      e.preventDefault();
      change_slide(jQuery(this));
      jQuery(".content__slider").addClass("content__slider_hovered");
    });

    jQuery(".hero__link").on("swiperight", function (e) {
      e.preventDefault();
      var next = jQuery(".hero__bullet_active").prev();
      if (next.length > 0) {
        change_slide(next);
      } else {
        change_slide(jQuery(".hero__bullet:last-child"));
      }
      jQuery(".content__slider").addClass("content__slider_hovered");
    });
    jQuery(".hero__link").on("swipeleft", function (e) {
      e.preventDefault();
      var next = jQuery(".hero__bullet_active").next();
      if (next.length > 0) {
        change_slide(next);
      } else {
        change_slide(jQuery(".hero__bullet:first-child"));
      }
      jQuery(".content__slider").addClass("content__slider_hovered");
    });

    // Change slides every 4 seconds
    var timerId = setInterval(function () {
      if (jQuery(".content__slider_hovered").length) {
        jQuery(".content__slider").removeClass("content__slider_hovered");
        return;
      }

      var next_bullet = jQuery(".hero__bullet_active").next();
      if (next_bullet.length) {
        change_slide(next_bullet);
      } else {
        change_slide(jQuery(".hero__bullet:first-child"));
      }
    }, 4000);
  }

  // Dropdown logic

  jQuery(".dropdown").on("click", function () {
    var list = jQuery(this).find(".dropdown__content");
    if (list.is(":visible")) {
      list.fadeOut(150);
      list.removeClass("dropdown__content_active");
    } else {
      list.fadeIn(150);
      list.addClass("dropdown__content_active");
    }
  });

  jQuery(".dropdown__item").on("click", function () {
    var thisItem = jQuery(this);

    if (thisItem.parent().hasClass("dropdown__list_reload")) {
      let this_type = thisItem.parent().attr("data-type"),
        searchPar = window.location.search,
        urlParams = new URLSearchParams(searchPar),
        entries = urlParams.entries(),
        newUrl = document.location.href.split("?")[0] + "?",
        firstBlood = false,
        updated = false;

      if (
        searchPar &&
        !searchPar.includes("&") &&
        searchPar.includes(this_type) &&
        !thisItem.attr("data-value")
      ) {
        searchPar = false;
      }

      if (searchPar) {
        for (const entry of entries) {
          if (thisItem.attr("data-value") || this_type !== entry[0]) {
            if (firstBlood !== false) {
              newUrl = newUrl + "&";
            }
            if (this_type == entry[0]) {
              newUrl = newUrl + entry[0] + "=" + thisItem.attr("data-value");
              updated = true;
            } else {
              newUrl = newUrl + entry[0] + "=" + entry[1];
            }

            firstBlood = true;
          }
        }
        if (updated !== true && thisItem.attr("data-value")) {
          newUrl = newUrl + "&" + this_type + "=" + thisItem.attr("data-value");
        }
      } else {
        if (thisItem.attr("data-value")) {
          newUrl = newUrl + this_type + "=" + thisItem.attr("data-value");
        } else {
          newUrl = newUrl.split("?")[0];
        }
      }
      window.location.href = newUrl;
    } else if (!thisItem.hasClass("dropdown__item_disabled")) {
      thisItem
        .siblings(".dropdown__item_active")
        .removeClass("dropdown__item_active");
      thisItem.addClass("dropdown__item_active");

      thisItem
        .parent()
        .parent()
        .parent()
        .find(".dropdown__title")
        .text(thisItem.text());
    }
  });

  jQuery(document).mouseup(function (e) {
    var container = jQuery(".dropdown__content_active");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.fadeOut(150);
      container.removeClass("dropdown__content_active");
    }
    var container2 = jQuery(".notifications-box");
    if (!container2.is(e.target) && container2.has(e.target).length === 0) {
      container2.fadeOut();
    }
  });

  jQuery(".filter-button_trigger").on("click", function () {
    jQuery(".hubs-list__filters").toggle();
  });

  jQuery(".filter-button_checkbox").on("click", function () {
    jQuery(this).toggleClass("filter-button_active");
    let type = jQuery(this).attr("data-type"),
      newUrl = window.location.href,
      oldUrl = window.location.search;

    if (oldUrl.includes("?" + type + "=1&")) {
      newUrl = newUrl.replace(type + "=1&", "");
    } else if (oldUrl.includes("?" + type + "=1")) {
      newUrl = newUrl.replace("?" + type + "=1", "");
    } else if (oldUrl.includes("&" + type + "=1")) {
      newUrl = newUrl.replace("&" + type + "=1", "");
    } else if (oldUrl.includes("?")) {
      newUrl = newUrl + "&" + type + "=1";
    } else {
      newUrl = newUrl + "?" + type + "=1";
    }
    window.location.href = newUrl;
  });

  // Mobile menu

  jQuery("#menu-trigger").click(function () {
    jQuery(this).toggleClass("open");
    jQuery(".sidebar").toggleClass("sidebar_active");
  });

  // Popups

  jQuery(document).on("click", ".popup-trigger", function (e) {
    if (jQuery(this).attr("data-popup")) {
      e.preventDefault();

      jQuery(".hamburger").removeClass("is-active");
      jQuery(".nav_visible").removeClass("nav_visible");
      jQuery("body").addClass("noscroll");

      jQuery("#" + jQuery(this).attr("data-popup")).addClass("popup_active");

      if (jQuery(this).hasClass("three-dots")) {
        jQuery("#comment_id").val(jQuery(this).attr("data-id"));
        jQuery("#parent_id").val(jQuery(this).attr("data-parent"));
      }
    }
  });
  jQuery(document).on(
    "click",
    ".popup__bg, .popup__return .popup__close, .button_closePopup",
    function () {
      if (!jQuery(this).hasClass("popup__bg_disabled")) {
        jQuery("body").removeClass("noscroll");
        jQuery(".popup").removeClass("popup_active");
        history.pushState(
          "",
          document.title,
          window.location.pathname + window.location.search
        );
        if (jQuery(this).hasClass("button_closePopup")) {
          jQuery(".magic-form__step_active").removeClass(
            "magic-form__step_active"
          );
          jQuery('.magic-form__step[data-step="1"]').addClass(
            "magic-form__step_active"
          );
        }
      }
    }
  );

  jQuery("#username-pseudo").on("keyup", function () {
    // jQuery('#reg_email, #username').val(jQuery(this).val());
    jQuery("#reg_email").val(jQuery(this).val());
  });
  jQuery("#reg_email").on("keyup", function () {
    jQuery("#username-pseudo").val(jQuery(this).val());
  });

  jQuery(".magic-form__next").on("click", function (e) {
    e.preventDefault();
    var next = jQuery(this).attr("data-next");
    if (next) {
      if (
        ((next == 2 || next == 3) &&
          jQuery("#username-pseudo").length &&
          !jQuery("#username-pseudo").val().includes("@") &&
          !jQuery("#username-pseudo").val().includes(".")) ||
        (jQuery("#reg_email").length &&
          jQuery("#reg_email").css("border-color") !== "rgba(0, 0, 0, 0)" &&
          next == 3)
      ) {
        jQuery("#username-pseudo").css("border-color", "red");
        // jQuery('#reg_email').css('border-color', 'red');
      } else if (
        next == 3 &&
        jQuery("#reg_password").length &&
        jQuery("#reg_password").val().length < 2
      ) {
        jQuery("#reg_password").css("border-color", "red");
      } else if (
        next == 66 &&
        (!jQuery("#billing_address_1").val().length ||
          !jQuery("#billing_city").val().length ||
          !jQuery("#billing_postcode").val().length)
      ) {
        if (!jQuery("#billing_address_1").val().length) {
          jQuery("#billing_address_1").css("border-color", "red");
        }
        if (!jQuery("#billing_city").val().length) {
          jQuery("#billing_city").css("border-color", "red");
        }
        if (!jQuery("#billing_postcode").val().length) {
          jQuery("#billing_postcode").css("border-color", "red");
        }
      } else {
        jQuery(".magic-form__step").removeClass("magic-form__step_active");
        jQuery('.magic-form__step[data-step="' + next + '"]').addClass(
          "magic-form__step_active"
        );
      }
      if (next == 5) {
        jQuery('.magic-form__step[data-step="5"] .login_msg.success').hide();
      }
      if (next == 66) {
        jQuery(".popup_checkout").addClass("popup_payment");
      } else {
        jQuery(".popup_checkout").removeClass("popup_payment");
      }

      if (next == 4 || next == 5 || next == 1) {
        jQuery(".woocommerce-form-register .register_msg").hide();
      }
    }
  });

  jQuery(".afl").on("click", function () {
    var the_button = jQuery(this);

    navigator.clipboard.writeText(the_button.text()).then(
      function () {
        the_button.addClass("afl_copied");
        setTimeout(function () {
          the_button.removeClass("afl_copied");
        }, 1000);
      },
      function () {
        the_button.addClass("afl_error");
      }
    );
  });

  jQuery(".change-password__link").on("click", function () {
    jQuery(this)
      .parent()
      .fadeOut(200, function () {
        setTimeout(jQuery("#password-change").fadeIn(200), 200);
      });
  });
});
