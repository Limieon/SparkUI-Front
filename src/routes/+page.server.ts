import 'dotenv/config'
import Axios from 'axios'

const { SPARKUI_BACK_HOST } = process.env

export async function load() {
	return {
		checkpoints: (await Axios.get(`http://${SPARKUI_BACK_HOST}/v1/stable_diffusion/checkpoints`)).data
	}
}
