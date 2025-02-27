import { array, isNil } from '@visactor/vutils';
import type { IPolarAxisSpec, IPolarBandAxisSpec } from '../../component';
import { POLAR_DEFAULT_RADIUS } from '../../constant/polar';
import { RoseLikeChartSpecTransformer } from '../polar';
import type { IRoseChartSpec } from './interface';
import { mergeSpec } from '@visactor/vutils-extension';

export class RoseChartSpecTransformer<
  T extends IRoseChartSpec = IRoseChartSpec
> extends RoseLikeChartSpecTransformer<T> {
  protected _getDefaultSeriesSpec(spec: T): any {
    return {
      ...super._getDefaultSeriesSpec(spec),
      radius: spec.radius ?? POLAR_DEFAULT_RADIUS,
      outerRadius: spec.outerRadius ?? POLAR_DEFAULT_RADIUS,
      innerRadius: spec.innerRadius ?? 0,
      seriesField: spec.seriesField,
      stack: spec.stack,
      percent: spec.percent
      // startAngle: degreeToRadian(spec.startAngle || 0),
    };
  }

  transformSpec(spec: T) {
    super.transformSpec(spec);
    //默认不显示轴
    (spec.axes ?? []).forEach((axis: IPolarAxisSpec) => {
      ['domainLine', 'grid', 'label', 'tick'].forEach(configName => {
        if (!axis[configName]) {
          axis[configName] = { visible: false };
        }
      });
      if (axis.orient === 'angle' && isNil((axis as IPolarBandAxisSpec).bandPosition)) {
        // 玫瑰图的中心点应该是带宽的中心，保证第一个扇形是从坐标系的 startAngle 开始的
        (axis as IPolarBandAxisSpec).bandPosition = 0.5;
      }
    });

    // set default config for crosshair
    spec.crosshair = array(spec.crosshair || {}).map(crosshairCfg => {
      return mergeSpec(
        {
          categoryField: {
            visible: true,
            line: {
              visible: true,
              type: 'rect'
            }
          }
        },
        crosshairCfg
      );
    });
  }
}
