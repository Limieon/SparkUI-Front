import { fly, fade } from 'svelte/transition';

export function flyAndFade(node, { delay = 0, duration = 300, easing = x => x, y = 0, ...params }) {
    return {
        delay,
        duration,
        easing,
        css: t => {
            const flyStyle = fly(node, { y, duration, easing }).css(t);
            const fadeStyle = fade(node, { duration, easing }).css(t);
            return `
        ${flyStyle}
        ${fadeStyle}
      `;
        }
    };
}