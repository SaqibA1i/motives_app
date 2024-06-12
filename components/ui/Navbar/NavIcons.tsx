export const HomeIcon = ({
  className,
  onClick,
}: {
  className: string;
  onClick: () => void;
}) => {
  return (
    <svg
      className={className}
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_25_95)" filter="url(#filter0_d_25_95)">
        <path
          d="M34 15C34 14.8709 33.9529 14.7417 33.8601 14.6492L19.2767 0.117891C19.1977 0.0391993 19.0989 0 19 0C18.9012 0 18.8023 0.0392169 18.7233 0.117891L4.1399 14.6492C4.04719 14.7417 4 14.8709 4 15C4 15.2532 4.18125 15.4678 4.41505 15.4678C4.51386 15.4678 4.61318 15.4286 4.69328 15.3505L7.3334 12.7624L7.33372 28.125C7.33372 29.1604 8.08007 30 9.00039 30H13.9999C14.9202 30 15.6666 29.1604 15.6666 28.125L15.6661 19.6875H22.3328L22.333 28.125C22.333 29.1604 23.0793 30 23.9528 30H28.9523C29.8726 30 30.6189 29.1604 30.6189 28.125L30.6192 12.7617L33.2593 15.3498C33.3854 15.4277 33.4844 15.4687 33.5833 15.4687C33.8177 15.4687 34 15.2578 34 15ZM29 29.0625H23.9999C23.5397 29.0625 23.1666 28.6428 23.1666 28.125V19.6875C23.1666 19.1697 22.7935 18.75 22.3333 18.75H15.6197C15.1594 18.75 14.7864 19.1697 14.7864 19.6875V28.125C14.7864 28.6428 14.4133 29.0625 13.953 29.0625H8.95299C8.49273 29.0625 8.11966 28.6428 8.11966 28.125V11.9297L18.9999 1.09565L29.8333 11.9297V28.125C29.8333 28.6406 29.4583 29.0625 29 29.0625Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_25_95"
          x="0"
          y="0"
          width="38"
          height="38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_25_95"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_25_95"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_25_95">
          <rect width="30" height="30" fill="white" transform="translate(4)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SettingsIcon = ({ className, onClick }) => {
  return (
    <svg
      className={className}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M30 19.4531C30 19.1215 29.8083 18.801 29.4947 18.6287L26.6232 17.052C26.7534 16.3828 26.8273 15.6504 26.8273 15C26.8273 14.3496 26.7508 13.6143 26.6216 12.948L29.493 11.3713C29.8067 11.199 29.9983 10.8785 29.9983 10.5469C29.9983 9.7207 27.4122 4.74375 26.0642 4.74375C25.8898 4.74375 25.7138 4.78632 25.5562 4.87283L22.6781 6.45369C21.5847 5.56523 20.3218 4.86914 18.9419 4.40391V1.24688C18.9419 0.806074 18.6239 0.410156 18.17 0.319922C17.143 0.11584 16.0896 0 14.9992 0C13.9088 0 12.8522 0.11584 11.8277 0.31998C11.3768 0.410391 11.0564 0.80625 11.0564 1.24688V4.40391C9.67649 4.86914 8.41359 5.56523 7.32318 6.45117L4.44191 4.87266C4.28482 4.78594 4.10863 4.74316 3.93428 4.74316C2.71943 4.74316 0.000184772 9.54492 0.000184772 10.5463C0.000184772 10.8779 0.1919 11.1984 0.505531 11.3707L3.37694 12.9475C3.24739 13.6172 3.171 14.2969 3.171 15C3.171 15.7031 3.24751 16.3857 3.37676 17.052L0.505346 18.6287C0.191653 18.801 0 19.1215 0 19.4531C0 20.2793 2.58618 25.2562 3.9341 25.2562C4.10856 25.2562 4.28451 25.2137 4.44209 25.1272L7.32028 23.5463C8.41359 24.4336 9.67649 25.1309 11.0564 25.5938V28.7508C11.0564 29.1916 11.3744 29.5875 11.8284 29.6777C12.8553 29.8828 13.9088 30 14.9437 30C15.9787 30 17.0907 29.8842 18.1152 29.68C18.6215 29.5371 18.9419 29.1914 18.9419 28.752V25.5949C20.3231 25.1298 21.5866 24.4336 22.6782 23.5459L25.5564 25.1268C25.714 25.2133 25.8901 25.2558 26.0644 25.2558C27.2771 25.2539 30 20.4551 30 19.4531ZM26.0511 24.2637L22.5692 22.3512L22.0393 22.7821C21.0308 23.6024 19.8788 24.2347 18.6146 24.6601L17.9562 24.9316L17.968 28.7607C16.9151 28.9629 15.9725 29.0625 14.9992 29.0625C14.0258 29.0625 13.0297 28.9615 12.0421 28.7531V24.9333L11.3854 24.7123C10.1219 24.2868 8.96926 23.6546 7.96079 22.8343L7.43086 22.4034L3.94525 24.3299C2.61396 22.9026 1.61781 21.2567 0.998064 19.4403L4.47259 17.5325L4.34636 16.8815C4.2189 16.2246 4.15668 15.6094 4.15668 15C4.15668 14.3906 4.21865 13.7754 4.34605 13.118L4.47228 12.467L0.982785 10.5586C1.61732 8.74102 2.61409 7.09512 3.94907 5.68184L7.43099 7.59434L7.96091 7.16338C8.96939 6.34307 10.1214 5.71084 11.3855 5.28545L12.0421 5.0666L12.0298 1.2375C13.0278 1.03828 14.0258 0.9375 14.9992 0.9375C15.9725 0.9375 16.9687 1.03846 17.9562 1.24693V5.06666L18.6129 5.28773C19.8764 5.71324 21.0291 6.34535 22.0375 7.16566L22.5675 7.59662L26.0531 5.67006C27.3844 7.0974 28.3805 8.7433 29.0003 10.5597L25.5257 12.4675L25.652 13.1185C25.7246 13.7754 25.8417 14.3906 25.8417 15C25.8417 15.6094 25.7797 16.2246 25.6523 16.882L25.5261 17.533L29.0154 19.4391C28.3798 21.2578 27.3818 22.9043 26.0511 24.2637ZM14.9992 10.3125C12.2824 10.3125 10.0708 12.416 10.0708 15C10.0708 17.584 12.2818 19.6875 14.9992 19.6875C17.7166 19.6875 19.9276 17.5846 19.9276 15C19.9276 12.4154 17.716 10.3125 14.9992 10.3125ZM14.9992 18.6973C12.8251 18.6973 11.0564 17.015 11.0564 14.9473C11.0564 12.8795 12.8245 11.1973 14.9992 11.1973C17.1738 11.1973 18.9419 12.8795 18.9419 14.9473C18.9419 17.015 17.1738 18.6973 14.9992 18.6973Z"
        fill="white"
        fillOpacity="0.9"
      />
    </svg>
  );
};

export const ApplicationsIcon = ({ className, onClick }) => {
  return (
    <svg
      className={className}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_142_25)">
        <path
          d="M23.1049 0H3.75003C2.1466 0 0.846802 1.25918 0.846802 2.8125V27.1875C0.846802 28.7402 2.1466 30 3.75003 30H23.1049C24.7083 30 26.0081 28.7408 26.0081 27.1875V2.8125C26.0081 1.25918 24.7077 0 23.1049 0ZM25.0404 27.1875C25.0404 28.2211 24.1718 29.0625 23.1049 29.0625H3.75003C2.68309 29.0625 1.81454 28.2211 1.81454 27.1875V2.8125C1.81454 1.77891 2.68309 0.9375 3.75003 0.9375H23.1049C24.1718 0.9375 25.0404 1.77891 25.0404 2.8125V27.1875ZM13.4274 15C15.5656 15 17.2984 13.3213 17.2984 11.25C17.2984 9.17871 15.5656 7.5 13.4274 7.5C11.2899 7.5 9.55648 9.17871 9.55648 11.25C9.55648 13.3213 11.2924 15 13.4274 15ZM13.4274 8.4375C15.0303 8.4375 16.3307 9.69727 16.3307 11.25C16.3307 12.8027 15.0285 14.0625 13.4274 14.0625C11.8264 14.0625 10.5242 12.8027 10.5242 11.25C10.5242 9.69727 11.8246 8.4375 13.4274 8.4375ZM28.9113 3.75H28.4274C28.1613 3.75 27.9436 3.95977 27.9436 4.21875C27.9436 4.47773 28.1602 4.6875 28.4274 4.6875H28.9113V8.4375H28.4274C28.1613 8.4375 27.9436 8.64844 27.9436 8.90625C27.9436 9.16406 28.1613 9.375 28.4274 9.375H28.9113C29.4436 9.375 29.8791 8.95313 29.8791 8.4375V4.6875C29.8791 4.16953 29.4436 3.75 28.9113 3.75ZM28.9113 18.75H28.4274C28.1613 18.75 27.9436 18.9609 27.9436 19.2188C27.9436 19.4766 28.1602 19.6875 28.4274 19.6875H28.9113V23.4375H28.4274C28.1602 23.4375 27.9436 23.6474 27.9436 23.9062C27.9436 24.1651 28.1613 24.375 28.4274 24.375H28.9113C29.4458 24.375 29.8791 23.9552 29.8791 23.4375V19.6875C29.8791 19.1719 29.4436 18.75 28.9113 18.75ZM28.9113 11.25H28.4274C28.1613 11.25 27.9436 11.4609 27.9436 11.7188C27.9436 11.9766 28.1602 12.1875 28.4274 12.1875H28.9113V15.9375H28.4274C28.1613 15.9375 27.9436 16.1484 27.9436 16.4062C27.9436 16.6641 28.1613 16.875 28.4274 16.875H28.9113C29.4436 16.875 29.8791 16.4531 29.8791 15.9375V12.1875C29.8791 11.6719 29.4436 11.25 28.9113 11.25ZM15.3629 16.875H11.492C8.82462 16.875 6.65325 18.9785 6.65325 21.5625V22.0312C6.65325 22.2891 6.871 22.5 7.13712 22.5C7.40325 22.5 7.621 22.2904 7.621 22.0312V21.5625C7.621 19.4941 9.35688 17.8125 11.492 17.8125H15.3629C17.498 17.8125 19.2339 19.4941 19.2339 21.5625V22.0312C19.2339 22.2904 19.4503 22.5 19.7178 22.5C19.9852 22.5 20.2016 22.2891 20.2016 22.0312V21.5625C20.2016 18.9785 18.0303 16.875 15.3629 16.875Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_142_25">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};