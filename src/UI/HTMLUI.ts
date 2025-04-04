import { PageFlip } from '../PageFlip';
import { FlipSetting } from '../Settings';
import { UI } from './UI';

/**
 * UI for HTML mode
 */
export class HTMLUI extends UI {
    private items: NodeListOf<HTMLElement> | HTMLElement[];

    constructor(
        inBlock: HTMLElement,
        app: PageFlip,
        setting: FlipSetting,
        items: NodeListOf<HTMLElement> | HTMLElement[]
    ) {
        super(inBlock, app, setting);

        // Second wrapper to HTML page
        this.wrapper.insertAdjacentHTML('afterbegin', '<div class="stf__block"></div>');

        this.distElement = inBlock.querySelector('.stf__block');

        this.items = items;
        
        // Convert to array to make TypeScript happy
        const itemsArray = Array.isArray(items) ? items : Array.from(items);
        for (const item of itemsArray) {
            this.distElement.appendChild(item);
        }

        this.setHandlers();
    }

    public clear(): void {
        // Convert to array to make TypeScript happy
        const itemsArray = Array.isArray(this.items) ? this.items : Array.from(this.items);
        for (const item of itemsArray) {
            this.parentElement.appendChild(item);
        }
    }

    /**
     * Update page list from HTMLElements
     *
     * @param {(NodeListOf<HTMLElement>|HTMLElement[])} items - List of pages as HTML Element
     */
    public updateItems(items: NodeListOf<HTMLElement> | HTMLElement[]): void {
        this.removeHandlers();

        this.distElement.innerHTML = '';

        // Convert to array to make TypeScript happy
        const itemsArray = Array.isArray(items) ? items : Array.from(items);
        for (const item of itemsArray) {
            this.distElement.appendChild(item);
        }
        this.items = items;

        this.setHandlers();
    }

    public update(): void {
        this.app.getRender().update();
    }
}
