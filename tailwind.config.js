/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "surface-container-high": "#fde3db",
        "on-error-container": "#93000a",
        "secondary-container": "#db313f",
        "secondary-fixed-dim": "#ffb3b1",
        "surface-variant": "#f7ddd5",
        "surface-tint": "#ab3500",
        "on-surface": "#261814",
        "surface-container-highest": "#f7ddd5",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#92001c",
        "on-primary-container": "#5f1900",
        "primary-fixed": "#ffdbd0",
        "inverse-primary": "#ffb59d",
        "on-background": "#261814",
        "secondary-fixed": "#ffdad8",
        "outline": "#8d7168",
        "tertiary-fixed": "#b5ebff",
        "on-error": "#ffffff",
        "on-tertiary-fixed-variant": "#004e60",
        "tertiary": "#00677e",
        "surface-container-lowest": "#ffffff",
        "on-tertiary": "#ffffff",
        "surface-container-low": "#fff1ed",
        "on-primary": "#ffffff",
        "on-secondary-fixed": "#410007",
        "on-secondary-container": "#fffbff",
        "primary-container": "#ff6b35",
        "on-secondary": "#ffffff",
        "on-surface-variant": "#594139",
        "surface-dim": "#eed5cd",
        "inverse-surface": "#3c2d28",
        "background": "#fff8f6",
        "on-primary-fixed-variant": "#832600",
        "on-tertiary-container": "#003744",
        "surface-bright": "#fff8f6",
        "surface-container": "#ffe9e3",
        "on-primary-fixed": "#390c00",
        "tertiary-fixed-dim": "#59d5fb",
        "on-tertiary-fixed": "#001f28",
        "tertiary-container": "#00a7cb",
        "surface": "#fff8f6",
        "outline-variant": "#e1bfb5",
        "primary-fixed-dim": "#ffb59d",
        "secondary": "#b7102a",
        "primary": "#ab3500",
        "error": "#ba1a1a",
        "inverse-on-surface": "#ffede8"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "base": "4px",
        "xl": "32px",
        "container-padding": "16px",
        "lg": "24px",
        "md": "16px",
        "xs": "8px",
        "card-gap": "12px",
        "sm": "12px"
      },
      "fontFamily": {
        "body-md": ["Be Vietnam Pro"],
        "headline-lg": ["Plus Jakarta Sans"],
        "body-lg": ["Be Vietnam Pro"],
        "label-sm": ["Be Vietnam Pro"],
        "label-lg": ["Be Vietnam Pro"],
        "headline-md": ["Plus Jakarta Sans"]
      },
      "fontSize": {
        "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
        "headline-lg": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}],
        "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "headline-md": ["20px", {"lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "700"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
}
