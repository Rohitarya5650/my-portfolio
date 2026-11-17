/* =====================================================================
   PROJECT DATA  —  add / edit / remove projects here.
   ===================================================================== */
window.PORTFOLIO_DATA = {

  /* ---------- MY PROJECTS (personal / self-developed) ----------------
     - github: full repository URL, e.g. "https://github.com/Rohitarya5650/my-portfolio"
               While empty, the button opens your GitHub profile instead.
     - NO live-demo links are supported here by design.                */
  myProjects: [
    {
      title: "Personal Portfolio Website",
      description:
        "Designed and developed a modern personal portfolio website to showcase my skills, projects, and frontend development expertise with a responsive and user-friendly interface.",
      thumbnail: "./images/PORTFOLIO.png",
      tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "AOS"],
      github: "" // TODO: paste the real repository URL
    },
    {
      title: "Infino Website — Dotsquares Clone",
      description:
        "Developed a full clone of the Dotsquares Infino website with a modern, responsive, and developer-focused design, maintaining clean code, smooth interactions, and an engaging user experience.",
      thumbnail: "./images/infino website image.png",
      tech: ["HTML5", "CSS3", "JavaScript"], // TODO: confirm stack
      github: "https://github.com/Rohitarya5650/infino" // TODO: paste the real repository URL
    }
  ],

  /* ---------- FREELANCER & CLIENT WORK --------------------------------
     screenshots: full-page, tall images. Provide any of the three; the
       viewer opens the one matching the visitor's device and shows
       Desktop / Tablet / Mobile tabs when more than one exists.
     (The card shows the FULL-PAGE desktop screenshot and auto-scrolls it on
      hover, so no separate thumbnail is needed.)
     slug:        links the project to tools/sites.json + js/screenshots-manifest.js.
                  If screenshots exist for this slug they REPLACE the paths below
                  automatically and the placeholder badge disappears.
     placeholder: true  -> shows a "Placeholder" badge + notice in the viewer.
                  Set to false (or delete) once real screenshots are in.
     NO live-site links are supported here by design.                    */
  clientWork: [
    {
      slug: "stone-bazar", // matches tools/sites.json
      name: "Stone Bazaar India",
      description:
        "A modern, responsive website for a digital marketing agency, presenting SEO, social media, Google Ads, content, web development and branding services with a clear path to enquiry.",
      tech: ["HTML5", "CSS3", "JavaScript"], // TODO: confirm stack
      thumbnail: "./images/stone bazaar india.png",
      screenshots: {
        // Placeholders. They are replaced AUTOMATICALLY after `node tools/capture-all.mjs`
        // (via the slug above). Only set paths here if you want to use your own images.
        desktop: "./images/client-work/placeholder-desktop.svg",
        tablet:  "./images/client-work/placeholder-tablet.svg",
        mobile:  "./images/client-work/placeholder-mobile.svg"
      },
      placeholder: true // set to false once real screenshots are in
    },
    {
      slug: "csp-coaching",
      name: "CSP Coaching Website",
      description:
        "A responsive coaching-institute website with course information, faculty details and contact features, built for a smooth experience on every device.",
      tech: ["HTML5", "CSS3", "JavaScript"], // TODO: confirm stack
      thumbnail: "./images/csp coaching.png",
      screenshots: {
        desktop: "./images/client-work/placeholder-desktop.svg", // TODO: ./images/client-work/csp-coaching-desktop.webp
        tablet:  "./images/client-work/placeholder-tablet.svg",  // TODO: ./images/client-work/csp-coaching-tablet.webp
        mobile:  "./images/client-work/placeholder-mobile.svg"   // TODO: ./images/client-work/csp-coaching-mobile.webp
      },
      placeholder: true
    },
    {
      slug: "dharmendra-video-editor",
      name: "Dharmendra | Video Editor Portfolio",
      description:
        "A cinematic, responsive portfolio website for a video editor, designed so the creative work stands out and visitors get a smooth browsing experience.",
      tech: ["HTML5", "CSS3", "JavaScript"], // TODO: confirm stack
      thumbnail: "./images/dharmendra-port.png",
      screenshots: {
        desktop: "./images/client-work/placeholder-desktop.svg", // TODO: replace
        tablet:  "./images/client-work/placeholder-tablet.svg",  // TODO: replace
        mobile:  "./images/client-work/placeholder-mobile.svg"   // TODO: replace
      },
      placeholder: true
    }
  ]
};
