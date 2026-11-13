/* =====================================================================
   SITE CONFIG  —  edit the values below. Nothing else needs touching.
   ===================================================================== */
window.PORTFOLIO_CONFIG = {
  // Your GitHub profile. Used as the fallback for any project in
  // js/projects-data.js whose `github` field is still empty.
  githubProfile: "https://github.com/Rohitarya5650",

  // Your YouTube channel URL (https://...). The YouTube icon in the hero stays hidden until you set it.
  youtubeUrl: "https://youtube.com/@rohitaryadev?si=sjAdxWLAL-1lnwK5",

  // ---- WhatsApp -----------------------------------------------------
  // Digits only, with country code and no "+" or spaces, e.g. India: "919876543210".
  // Every "Chat on WhatsApp" button on the site opens a chat with this number
  // with the message below pre-filled. REQUIRED, otherwise visitors would have
  // to pick a contact themselves.
  whatsappNumber: "916367868970",
  whatsappMessage:
    "Hi Rohit Arya, I visited your portfolio website. I am interested in getting a professional website for my business. Please share the details and pricing.",

  // ---- Reviews backend (Supabase) -------------------------------------
  // Create a free project at https://supabase.com, run sql/reviews-setup.sql
  // in its SQL Editor, then paste the two values from
  // Project Settings -> API. The anon key is SAFE to publish: the SQL locks it
  // down to "insert pending review" + "read approved reviews only".
  supabaseUrl: "https://fbvemweddsatelszukiv.supabase.co",      // e.g. "https://abcdxyz.supabase.co"
  supabaseAnonKey: "sb_publishable_r-GCqH2Il5Y783YWuDyGYw_bV78coHb"   // the "anon / public" key (NOT the service_role key)
};
