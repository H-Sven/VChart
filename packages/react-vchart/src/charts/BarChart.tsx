import type React from 'react';
import type { IBarChartSpec, IVChartConstructor } from '@visactor/vchart';
import { VChart, registerBarChart, registerLabel, registerTotalLabel } from '@visactor/vchart';
import { BaseChartProps, createChart } from './BaseChart';
import { registers } from './registers/cartesian';

export interface BarChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type' | 'data'>,
    Omit<Partial<IBarChartSpec>, 'type'> {
  //
}

export const BarChart = createChart<React.PropsWithChildren<BarChartProps> & { type?: 'bar' }>(
  'BarChart',
  {
    type: 'bar',
    vchartConstrouctor: VChart as IVChartConstructor
  },
  [registerBarChart, registerLabel, registerTotalLabel, ...registers]
);
