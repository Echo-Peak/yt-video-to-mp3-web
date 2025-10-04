import { alpha, createTheme, ThemeOptions } from "@mui/material/styles";

const glass = {
  surface: "rgba(18, 18, 20, 0.35)",
  surfaceStrong: "rgba(18, 18, 20, 0.55)",
  border: "rgba(255, 255, 255, 0.14)",
  shadow: "rgba(0, 0, 0, 0.35)",
  text: "rgba(255, 255, 255, 0.92)",
  blur: "20px",
};

const brand = {
  primary: "#d93d32",
  secondary: "#d95148",
  accent: "#303030",
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: { main: brand.primary },
    secondary: { main: brand.secondary },
    background: {
      default: "#0B0C0F",
      paper: glass.surface,
    },
    divider: glass.border,
    text: {
      primary: glass.text,
      secondary: alpha("#FFFFFF", 0.72),
      disabled: alpha("#FFFFFF", 0.5),
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: [
      "Inter",
      "SF Pro Text",
      "SF Pro Display",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Apple Color Emoji",
      "Segoe UI Emoji",
    ].join(","),
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0.2 },
  },
  shadows: [
    "none",
    `0 1px 2px ${glass.shadow}`,
    `0 2px 8px ${glass.shadow}`,
    `0 4px 16px ${glass.shadow}`,
    `0 8px 24px ${glass.shadow}`,
    ...Array(20).fill(`0 12px 32px ${glass.shadow}`),
  ] as any,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--glass-surface": glass.surface,
          "--glass-surface-strong": glass.surfaceStrong,
          "--glass-border": glass.border,
          "--glass-blur": glass.blur,
        },
        html: { height: "100%" },
        body: {
          height: "100%",
          background:
            "radial-gradient(3000px 2500px at 10% -10%, rgba(96,165,250,0.18), transparent 60%), radial-gradient(3500px 2500px at 90% 10%, rgba(232,52,52,0.35), transparent 35%), linear-gradient(180deg, #0B0C0F 0%, #0B0C10 100%)",
          backdropFilter: "saturate(115%)",
          backgroundAttachment: "fixed",
          WebkitTapHighlightColor: "transparent",
        },
        "*": { outlineColor: brand.accent },
        "::selection": {
          backgroundColor: alpha(brand.accent, 0.35),
          color: "#fff",
        },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 3 },
      styleOverrides: {
        root: {
          backgroundColor: "var(--glass-surface)",
          backdropFilter: `blur(var(--glass-blur)) saturate(120%)`,
          WebkitBackdropFilter: `blur(var(--glass-blur)) saturate(120%)`,
          border: `1px solid var(--glass-border)`,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.35)",
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: { borderColor: "var(--glass-border)" },
        },
        {
          props: { variant: "elevation" },
          style: { backgroundColor: "var(--glass-surface-strong)" },
        },
        {
          props: { variant: "glass" as any },
          style: {
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            border: `1px solid var(--glass-border)`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), 0 12px 32px rgba(0,0,0,0.45)",
          },
        },
      ],
    },

    MuiCard: {
      defaultProps: { elevation: 3 },
      styleOverrides: {
        root: {
          backgroundColor: "var(--glass-surface)",
          backdropFilter: `blur(var(--glass-blur)) saturate(120%)`,
          WebkitBackdropFilter: `blur(var(--glass-blur)) saturate(120%)`,
          border: `1px solid var(--glass-border)`,
        },
      },
      variants: [
        {
          props: { variant: "glass" as any },
          style: {
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          },
        },
      ],
    },

    MuiAppBar: {
      defaultProps: { elevation: 0, color: "transparent" },
      styleOverrides: {
        root: {
          backgroundColor: "rgba(12,12,14,0.35)",
          backdropFilter: `blur(${glass.blur}) saturate(140%)`,
          WebkitBackdropFilter: `blur(${glass.blur}) saturate(140%)`,
          borderBottom: `1px solid ${glass.border}`,
        },
      },
    },

    MuiToolbar: {
      styleOverrides: { root: { minHeight: 64 } },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingInline: 16,
        },
        containedPrimary: {
          background:
            "linear-gradient(180deg, rgba(232,52,52,0.6), rgba(0,0,0,0.60))",
          color: "white",
          boxShadow: "0 8px 24px rgba(232,52,52,0.35)",
          "&:hover": {
            background:
              "linear-gradient(180deg, rgba(232,52,52,1), rgba(0,0,0,0.6))",
          },
        },
        outlined: {
          borderColor: glass.border,
          backgroundColor: "rgba(255,255,255,0.02)",
          backdropFilter: `blur(${glass.blur})`,
        },
        text: {
          backgroundColor: "transparent",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--glass-surface-strong)",
          border: `1px solid var(--glass-border)`,
          backdropFilter: `blur(${glass.blur})`,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--glass-surface)",
          border: `1px solid var(--glass-border)`,
          backdropFilter: `blur(${glass.blur})`,
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--glass-surface)",
          border: `1px solid var(--glass-border)`,
          backdropFilter: `blur(${glass.blur})`,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(20,20,24,0.65)",
          backdropFilter: `blur(${glass.blur})`,
          border: `1px solid ${glass.border}`,
        },
        arrow: { color: "rgba(20,20,24,0.65)" },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(10,10,12,0.35)",
          backdropFilter: `blur(${glass.blur})`,
          borderRight: `1px solid ${glass.border}`,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,0.)",
            boxShadow: "none",
            backdropFilter: `blur(${glass.blur})`,
            "& fieldset": { borderColor: glass.border },
            "&:hover fieldset": { borderColor: alpha("#FFFFFF", 0.35) },
            "&.Mui-focused fieldset": { borderColor: brand.accent },
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: glass.border },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
