import type { Maybe } from '@visactor/vutils';
import type { FontWeight, TextAlign } from '../../../../../typings';
import { mergeSpec } from '@visactor/vutils-extension';
import { normalizeLayoutPaddingSpec } from '../../../../../util/space';
import type { ITooltipAttributes, ITooltipTextStyle } from '../../interface';
import type { ILabelStyle, IShapeStyle, IDomTooltipStyle } from '../interface';
import { calculateLineHeight } from '@visactor/vrender-core';
import type { ITooltipTheme } from '../../../../../component/tooltip';
import { getPixelPropertyStr } from './common';

const DEFAULT_SHAPE_SPACING = 8;
const DEFAULT_KEY_SPACING = 26;
const DEFAULT_VALUE_SPACING = 0;

export function getDomStyles(attributes?: Maybe<ITooltipAttributes>): IDomTooltipStyle {
  const {
    panel = {},
    title: titleAttribute,
    content: contentAttribute,
    titleStyle = {},
    contentStyle = {},
    padding,
    keyWidth,
    valueWidth,
    enterable,
    transitionDuration,
    panelDomHeight = 0,
    align = 'left'
  } = attributes ?? {};

  const {
    fill: backgroundColor,
    shadow,
    shadowBlur,
    shadowColor,
    shadowOffsetX,
    shadowOffsetY,
    shadowSpread,
    cornerRadius,
    stroke: strokeColor,
    lineWidth = 0,
    width = 0
  } = panel;

  const { value: title = {} } = titleStyle;
  const { shape = {}, key = {}, value = {} } = contentStyle;

  const shapeStyle = getShapeStyle(shape);
  const keyStyle = getLabelStyle(key);
  const valueStyle = getLabelStyle(value);
  const { bottom, left, right, top } = normalizeLayoutPaddingSpec(padding);
  const marginKey = align === 'right' ? 'marginLeft' : 'marginRight';

  const styles: IDomTooltipStyle = {
    align,
    panel: {
      width: getPixelPropertyStr(width + lineWidth * 2),
      minHeight: getPixelPropertyStr(panelDomHeight + lineWidth * 2),
      paddingBottom: getPixelPropertyStr(bottom as number),
      paddingLeft: getPixelPropertyStr(left as number),
      paddingRight: getPixelPropertyStr(right as number),
      paddingTop: getPixelPropertyStr(top as number),
      borderColor: strokeColor as string,
      borderWidth: getPixelPropertyStr(lineWidth),
      borderRadius: getPixelPropertyStr(cornerRadius),
      backgroundColor: backgroundColor ? `${backgroundColor}` : 'transparent',
      boxShadow: shadow
        ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
        : 'initial',
      pointerEvents: enterable ? 'auto' : 'none',
      transitionDuration: transitionDuration ? `${transitionDuration}ms` : 'initial',
      transitionProperty: transitionDuration ? 'transform' : 'initial',
      transitionTimingFunction: transitionDuration ? 'ease-out' : 'initial'
    },
    title: {
      marginTop: '0px',
      marginBottom: contentAttribute?.length ? getPixelPropertyStr(titleAttribute?.spaceRow) : '0px',
      ...getLabelStyle(mergeSpec({}, title, titleAttribute?.value))
    },
    content: {},
    shapeColumn: {
      common: shapeStyle,
      items: contentAttribute?.map(
        ({ spaceRow }, i) =>
          ({
            marginTop: '0px',
            marginBottom: i < contentAttribute.length - 1 ? getPixelPropertyStr(spaceRow) : '0px'
          } as IShapeStyle)
      ),
      width: getPixelPropertyStr(shape.size),
      [marginKey]: getPixelPropertyStr(shape.spacing ?? DEFAULT_SHAPE_SPACING)
    },
    keyColumn: {
      common: keyStyle,
      items: contentAttribute?.map(
        ({ key, spaceRow }, i) =>
          ({
            marginTop: '0px',
            marginBottom: i < contentAttribute.length - 1 ? getPixelPropertyStr(spaceRow) : '0px',
            ...keyStyle,
            ...getLabelStyle(key as ITooltipTextStyle),
            ...(key?.multiLine ? { width: getPixelPropertyStr(Math.ceil(key.width)) } : undefined) // 对多行文本使用定宽
          } as ILabelStyle)
      ),
      width: getPixelPropertyStr(keyWidth),
      [marginKey]: getPixelPropertyStr(key.spacing ?? DEFAULT_KEY_SPACING)
    },
    valueColumn: {
      common: valueStyle,
      items: contentAttribute?.map(
        ({ value, spaceRow }, i) =>
          ({
            marginTop: '0px',
            marginBottom: i < contentAttribute.length - 1 ? getPixelPropertyStr(spaceRow) : '0px',
            ...valueStyle,
            ...getLabelStyle(value as ITooltipTextStyle),
            ...(value?.multiLine ? { width: getPixelPropertyStr(Math.ceil(value.width)) } : undefined) // 对多行文本使用定宽
          } as ILabelStyle)
      ),
      width: getPixelPropertyStr(valueWidth),
      [marginKey]: getPixelPropertyStr(value.spacing ?? DEFAULT_VALUE_SPACING)
    }
  };
  return styles;
}

function getLabelStyle(
  labelStyle?: ITooltipTextStyle,
  defaultStyle?: Partial<ITooltipTextStyle>
): ILabelStyle | undefined {
  if (!labelStyle) {
    return undefined;
  }
  const {
    fontFamily: labelFont,
    fontSize: labelFontSize,
    fill: labelColor,
    textAlign,
    lineHeight,
    fontWeight,
    multiLine,
    wordBreak,
    maxWidth
  } = mergeSpec({}, defaultStyle, labelStyle) as ITooltipTextStyle;
  const styleObj: ILabelStyle = {};

  styleObj.fontFamily = labelFont;
  styleObj.fontSize = getPixelPropertyStr(labelFontSize);
  styleObj.color = labelColor as string;
  styleObj.textAlign = textAlign as TextAlign;
  styleObj.lineHeight = getPixelPropertyStr(calculateLineHeight(lineHeight, labelFontSize));
  styleObj.fontWeight = fontWeight as FontWeight;
  styleObj.whiteSpace = multiLine ? 'initial' : 'nowrap';
  styleObj.wordBreak = multiLine ? wordBreak ?? 'break-word' : 'normal';
  styleObj.maxWidth = getPixelPropertyStr(maxWidth);
  return styleObj;
}

function getShapeStyle(
  shapeStyle?: ITooltipTheme['shape'],
  defaultStyle?: Partial<ITooltipTheme['shape']>
): IShapeStyle | undefined {
  if (!shapeStyle) {
    return undefined;
  }
  const { size } = mergeSpec({}, defaultStyle, shapeStyle);
  const styleObj: IShapeStyle = {};

  styleObj.width = getPixelPropertyStr(size);
  return styleObj;
}
