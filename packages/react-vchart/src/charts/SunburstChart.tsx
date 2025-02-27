import type React from 'react';
import type { ISunburstChartSpec, IVChartConstructor } from '@visactor/vchart';
import { VChart, registerSunburstChart } from '@visactor/vchart';
import { registers } from './registers/simple';
import type { BaseChartProps } from './BaseChart';
import { createChart } from './BaseChart';

export interface SunburstChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type' | 'data'>,
    Omit<Partial<ISunburstChartSpec>, 'type'> {}

export const SunburstChart = createChart<React.PropsWithChildren<SunburstChartProps> & { type?: 'sunburst' }>(
  'SunburstChart',
  {
    type: 'sunburst',
    vchartConstrouctor: VChart as IVChartConstructor
  },
  [registerSunburstChart, ...registers]
);
