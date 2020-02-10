export class Square {
    constructor(
        public tag: string,
        public classes: string[] = [],
        public target?: string,
        public innerHtmlClasses: string[] = [],
        public innerHtml?: string,
        public backgroundImageSrc?: string,
        public href?: string,
    ) { }
}