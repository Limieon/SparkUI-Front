import Img2Img from './Img2Img.svelte'
import Txt2Img from './Txt2Img.svelte'
import ModelBrowser from './ModelBrowser.svelte'
import InstalledModels from './InstalledModels.svelte'
import Settings from './Settings.svelte'
import OutputImages from './OutputImages.svelte'
import Queue from './Queue.svelte'
import Downloads from './Downloads.svelte'

type pages = 'txt2img' | 'img2img' | 'modelBrowser' | 'installedModels' | 'outputImages' | 'queue' | 'downloads'

export { Img2Img, Txt2Img, ModelBrowser, InstalledModels, Settings, OutputImages, Queue, Downloads, type pages as Pages }
