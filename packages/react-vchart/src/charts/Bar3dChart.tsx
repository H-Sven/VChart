import type React from 'react';
import type { IBar3dChartSpec, IVChartConstructor } from '@visactor/vchart';
import { VChart, registerBar3dChart, registerLabel, registerTotalLabel } from '@visactor/vchart';
import { BaseChartProps, createChart } from './BaseChart';
import { registers } from './registers/cartesian';

export interface Bar3dChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type' | 'data'>,
    Omit<Partial<IBar3dChartSpec>, 'type'> {
  //
}

export const Bar3dChart = createChart<React.PropsWithChildren<Bar3dChartProps> & { type?: 'bar3d' }>(
  'Bar3dChart',
  {
    type: 'bar3d',
    vchartConstrouctor: VChart as IVChartConstructor
  },
  [registerBar3dChart, registerLabel, registerTotalLabel, ...registers]
);
