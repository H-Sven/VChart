import type React from 'react';
import type { IWordCloudChartSpec, IVChartConstructor } from '@visactor/vchart';
import { VChart, registerWordCloudChart } from '@visactor/vchart';
import { BaseChartProps, createChart } from './BaseChart';
import { registers } from './registers/simple';

export interface WordCloudChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type' | 'data'>,
    Omit<Partial<IWordCloudChartSpec>, 'type'> {}

export const WordCloudChart = createChart<React.PropsWithChildren<WordCloudChartProps> & { type?: 'wordCloud' }>(
  'WordCloudChart',
  {
    type: 'wordCloud',
    vchartConstrouctor: VChart as IVChartConstructor
  },
  [registerWordCloudChart, ...registers]
);
