(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
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

    var faqItems = [
        { question: "How to create my account in FAB?", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How to create my account in FAB?", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" },
        { question: "How can I access Fab online banking", answer: "Dummy text" }
    ];
    var faqOuterDiv = document.getElementsByClassName('faq-container-outer')[0];
    class FAQComponent {
        constructor() {
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
            faqOuterDiv.appendChild(header);
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
            faqOuterDiv.appendChild(bodyContainer);
        }
    }


    // document.addEventListener("DOMContentLoaded", function () {
    //     var faqComponent = new FAQComponent();
    //     faqComponent.createFAQComponent();
    // });

    const questionsAnswers = [
        { button: "my button", question: "Data types in JavaScript?", answer: "Data types in JavaScript define the data type that a variable can store. JavaScript includes primitive and non-primitive data types." },
        { button: "my button", question: "Object-oriented programming (OOP)?", answer: "OOP) is a programming paradigm that allows us to model real-world objects in our code. OOP in JavaScript is based on creating objects that have properties (features) and methods (functions that can perform actions)." },
        { button: "my button", question: "Scope?", answer: "Scope determines the accessibility of variables, objects, and functions from different parts of the code." },
        { button: "my button", question: "Functions in JavaScript?", answer: "Functions are blocks of reusable code that perform a specific task. In JavaScript, functions are first-class objects, which means they can be passed around like any other value." },
        { button: "my button", question: "Arrays in JavaScript?", answer: "Arrays are special types of objects that store multiple values in a single variable. They are used to store collections of data, such as lists of items or sets of values." },
        { button: "my button", question: "Conditional statements in JavaScript?", answer: "Conditional statements are used to execute different code based on different conditions. The most common conditional statements in JavaScript are if, else if, and else." },
        { button: "my button", question: "Loops in JavaScript?", answer: "Loops are used to execute the same block of code repeatedly until a specified condition is met. JavaScript supports several types of loops, including for, while, and do-while loops." }
        // Add more objects as needed
    ];
     
    function openModal() {
        // Ensure DOM content is loaded before accessing elements
        document.addEventListener("DOMContentLoaded", function () {
            const modal = document.getElementById("modal");
            const modalBody = modal.querySelector('.modal-body');
            if (!modal || !modalBody) {
                console.error("Modal element or modal body not found.");
                return;
            }

            // Clear previous content
            modalBody.innerHTML = '';

            // Populate modal content
            questionsAnswers.forEach(item => {
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('AnnModal-content-div');

                const contentButton = document.createElement('button');
                contentButton.innerHTML = item.button;
                contentButton.classList.add('AnnModal-content-button');

                const question = document.createElement('h3');
                question.textContent = item.question;
                question.classList.add('AnnModal-content-h3');

                const answer = document.createElement('p');
                answer.textContent = item.answer;
                answer.classList.add('AnnModal-content-p');

                contentDiv.appendChild(contentButton);
                contentDiv.appendChild(question);
                contentDiv.appendChild(answer);

                modalBody.appendChild(contentDiv);
            });

            modal.style.display = "block";

            // Close the modal when the user clicks on the close button
            modal.querySelector('.modal-header .close').onclick = function () {
                modal.style.display = "none";
            };

            // Close the modal when the user clicks anywhere outside of it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        });
    }

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

    exports.FAQComponent = FAQComponent;
    exports.HeadingComponent = HeadingComponent;
    exports.Modal = Modal;
    exports.TourGuide = TourGuide;
    exports.openModal = openModal;
    exports.updateProgress = updateProgress;

}));
