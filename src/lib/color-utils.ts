export const colorThemes = {
    lavender: {
        primary: "oklch(0.6 0.15 280)",
        primaryLight: "oklch(0.6 0.15 280 / 0.1)",
        primaryHover: "oklch(0.6 0.15 280 / 0.2)",
        gradient: "from-[oklch(0.6_0.15_280)] to-[oklch(0.6_0.15_280/0.6)]"
    },
    blue: {
        primary: "oklch(0.5 0.2 240)",
        primaryLight: "oklch(0.5 0.2 240 / 0.1)",
        primaryHover: "oklch(0.5 0.2 240 / 0.2)",
        gradient: "from-[oklch(0.5_0.2_240)] to-[oklch(0.5_0.2_240/0.6)]"
    },
    green: {
        primary: "oklch(0.6 0.2 140)",
        primaryLight: "oklch(0.6 0.2 140 / 0.1)",
        primaryHover: "oklch(0.6 0.2 140 / 0.2)",
        gradient: "from-[oklch(0.6_0.2_140)] to-[oklch(0.6_0.2_140/0.6)]"
    },
    purple: {
        primary: "oklch(0.5 0.25 300)",
        primaryLight: "oklch(0.5 0.25 300 / 0.1)",
        primaryHover: "oklch(0.5 0.25 300 / 0.2)",
        gradient: "from-[oklch(0.5_0.25_300)] to-[oklch(0.5_0.25_300/0.6)]"
    },
    teal: {
        primary: "oklch(0.6 0.15 180)",
        primaryLight: "oklch(0.6 0.15 180 / 0.1)",
        primaryHover: "oklch(0.6 0.15 180 / 0.2)",
        gradient: "from-[oklch(0.6_0.15_180)] to-[oklch(0.6_0.15_180/0.6)]"
    }
}

export function getColorTheme(theme: string) {
    return colorThemes[theme as keyof typeof colorThemes] || colorThemes.lavender
}

export function getPrimaryColor(theme: string) {
    const colorTheme = getColorTheme(theme)
    return colorTheme.primary
}

export function getPrimaryLightColor(theme: string) {
    const colorTheme = getColorTheme(theme)
    return colorTheme.primaryLight
}

export function getPrimaryHoverColor(theme: string) {
    const colorTheme = getColorTheme(theme)
    return colorTheme.primaryHover
}

export function getGradientClass(theme: string) {
    const colorTheme = getColorTheme(theme)
    return colorTheme.gradient
} 