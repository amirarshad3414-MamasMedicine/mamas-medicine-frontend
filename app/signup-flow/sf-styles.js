// ============================================================================
// signup-flow's OWN styling layer.
//
// These Tailwind class strings replicate the look of the devlink onboarding
// components (OnboardingBegin / OnboardingNames) but live entirely inside
// /signup-flow, so you can restyle this funnel WITHOUT touching the shared
// devlink components or the rest of the app. Edit values here in one place.
//
// Note on the `!` (important) suffix: devlink's global.css is loaded *unlayered*,
// so its element rules (h2 font-size/line-height/margins, input font-size, etc.)
// would otherwise beat Tailwind utilities (which sit in @layer utilities). The
// `!` on those specific utilities makes them win. Plain elements (div, a, label,
// ul, span) have no conflicting global rule, so they need no `!`.
// ============================================================================

export const SF = {
  // page + section scaffolding (replicates padding-global + padding-section-medium + container-large-5)
  page: "bg-[#eef1fa] min-h-[60vh]",
  section: "px-[5%] py-[5rem] max-sm:py-[2rem]",
  container: "w-full max-w-[90rem] mx-auto",
  wrapper: "flex flex-col items-center",
  content: "flex flex-col items-center w-full",

  // heading + eyebrow + paragraph (replicates onbording_heading + paragraph big text-color-primary)
  headingWrap: "mb-10 text-center max-w-[64rem] mx-auto",
  eyebrow: "uppercase tracking-[0.08em] text-[#b07b8f] font-bold text-[0.95rem] mb-3",
  heading:
    "text-[2rem]! md:text-[2.5rem]! leading-[1.35]! font-bold! my-0! p-0! text-[#333]",
  paragraphWrap: "mb-6 max-w-[64rem] w-full",
  paragraph:
    "text-[1.5rem] md:text-[1.9rem] leading-[1.6] text-[#333]! text-center mb-0!",

  // nav (exact replica of .onbording_names-navigation: flex, centered, 4rem gap,
  // align-stretch; mobile = flex-start + 2rem gap). Outer mt/pb/px are funnel layout.
  nav:
    "flex justify-center items-stretch gap-16 pb-20! px-[5%] max-sm:justify-start max-sm:items-start max-sm:gap-8",
  // .back_bnt — transparent; icon stacked above text
  backBtn: "flex flex-col items-center bg-transparent border-0 cursor-pointer p-0",
  // .back_bnt-icon — 4rem white circle (2.5rem on mobile), no shadow
  backIcon:
    "flex items-center justify-center w-16 h-16 mb-2 rounded-full bg-white max-sm:w-10 max-sm:h-10",
  // .icon_img — natural size, pointer cursor (matches width/height="auto")
  backIconImg: "cursor-pointer",
  // .back_text — Poppins 1.5rem/700 (#333); mobile 1.2rem/500, line-height 100%
  backText:
    "[font-family:Poppins,sans-serif] text-[#333] text-[1.5rem] font-bold max-sm:text-[1.2rem] max-sm:leading-none max-sm:font-medium",

  // primary button — exact replica of .btn-onboarding (Quicksand 2rem/700 #333,
  // 1.5rem 2.5rem padding, 3.47rem radius, #fcbd97 fill+border, 300ms transition;
  // hover -> #dadada fill + #333 border; mobile padding-y 1rem)
  btn:
    "inline-flex items-center justify-center py-6 px-10 rounded-[3.47rem] bg-[#fcbd97] border border-[#fcbd97] text-[#333] text-[2rem] leading-[1.2] font-bold no-underline cursor-pointer transition-colors duration-300 hover:bg-[#dadada] hover:border-[#333] [font-family:Quicksand,sans-serif] max-sm:py-4",
  // .onbord modifier — fixed 20rem width (15rem x 4rem on mobile) for the nav Next button
  btnNav: "w-[20rem] max-sm:w-[15rem] max-sm:h-16",
  btnFull: "w-full max-w-[32rem]",
  btnDisabled: "opacity-60 cursor-not-allowed",

  // relationship choice cards — flex row, radio + label vertically centered with
  // a steady 1rem gap. shrink-0 stops the radio collapsing; m-0! resets devlink's
  // global input/label margins so the dot sits clear of the text.
  choiceGroup: "flex flex-col gap-4 w-full max-w-[32rem] mx-auto mt-4",
  choice:
    "flex items-center! gap-4 px-7 py-5 rounded-2xl bg-white border-[1.5px] border-[#d9d9e3] hover:border-[#fcbd97] cursor-pointer text-[1.2rem] font-semibold text-[#333] leading-none transition-colors",
  choiceSelected: "border-[#fc97bd]! bg-[#fff5f9]!",
  choiceRadio: "inline-block! w-5 h-5 shrink-0 accent-[#fc97bd] cursor-pointer mr-2!",
  // label text wrapped in its own span so it's a real flex item (own line-box),
  // sitting centered next to the radio rather than as a bare text node.
  choiceLabel: "inline-block! leading-none",

  // bullet lists
  bullets: "list-none p-0 m-0 flex flex-col gap-4 text-left max-w-[32rem] mx-auto",
  bullet: "text-[1.25rem] text-[#333] leading-[1.5]",

  // email input
  input:
    "w-full! py-4! px-5! mb-6! text-[1.1rem]! text-[#333]! bg-white! border-[1.5px]! border-[#d9d9e3]! rounded-xl! outline-none! focus:border-[#fc97bd]! [font-family:Quicksand,sans-serif]!",
  fieldWrap: "w-full max-w-[32rem] mx-auto",

  // loading / progress
  loading: "flex flex-col items-center text-center w-full",
  progressList:
    "list-none p-0 mt-10 mx-auto max-w-[28rem] w-full flex flex-col gap-6 text-left",
  progressItem: "font-semibold text-[#333]",
  progressLabel: "flex items-center gap-2 mb-2",
  progressTrack: "block h-2 rounded-full bg-[#e3e3ee] overflow-hidden",
  progressFill:
    "block h-full w-2/3 rounded-full bg-gradient-to-r from-[#fc97bd] to-[#fcbd97] animate-pulse",
  spinner:
    "w-12 h-12 mx-auto mt-8 rounded-full border-4 border-[#e3e3ee] border-t-[#fc97bd] animate-spin",

  // section heading placed above a reused devlink component
  sectionHeading: "px-[5%] pt-8",

  // teaser slide
  teaserBody:
    "max-w-[52rem] mx-auto whitespace-pre-wrap text-[1.15rem] leading-[1.8] text-[#333] bg-white rounded-2xl p-8 border border-[#ececf4]",
  testimonialGrid:
    "grid gap-4 my-10 mx-auto max-w-[52rem] [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]",
  testimonial:
    "bg-white rounded-2xl p-5 border border-[#ececf4] text-[#333] leading-[1.5]",
  testimonialAuthor: "mt-3 font-bold text-[#b07b8f] text-[0.9rem]",
};

// Small helper to join conditional class strings.
export const cn = (...classes) => classes.filter(Boolean).join(" ");
