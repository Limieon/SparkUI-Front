import Img2Img from './Img2Img.svelte'
import Txt2Img from './Txt2Img.svelte'
import ModelBrowser from './ModelBrowser.svelte'
import InstalledModels from './InstalledModels.svelte'
import Settings from './Settings.svelte'
import OutputImages from './OutputImages.svelte'
import Queue from './Queue.svelte'
import Downloads from './Downloads.svelte'
import NodeEditor from './NodeEditor.svelte'

import IconType from 'lucide-svelte/icons/type';
import IconImage from 'lucide-svelte/icons/image';
import IconBrowser from 'lucide-svelte/icons/earth';
import IconBook from 'lucide-svelte/icons/book';
import IconImages from 'lucide-svelte/icons/images';
import IconListEnd from 'lucide-svelte/icons/list-end';
import IconDownloads from 'lucide-svelte/icons/download';
import IconNodeEditor from 'lucide-svelte/icons/workflow';

type Pages = 'txt2img' | 'img2img' | 'modelBrowser' | 'installedModels' | 'outputImages' | 'queue' | 'downloads' | 'nodeEditor' | 'settings'
type Page = {
    page: Pages,
    icon: any,
    title: string,
}

const pages: Page[] = [
    {
        page: 'txt2img',
        title: 'page.txt2img.title',
        icon: IconType
    },
    {
        page: 'img2img',
        title: 'Image to Image',
        icon: IconImage
    },
    {
        page: 'nodeEditor',
        title: 'Node Editor',
        icon: IconNodeEditor
    },
    {
        page: 'modelBrowser',
        title: 'Model Browser',
        icon: IconBrowser
    },
    {
        page: 'installedModels',
        title: 'Installed Models',
        icon: IconBook
    },
    {
        page: 'outputImages',
        title: 'Output Images',
        icon: IconImages
    },
    {
        page: 'queue',
        title: 'Queue',
        icon: IconListEnd
    },
    {
        page: 'downloads',
        title: 'Downloads',
        icon: IconDownloads
    }
];

export { Img2Img, Txt2Img, ModelBrowser, InstalledModels, Settings, OutputImages, Queue, Downloads, NodeEditor, type Pages, type Page, pages }
