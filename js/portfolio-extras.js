/* =====================================================================
   Portfolio extras: My Projects, Client Work + full-page preview viewer,
   Reviews (Supabase), collaboration cards -> contact inquiry type.
   Wrapped in an IIFE so it can't clash with script.js globals.
   Must be loaded BEFORE script.js (so script.js hover/tilt/GSAP hooks
   also pick up the cards rendered here).
   ===================================================================== */
(function () {
  "use strict";

  var CFG = window.PORTFOLIO_CONFIG || {};
  var DATA = window.PORTFOLIO_DATA || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function icon(cls) { var i = el("i", cls); i.setAttribute("aria-hidden", "true"); return i; }
  function techList(items) {
    var ul = el("ul", "tech-list");
    ul.setAttribute("aria-label", "Technologies");
    (items || []).forEach(function (t) { ul.appendChild(el("li", "tech-chip", t)); });
    return ul;
  }
  // WhatsApp: every [data-wa] element opens a chat with the configured number,
  // message pre-filled. Falls back to the share link until a number is set.
  var WA_DEFAULT = "Hi Rohit Arya, I visited your portfolio website. I am interested in getting a professional website for my business. Please share the details and pricing.";
  function waUrl() {
    var n = String(CFG.whatsappNumber || "").replace(/\D/g, "");
    var t = encodeURIComponent(CFG.whatsappMessage || WA_DEFAULT);
    return n.length >= 8 ? "https://wa.me/" + n + "?text=" + t : "https://api.whatsapp.com/send?text=" + t;
  }
  function wireWhatsApp(root) {
    $$("[data-wa]", root).forEach(function (a) { a.href = waUrl(); a.target = "_blank"; a.rel = "noopener noreferrer"; });
  }
  function waButton(label, cls) {
    var a = el("a", cls || "btn wa-btn");
    a.setAttribute("data-wa", "");
    a.appendChild(icon("fab fa-whatsapp"));
    a.appendChild(el("span", "", label));
    return a;
  }

  // Pick the screenshot that best matches the visitor's screen: phone -> mobile, tablet -> tablet, else desktop.
  function bestShotKey(shots) {
    var w = window.innerWidth, s = shots || {};
    var order = w < 640 ? ["mobile", "tablet", "desktop"] : w < 1024 ? ["tablet", "desktop", "mobile"] : ["desktop", "tablet", "mobile"];
    for (var i = 0; i < order.length; i++) if (s[order[i]]) return order[i];
    return null;
  }

  function isHttps(u) { return /^https:\/\/[^\s]+$/i.test(u || ""); }

  /* ------------------------------------------------------------------
     1. MY PROJECTS  (GitHub-only buttons)
     ------------------------------------------------------------------ */
  function renderMyProjects() {
    var grid = $("#myProjectsGrid");
    if (!grid) return;
    (DATA.myProjects || []).forEach(function (p) {
      var card = el("article", "project-card");
      var img = el("img");
      img.src = p.thumbnail; img.alt = p.title + " — project thumbnail";
      img.loading = "lazy"; img.decoding = "async";
      card.appendChild(img);

      var body = el("div", "project-content");
      body.appendChild(el("h3", "", p.title));
      body.appendChild(el("p", "", p.description));
      body.appendChild(techList(p.tech));

      var actions = el("div", "project-buttons");
      var a = el("a", "gh-btn");
      a.href = isHttps(p.github) ? p.github : (CFG.githubProfile || "https://github.com/");
      a.target = "_blank"; a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", "View " + p.title + " on GitHub");
      a.appendChild(icon("fab fa-github"));
      a.appendChild(document.createTextNode(" View on GitHub"));
      actions.appendChild(a);
      body.appendChild(actions);

      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------
     2. CLIENT WORK cards
     ------------------------------------------------------------------ */
  function renderClientWork() {
    var grid = $("#clientWorkGrid");
    if (!grid) return;
    var cards = [];
    (DATA.clientWork || []).forEach(function (p) {
      // Real screenshots made by tools/capture-all.mjs override the placeholders.
      var auto = (window.CLIENT_SHOTS || {})[p.slug];
      if (auto && (auto.desktop || auto.tablet || auto.mobile)) {
        p = Object.assign({}, p, { screenshots: auto, placeholder: false });
      }
      var shots = p.screenshots || {};
      // The card shows the FULL-PAGE screenshot that matches the screen size (mobile / tablet / desktop).
      var shotKey = bestShotKey(shots);
      var src = shotKey ? shots[shotKey] : "";
      var item = el("div", "cw-item");
      var card = el("article", "cw-card");

      var thumb = el("button", "cw-thumb");
      thumb.type = "button";
      thumb.setAttribute("aria-label", "Open full website preview: " + p.name);
      var img = el("img");
      img.src = src; img.alt = p.name + " — website designed and developed by Rohit Arya, web developer in Jaipur";
      img.loading = "lazy"; img.decoding = "async";
      thumb.appendChild(img);
      if (p.placeholder) thumb.appendChild(el("span", "cw-badge", "Placeholder screenshot"));
      card.appendChild(thumb);

      // distance to scroll = image height - visible frame height
      function measure() {
        var dist = Math.max(0, img.offsetHeight - thumb.clientHeight);
        thumb.style.setProperty("--cw-shift", -dist + "px");
        // ~300px per second, between 2s and 14s, so long pages scroll at a readable pace
        thumb.style.setProperty("--cw-dur", Math.min(14, Math.max(2, dist / 300)).toFixed(1) + "s");
      }
      img.addEventListener("load", measure);
      if (img.complete) measure();
      cards.push(function () {
        var k = bestShotKey(shots);
        if (k && k !== shotKey) { shotKey = k; img.src = shots[k]; } // screen size changed (rotate / resize)
        else measure();
      });

      // Touch screens have no hover: play the scroll preview while the card is on screen.
      if (window.matchMedia("(hover: none)").matches && "IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { thumb.classList.toggle("cw-play", en.isIntersecting); });
        }, { threshold: 0.6 }).observe(thumb);
      }

      thumb.addEventListener("click", function () { Viewer.open(p, thumb); });
      item.appendChild(card);
      item.appendChild(waButton("Get a Website Like This", "btn wa-btn cw-wa"));
      grid.appendChild(item);
    });
    var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(function () { cards.forEach(function (m) { m(); }); }, 150); });
  }

  /* ------------------------------------------------------------------
     3. FULL-PAGE SCREENSHOT VIEWER
     ------------------------------------------------------------------ */
  var Viewer = (function () {
    var root = $("#previewViewer");
    if (!root) return { open: function () {} };

    var dialog = $(".pv-dialog", root), scroll = $("#pvScroll"), stage = $("#pvStage");
    var img = $("#pvImg"), title = $("#pvTitle"), note = $("#pvNote");
    var devices = $("#pvDevices"), label = $("#pvZoomLabel");
    var loading = $("#pvLoading"), errorBox = $("#pvError");
    var btnIn = $("#pvZoomIn"), btnOut = $("#pvZoomOut"), btnFit = $("#pvFit"), btnClose = $("#pvClose");

    var MIN = 0.5, MAX = 3, STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
    // Max on-screen width per device so small screenshots are never upscaled/blurred.
    var DEVICE_MAX_W = { desktop: Infinity, tablet: 900, mobile: 480 };

    var zoom = 1, project = null, deviceKey = "desktop", lastFocus = null, closeTimer = null;

    function clamp(z) { return Math.min(MAX, Math.max(MIN, z)); }
    function isOpen() { return root.classList.contains("is-open"); }

    function baseWidth() {
      var cs = getComputedStyle(scroll);
      var avail = scroll.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      return Math.max(120, Math.min(avail, DEVICE_MAX_W[deviceKey] || Infinity));
    }
    function applyWidth() {
      if (!img.naturalWidth) return;
      img.style.width = Math.round(baseWidth() * zoom) + "px"; // height:auto keeps proportions
      label.textContent = Math.round(zoom * 100) + "%";
      btnIn.disabled = zoom >= MAX - 0.001;
      btnOut.disabled = zoom <= MIN + 0.001;
    }
    function setZoom(z) {
      var next = clamp(z);
      if (Math.abs(next - zoom) < 0.001) return;
      // keep the same point of the page centred while zooming
      var ry = (scroll.scrollTop + scroll.clientHeight / 2) / (scroll.scrollHeight || 1);
      var rx = (scroll.scrollLeft + scroll.clientWidth / 2) / (scroll.scrollWidth || 1);
      zoom = next; applyWidth();
      scroll.scrollTop = ry * scroll.scrollHeight - scroll.clientHeight / 2;
      scroll.scrollLeft = rx * scroll.scrollWidth - scroll.clientWidth / 2;
    }
    function stepZoom(dir) {
      var i;
      if (dir > 0) { for (i = 0; i < STEPS.length; i++) if (STEPS[i] > zoom + 0.001) return setZoom(STEPS[i]); }
      else { for (i = STEPS.length - 1; i >= 0; i--) if (STEPS[i] < zoom - 0.001) return setZoom(STEPS[i]); }
    }

    function pickDefault(p) { return bestShotKey(p.screenshots); }

    function buildDeviceTabs() {
      devices.replaceChildren();
      var s = project.screenshots || {}, keys = ["desktop", "tablet", "mobile"].filter(function (k) { return s[k]; });
      var distinct = {}; keys.forEach(function (k) { distinct[s[k]] = 1; });
      devices.hidden = Object.keys(distinct).length < 2; // tabs only when versions differ
      var icons = { desktop: "fa-desktop", tablet: "fa-tablet-screen-button", mobile: "fa-mobile-screen" };
      keys.forEach(function (k) {
        var b = el("button", "pv-tab"); b.type = "button"; b.dataset.key = k;
        b.setAttribute("aria-pressed", "false");
        b.appendChild(icon("fas " + icons[k]));
        b.appendChild(el("span", "", k.charAt(0).toUpperCase() + k.slice(1)));
        b.addEventListener("click", function () { loadVariant(k); });
        devices.appendChild(b);
      });
    }

    function loadVariant(key) {
      deviceKey = key; zoom = 1;
      $$(".pv-tab", devices).forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.key === key)); });
      var src = project.screenshots[key];
      loading.hidden = false; errorBox.hidden = true; img.classList.remove("is-loaded");
      img.removeAttribute("style");
      img.onload = function () {
        loading.hidden = true; img.classList.add("is-loaded");
        applyWidth(); scroll.scrollTop = 0; scroll.scrollLeft = 0;
      };
      img.onerror = function () { loading.hidden = true; errorBox.hidden = false; };
      img.alt = project.name + " — full-page website screenshot (" + key + " layout), scroll to see header to footer";
      img.src = src;
    }

    function open(p, trigger) {
      var key = pickDefault(p);
      if (!key) return;
      clearTimeout(closeTimer);
      project = p; lastFocus = trigger || document.activeElement;
      title.textContent = p.name;
      note.hidden = !p.placeholder;
      buildDeviceTabs();
      root.classList.add("is-mounted");
      root.setAttribute("aria-hidden", "false");
      document.body.classList.add("pv-lock");
      loadVariant(key);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { root.classList.add("is-open"); btnClose.focus({ preventScroll: true }); });
      });
    }

    function close() {
      if (!isOpen()) return;
      root.classList.remove("is-open");
      closeTimer = setTimeout(function () {
        root.classList.remove("is-mounted");
        root.setAttribute("aria-hidden", "true");
        document.body.classList.remove("pv-lock");
        img.onload = img.onerror = null; img.removeAttribute("src"); // free decoded image memory
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      }, 320);
    }

    // controls
    btnIn.addEventListener("click", function () { stepZoom(1); });
    btnOut.addEventListener("click", function () { stepZoom(-1); });
    btnFit.addEventListener("click", function () { setZoom(1); });
    btnClose.addEventListener("click", close);
    $(".pv-backdrop", root).addEventListener("click", close);

    // keyboard: Esc, + / - / 0, Tab focus trap
    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "+" || e.key === "=") { e.preventDefault(); stepZoom(1); }
      else if (e.key === "-" || e.key === "_") { e.preventDefault(); stepZoom(-1); }
      else if (e.key === "0") { e.preventDefault(); setZoom(1); }
      else if (e.key === "Tab") {
        var f = $$("button:not([disabled]), [tabindex='0']", dialog).filter(function (n) { return n.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Ctrl/Cmd + wheel (and trackpad pinch) = zoom; plain wheel scrolls natively
    scroll.addEventListener("wheel", function (e) {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      setZoom(zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1));
    }, { passive: false });

    // Touch: native one-finger scrolling + two-finger pinch zoom
    var pinch = null;
    function dist(t) { return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY); }
    scroll.addEventListener("touchstart", function (e) {
      if (e.touches.length === 2) pinch = { d: dist(e.touches), z: zoom };
    }, { passive: true });
    scroll.addEventListener("touchmove", function (e) {
      if (pinch && e.touches.length === 2) { e.preventDefault(); setZoom(pinch.z * dist(e.touches) / pinch.d); }
    }, { passive: false });
    scroll.addEventListener("touchend", function (e) { if (e.touches.length < 2) pinch = null; });

    // Mouse: drag to pan when zoomed in
    var drag = null;
    scroll.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0 || e.target !== img) return;
      drag = { x: e.clientX, y: e.clientY, l: scroll.scrollLeft, t: scroll.scrollTop };
      scroll.classList.add("is-dragging"); scroll.setPointerCapture(e.pointerId);
    });
    scroll.addEventListener("pointermove", function (e) {
      if (!drag) return;
      scroll.scrollLeft = drag.l - (e.clientX - drag.x);
      scroll.scrollTop = drag.t - (e.clientY - drag.y);
    });
    function endDrag() { drag = null; scroll.classList.remove("is-dragging"); }
    scroll.addEventListener("pointerup", endDrag);
    scroll.addEventListener("pointercancel", endDrag);
    img.addEventListener("dragstart", function (e) { e.preventDefault(); });

    // keep width correct on rotate / resize
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { if (isOpen()) applyWidth(); }, 120); });

    return { open: open, close: close };
  })();

  /* ------------------------------------------------------------------
     4. CONTACT: inquiry type + collaboration cards
     ------------------------------------------------------------------ */
  var contactForm = $("#contactForm");
  var inquirySelect = $("#inquiryType");

  function openContact(type) {
    if (inquirySelect && type) {
      inquirySelect.value = type;
      inquirySelect.dispatchEvent(new Event("change", { bubbles: true }));
      var subject = contactForm && contactForm.elements["subject"];
      if (subject && (!subject.value.trim() || subject.dataset.autofill === "1")) {
        subject.value = type; subject.dataset.autofill = "1";
      }
    }
    var target = $("#contact");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", "#contact");
    if (contactForm) {
      contactForm.classList.remove("flash"); void contactForm.offsetWidth; contactForm.classList.add("flash");
      setTimeout(function () { if (inquirySelect) inquirySelect.focus({ preventScroll: true }); }, 700);
    }
  }
  if (contactForm) {
    var subj = contactForm.elements["subject"];
    if (subj) subj.addEventListener("input", function () { subj.dataset.autofill = "0"; });
  }

  function initCollab() {
    // Full-time -> scroll to the main contact form with the type preselected
    $$("[data-inquiry]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); openContact(a.dataset.inquiry); });
    });
    // Freelance / Sponsor -> their own separate forms
    $$("[data-open-form]").forEach(function (b) {
      b.addEventListener("click", function () { Proposal.open(b.dataset.openForm, b); });
    });
  }

  /* ------------------------------------------------------------------
     4b. PROPOSAL FORMS (Freelance / Sponsor) in a modal, sent via Web3Forms
     ------------------------------------------------------------------ */
  var Proposal = (function () {
    var root = $("#proposalModal");
    if (!root) return { open: function () {} };
    var closeBtn = $("#fmClose"), forms = $$(".fm-form", root), lastFocus = null, timer = null;

    function open(id, trigger) {
      clearTimeout(timer);
      lastFocus = trigger;
      forms.forEach(function (f) { f.hidden = f.id !== id; });
      var form = document.getElementById(id);
      root.setAttribute("aria-labelledby", form.dataset.titleId);
      root.classList.add("is-mounted"); root.setAttribute("aria-hidden", "false");
      document.body.classList.add("fm-lock");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          root.classList.add("is-open");
          var first = form.querySelector("input:not([type=hidden]):not(.hp-field)");
          if (first) first.focus({ preventScroll: true });
        });
      });
    }
    function close() {
      if (!root.classList.contains("is-open")) return;
      root.classList.remove("is-open");
      timer = setTimeout(function () {
        root.classList.remove("is-mounted"); root.setAttribute("aria-hidden", "true");
        document.body.classList.remove("fm-lock");
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      }, 320);
    }
    closeBtn.addEventListener("click", close);
    $(".fm-backdrop", root).addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (!root.classList.contains("is-open")) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "Tab") {
        var f = $$("button:not([disabled]), input:not([type=hidden]):not(.hp-field), select, textarea", root)
          .filter(function (n) { return n.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    forms.forEach(function (form) {
      var status = $(".fm-status", form), btn = $(".fm-submit", form), label = $("span", btn);
      var original = label.textContent;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (form.elements["botcheck"] && form.elements["botcheck"].checked) return; // bot
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var data = new FormData(form);
        data.append("subject", form.dataset.subject + " — " + (data.get("name") || ""));
        data.append("from_name", "Portfolio — " + form.dataset.subject);
        btn.disabled = true; label.textContent = "Sending…"; status.className = "fm-status"; status.textContent = "";
        fetch("https://api.web3forms.com/submit", { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) { return r.json(); })
          .then(function (res) {
            if (!res.success) throw new Error(res.message || "Failed");
            form.reset();
            status.className = "fm-status success";
            status.textContent = "Thank you! Your proposal was sent. I'll get back to you soon.";
          })
          .catch(function (err) {
            console.error("Proposal send failed:", err);
            status.className = "fm-status error";
            status.textContent = "Sorry, it could not be sent. Please try again or use the contact form below.";
          })
          .then(function () { btn.disabled = false; label.textContent = original; });
      });
    });
    return { open: open };
  })();

  /* ------------------------------------------------------------------
     5. REVIEWS  (Supabase REST, no SDK)
     ------------------------------------------------------------------ */
  var Reviews = (function () {
    var form = $("#reviewForm");
    if (!form) return { init: function () {} };

    var base = (CFG.supabaseUrl || "").replace(/\/+$/, "");
    var key = CFG.supabaseAnonKey || "";
    var configured = /^https:\/\/[^\s/]+\.supabase\.(co|in)$/i.test(base) && key.length > 20;
    var local = /^(localhost|127\.0\.0\.1|)$/.test(location.hostname);

    // Legacy "anon" keys are JWTs (eyJ...) and go in both headers; the newer
    // "sb_publishable_..." keys must only be sent in the apikey header.
    function authHeaders(extra) {
      var h = { apikey: key };
      if (key.indexOf("sb_") !== 0) h.Authorization = "Bearer " + key;
      for (var k in (extra || {})) h[k] = extra[k];
      return h;
    }

    var statusEl = $("#reviewStatus"), submit = $("#reviewSubmit"), list = $("#reviewsList");
    var RATING_TEXT = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

    var rules = {
      rvName: function (v) { return v.length < 2 ? "Please enter your full name." : v.length > 80 ? "Name is too long (max 80)." : ""; },
      rvEmail: function (v) { return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Please enter a valid email address." : v.length > 120 ? "Email is too long." : ""; },
      rvCompany: function (v) { return v.length > 120 ? "Company name is too long (max 120)." : ""; },
      rvProject: function (v) { return v.length < 2 ? "Please enter the project name." : v.length > 120 ? "Project name is too long (max 120)." : ""; },
      rvText: function (v) { return v.length < 20 ? "Please write at least 20 characters." : v.length > 1000 ? "Review is too long (max 1000)." : ""; }
    };

    function setError(id, msg) {
      var f = document.getElementById(id), err = form.querySelector('[data-error-for="' + id + '"]');
      if (err) err.textContent = msg || "";
      if (f) { f.classList.toggle("invalid", !!msg); f.setAttribute("aria-invalid", msg ? "true" : "false"); }
      return !msg;
    }
    function checkField(id) { var f = document.getElementById(id); return setError(id, rules[id](f.value.trim())); }
    function checkRating() {
      var ok = !!form.querySelector('input[name="rating"]:checked');
      var err = form.querySelector('[data-error-for="rating"]');
      err.textContent = ok ? "" : "Please select a star rating.";
      return ok;
    }
    function say(msg, type) { statusEl.textContent = msg; statusEl.className = "rv-status " + (type || ""); }

    function stars(n) {
      var w = el("span", "rv-stars"); w.setAttribute("role", "img"); w.setAttribute("aria-label", n + " out of 5 stars");
      for (var i = 1; i <= 5; i++) w.appendChild(icon((i <= n ? "fas" : "far") + " fa-star"));
      return w;
    }

    function renderList(rows) {
      list.replaceChildren();
      if (!rows.length) {
        list.appendChild(el("p", "rv-empty", "No reviews published yet. Be the first to share your experience!"));
        return;
      }
      rows.forEach(function (r) {
        var c = el("article", "rv-card");
        c.appendChild(stars(r.rating));
        c.appendChild(el("p", "rv-text", r.review_text));
        var meta = el("div", "rv-meta");
        meta.appendChild(el("strong", "", r.full_name));
        var sub = [r.company, r.project_name].filter(Boolean).join(" · ");
        if (sub) meta.appendChild(el("span", "", sub));
        c.appendChild(meta);
        list.appendChild(c);
      });
    }

    function loadApproved() {
      if (!configured) { list.replaceChildren(el("p", "rv-empty", "Reviews will appear here once approved.")); return; }
      fetch(base + "/rest/v1/public_reviews?select=full_name,company,project_name,rating,review_text,created_at&order=created_at.desc&limit=12",
        { headers: authHeaders() })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(renderList)
        .catch(function (e) { console.error("Could not load reviews:", e); list.replaceChildren(el("p", "rv-empty", "Reviews are temporarily unavailable.")); });
    }

    function init() {
      // star label text
      $$('input[name="rating"]', form).forEach(function (r) {
        r.addEventListener("change", function () { $("#ratingText").textContent = RATING_TEXT[+r.value]; checkRating(); });
      });
      // live validation after first blur
      Object.keys(rules).forEach(function (id) {
        var f = document.getElementById(id);
        f.addEventListener("blur", function () { f.dataset.touched = "1"; checkField(id); });
        f.addEventListener("input", function () { if (f.dataset.touched) checkField(id); });
      });
      var counter = $("#rvCount"), ta = $("#rvText");
      ta.addEventListener("input", function () { counter.textContent = ta.value.length + " / 1000"; });

      if (!configured) {
        $("#reviewFields").disabled = true;
        submit.disabled = true;
        say(local
          ? "Reviews backend not configured yet. Add supabaseUrl + supabaseAnonKey in js/site-config.js and run sql/reviews-setup.sql (see README)."
          : "Review submissions are temporarily unavailable. Please check back soon.", "warn");
        console.warn("[reviews] Not configured. Required: supabaseUrl + supabaseAnonKey in js/site-config.js, and the table from sql/reviews-setup.sql.");
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!configured) return;
        if (form.elements["website"].value) return; // honeypot: bots fill this hidden field
        var results = Object.keys(rules).map(checkField); results.push(checkRating());
        if (results.indexOf(false) !== -1) {
          say("Please fix the highlighted fields.", "error");
          var bad = form.querySelector(".invalid, .star-rating[aria-invalid='true']") || form.querySelector(".rv-error:not(:empty)");
          if (bad && bad.focus) bad.focus(); else if (bad) bad.scrollIntoView({ block: "center" });
          return;
        }
        var body = {
          full_name: $("#rvName").value.trim(),
          email: $("#rvEmail").value.trim(),
          company: $("#rvCompany").value.trim() || null,
          project_name: $("#rvProject").value.trim(),
          rating: +form.querySelector('input[name="rating"]:checked').value,
          review_text: $("#rvText").value.trim()
        };
        submit.disabled = true; submit.querySelector("span").textContent = "Submitting…"; say("");
        fetch(base + "/rest/v1/reviews", {
          method: "POST",
          headers: authHeaders({ "Content-Type": "application/json", Prefer: "return=minimal" }),
          body: JSON.stringify(body)
        }).then(function (r) {
          if (!r.ok) return r.text().then(function (t) { throw new Error(r.status + " " + t); });
          form.reset(); counter.textContent = "0 / 1000"; $("#ratingText").textContent = "Select a rating";
          $$(".invalid", form).forEach(function (f) { f.classList.remove("invalid"); });
          say("Thank you! Your review was submitted and will appear after it has been approved.", "success");
        }).catch(function (err) {
          console.error("Review submit failed:", err);
          say("Sorry, your review could not be submitted. Please try again later.", "error");
        }).then(function () {
          submit.disabled = false; submit.querySelector("span").textContent = "Submit Review";
        });
      });
      loadApproved();
    }
    return { init: init };
  })();

  /* ------------------------------------------------------------------ */
  // optional social links: shown only when a URL is set in js/site-config.js
  (function () {
    var yt = $('[data-social="youtube"]');
    if (yt && isHttps(CFG.youtubeUrl)) { yt.href = CFG.youtubeUrl; yt.target = "_blank"; yt.rel = "noopener noreferrer"; yt.hidden = false; }
  })();

  renderMyProjects();
  renderClientWork();
  wireWhatsApp(document);
  initCollab();
  Reviews.init();
})();
