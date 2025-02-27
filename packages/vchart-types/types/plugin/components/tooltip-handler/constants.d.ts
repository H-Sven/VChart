import { escapeHTML } from './utils/common';
export declare const TOOLTIP_CONTAINER_EL_CLASS_NAME = "vchart-tooltip-container";
export declare const TOOLTIP_EMPTY_STRING = "";
export declare const DEFAULT_OPTIONS: {
    offsetX: number;
    offsetY: number;
    sanitize: typeof escapeHTML;
};
export type Options = typeof DEFAULT_OPTIONS;
