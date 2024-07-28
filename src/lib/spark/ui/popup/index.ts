import Popup from './Popup.svelte'
import SelectorPopup from './Selector.svelte'
import SelectorItem from './SelectorItem.svelte'

interface SelectionEntry {
    name: string;
    id: string;
    image: string;
    leftBadges: string[];
    rightBadges: string[];
}

export { Popup, SelectorPopup, SelectorItem, SelectionEntry }
