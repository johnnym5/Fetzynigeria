window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ba8f2c',
        'primary-strong': '#d6ab46',
        'primary-ink': '#1a1407',
        'background-light': '#f6f2ea',
        'background-dark': '#111315',
        'surface-dark': '#171a1d',
        graphite: '#1c2127',
        'panel-light': '#fffdf8',
        'panel-dark': '#171b20',
        'text-muted': '#94a3b8'
      },
      fontFamily: {
        display: ['Inter', 'sans-serif']
      },
      boxShadow: {
        sm: '0 12px 32px rgba(15, 23, 42, 0.08)',
        md: '0 18px 44px rgba(15, 23, 42, 0.12)',
        lg: '0 26px 80px rgba(15, 23, 42, 0.16)',
        glow: '0 24px 60px rgba(186, 143, 44, 0.24)'
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
        full: '9999px'
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeSoft: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        panelIn: {
          '0%': { opacity: '0', transform: 'scale(0.98) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' }
        }
      },
      animation: {
        reveal: 'reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fade: 'fadeSoft 0.45s ease-out forwards',
        panel: 'panelIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      },
      transitionDuration: {
        fast: '180ms',
        base: '280ms',
        slow: '420ms'
      }
    }
  }
};
