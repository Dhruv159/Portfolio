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

// Predefined hex colors for each theme to avoid DOM manipulation
const themeHexColors = {
    lavender: {
        primary: '#8B5CF6',
        light: '#F3F0FF',
        text: '#6B46C1'
    },
    blue: {
        primary: '#3B82F6',
        light: '#EFF6FF',
        text: '#1D4ED8'
    },
    green: {
        primary: '#10B981',
        light: '#ECFDF5',
        text: '#047857'
    },
    purple: {
        primary: '#8B5CF6',
        light: '#F3F0FF',
        text: '#6B46C1'
    },
    teal: {
        primary: '#14B8A6',
        light: '#F0FDFA',
        text: '#0F766E'
    }
}

// Function to get Calendly colors based on theme
export function getCalendlyColors(theme: string) {
    const colors = themeHexColors[theme as keyof typeof themeHexColors] || themeHexColors.lavender
    
    return {
        primary_color: colors.primary.replace('#', ''),
        text_color: colors.text.replace('#', ''),
        background_color: colors.light.replace('#', '')
    }
} 