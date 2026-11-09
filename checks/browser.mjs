import React, { act, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Nav from "../src/components/Nav";
import App from "../src/App";
import Hero from "../src/components/Hero";
import "../src/styles/design.css";
import useWorkEntrance from "../src/hooks/useWorkEntrance";
import ContactForm from "../src/components/ContactForm";
import NelaWorkPreview from "../src/components/NelaWorkPreview";
import MarginPreview from "../src/components/margin/MarginPreview";
import MarginWorkPreview from "../src/components/margin/MarginWorkPreview";
import "../src/styles/globals.css";
import "../src/styles/home.css";
import "../src/styles/home-desktop.css";
import "../src/styles/work-entrance.css";

const h = React.createElement;
const frameMode = new URLSearchParams(location.search).has("frame");
const channel = "portfolio-behavior-checks";
const only = new URLSearchParams(location.search).get("only");

if (!frameMode) {
  const frame = document.createElement("iframe");
  frame.title = "Isolated browser checks";
  frame.style.border = "0";
  frame.style.display = "block";
  frame.width = "1440";
  frame.height = "900";
  const frameQuery = new URLSearchParams({ frame: "" });
  if (only) frameQuery.set("only", only);
  frame.src = `/checks/browser.html?${frameQuery}`;
  document.getElementById("fixture").append(frame);
  document.getElementById("fixture").after(document.getElementById("results"));
  window.addEventListener("message", (event) => {
    if (
      event.source !== frame.contentWindow ||
      event.origin !== location.origin ||
      event.data.channel !== channel
    )
      return;
    const message = event.data;
    if (message.type === "result") {
      const item = document.createElement("li");
      item.textContent = `${message.pass ? "PASS" : "FAIL"}: ${message.name}${message.error ? ": " + message.error : ""}`;
      document.getElementById("results").append(item);
    } else if (message.type === "complete") {
      const text = `${message.passed}/${message.total} passed — ${message.agent}`;
      document.getElementById("summary").textContent = text;
      document.title = `${message.passed === message.total ? "PASS" : "FAIL"} ${text}`;
    }
  });
} else {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  // Stand in for the owned title in index.html when mounting the full app.
  document.querySelector("title")?.setAttribute("data-seo", "");
  const fixture = document.getElementById("fixture");
  // Keep diagnostic text outside the component's hit-test area.
  document.querySelector("h1").remove();
  document.getElementById("summary").remove();
  document.getElementById("results").remove();
  let root;
  let passed = 0;
  let total = 0;
  const send = (message) =>
    parent.postMessage({ channel, ...message }, location.origin);
  const assert = (condition, message) => {
    if (!condition) throw Error(message);
  };
  const wait = (ms) =>
    act(() => new Promise((resolve) => setTimeout(resolve, ms)));
  const paint = () =>
    act(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
  const mount = async (component) => {
    if (root) await act(() => root.unmount());
    root = createRoot(fixture);
    await act(() => root.render(h(StrictMode, null, component)));
    await paint();
  };
  const resize = async (width, height = 900) => {
    await act(async () => {
      window.frameElement.width = String(width);
      window.frameElement.height = String(height);
      await new Promise((resolve) => setTimeout(resolve, 60));
    });
    await paint();
    assert(
      innerWidth === width,
      `Expected ${width}px viewport, received ${innerWidth}`,
    );
  };
  const until = async (predicate, message, timeout = 5000) => {
    const end = performance.now() + timeout;
    while (!predicate() && performance.now() < end) await wait(25);
    assert(predicate(), message);
  };
  const test = async (name, run) => {
    if (only && !name.toLowerCase().includes(only.toLowerCase())) return;
    total++;
    try {
      await run();
      passed++;
      send({ type: "result", name, pass: true });
    } catch (error) {
      send({ type: "result", name, pass: false, error: error.message });
    } finally {
      if (root) {
        await act(() => root.unmount());
        root = undefined;
      }
    }
  };
  function Entrance({ skip = false }) {
    const { phase, shellRef } = useWorkEntrance(skip);
    return h(
      "div",
      { className: "desktop-home", "data-work-layout": phase },
      h(
        "div",
        { className: "desktop-home-shell", ref: shellRef },
        h("aside", { className: "desktop-profile" }, "Profile"),
        h(
          "section",
          { className: "desktop-panel desktop-panel--showcase" },
          h(
            "div",
            { className: "desktop-showcase-projects" },
            ...Array.from({ length: 4 }, (_, key) =>
              h(
                "a",
                { key, className: "desktop-showcase-card", href: "#check" },
                h("div", null, `Project ${key}`),
              ),
            ),
          ),
        ),
      ),
    );
  }
  const phase = () =>
    fixture.querySelector(".desktop-home")?.dataset.workLayout;
  const cardAnimations = () =>
    [...fixture.querySelectorAll(".desktop-showcase-card")].flatMap((card) =>
      card.getAnimations(),
    );
  const expanded = () => {
    assert(phase() === "expanded", `Unexpected phase ${phase()}`);
    assert(
      getComputedStyle(document.documentElement).overflowY !== "hidden",
      "Document remains scroll-locked",
    );
    assert(
      cardAnimations().every((animation) => animation.playState !== "running"),
      "Stale FLIP animation still running",
    );
  };

  await test("Entrance: normal playback completes once in StrictMode", async () => {
    await mount(h(Entrance));
    assert(phase() === "intro", "Intro missing");
    await until(() => phase() === "opening", "Opening missing");
    await until(() => phase() === "expanded", "Expanded missing");
    assert(
      cardAnimations().length === 4,
      "Expected one FLIP animation per card",
    );
    await wait(1050);
    expanded();
  });
  await test("Entrance: resizing during intro releases scroll lock and never restarts", async () => {
    await resize(1440);
    await mount(h(Entrance));
    await resize(1300);
    expanded();
    await wait(3300);
    expanded();
  });
  await test("Entrance: resizing during opening cancels pending expansion geometry", async () => {
    await resize(1440);
    await mount(h(Entrance));
    await until(() => phase() === "opening", "Opening missing");
    await resize(1200);
    expanded();
    await wait(350);
    expanded();
  });
  await test("Entrance: active FLIP cancels on desktop resize and repeated breakpoint crossings", async () => {
    await resize(1440);
    await mount(h(Entrance));
    await until(() => phase() === "expanded", "Expanded missing");
    const running = cardAnimations();
    assert(
      running.some((animation) => animation.playState === "running"),
      "No running animation to interrupt",
    );
    await resize(1250);
    assert(
      running.every((animation) => animation.playState === "idle"),
      "Animation was not cancelled",
    );
    for (const width of [900, 901, 390, 768, 1440]) {
      await resize(width);
      expanded();
    }
  });
  await test("Entrance: hash navigation, pagehide, and unmount cancel active animations", async () => {
    await resize(1440);
    await mount(h(Entrance));
    await until(() => phase() === "expanded", "Expanded missing");
    const running = cardAnimations();
    await act(() =>
      root.render(h(StrictMode, null, h(Entrance, { skip: true }))),
    );
    expanded();
    assert(
      running.every((animation) => animation.playState === "idle"),
      "Hash navigation left running animations",
    );
    await mount(h(Entrance));
    await act(() => window.dispatchEvent(new Event("pagehide")));
    expanded();
    await act(() => window.dispatchEvent(new Event("pageshow")));
    expanded();
    await mount(h(Entrance));
    await until(() => phase() === "expanded", "Expanded missing");
    const unmounted = cardAnimations();
    await act(() => root.unmount());
    root = undefined;
    assert(
      unmounted.every((animation) => animation.playState === "idle"),
      "Unmount leaked animations",
    );
  });
  await test("Entrance: visibility interruption settles; hidden mount skips intro", async () => {
    await mount(h(Entrance));
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    try {
      await act(() => document.dispatchEvent(new Event("visibilitychange")));
      expanded();
      await mount(h(Entrance));
      expanded();
    } finally {
      delete document.hidden;
    }
  });
  await test("Entrance and typing: live reduced-motion changes stop pending motion", async () => {
    const original = window.matchMedia;
    let reduced = false;
    const changes = new EventTarget();
    const media = {
      get matches() {
        return reduced;
      },
      addEventListener: (...args) => changes.addEventListener(...args),
      removeEventListener: (...args) => changes.removeEventListener(...args),
    };
    window.matchMedia = (query) =>
      query.includes("prefers-reduced-motion")
        ? media
        : original.call(window, query);
    try {
      await mount(h(Entrance));
      await act(() => {
        reduced = true;
        changes.dispatchEvent(new Event("change"));
      });
      expanded();
      await mount(h(Entrance));
      expanded();
      reduced = false;
      await mount(h(NelaWorkPreview, { active: true }));
      await wait(350);
      assert(
        fixture.querySelector(".nela-work-address").textContent.length < 15,
        "Typing did not start",
      );
      await act(() => {
        reduced = true;
        changes.dispatchEvent(new Event("change"));
      });
      assert(
        fixture.querySelector(".nela-work-address").textContent ===
          "1234 Address Dr",
        "Typing did not settle",
      );
      await wait(350);
      assert(!fixture.querySelector("[data-typing]"), "Caret still active");
    } finally {
      window.matchMedia = original;
    }
  });
  await test("Typing: rapid enter/leave and resize do not leave partial text or timers", async () => {
    await mount(h(NelaWorkPreview, { active: true }));
    await wait(300);
    await act(() =>
      root.render(h(StrictMode, null, h(NelaWorkPreview, { active: false }))),
    );
    await wait(400);
    assert(
      fixture.querySelector(".nela-work-address").textContent ===
        "1234 Address Dr",
      "Inactive address is incomplete",
    );
    await act(() =>
      root.render(h(StrictMode, null, h(NelaWorkPreview, { active: true }))),
    );
    await resize(390, 844);
    assert(
      fixture.querySelector(".nela-work-address").textContent ===
        "1234 Address Dr",
      "Resize left partial typing",
    );
  });
  await test("CSS entrances: mobile hero settles after interruption and repeated responsive crossings", async () => {
    await resize(390, 844);
    await mount(h("div", { className: "home-mobile" }, h(Hero)));
    await wait(50);
    await resize(1000);
    assert(
      getComputedStyle(fixture.querySelector(".home-mobile")).display ===
        "none",
      "Mobile hero not hidden on desktop",
    );
    await resize(768, 1024);
    await resize(390, 844);
    await wait(750);
    for (const selector of [
      ".hero-copy h1 span",
      ".hero-photo img",
      ".hero-copy p",
      ".hero-work-link",
    ]) {
      const element = fixture.querySelector(selector);
      assert(
        getComputedStyle(element).opacity === "1",
        `${selector} remained transparent`,
      );
      assert(
        element
          .getAnimations()
          .every((animation) => animation.playState !== "running"),
        `${selector} did not settle`,
      );
    }
    assert(
      getComputedStyle(fixture.querySelector(".hero-photo img"))
        .objectPosition === "0% 100%",
      "Portrait left anchor changed",
    );
  });
  await test("CSS entrances: design arrival and repeated expansion settle after resize", async () => {
    await resize(1200);
    await mount(
      h(
        "div",
        { className: "curiosities-page" },
        h("div", { className: "curiosities-intro" }, "Intro"),
        h(
          "div",
          { className: "curiosities-grid" },
          h("div", { className: "concept-excerpt" }, "Excerpt"),
        ),
      ),
    );
    await wait(50);
    await resize(768);
    await resize(390, 844);
    const excerpt = fixture.querySelector(".concept-excerpt");
    for (let i = 0; i < 3; i++) {
      excerpt.hidden = true;
      await paint();
      excerpt.hidden = false;
      await paint();
    }
    await wait(800);
    for (const element of fixture.querySelectorAll(
      ".curiosities-intro, .curiosities-grid, .concept-excerpt",
    )) {
      assert(
        getComputedStyle(element).opacity === "1",
        "Content remained transparent",
      );
      assert(
        element
          .getAnimations()
          .every((animation) => animation.playState !== "running"),
        "Entrance did not settle",
      );
    }
  });
  const click = (element) => act(() => element.click());
  await test("Navigation: resizing closes the mobile menu and resets its interrupted animation", async () => {
    await resize(390, 844);
    await mount(h(MemoryRouter, null, h(Nav)));
    const toggle = fixture.querySelector('[aria-controls="mobile-navigation"]');
    await click(toggle);
    assert(
      toggle.getAttribute("aria-expanded") === "true",
      "Menu did not open",
    );
    await resize(1200);
    assert(
      toggle.getAttribute("aria-expanded") === "false",
      "Mobile menu remained open on desktop",
    );
    assert(
      getComputedStyle(fixture.querySelector(".nav-mobile")).display === "none",
      "Desktop menu overlay remains visible",
    );
    await resize(390, 844);
    await click(toggle);
    await click(toggle);
    assert(
      toggle.getAttribute("aria-expanded") === "false",
      "Rapid reversal left menu open",
    );
  });

  const faceHit = (face) => {
    const element = fixture.querySelector(face);
    const rect = element.getBoundingClientRect();
    const hit = document.elementFromPoint(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
    );
    assert(
      hit?.closest(face),
      `Expected ${face} on top, hit ${hit?.className}`,
    );
  };
  await test("Safari compositing: interactive flip preserves 3D, backface hit testing, focus, and reversal", async () => {
    await resize(700, 1100);
    await mount(h(MarginPreview, { kind: "Feed" }));
    const rotor = fixture.querySelector(".margin-sample-flip-rotor");
    assert(
      getComputedStyle(rotor).transformStyle === "preserve-3d",
      "Rotor was flattened",
    );
    for (const face of [
      ".margin-sample-flip-front",
      ".margin-sample-flip-back",
    ])
      assert(
        getComputedStyle(fixture.querySelector(face)).backfaceVisibility ===
          "hidden",
        "Backface visibility missing",
      );
    faceHit(".margin-sample-flip-front");
    const conversation = fixture.querySelector(
      '[aria-label="Flip Theo’s post to its conversation"]',
    );
    await click(conversation);
    await wait(650);
    faceHit(".margin-sample-flip-back");
    assert(
      document.activeElement.getAttribute("aria-label") === "Back to post",
      "Focus did not follow the flip",
    );
    await resize(390, 1100);
    faceHit(".margin-sample-flip-back");
    await click(fixture.querySelector('[aria-label="Back to post"]'));
    await wait(80);
    await click(conversation);
    await wait(80);
    await act(() =>
      rotor.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      ),
    );
    await wait(650);
    faceHit(".margin-sample-flip-front");
    assert(
      document.activeElement === conversation,
      "Escape did not restore focus",
    );
  });
  await test("Safari compositing: work preview front/back remain separate through reversal and resize", async () => {
    await resize(1000);
    await mount(
      h(
        "div",
        {
          className: "desktop-showcase-card margin-brand",
          style: { width: "min(100%, 44rem)", height: "40rem" },
        },
        h(MarginWorkPreview),
      ),
    );
    const card = fixture.querySelector(".desktop-showcase-card");
    assert(
      getComputedStyle(card).overflow === "hidden",
      "Card clipping not exercised",
    );
    const parentMotion = card.animate(
      [{ transform: "translate(12px, 8px) scale(.94)" }, { transform: "none" }],
      { duration: 1600 },
    );
    const rotor = fixture.querySelector(".margin-work-post-turn");
    assert(
      getComputedStyle(rotor).transformStyle === "preserve-3d",
      "Work rotor was flattened",
    );
    faceHit(".margin-work-post-front");
    rotor.style.transform = "rotateY(180deg)";
    await wait(800);
    faceHit(".margin-work-post-back");
    assert(
      parentMotion.playState === "running",
      "Composited ancestor was not animated during the flip",
    );
    parentMotion.cancel();
    rotor.style.transform = "rotateY(0deg)";
    await wait(80);
    rotor.style.transform = "rotateY(180deg)";
    await resize(700);
    await wait(800);
    faceHit(".margin-work-post-back");
    rotor.style.transform = "rotateY(0deg)";
    await wait(800);
    faceHit(".margin-work-post-front");
  });
  await test("Margin: pause/resume and replay retain working flip controls", async () => {
    await resize(700, 1100);
    await mount(h(MarginPreview, { kind: "Feed" }));
    const button = (text) =>
      [...fixture.querySelectorAll("button")].find(
        (item) => item.textContent === text,
      );
    await click(button("Pause motion"));
    assert(
      fixture.querySelector(".margin-snippet").dataset.marginMotion === "off",
      "Pause ignored",
    );
    assert(
      [...fixture.querySelectorAll(".margin-snippet *")].every(
        (element) => getComputedStyle(element).animationName === "none",
      ),
      "Paused animation running",
    );
    await click(button("Replay"));
    await click(
      fixture.querySelector(
        '[aria-label="Flip Theo’s post to its conversation"]',
      ),
    );
    await paint();
    assert(
      getComputedStyle(fixture.querySelector(".margin-sample-flip-rotor"))
        .transitionDuration === "0s",
      "Pause left flip transitions running",
    );
    faceHit(".margin-sample-flip-back");
    await click(button("Resume motion"));
    assert(button("Pause motion"), "Resume failed");
  });

  await test("Design collection: study navigation, direct links, and existing interactions", async () => {
    await resize(1200);
    await mount(h(MemoryRouter, { initialEntries: ["/design"] }, h(App)));
    assert(
      fixture.querySelector("h1").textContent === "Collected Curiosities",
      "Collection hero was renamed",
    );
    const preview = fixture.querySelector(
      'a[href="/design/an-overcast-afternoon"]',
    );
    assert(preview, "Study preview link missing");
    await click(preview);
    assert(
      fixture.querySelector("h1").textContent === "An Overcast Afternoon",
      "Study hero missing",
    );
    assert(
      fixture
        .querySelector('.nav--design a[href="/design"]')
        .getAttribute("aria-current") === "location",
      "Design navigation lost its section state",
    );
    assert(
      fixture.querySelectorAll(".palette-copy").length === 3,
      "Study palette missing",
    );
    const save = fixture.querySelector('[aria-label="Save note"]');
    await click(save);
    assert(
      save.getAttribute("aria-pressed") === "true",
      "Save interaction stopped working",
    );
    const more = fixture.querySelector(".concept-read-more");
    await click(more);
    assert(
      more.getAttribute("aria-expanded") === "true",
      "Excerpt did not expand",
    );
    await click(fixture.querySelector(".design-study-back"));
    assert(
      fixture.querySelector("h1").textContent === "Collected Curiosities",
      "Back link did not return to the collection",
    );
    await resize(390, 844);
    await mount(
      h(
        MemoryRouter,
        { initialEntries: ["/design/an-overcast-afternoon"] },
        h(App),
      ),
    );
    assert(
      fixture.querySelector("h1").textContent === "An Overcast Afternoon",
      "Direct study route failed",
    );
    assert(
      fixture.querySelectorAll(".interface-variation").length === 2,
      "Interface variations missing",
    );
  });
  await test("Design Cayucos: four-color study, featured burger selection, and full-menu navigation", async () => {
    await resize(1200);
    await mount(h(MemoryRouter, { initialEntries: ["/design"] }, h(App)));
    assert(
      fixture.querySelectorAll(".design-study-preview").length === 3,
      "Expected all three collection previews",
    );
    await click(fixture.querySelector('a[href="/design/cayucos"]'));
    assert(
      fixture.querySelector("h1").textContent === "Cayucos",
      "Cayucos route failed",
    );
    const colors = [...fixture.querySelectorAll(".palette-copy code")].map(
      (element) => element.textContent,
    );
    assert(
      colors.join(",") === "#b04d01,#020914,#052b41,#d4c7a5",
      "Palette differs from the supplied colors",
    );
    assert(
      fixture.querySelectorAll(".burger-board li").length === 4,
      "Full menu missing items",
    );
    assert(
      !fixture.querySelector(".burger-menu-example .interface-variation-label"),
      "Old menu labels remain",
    );
    const featured = fixture.querySelector(".burger-feature");
    assert(
      featured.querySelector("h3").textContent === "The Night Shift",
      "Initial burger missing",
    );
    await click(featured.querySelector('[aria-label="Next menu item"]'));
    assert(
      featured.querySelector("h3").textContent === "The 101",
      "Next burger failed",
    );
    for (let i = 0; i < 3; i++)
      await click(featured.querySelector('[aria-label="Next menu item"]'));
    assert(
      featured.querySelector("h3").textContent === "The Night Shift",
      "Burger selection did not wrap",
    );
    await click(featured.querySelector('[aria-label="Previous menu item"]'));
    assert(
      featured.querySelector("h3").textContent === "Last Call",
      "Previous burger failed",
    );
    await click(featured.querySelector(".burger-feature-nav > button"));
    assert(
      document.activeElement === fixture.querySelector("#cayucos-menu h3"),
      "Menu button did not return focus to the counter menu",
    );
    await click(fixture.querySelectorAll(".burger-categories button")[1]);
    assert(
      featured.querySelector("h3").textContent === "Window fries" &&
        fixture.querySelectorAll(".burger-board li").length === 4,
      "Category and featured item are out of sync",
    );
    await click(featured.querySelector(".burger-add-order"));
    assert(
      featured
        .querySelector('[role="status"]')
        .textContent.includes("1 item · $4.00"),
      "Sample order did not acknowledge the selected item",
    );
    await resize(320, 844);
    await mount(
      h(MemoryRouter, { initialEntries: ["/design/cayucos"] }, h(App)),
    );
    assert(
      fixture.querySelector(".burger-feature"),
      "Direct mobile study route failed",
    );
    assert(
      document.documentElement.scrollWidth <= innerWidth,
      "New study overflows the mobile viewport",
    );
    await click(fixture.querySelector(".design-study-back"));
    assert(
      fixture.querySelector("h1").textContent === "Collected Curiosities",
      "Collection return link failed",
    );
  });
  const realFetch = window.fetch.bind(window);
  let requests = [];
  const useResponse = (result) => {
    requests = [];
    window.fetch = (url, options) => {
      if (url !== "/contact.html" || options?.method !== "POST")
        return realFetch(url, options);
      requests.push(options);
      return realFetch(`/checks/submission?result=${result}`, options);
    };
  };
  const fillForm = async () => {
    for (const [name, value] of [
      ["name", "Portfolio test"],
      ["email", "test@example.com"],
      ["message", "A local automated test — not sent to a real recipient."],
    ]) {
      const input = fixture.querySelector(`[name="${name}"]`);
      const prototype =
        input.tagName === "TEXTAREA"
          ? HTMLTextAreaElement.prototype
          : HTMLInputElement.prototype;
      await act(() => {
        Object.getOwnPropertyDescriptor(prototype, "value").set.call(
          input,
          value,
        );
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
  };
  const submit = () =>
    act(() =>
      fixture
        .querySelector("form")
        .dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        ),
    );
  for (const desktop of [false, true]) {
    const layout = desktop ? "desktop" : "mobile";
    await test(`Contact ${layout}: pending and duplicate-submit guard; success follows HTTP acknowledgement`, async () => {
      await resize(desktop ? 1200 : 390);
      await mount(h(ContactForm, { desktop }));
      useResponse("accepted");
      try {
        await fillForm();
        await submit();
        await submit();
        assert(requests.length === 1, "Duplicate POST sent");
        assert(
          fixture.querySelector('button[type="submit"]').disabled,
          "Button not disabled",
        );
        assert(
          !fixture.querySelector('[role="status"]'),
          "Success reported before response",
        );
        assert(
          new URLSearchParams(requests[0].body).get("form-name") ===
            (desktop ? "desktop-contact" : "contact"),
          "Incorrect form name",
        );
        await until(
          () => fixture.querySelector('[role="status"]'),
          "Success missing after acknowledgement",
        );
        assert(!fixture.querySelector("form"), "Form not replaced on success");
      } finally {
        window.fetch = realFetch;
      }
    });
    await test(`Contact ${layout}: server rejection and connection failure retain fields and allow retry`, async () => {
      await mount(h(ContactForm, { desktop }));
      try {
        await fillForm();
        for (const result of ["rejected", "disconnect"]) {
          useResponse(result);
          await submit();
          await until(
            () => fixture.querySelector('[role="alert"]'),
            "Failure message missing",
          );
          assert(
            !fixture.querySelector('[role="status"]'),
            "Failure reported as success",
          );
          assert(
            fixture
              .querySelector('[name="message"]')
              .value.startsWith("A local automated test"),
            "Message lost",
          );
          assert(
            !fixture.querySelector('button[type="submit"]').disabled,
            "Retry disabled",
          );
        }
        useResponse("accepted");
        await submit();
        await until(
          () => fixture.querySelector('[role="status"]'),
          "Retry did not succeed",
        );
      } finally {
        window.fetch = realFetch;
      }
    });
  }
  await test("Contact: static-host HTTP 200 fallback is not treated as a submission", async () => {
    await mount(h(ContactForm));
    await fillForm();
    await submit();
    await until(
      () => fixture.querySelector('[role="alert"]'),
      "Static fallback reported success",
    );
    assert(
      !fixture.querySelector('[role="status"]'),
      "False success on static host",
    );
  });
  await test("Contact: timeout and unmount abort requests without showing success", async () => {
    await mount(h(ContactForm));
    const realTimeout = window.setTimeout;
    useResponse("slow");
    try {
      window.setTimeout = (callback, delay, ...args) =>
        realTimeout(callback, delay === 15000 ? 50 : delay, ...args);
      await fillForm();
      await submit();
      await until(
        () => fixture.querySelector('[role="alert"]'),
        "Timeout message missing",
      );
      assert(requests[0].signal.aborted, "Timeout did not abort network");
      window.setTimeout = realTimeout;
      await submit();
      const signal = requests[1].signal;
      await act(() => root.unmount());
      root = undefined;
      assert(signal.aborted, "Unmount did not abort network");
      await mount(h(ContactForm));
      assert(
        !fixture.querySelector('[role="status"]'),
        "Unmounted request affected new form",
      );
    } finally {
      window.setTimeout = realTimeout;
      window.fetch = realFetch;
    }
  });
  await test("Contact: static Netlify definitions match both rendered forms", async () => {
    const html = await (await realFetch("/contact.html")).text();
    const definition = new DOMParser().parseFromString(html, "text/html");
    for (const name of ["contact", "desktop-contact"]) {
      const form = definition.querySelector(`form[name="${name}"]`);
      assert(
        form?.getAttribute("data-netlify") === "true",
        "Static definition missing",
      );
      for (const field of ["name", "email", "message"])
        assert(
          form.querySelector(`[name="${field}"]`),
          `Static field ${field} missing`,
        );
    }
  });
  await test("SEO: navigation updates metadata without duplicate tags", async () => {
    await mount(h(MemoryRouter, { initialEntries: ["/"] }, h(App)));
    assert(
      document.title === "Matthew Bayers | Frontend Developer",
      "Homepage title missing",
    );
    const clickLink = async (href) => {
      const link = fixture.querySelector(`a[href="${href}"]`);
      assert(link, `Missing link ${href}`);
      await click(link);
      await paint();
    };
    await clickLink("/books");
    assert(
      document.title === "The Shape Sequence | Books by Matthew Bayers",
      "Books title did not update",
    );
    assert(
      document.querySelector('link[rel="canonical"]').href ===
        "https://matthewbayers.com/books",
      "Books canonical did not update",
    );
    await clickLink("/art");
    assert(
      document.title === "Oil & Acrylic Paintings | Matthew Bayers",
      "Escaped title was not decoded correctly",
    );
    for (const selector of [
      "title",
      'meta[name="description"]',
      'link[rel="canonical"]',
      'meta[property="og:url"]',
      'script[type="application/ld+json"]',
    ]) {
      assert(
        document.head.querySelectorAll(selector).length === 1,
        `Duplicate or missing ${selector}`,
      );
    }
    await clickLink("/");
    assert(
      document.title === "Matthew Bayers | Frontend Developer",
      "Home title did not restore",
    );
  });
  await test("SEO: unknown routes are noindex and recover on navigation", async () => {
    await mount(h(MemoryRouter, { initialEntries: ["/missing-page"] }, h(App)));
    assert(
      fixture.querySelector("h1")?.textContent === "Page not found.",
      "404 content missing",
    );
    assert(
      document.querySelector('meta[name="robots"]').content.includes("noindex"),
      "404 is indexable",
    );
    assert(
      !document.querySelector('link[rel="canonical"]'),
      "404 has a canonical URL",
    );
    await click(fixture.querySelector('a[href="/"]'));
    await paint();
    assert(
      !document
        .querySelector('meta[name="robots"]')
        .content.includes("noindex"),
      "noindex leaked to homepage",
    );
    assert(
      document.querySelector('link[rel="canonical"]').href ===
        "https://matthewbayers.com/",
      "Homepage canonical missing",
    );
  });
  await test("SEO: renamed studies resolve to their canonical page", async () => {
    await mount(
      h(MemoryRouter, { initialEntries: ["/design/after-dark"] }, h(App)),
    );
    await paint();
    assert(
      document.querySelector('link[rel="canonical"]').href ===
        "https://matthewbayers.com/design/cayucos",
      "Alias canonical mismatch",
    );
    assert(document.title.startsWith("Cayucos |"), "Alias title mismatch");
  });
  send({ type: "complete", passed, total, agent: navigator.userAgent });
}
