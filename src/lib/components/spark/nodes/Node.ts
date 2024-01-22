
export interface NodeConnection {
    type: string
    name?: string
}

const TYPE_COLORS: { [key: string]: string } = {
    vae: 'red',
    int: 'blue',
    latent_image: 'cyan',
    image: 'yellow'
}
const TYPE_NAMES: { [key: string]: string } = {
    vae: 'VAE',
    int: 'Integer',
    latent_image: 'Latent Image',
    image: 'Image'
}

export function getTypeColor(type: string) {
    return TYPE_COLORS[type] ? TYPE_COLORS[type] : 'white'
}
export function getTypeName(type: string) {
    return TYPE_NAMES[type] ? TYPE_NAMES[type] : 'Any'
}
