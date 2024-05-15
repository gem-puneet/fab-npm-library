(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.myPackage = {}));
})(this, (function (exports) { 'use strict';

    // Import CSS

    // Function to update the progress of the progress bar
    function updateProgress(progress) {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.width = `${progress}%`;
    }

    var modalTemplate = "<div class=\"modal\"> <div class=\"modal-content\"> <span class=\"close\">&times;</span> <h2>Modal Header</h2> <p>This is a modal example.</p> <button class=\"modal-button\">Close Modal</button> </div> </div> ";

    // Import HTML template

    // Modal component class
    class Modal {
        constructor() {
            // Append modal HTML to the document body
            document.body.innerHTML += modalTemplate;

            // Get modal element
            this.modal = document.querySelector('.modal');
            this.modalButton = document.querySelector('.modal-button');
            this.closeButton = document.querySelector('.close');

            // Event listeners to open and close the modal
            this.modalButton.addEventListener('click', this.openModal.bind(this));
            this.closeButton.addEventListener('click', this.closeModal.bind(this));
        }

        // Function to open the modal
        openModal() {
            this.modal.style.display = 'block';
        }

        // Function to close the modal
        closeModal() {
            this.modal.style.display = 'none';
        }
    }

    let F = {};
    function D(e = {}) {
      F = {
        animate: !0,
        allowClose: !0,
        overlayOpacity: 0.7,
        smoothScroll: !1,
        disableActiveInteraction: !1,
        showProgress: !1,
        stagePadding: 10,
        stageRadius: 5,
        popoverOffset: 10,
        showButtons: ["next", "previous", "close"],
        disableButtons: [],
        overlayColor: "#000",
        ...e
      };
    }
    function a(e) {
      return e ? F[e] : F;
    }
    function W(e, o, t, i) {
      return (e /= i / 2) < 1 ? t / 2 * e * e + o : -t / 2 * (--e * (e - 2) - 1) + o;
    }
    function Q(e) {
      const o = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
      return e.flatMap((t) => {
        const i = t.matches(o), p = Array.from(t.querySelectorAll(o));
        return [...i ? [t] : [], ...p];
      }).filter((t) => getComputedStyle(t).pointerEvents !== "none" && ae(t));
    }
    function Z(e) {
      if (!e || se(e))
        return;
      const o = a("smoothScroll");
      e.scrollIntoView({
        // Removing the smooth scrolling for elements which exist inside the scrollable parent
        // This was causing the highlight to not properly render
        behavior: !o || re(e) ? "auto" : "smooth",
        inline: "center",
        block: "center"
      });
    }
    function re(e) {
      if (!e || !e.parentElement)
        return;
      const o = e.parentElement;
      return o.scrollHeight > o.clientHeight;
    }
    function se(e) {
      const o = e.getBoundingClientRect();
      return o.top >= 0 && o.left >= 0 && o.bottom <= (window.innerHeight || document.documentElement.clientHeight) && o.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
    function ae(e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }
    let O = {};
    function b(e, o) {
      O[e] = o;
    }
    function l(e) {
      return e ? O[e] : O;
    }
    function V() {
      O = {};
    }
    let R = {};
    function N(e, o) {
      R[e] = o;
    }
    function L(e) {
      var o;
      (o = R[e]) == null || o.call(R);
    }
    function ce() {
      R = {};
    }
    function le(e, o, t, i) {
      let p = l("__activeStagePosition");
      const n = p || t.getBoundingClientRect(), f = i.getBoundingClientRect(), w = W(e, n.x, f.x - n.x, o), r = W(e, n.y, f.y - n.y, o), v = W(e, n.width, f.width - n.width, o), s = W(e, n.height, f.height - n.height, o);
      p = {
        x: w,
        y: r,
        width: v,
        height: s
      }, J(p), b("__activeStagePosition", p);
    }
    function G(e) {
      if (!e)
        return;
      const o = e.getBoundingClientRect(), t = {
        x: o.x,
        y: o.y,
        width: o.width,
        height: o.height
      };
      b("__activeStagePosition", t), J(t);
    }
    function de() {
      const e = l("__activeStagePosition"), o = l("__overlaySvg");
      if (!e)
        return;
      if (!o) {
        console.warn("No stage svg found.");
        return;
      }
      const t = window.innerWidth, i = window.innerHeight;
      o.setAttribute("viewBox", `0 0 ${t} ${i}`);
    }
    function pe(e) {
      const o = ue(e);
      document.body.appendChild(o), te(o, (t) => {
        t.target.tagName === "path" && L("overlayClick");
      }), b("__overlaySvg", o);
    }
    function J(e) {
      const o = l("__overlaySvg");
      if (!o) {
        pe(e);
        return;
      }
      const t = o.firstElementChild;
      if ((t == null ? void 0 : t.tagName) !== "path")
        throw new Error("no path element found in stage svg");
      t.setAttribute("d", U(e));
    }
    function ue(e) {
      const o = window.innerWidth, t = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${o} ${t}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return p.setAttribute("d", U(e)), p.style.fill = a("overlayColor") || "rgb(0,0,0)", p.style.opacity = `${a("overlayOpacity")}`, p.style.pointerEvents = "auto", p.style.cursor = "auto", i.appendChild(p), i;
    }
    function U(e) {
      const o = window.innerWidth, t = window.innerHeight, i = a("stagePadding") || 0, p = a("stageRadius") || 0, n = e.width + i * 2, f = e.height + i * 2, w = Math.min(p, n / 2, f / 2), r = Math.floor(Math.max(w, 0)), v = e.x - i + r, s = e.y - i, c = n - r * 2, d = f - r * 2;
      return `M${o},0L0,0L0,${t}L${o},${t}L${o},0Z
    M${v},${s} h${c} a${r},${r} 0 0 1 ${r},${r} v${d} a${r},${r} 0 0 1 -${r},${r} h-${c} a${r},${r} 0 0 1 -${r},-${r} v-${d} a${r},${r} 0 0 1 ${r},-${r} z`;
    }
    function ve() {
      const e = l("__overlaySvg");
      e && e.remove();
    }
    function fe() {
      const e = document.getElementById("driver-dummy-element");
      if (e)
        return e;
      let o = document.createElement("div");
      return o.id = "driver-dummy-element", o.style.width = "0", o.style.height = "0", o.style.pointerEvents = "none", o.style.opacity = "0", o.style.position = "fixed", o.style.top = "50%", o.style.left = "50%", document.body.appendChild(o), o;
    }
    function K(e) {
      const { element: o } = e;
      let t = typeof o == "string" ? document.querySelector(o) : o;
      t || (t = fe()), ge(t, e);
    }
    function he() {
      const e = l("__activeElement"), o = l("__activeStep");
      e && (G(e), de(), ie(e, o));
    }
    function ge(e, o) {
      const i = Date.now(), p = l("__activeStep"), n = l("__activeElement") || e, f = !n || n === e, w = e.id === "driver-dummy-element", r = n.id === "driver-dummy-element", v = a("animate"), s = o.onHighlightStarted || a("onHighlightStarted"), c = (o == null ? void 0 : o.onHighlighted) || a("onHighlighted"), d = (p == null ? void 0 : p.onDeselected) || a("onDeselected"), m = a(), g = l();
      !f && d && d(r ? void 0 : n, p, {
        config: m,
        state: g
      }), s && s(w ? void 0 : e, o, {
        config: m,
        state: g
      });
      const u = !f && v;
      let h = !1;
      xe(), b("previousStep", p), b("previousElement", n), b("activeStep", o), b("activeElement", e);
      const P = () => {
        if (l("__transitionCallback") !== P)
          return;
        const x = Date.now() - i, y = 400 - x <= 400 / 2;
        o.popover && y && !h && u && (X(e, o), h = !0), a("animate") && x < 400 ? le(x, 400, n, e) : (G(e), c && c(w ? void 0 : e, o, {
          config: a(),
          state: l()
        }), b("__transitionCallback", void 0), b("__previousStep", p), b("__previousElement", n), b("__activeStep", o), b("__activeElement", e)), window.requestAnimationFrame(P);
      };
      b("__transitionCallback", P), window.requestAnimationFrame(P), Z(e), !u && o.popover && X(e, o), n.classList.remove("driver-active-element", "driver-no-interaction"), n.removeAttribute("aria-haspopup"), n.removeAttribute("aria-expanded"), n.removeAttribute("aria-controls"), a("disableActiveInteraction") && e.classList.add("driver-no-interaction"), e.classList.add("driver-active-element"), e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", "true"), e.setAttribute("aria-controls", "driver-popover-content");
    }
    function we() {
      var e;
      (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((o) => {
        o.classList.remove("driver-active-element", "driver-no-interaction"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls");
      });
    }
    function I() {
      const e = l("__resizeTimeout");
      e && window.cancelAnimationFrame(e), b("__resizeTimeout", window.requestAnimationFrame(he));
    }
    function me(e) {
      var r;
      if (!l("isInitialized") || !(e.key === "Tab" || e.keyCode === 9))
        return;
      const i = l("__activeElement"), p = (r = l("popover")) == null ? void 0 : r.wrapper, n = Q([
        ...p ? [p] : [],
        ...i ? [i] : []
      ]), f = n[0], w = n[n.length - 1];
      if (e.preventDefault(), e.shiftKey) {
        const v = n[n.indexOf(document.activeElement) - 1] || w;
        v == null || v.focus();
      } else {
        const v = n[n.indexOf(document.activeElement) + 1] || f;
        v == null || v.focus();
      }
    }
    function ee(e) {
      var t;
      ((t = a("allowKeyboardControl")) == null || t) && (e.key === "Escape" ? L("escapePress") : e.key === "ArrowRight" ? L("arrowRightPress") : e.key === "ArrowLeft" && L("arrowLeftPress"));
    }
    function te(e, o, t) {
      const i = (n, f) => {
        const w = n.target;
        e.contains(w) && ((!t || t(w)) && (n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation()), f == null || f(n));
      };
      document.addEventListener("pointerdown", i, !0), document.addEventListener("mousedown", i, !0), document.addEventListener("pointerup", i, !0), document.addEventListener("mouseup", i, !0), document.addEventListener(
        "click",
        (n) => {
          i(n, o);
        },
        !0
      );
    }
    function ye() {
      window.addEventListener("keyup", ee, !1), window.addEventListener("keydown", me, !1), window.addEventListener("resize", I), window.addEventListener("scroll", I);
    }
    function be() {
      window.removeEventListener("keyup", ee), window.removeEventListener("resize", I), window.removeEventListener("scroll", I);
    }
    function xe() {
      const e = l("popover");
      e && (e.wrapper.style.display = "none");
    }
    function X(e, o) {
      var C, y;
      let t = l("popover");
      t && document.body.removeChild(t.wrapper), t = Pe(), document.body.appendChild(t.wrapper);
      const {
        title: i,
        description: p,
        showButtons: n,
        disableButtons: f,
        showProgress: w,
        nextBtnText: r = a("nextBtnText") || "Next &rarr;",
        prevBtnText: v = a("prevBtnText") || "&larr; Previous",
        progressText: s = a("progressText") || "{current} of {total}"
      } = o.popover || {};
      t.nextButton.innerHTML = r, t.previousButton.innerHTML = v, t.progress.innerHTML = s, i ? (t.title.innerHTML = i, t.title.style.display = "block") : t.title.style.display = "none", p ? (t.description.innerHTML = p, t.description.style.display = "block") : t.description.style.display = "none";
      const c = n || a("showButtons"), d = w || a("showProgress") || !1, m = (c == null ? void 0 : c.includes("next")) || (c == null ? void 0 : c.includes("previous")) || d;
      t.closeButton.style.display = c.includes("close") ? "block" : "none", m ? (t.footer.style.display = "flex", t.progress.style.display = d ? "block" : "none", t.nextButton.style.display = c.includes("next") ? "block" : "none", t.previousButton.style.display = c.includes("previous") ? "block" : "none") : t.footer.style.display = "none";
      const g = f || a("disableButtons") || [];
      g != null && g.includes("next") && (t.nextButton.disabled = !0, t.nextButton.classList.add("driver-popover-btn-disabled")), g != null && g.includes("previous") && (t.previousButton.disabled = !0, t.previousButton.classList.add("driver-popover-btn-disabled")), g != null && g.includes("close") && (t.closeButton.disabled = !0, t.closeButton.classList.add("driver-popover-btn-disabled"));
      const u = t.wrapper;
      u.style.display = "block", u.style.left = "", u.style.top = "", u.style.bottom = "", u.style.right = "", u.id = "driver-popover-content", u.setAttribute("role", "dialog"), u.setAttribute("aria-labelledby", "driver-popover-title"), u.setAttribute("aria-describedby", "driver-popover-description");
      const h = t.arrow;
      h.className = "driver-popover-arrow";
      const P = ((C = o.popover) == null ? void 0 : C.popoverClass) || a("popoverClass") || "";
      u.className = `driver-popover ${P}`.trim(), te(
        t.wrapper,
        (k) => {
          var $, B, M;
          const T = k.target, E = (($ = o.popover) == null ? void 0 : $.onNextClick) || a("onNextClick"), A = ((B = o.popover) == null ? void 0 : B.onPrevClick) || a("onPrevClick"), H = ((M = o.popover) == null ? void 0 : M.onCloseClick) || a("onCloseClick");
          if (T.classList.contains("driver-popover-next-btn"))
            return E ? E(e, o, {
              config: a(),
              state: l()
            }) : L("nextClick");
          if (T.classList.contains("driver-popover-prev-btn"))
            return A ? A(e, o, {
              config: a(),
              state: l()
            }) : L("prevClick");
          if (T.classList.contains("driver-popover-close-btn"))
            return H ? H(e, o, {
              config: a(),
              state: l()
            }) : L("closeClick");
        },
        (k) => !(t != null && t.description.contains(k)) && !(t != null && t.title.contains(k)) && typeof k.className == "string" && k.className.includes("driver-popover")
      ), b("popover", t);
      const S = ((y = o.popover) == null ? void 0 : y.onPopoverRender) || a("onPopoverRender");
      S && S(t, {
        config: a(),
        state: l()
      }), ie(e, o), Z(u);
      const _ = e.classList.contains("driver-dummy-element"), x = Q([u, ..._ ? [] : [e]]);
      x.length > 0 && x[0].focus();
    }
    function oe() {
      const e = l("popover");
      if (!(e != null && e.wrapper))
        return;
      const o = e.wrapper.getBoundingClientRect(), t = a("stagePadding") || 0, i = a("popoverOffset") || 0;
      return {
        width: o.width + t + i,
        height: o.height + t + i,
        realWidth: o.width,
        realHeight: o.height
      };
    }
    function Y(e, o) {
      const { elementDimensions: t, popoverDimensions: i, popoverPadding: p, popoverArrowDimensions: n } = o;
      return e === "start" ? Math.max(
        Math.min(
          t.top - p,
          window.innerHeight - i.realHeight - n.width
        ),
        n.width
      ) : e === "end" ? Math.max(
        Math.min(
          t.top - (i == null ? void 0 : i.realHeight) + t.height + p,
          window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
        ),
        n.width
      ) : e === "center" ? Math.max(
        Math.min(
          t.top + t.height / 2 - (i == null ? void 0 : i.realHeight) / 2,
          window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
        ),
        n.width
      ) : 0;
    }
    function j(e, o) {
      const { elementDimensions: t, popoverDimensions: i, popoverPadding: p, popoverArrowDimensions: n } = o;
      return e === "start" ? Math.max(
        Math.min(
          t.left - p,
          window.innerWidth - i.realWidth - n.width
        ),
        n.width
      ) : e === "end" ? Math.max(
        Math.min(
          t.left - (i == null ? void 0 : i.realWidth) + t.width + p,
          window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
        ),
        n.width
      ) : e === "center" ? Math.max(
        Math.min(
          t.left + t.width / 2 - (i == null ? void 0 : i.realWidth) / 2,
          window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
        ),
        n.width
      ) : 0;
    }
    function ie(e, o) {
      const t = l("popover");
      if (!t)
        return;
      const { align: i = "start", side: p = "left" } = (o == null ? void 0 : o.popover) || {}, n = i, f = e.id === "driver-dummy-element" ? "over" : p, w = a("stagePadding") || 0, r = oe(), v = t.arrow.getBoundingClientRect(), s = e.getBoundingClientRect(), c = s.top - r.height;
      let d = c >= 0;
      const m = window.innerHeight - (s.bottom + r.height);
      let g = m >= 0;
      const u = s.left - r.width;
      let h = u >= 0;
      const P = window.innerWidth - (s.right + r.width);
      let S = P >= 0;
      const _ = !d && !g && !h && !S;
      let x = f;
      if (f === "top" && d ? S = h = g = !1 : f === "bottom" && g ? S = h = d = !1 : f === "left" && h ? S = d = g = !1 : f === "right" && S && (h = d = g = !1), f === "over") {
        const C = window.innerWidth / 2 - r.realWidth / 2, y = window.innerHeight / 2 - r.realHeight / 2;
        t.wrapper.style.left = `${C}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${y}px`, t.wrapper.style.bottom = "auto";
      } else if (_) {
        const C = window.innerWidth / 2 - (r == null ? void 0 : r.realWidth) / 2, y = 10;
        t.wrapper.style.left = `${C}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${y}px`, t.wrapper.style.top = "auto";
      } else if (h) {
        const C = Math.min(
          u,
          window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
        ), y = Y(n, {
          elementDimensions: s,
          popoverDimensions: r,
          popoverPadding: w,
          popoverArrowDimensions: v
        });
        t.wrapper.style.left = `${C}px`, t.wrapper.style.top = `${y}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", x = "left";
      } else if (S) {
        const C = Math.min(
          P,
          window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
        ), y = Y(n, {
          elementDimensions: s,
          popoverDimensions: r,
          popoverPadding: w,
          popoverArrowDimensions: v
        });
        t.wrapper.style.right = `${C}px`, t.wrapper.style.top = `${y}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", x = "right";
      } else if (d) {
        const C = Math.min(
          c,
          window.innerHeight - r.realHeight - v.width
        );
        let y = j(n, {
          elementDimensions: s,
          popoverDimensions: r,
          popoverPadding: w,
          popoverArrowDimensions: v
        });
        t.wrapper.style.top = `${C}px`, t.wrapper.style.left = `${y}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", x = "top";
      } else if (g) {
        const C = Math.min(
          m,
          window.innerHeight - (r == null ? void 0 : r.realHeight) - v.width
        );
        let y = j(n, {
          elementDimensions: s,
          popoverDimensions: r,
          popoverPadding: w,
          popoverArrowDimensions: v
        });
        t.wrapper.style.left = `${y}px`, t.wrapper.style.bottom = `${C}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", x = "bottom";
      }
      _ ? t.arrow.classList.add("driver-popover-arrow-none") : Ce(n, x, e);
    }
    function Ce(e, o, t) {
      const i = l("popover");
      if (!i)
        return;
      const p = t.getBoundingClientRect(), n = oe(), f = i.arrow, w = n.width, r = window.innerWidth, v = p.width, s = p.left, c = n.height, d = window.innerHeight, m = p.top, g = p.height;
      f.className = "driver-popover-arrow";
      let u = o, h = e;
      o === "top" ? (s + v <= 0 ? (u = "right", h = "end") : s + v - w <= 0 && (u = "top", h = "start"), s >= r ? (u = "left", h = "end") : s + w >= r && (u = "top", h = "end")) : o === "bottom" ? (s + v <= 0 ? (u = "right", h = "start") : s + v - w <= 0 && (u = "bottom", h = "start"), s >= r ? (u = "left", h = "start") : s + w >= r && (u = "bottom", h = "end")) : o === "left" ? (m + g <= 0 ? (u = "bottom", h = "end") : m + g - c <= 0 && (u = "left", h = "start"), m >= d ? (u = "top", h = "end") : m + c >= d && (u = "left", h = "end")) : o === "right" && (m + g <= 0 ? (u = "bottom", h = "start") : m + g - c <= 0 && (u = "right", h = "start"), m >= d ? (u = "top", h = "start") : m + c >= d && (u = "right", h = "end")), u ? (f.classList.add(`driver-popover-arrow-side-${u}`), f.classList.add(`driver-popover-arrow-align-${h}`)) : f.classList.add("driver-popover-arrow-none");
    }
    function Pe() {
      const e = document.createElement("div");
      e.classList.add("driver-popover");
      const o = document.createElement("div");
      o.classList.add("driver-popover-arrow");
      const t = document.createElement("header");
      t.id = "driver-popover-title", t.classList.add("driver-popover-title"), t.style.display = "none", t.innerText = "Popover Title";
      const i = document.createElement("div");
      i.id = "driver-popover-description", i.classList.add("driver-popover-description"), i.style.display = "none", i.innerText = "Popover description is here";
      const p = document.createElement("button");
      p.type = "button", p.classList.add("driver-popover-close-btn"), p.setAttribute("aria-label", "Close"), p.innerHTML = "&times;";
      const n = document.createElement("footer");
      n.classList.add("driver-popover-footer");
      const f = document.createElement("span");
      f.classList.add("driver-popover-progress-text"), f.innerText = "";
      const w = document.createElement("span");
      w.classList.add("driver-popover-navigation-btns");
      const r = document.createElement("button");
      r.type = "button", r.classList.add("driver-popover-prev-btn"), r.innerHTML = "&larr; Previous";
      const v = document.createElement("button");
      return v.type = "button", v.classList.add("driver-popover-next-btn"), v.innerHTML = "Next &rarr;", w.appendChild(r), w.appendChild(v), n.appendChild(f), n.appendChild(w), e.appendChild(p), e.appendChild(o), e.appendChild(t), e.appendChild(i), e.appendChild(n), {
        wrapper: e,
        arrow: o,
        title: t,
        description: i,
        footer: n,
        previousButton: r,
        nextButton: v,
        closeButton: p,
        footerButtons: w,
        progress: f
      };
    }
    function Se() {
      var o;
      const e = l("popover");
      e && ((o = e.wrapper.parentElement) == null || o.removeChild(e.wrapper));
    }
    function ke(e = {}) {
      D(e);
      function o() {
        a("allowClose") && v();
      }
      function t() {
        const s = l("activeIndex"), c = a("steps") || [];
        if (typeof s == "undefined")
          return;
        const d = s + 1;
        c[d] ? r(d) : v();
      }
      function i() {
        const s = l("activeIndex"), c = a("steps") || [];
        if (typeof s == "undefined")
          return;
        const d = s - 1;
        c[d] ? r(d) : v();
      }
      function p(s) {
        (a("steps") || [])[s] ? r(s) : v();
      }
      function n() {
        var h;
        if (l("__transitionCallback"))
          return;
        const c = l("activeIndex"), d = l("__activeStep"), m = l("__activeElement");
        if (typeof c == "undefined" || typeof d == "undefined" || typeof l("activeIndex") == "undefined")
          return;
        const u = ((h = d.popover) == null ? void 0 : h.onPrevClick) || a("onPrevClick");
        if (u)
          return u(m, d, {
            config: a(),
            state: l()
          });
        i();
      }
      function f() {
        var u;
        if (l("__transitionCallback"))
          return;
        const c = l("activeIndex"), d = l("__activeStep"), m = l("__activeElement");
        if (typeof c == "undefined" || typeof d == "undefined")
          return;
        const g = ((u = d.popover) == null ? void 0 : u.onNextClick) || a("onNextClick");
        if (g)
          return g(m, d, {
            config: a(),
            state: l()
          });
        t();
      }
      function w() {
        l("isInitialized") || (b("isInitialized", !0), document.body.classList.add("driver-active", a("animate") ? "driver-fade" : "driver-simple"), ye(), N("overlayClick", o), N("escapePress", o), N("arrowLeftPress", n), N("arrowRightPress", f));
      }
      function r(s = 0) {
        var E, A, H, $, B, M, z, q;
        const c = a("steps");
        if (!c) {
          console.error("No steps to drive through"), v();
          return;
        }
        if (!c[s]) {
          v();
          return;
        }
        b("__activeOnDestroyed", document.activeElement), b("activeIndex", s);
        const d = c[s], m = c[s + 1], g = c[s - 1], u = ((E = d.popover) == null ? void 0 : E.doneBtnText) || a("doneBtnText") || "Done", h = a("allowClose"), P = typeof ((A = d.popover) == null ? void 0 : A.showProgress) != "undefined" ? (H = d.popover) == null ? void 0 : H.showProgress : a("showProgress"), _ = ((($ = d.popover) == null ? void 0 : $.progressText) || a("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${s + 1}`).replace("{{total}}", `${c.length}`), x = ((B = d.popover) == null ? void 0 : B.showButtons) || a("showButtons"), C = [
          "next",
          "previous",
          ...h ? ["close"] : []
        ].filter((ne) => !(x != null && x.length) || x.includes(ne)), y = ((M = d.popover) == null ? void 0 : M.onNextClick) || a("onNextClick"), k = ((z = d.popover) == null ? void 0 : z.onPrevClick) || a("onPrevClick"), T = ((q = d.popover) == null ? void 0 : q.onCloseClick) || a("onCloseClick");
        K({
          ...d,
          popover: {
            showButtons: C,
            nextBtnText: m ? void 0 : u,
            disableButtons: [...g ? [] : ["previous"]],
            showProgress: P,
            progressText: _,
            onNextClick: y || (() => {
              m ? r(s + 1) : v();
            }),
            onPrevClick: k || (() => {
              r(s - 1);
            }),
            onCloseClick: T || (() => {
              v();
            }),
            ...(d == null ? void 0 : d.popover) || {}
          }
        });
      }
      function v(s = !0) {
        const c = l("__activeElement"), d = l("__activeStep"), m = l("__activeOnDestroyed"), g = a("onDestroyStarted");
        if (s && g) {
          const P = !c || (c == null ? void 0 : c.id) === "driver-dummy-element";
          g(P ? void 0 : c, d, {
            config: a(),
            state: l()
          });
          return;
        }
        const u = (d == null ? void 0 : d.onDeselected) || a("onDeselected"), h = a("onDestroyed");
        if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), be(), Se(), we(), ve(), ce(), V(), c && d) {
          const P = c.id === "driver-dummy-element";
          u && u(P ? void 0 : c, d, {
            config: a(),
            state: l()
          }), h && h(P ? void 0 : c, d, {
            config: a(),
            state: l()
          });
        }
        m && m.focus();
      }
      return {
        isActive: () => l("isInitialized") || !1,
        refresh: I,
        drive: (s = 0) => {
          w(), r(s);
        },
        setConfig: D,
        setSteps: (s) => {
          V(), D({
            ...a(),
            steps: s
          });
        },
        getConfig: a,
        getState: l,
        getActiveIndex: () => l("activeIndex"),
        isFirstStep: () => l("activeIndex") === 0,
        isLastStep: () => {
          const s = a("steps") || [], c = l("activeIndex");
          return c !== void 0 && c === s.length - 1;
        },
        getActiveStep: () => l("activeStep"),
        getActiveElement: () => l("activeElement"),
        getPreviousElement: () => l("previousElement"),
        getPreviousStep: () => l("previousStep"),
        moveNext: t,
        movePrevious: i,
        moveTo: p,
        hasNextStep: () => {
          const s = a("steps") || [], c = l("activeIndex");
          return c !== void 0 && s[c + 1];
        },
        hasPreviousStep: () => {
          const s = a("steps") || [], c = l("activeIndex");
          return c !== void 0 && s[c - 1];
        },
        highlight: (s) => {
          w(), K({
            ...s,
            popover: s.popover ? {
              showButtons: [],
              showProgress: !1,
              progressText: "",
              ...s.popover
            } : void 0
          });
        },
        destroy: () => {
          v(!1);
        }
      };
    }

    const TourGuide = (theme, steps) => {

        if (theme === "yellow") {

            steps.forEach((step) => {
                step.popover.popoverClass = 'driverjs-theme';
            });

            const yellowDriverObj = ke({
                showProgress: true,
                animate: false,
                nextBtnText: '—›',
                prevBtnText: '‹—',
                doneBtnText: '✕',
                steps: steps
            });

            return yellowDriverObj.drive();

        } else {

            const defaultDriverObj = ke({
                showProgress: true,
                animate: false,
                steps: steps
            });

            return defaultDriverObj.drive();

        }
    };

    var img = "data:image/svg+xml,%3csvg width='106' height='110' viewBox='0 0 106 110' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 109.745V51.9125L52.5 -1.65701e-05H105.5L0 109.745Z' fill='%23012B74'/%3e%3cpath d='M22.0961 50.8348L31.7651 52.8042L25.8891 46.942C25.5078 46.5616 25.3028 46.1934 25.2765 45.8406C25.2635 45.6644 25.2907 45.4876 25.3561 45.3234C25.4215 45.1592 25.5233 45.0119 25.6539 44.8926C25.7753 44.7591 25.9252 44.6545 26.0925 44.5864C26.2598 44.5184 26.4403 44.4887 26.6206 44.4996C26.977 44.5236 27.3463 44.7261 27.7286 45.1072L35.498 52.8586C36.364 53.7227 36.4382 54.5138 35.7203 55.232C35.5575 55.3989 35.367 55.5363 35.1571 55.6383C34.9527 55.7321 34.7321 55.786 34.5074 55.7969C34.2581 55.8091 34.0082 55.7942 33.7622 55.7525C33.5044 55.7106 33.243 55.6648 32.978 55.6151L23.4705 53.6171L29.2576 59.3907C29.6345 59.7668 29.8322 60.1387 29.8506 60.5064C29.8609 60.685 29.8318 60.8637 29.7655 61.0299C29.6993 61.1962 29.5973 61.3459 29.4669 61.4687C29.3438 61.6015 29.1925 61.7052 29.0241 61.7722C28.8557 61.8392 28.6744 61.8678 28.4934 61.8559C28.1267 61.831 27.757 61.6323 27.3843 61.2598L19.7641 53.6573C19.4961 53.41 19.2749 53.1165 19.1111 52.7911C18.9934 52.4994 18.9685 52.1787 19.0398 51.8725C19.1042 51.558 19.2601 51.2694 19.4881 51.0428C19.6306 50.8889 19.8044 50.7671 19.9978 50.6853C20.1912 50.6036 20.3999 50.5639 20.6099 50.5688C20.839 50.5754 21.067 50.6046 21.2903 50.6562C21.5488 50.7125 21.8174 50.772 22.0961 50.8348Z' fill='white'/%3e%3cpath d='M36.7862 37.1957L32.2785 41.6929L34.7042 44.1129L38.8547 39.9721C39.16 39.6672 39.4565 39.5079 39.7441 39.4944C39.8876 39.4884 40.0307 39.5136 40.1635 39.5683C40.2963 39.6229 40.4156 39.7057 40.5132 39.8108C40.6187 39.9088 40.7023 40.028 40.7585 40.1605C40.8147 40.293 40.8422 40.4359 40.8391 40.5797C40.8329 40.8693 40.6746 41.1687 40.364 41.4779L36.2135 45.6188L39.0234 48.4222L43.6859 43.7699C44.0009 43.4562 44.3108 43.2926 44.6157 43.2789C44.7696 43.2736 44.9228 43.3016 45.0648 43.361C45.2068 43.4204 45.3342 43.5097 45.4382 43.6229C45.5484 43.7253 45.635 43.8504 45.6919 43.9895C45.7488 44.1286 45.7748 44.2783 45.7679 44.4284C45.7541 44.7332 45.59 45.0424 45.2758 45.3561L39.8383 50.7808C39.4025 51.2155 38.9928 51.432 38.609 51.4303C38.2252 51.4287 37.8175 51.2124 37.3858 50.7816L29.9622 43.3752C29.7116 43.1429 29.5148 42.8589 29.3857 42.543C29.289 42.2859 29.2901 42.0025 29.3887 41.7463C29.5194 41.4355 29.7145 41.1558 29.9612 40.9257L35.2436 35.656C35.5625 35.3378 35.871 35.173 36.1671 35.1587C36.314 35.1522 36.4606 35.1776 36.5967 35.2333C36.7327 35.289 36.8549 35.3736 36.9549 35.4812C37.0644 35.5815 37.1507 35.7044 37.2078 35.8414C37.2648 35.9783 37.2912 36.126 37.2852 36.2742C37.2716 36.5709 37.1053 36.8781 36.7862 37.1957Z' fill='white'/%3e%3cpath d='M53.0453 34.5012L45.526 30.1854L49.8314 37.7078C50.1555 38.2825 50.377 38.7021 50.4985 38.9713C50.6227 39.2581 50.6705 39.5721 50.6374 39.8828C50.5913 40.2539 50.413 40.5961 50.1351 40.847C49.9317 41.0671 49.6736 41.2296 49.387 41.3183C49.1316 41.3857 48.8629 41.3845 48.6082 41.3148C48.313 41.2336 48.03 41.1138 47.7664 40.9584C47.4722 40.7901 47.2017 40.632 46.9551 40.4842L38.6597 35.4894C38.2895 35.2859 37.9442 35.0404 37.6305 34.7579C37.5071 34.64 37.4098 34.4977 37.3447 34.3401C37.2797 34.1825 37.2483 34.013 37.2527 33.8427C37.2545 33.6689 37.2912 33.4972 37.3608 33.3378C37.4303 33.1785 37.5313 33.0347 37.6576 32.915C38.0216 32.5524 38.3832 32.4247 38.7423 32.5319C39.2203 32.6987 39.6735 32.9292 40.0896 33.2172L47.1506 37.6814L43.2026 30.8513C42.9619 30.4537 42.7438 30.0429 42.5493 29.6208C42.4181 29.314 42.3693 28.9783 42.4078 28.6469C42.4671 28.2523 42.6625 27.8909 42.9605 27.6248C43.226 27.325 43.5929 27.1332 43.9912 27.0861C44.3064 27.0583 44.6236 27.1092 44.9142 27.2341C45.1791 27.3553 45.5946 27.5771 46.1606 27.8997L53.0198 31.8258L48.5457 24.78C48.3542 24.4951 48.1777 24.2003 48.017 23.897C47.9012 23.6656 47.8437 23.4096 47.8494 23.1511C47.8585 22.9988 47.898 22.8498 47.9656 22.7128C48.0331 22.5759 48.1274 22.4538 48.2429 22.3537C48.3624 22.2291 48.5055 22.1292 48.6639 22.0599C48.8222 21.9906 48.9927 21.9531 49.1656 21.9498C49.3376 21.9441 49.5089 21.9748 49.6681 22.0399C49.8274 22.105 49.971 22.203 50.0895 22.3275C50.3699 22.6427 50.6157 22.987 50.8228 23.3543L55.83 31.6305C56.1668 32.19 56.4026 32.6112 56.5375 32.894C56.6733 33.1821 56.7326 33.5003 56.7094 33.8179C56.6658 34.1985 56.4821 34.5494 56.1939 34.8026C55.9426 35.0794 55.601 35.2584 55.2299 35.3076C54.9237 35.3434 54.6136 35.2982 54.3304 35.1767C54.0676 35.0586 53.6392 34.8334 53.0453 34.5012Z' fill='white'/%3e%3c/svg%3e";

    const AnnModal = (options) => {
        const { questionsAnswers, onClose } = options;

        const createModal = () => {
            // Create modal elements
            const modal = document.createElement("div");
            modal.id = "modal";
            modal.classList.add("AnnModal-modal");

            const modalContent = document.createElement("div");
            modalContent.classList.add("AnnModal-modal-content");

            const modalHeader = document.createElement("div");
            modalHeader.classList.add("AnnModal-modal-header");

            modalHeader.innerHTML = `
            <img src="${img}" alt="icon" class="AnnModal-new-img">
            <h2 class="AnnModal-modal-title">Announcements!!!</h2>
            <span class="AnnModal-close">×</span>
        `;

            const modalBody = document.createElement("div");
            modalBody.classList.add("AnnModal-modal-body");

            modalContent.appendChild(modalHeader);
            modalContent.appendChild(modalBody);
            modal.appendChild(modalContent);

            // Populate modal content
            questionsAnswers.forEach((item, index) => {
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('AnnModal-content-div');

                const contentButton = document.createElement('button');
                contentButton.innerHTML = item.button;
                contentButton.classList.add('AnnModal-content-button');

                const question = document.createElement('h3');
                question.textContent = item.question;
                question.classList.add('AnnModal-content-h3');
                console.log("h3 created");
                const answer = document.createElement('p');
                answer.textContent = item.answer;
                answer.classList.add('AnnModal-content-p');
                console.log("p created");
                // Check if the paragraph content exceeds a certain height (equivalent to two lines)
                if (isLongContent(answer)) {
                    console.log("inside isLong 1");
                    const readMoreLink = document.createElement('a');
                    readMoreLink.textContent = 'Read More';
                    readMoreLink.classList.add('AnnModal-read-more');
                    readMoreLink.href = '#'; // Add your link destination here
                    console.log("inside isLong 2");
                    // Add click event listener to toggle between full and truncated content
                    readMoreLink.addEventListener('click', (event) => {
                        event.preventDefault();
                        contentDiv.classList.toggle('AnnModal-content-div-expanded');
                        readMoreLink.textContent = contentDiv.classList.contains('AnnModal-content-div-expanded') ? 'Read Less' : 'Read More';
                    });
                    console.log("inside isLong 3");
                    // Append "Read More" link to contentDiv
                    contentDiv.appendChild(readMoreLink);
                    console.log("inside isLong 4");
                }
                console.log("inside isLong 5");
                contentDiv.appendChild(contentButton);
                contentDiv.appendChild(question);
                contentDiv.appendChild(answer);

                modalBody.appendChild(contentDiv);
                console.log("inside isLong 6");
                // Add horizontal line between content divs
                if (index !== questionsAnswers.length - 1) {
                    const hr = document.createElement('hr');
                    hr.classList.add('AnnModal-horizontal-line');
                    modalBody.appendChild(hr);
                }
            });

            // Append modal to the document body
            document.body.appendChild(modal);

            // Event listeners for closing modal
            modal.querySelector('.AnnModal-close').addEventListener('click', () => {
                closeModal();
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal();
                }
            });

            return modal;
        };


        // Function to check if the paragraph content exceeds a certain height
        const isLongContent = (element) => {
            console.log("inside isLong 7");
            console.log("x",parseFloat(getComputedStyle(element).lineHeight));
            console.log("y",element.scrollHeight);
            return element.scrollHeight > 2 * parseFloat(getComputedStyle(element).lineHeight);
        };

        const openModal = () => {
            const modal = createModal();
            modal.style.display = "block";
        };

        const closeModal = () => {
            const modal = document.getElementById("modal");
            if (modal) {
                modal.style.display = "none";
                onClose(); // Call onClose callback provided by the user
            }
        };

        return {
            openModal,
            closeModal
        };
    };

    var faqItems = [
        { question: "How do I open a bank account with FAB?", answer: "To create your account with FAB, you can visit their website and follow the instructions for account opening. You may need to provide personal information and identification documents" },
        { question: " What are the requirements for opening a bank account with FAB?", answer: "Typically, you will need to provide proof of identity such as a passport or national ID card, proof of address, and possibly other documents depending on the type of account you wish to open." },
        { question: "How can I access FAB's online banking services?", answer: "You can access FAB's online banking by visiting their website and logging in with your account credentials. Alternatively, you may download their mobile banking app from the App Store or Google Play Store and log in using your account details." },
        { question: "What services are offered through FAB's online banking platform?", answer: "FAB's online banking platform typically offers services such as account balance inquiries, fund transfers, bill payments, account statements, and more, depending on the specific features available to you as a customer." },
        { question: "Is there a mobile app for FAB's banking services?", answer: "Yes, FAB usually offers a mobile banking app that allows customers to conveniently access banking services on their smartphones or tablets. You can download the app from the App Store or Google Play Store." },
        { question: "How do I reset my online banking password with FAB?", answer: "If you forget your online banking password with FAB, you can usually initiate a password reset process through their website or mobile app. Follow the prompts to verify your identity and create a new password." },
        { question: "What should I do if I notice suspicious activity on my FAB account?", answer: " If you suspect unauthorized activity on your FAB account, it's important to contact the bank immediately. They will guide you through the necessary steps to secure your account and investigate any fraudulent transactions." },
        { question: "Can I link external accounts to my FAB account for transfers?", answer: "Yes, FAB typically allows customers to link external accounts for fund transfers. You may need to verify ownership of the external account before initiating transfers." },
        { question: "What are the fees associated with FAB's banking services?", answer: " Fees vary depending on the type of account and services you use. Common fees may include account maintenance fees, transaction fees, ATM withdrawal fees, and international transfer fees. It's best to consult FAB's fee schedule or contact their customer service for specific information" },
        { question: "How long does it take for a fund transfer to be processed through FAB?", answer: "The processing time for fund transfers with FAB can vary depending on factors such as the destination of the transfer and the transfer method used. Domestic transfers may be processed within the same business day, while international transfers may take a few business days to complete." }
    ];

    class FAQComponent {
        constructor(containerElement) {
            this.faqOuterDiv = containerElement;
          }
        createHeader() {
            const header = document.createElement("div");
            header.classList.add("faq-container-header");

            const headerText = document.createElement("div");
            headerText.classList.add("faq-header-text");

            const faqTitle = document.createElement("div");
            faqTitle.innerHTML = "<span class='header-text-faq'>FAQs with FinBot</span><br/><span class='faq-header-text-help'>Get help 24*7</span>";

            const svgImage = document.createElement("img");
            svgImage.classList.add("faq-boat-img");
            svgImage.setAttribute("src", "./assets/icon/Chatbot.svg");

            headerText.appendChild(faqTitle);
            headerText.appendChild(svgImage);
            header.appendChild(headerText);
            this.faqOuterDiv.appendChild(header);
        }

        createFAQComponent() {
            const bodyContainer = document.createElement("div");
            bodyContainer.classList.add("faq-body-container");

            this.createHeader();

            const inputElement = document.createElement("input");
            const searchImage = document.createElement("img");

            searchImage.classList.add("faq-search-img");
            searchImage.setAttribute("src", "./assets/icon/search.svg");
            bodyContainer.appendChild(searchImage);

            inputElement.classList.add("faq-search-box");
            inputElement.setAttribute("type", "text");
            inputElement.setAttribute("placeholder", "Cannot find what you need? Type here");

            const handleInputbox = () => {
                const inputValue = inputElement.value.trim().toLowerCase();
                faqItems.forEach(function (faqItem, index) {
                    const faqContainer = document.getElementById("questions" + (index + 1));
                    const image = document.getElementById("img" + (index + 1));
                    if (faqItem.question.toLowerCase().includes(inputValue)) {
                        faqContainer.style.display = "block";
                        image.style.display = "block";
                    } else {
                        faqContainer.style.display = "none";
                        image.style.display = "none";
                    }
                });
            };

            inputElement.addEventListener("input", function (e) {
                handleInputbox();
            });
            bodyContainer.appendChild(inputElement);

            function toggleFAQItem(id) {
                const answerElement = document.getElementById("answer" + id);
                answerElement.classList.toggle("faq-hidden");
                const queImage = document.getElementById("img" + id);
                if (answerElement.classList.contains("faq-hidden")) {
                    queImage.setAttribute("src", "./assets/icon/CircleDown.svg");
                } else {
                    queImage.setAttribute("src", "./assets/icon/CircleUp.svg");
                }
            }

            const outerDiv = document.createElement("div");
            outerDiv.classList.add("faq-outer-div");

            faqItems.forEach(function (faqItem, index) {
                const faqContainer = document.createElement("div");
                faqContainer.classList.add("faq-questions-box");
                faqContainer.id = "questions" + (index + 1);

                const question = document.createElement("div");
                question.classList.add(`faq-question`);
                question.id = "que" + (index + 1);
                question.textContent = faqItem.question;

                const answer = document.createElement("div");
                answer.classList.add("faq-answer", "faq-hidden");
                answer.id = "answer" + (index + 1);
                answer.textContent = faqItem.answer;

                faqContainer.appendChild(question);
                faqContainer.appendChild(answer);

                outerDiv.appendChild(faqContainer);
                const queImage = document.createElement("img");
                queImage.id = "img" + (index + 1);
                queImage.classList.add("faq-que-img");
                queImage.setAttribute("src", "./assets/icon/CircleDown.svg");
                queImage.addEventListener("click", function () {
                    toggleFAQItem(index + 1);
                });
                outerDiv.appendChild(queImage);
            });
            
            bodyContainer.appendChild(outerDiv);
            this.faqOuterDiv.appendChild(bodyContainer);
        }
    }


    // document.addEventListener("DOMContentLoaded", function () {
    //     var faqComponent = new FAQComponent();
    //     faqComponent.createFAQComponent();
    // });

    class HeadingComponent {
        constructor() {
        }
        testHeadingFun(){
        var TestHeading = document.createElement("div");
        TestHeading.innerHTML = "Hello How are you all";

        const hh = document.getElementsByClassName('test-heading')[0];
        hh.appendChild(TestHeading);
        }
    }

    exports.AnnModal = AnnModal;
    exports.FAQComponent = FAQComponent;
    exports.HeadingComponent = HeadingComponent;
    exports.Modal = Modal;
    exports.TourGuide = TourGuide;
    exports.updateProgress = updateProgress;

}));
