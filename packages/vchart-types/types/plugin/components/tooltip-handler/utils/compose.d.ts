import type { ITooltipLinePattern, ITooltipPattern, TooltipData, ITooltipLineActual } from '../../../../typings/tooltip';
import type { TooltipActualTitleContent, TooltipHandlerParams } from '../../../../component/tooltip';
export declare const getShowContent: (pattern: ITooltipPattern, data: TooltipData, params: TooltipHandlerParams) => TooltipActualTitleContent | null;
export declare const getOneLineData: (datum: any, config: ITooltipLinePattern, params: TooltipHandlerParams) => ITooltipLineActual;
