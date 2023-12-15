
export type SDVersion = {
    name: string
    short: string
    color: string
}

export type SDVersionIDs = "sd1.5" | "sd2.1" | "sdxl" | "sdxl-t"

export let SDVersions: { [key: string]: SDVersion } = {
    'sd1.5': {
        name: "StableDiffusion 1.5",
        short: "SD1.5",
        color: "teal"
    },
    'sd2.1': {
        name: "StableDiffusion 1.5",
        short: "SD1.5",
        color: "sky"
    },
    'sdxl': {
        name: "StableDiffusion XL",
        short: "SDXL",
        color: "fuchsia"
    },
    'sdxl-t': {
        name: "StalbeDiffusion XL - Turbo",
        short: "SDXL-T",
        color: "rose"
    }
}
