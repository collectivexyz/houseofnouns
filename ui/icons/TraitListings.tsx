import { SVGProps } from "react";

const SvgTraitListings = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <mask
      id="trait-listings_svg__a"
      fill="#000"
      height={9}
      maskUnits="userSpaceOnUse"
      width={13}
      x={7}
      y={3}
    >
      <path d="M7 3h13v9H7z" fill="#fff" />
      <path
        clipRule="evenodd"
        d="M9.5 5a.5.5 0 0 0-.5.5v.607a.5.5 0 0 0 .5.5h.607a.5.5 0 0 0 .5-.5V5.5a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5V6a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 18 6v-.5a.5.5 0 0 0-.5-.5zM9 9.25a.5.5 0 0 1 .5-.5h.607a.5.5 0 0 1 .5.5v.608a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5z"
        fillRule="evenodd"
      />
    </mask>
    <path
      d="m15.198 5.107-4.39-.627L8.866.538C8.686.179 8.33 0 8 0s-.687.18-.866.538L5.192 4.48l-4.39.627C.025 5.227-.273 6.212.294 6.75L3.46 9.826l-.746 4.36c-.12.598.388 1.106.925 1.106.15 0 .3-.03.448-.12L8 13.143l3.913 2.03c.149.09.298.12.448.12.537 0 1.045-.508.926-1.105l-.747-4.36 3.166-3.077c.567-.538.269-1.523-.508-1.643zm-4.152 4.48.687 3.883-3.524-1.852a.51.51 0 0 0-.418 0L4.267 13.47l.687-3.883a.493.493 0 0 0-.15-.448L1.967 6.392l3.912-.568c.18 0 .3-.12.359-.239L8 2.031l1.762 3.554c.06.12.18.24.359.24l3.912.567-2.837 2.747a.493.493 0 0 0-.15.448z"
      fill="currentColor"
    />
    <path
      clipRule="evenodd"
      d="M9.5 5a.5.5 0 0 0-.5.5v.607a.5.5 0 0 0 .5.5h.607a.5.5 0 0 0 .5-.5V5.5a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5V6a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 18 6v-.5a.5.5 0 0 0-.5-.5zM9 9.25a.5.5 0 0 1 .5-.5h.607a.5.5 0 0 1 .5.5v.608a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      d="M10.5 5.5a1 1 0 0 1-1 1v-3a2 2 0 0 0-2 2zm0 .607V5.5h-3v.607zm-1-1a1 1 0 0 1 1 1h-3a2 2 0 0 0 2 2zm.607 0H9.5v3h.607zm-1 1a1 1 0 0 1 1-1v3a2 2 0 0 0 2-2zm0-.607v.607h3V5.5zm1 1a1 1 0 0 1-1-1h3a2 2 0 0 0-2-2zm-.607 0h.607v-3H9.5zm4-1a1 1 0 0 1-1 1v-3a2 2 0 0 0-2 2zm0 .5v-.5h-3V6zm-1-1a1 1 0 0 1 1 1h-3a2 2 0 0 0 2 2zm5 0h-5v3h5zm-1 1a1 1 0 0 1 1-1v3a2 2 0 0 0 2-2zm0-.5V6h3v-.5zm1 1a1 1 0 0 1-1-1h3a2 2 0 0 0-2-2zm-5 0h5v-3h-5zm-3 .75a2 2 0 0 0-2 2h3a1 1 0 0 1-1 1zm.607 0H9.5v3h.607zm2 2a2 2 0 0 0-2-2v3a1 1 0 0 1-1-1zm0 .608V9.25h-3v.608zm-2 2a2 2 0 0 0 2-2h-3a1 1 0 0 1 1-1zm-.607 0h.607v-3H9.5zm-2-2a2 2 0 0 0 2 2v-3a1 1 0 0 1 1 1zm0-.608v.608h3V9.25zm6 0a1 1 0 0 1-1 1v-3a2 2 0 0 0-2 2zm0 .5v-.5h-3v.5zm-1-1a1 1 0 0 1 1 1h-3a2 2 0 0 0 2 2zm5 0h-5v3h5zm-1 1a1 1 0 0 1 1-1v3a2 2 0 0 0 2-2zm0-.5v.5h3v-.5zm1 1a1 1 0 0 1-1-1h3a2 2 0 0 0-2-2zm-5 0h5v-3h-5z"
      fill="#fff"
      mask="url(#trait-listings_svg__a)"
    />
  </svg>
);

export default SvgTraitListings;