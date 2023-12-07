import { writable } from 'svelte/store';

interface Text2ImageData {
	prompt: string;
	negativePrompt: string;
	stylePrompt: string;
	negativeStylePrompt: string;
	checkpoint: string;
	steps: number;
	iterations: number;
	cfgScale: number;
	sampler: string;
	vae: string;
	precision: string;
	seed: number;
	outputWidth: number;
	outputHeight: number;
	loras: { name: string; weight: number }[];
}

interface SettingsData {
	queueSorting: number;
	queueHibernated: boolean;
	queuePaused: boolean;
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
});

export const settingsData = writable<SettingsData>({
	queueSorting: 0,
	queueHibernated: false,
	queuePaused: false
});

export const imageSizeData = writable({
	selectedAr: 0,
	selectedSize: 2,
	swapped: false
});

// Popupstore (Constrols the root popup element)
interface PopupData {
	open: boolean
	title: string
	message: string
	onConfirm: (() => void) | undefined
	onCancel: (() => void) | undefined
	onClose: (() => void) | undefined
}

export const currentPopup = writable<PopupData>({
	open: false,
	title: '',
	message: '',
	onConfirm: undefined,
	onCancel: undefined,
	onClose: undefined
})

export const popup = writable({
	open: (data: {
		title: string;
		message: string;
		onConfirm?: () => void;
		onClose?: () => void;
		onCancel?: () => void;
	}) => {
		currentPopup.set({
			open: true,
			title: data.title,
			message: data.message,
			onConfirm: data.onConfirm,
			onClose: data.onClose,
			onCancel: data.onCancel
		})
	},

	close: () => {
		currentPopup.update(_ => { _.open = false; return _ })
	}
});
