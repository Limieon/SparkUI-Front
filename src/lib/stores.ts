import { writable } from 'svelte/store'

interface Text2ImageData {
	prompt: string
	negativePrompt: string
	stylePrompt: string
	negativeStylePrompt: string
	checkpoint: string
	steps: number
	iterations: number
	cfgScale: number
	sampler: string
	vae: string
	precision: string
	seed: number
	outputWidth: number
	outputHeight: number
	loras: {name: string, weight: number}[]
}

export const txt2imageData = writable<Text2ImageData>({
	prompt: '',
	negativePrompt: '',
	stylePrompt: '',
	negativeStylePrompt: '',
	checkpoint: '',
	steps: 30,
	iterations: 1,
	cfgScale: 7.5,
	sampler: 'Euler Ancestral',
	vae: 'Default',
	precision: 'fp16',
	seed: 0,
	outputWidth: 512,
	outputHeight: 768,
	loras: []
})

export const imageSizeData = writable({
	selectedAr: 0,
	selectedSize: 2,
	swapped: false
})
