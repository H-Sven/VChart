import type React from 'react';
import type { IMapChartSpec, IVChartConstructor } from '@visactor/vchart';
import { VChart, registerMapChart, registerLabel } from '@visactor/vchart';
import { registers } from './registers/simple';
import type { BaseChartProps } from './BaseChart';
import { createChart } from './BaseChart';

export interface MapChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type' | 'data'>,
    Omit<Partial<IMapChartSpec>, 'type'> {}

export const MapChart = createChart<React.PropsWithChildren<MapChartProps> & { type?: 'map' }>(
  'MapChart',
  {
    type: 'map',
    vchartConstrouctor: VChart as IVChartConstructor
  },
  [registerMapChart, registerLabel, ...registers]
);
