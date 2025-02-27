import type React from 'react';
import type { ITreemapChartSpec, IVChartConstructor } from '@visactor/vchart';
import { VChart, registerTreemapChart } from '@visactor/vchart';
import { registers } from './registers/simple';
import type { BaseChartProps } from './BaseChart';
import { createChart } from './BaseChart';

export interface TreemapChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type' | 'data'>,
    Omit<Partial<ITreemapChartSpec>, 'type'> {}

export const TreemapChart = createChart<React.PropsWithChildren<TreemapChartProps> & { type?: 'treemap' }>(
  'TreemapChart',
  {
    type: 'treemap',
    vchartConstrouctor: VChart as IVChartConstructor
  },
  [registerTreemapChart, ...registers]
);
