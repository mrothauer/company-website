export class Square {
    constructor(
        public tag: string,
        public classes: string[] = [],
        public target?: string,
        public innerHtml?: string,
        public href?: string
    ) { }
}