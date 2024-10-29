export const MARKER_COLORS = {
  DEFAULT: "#FF7058",
  SELECTED: "#FF7058",
} as const;

export const MARKER_TEMPLATES = {
  DEFAULT: `
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
          </filter>
        </defs>
        <path d="M18 0C8.07 0 0 8.07 0 18C0 31.5 18 48 18 48C18 48 36 31.5 36 18C36 8.07 27.93 0 18 0Z" 
          fill="white"
          filter="url(#shadow)"
        />
        <path d="M18 2C9.17 2 2 9.17 2 18C2 29.5 18 44 18 44C18 44 34 29.5 34 18C34 9.17 26.83 2 18 2Z" 
          fill="${MARKER_COLORS.DEFAULT}"
        />
        <text 
          x="50%" 
          y="43%" 
          text-anchor="middle" 
          dy=".3em" 
          fill="white" 
          font-size="16"
          font-family="Arial, sans-serif"
          font-weight="bold"
        >\${number}</text>
      </svg>`,
  SELECTED: `
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
          </filter>
        </defs>
        <path d="M18 0C8.07 0 0 8.07 0 18C0 31.5 18 48 18 48C18 48 36 31.5 36 18C36 8.07 27.93 0 18 0Z" 
          fill="${MARKER_COLORS.SELECTED}"
          filter="url(#shadow)"
        />
        <text 
          x="50%" 
          y="43%" 
          text-anchor="middle" 
          dy=".3em" 
          fill="white" 
          font-size="16"
          font-family="Arial, sans-serif"
          font-weight="bold"
        >\${number}</text>
      </svg>`,
} as const;

export const MARKER_DIMENSIONS = {
  DEFAULT: {
    size: {
      width: 36,
      height: 48,
    },
    offset: {
      x: 18,
      y: 48,
    },
  },
  SELECTED: {
    size: {
      width: 60,
      height: 72,
    },
    offset: {
      x: 30,
      y: 72,
    },
  },
} as const;

export const MARKER_Z_INDEX = {
  DEFAULT: 1,
  SELECTED: 3,
} as const;
