import type React from 'react';
import type { IBoxPlotChartSpec, IVChartConstructor } from '@visactor/vchart';
import { VChart, registerBoxplotChart, registerLabel } from '@visactor/vchart';
import { BaseChartProps, createChart } from './BaseChart';
import { registers } from './registers/cartesian';

export interface BoxPlotChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type' | 'data'>,
    Omit<Partial<IBoxPlotChartSpec>, 'type'> {}

export const BoxPlotChart = createChart<React.PropsWithChildren<BoxPlotChartProps> & { type?: 'boxPlot' }>(
  'BoxPlotChart',
  {
    type: 'boxPlot',
    vchartConstrouctor: VChart as IVChartConstructor
  },
  [registerBoxplotChart, registerLabel, ...registers]
);
