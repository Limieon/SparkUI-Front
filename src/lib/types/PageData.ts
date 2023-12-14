
export type CheckpointData = {
	handle: string
	name: string
	description: string
	preview_url: string
	checkpoing_page: string
	variations: {
		handle: string
		inpainting: boolean
		sd_version: string
	}[]
}

export type PageData = {
	checkpoints: CheckpointData
}
