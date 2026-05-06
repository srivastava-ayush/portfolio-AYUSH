'use client';

export function ThemeInitializer() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme) {
                document.documentElement.setAttribute('data-theme', theme);
              } else {
                // Check system preference as fallback
                if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              }
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}
