import type React from 'react';
import type { IGaugeChartSpec, IVChartConstructor } from '@visactor/vchart';
import { VChart, registerGaugeChart } from '@visactor/vchart';
import { BaseChartProps, createChart } from './BaseChart';
import { registers } from './registers/simple';

export interface GaugeChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type' | 'data'>,
    Omit<Partial<IGaugeChartSpec>, 'type'> {}

export const GaugeChart = createChart<React.PropsWithChildren<GaugeChartProps> & { type?: 'gauge' }>(
  'GaugeChart',
  {
    type: 'gauge',
    vchartConstrouctor: VChart as IVChartConstructor
  },
  [registerGaugeChart, ...registers]
);
