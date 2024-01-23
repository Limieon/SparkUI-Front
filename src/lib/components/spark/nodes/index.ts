import DefaultNode from './DefaultNode.svelte'

export interface NodeConnection {
    type: string
    name?: string
}

export interface NodeField {
    type: string
    default: any
    connection?: NodeConnection
}

export interface NodeMeta {
    label: string
    use_progress: boolean
    inputs: NodeConnection
    outputs: NodeConnection
    fields: NodeField
}

const TYPE_COLORS: { [key: string]: string } = {
    vae: 'red',
    int: 'blue',
    latent_image: 'cyan',
    conditioning: 'orange',
    string: 'yellow',
    clip: 'green'
}
const TYPE_NAMES: { [key: string]: string } = {
    vae: 'VAE',
    int: 'Integer',
    latent_image: 'Latent Image',
    image: 'Image',
    conditioning: 'Conditioning',
    string: 'String',
    clip: 'CLIP'
}

export function getTypeColor(type: string) {
    return TYPE_COLORS[type] ? TYPE_COLORS[type] : 'white'
}
export function getTypeName(type: string) {
    return TYPE_NAMES[type] ? TYPE_NAMES[type] : 'Any'
}


export { DefaultNode }

