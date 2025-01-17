import type { IAnimationEffectTiming } from '@antv/g';
import type {
  CircularLayoutOptions,
  ConcentricLayoutOptions,
  D3ForceLayoutOptions,
  ForceAtlas2LayoutOptions,
  ForceLayoutOptions,
  FruchtermanLayoutOptions,
  GridLayoutOptions,
  Layout,
  LayoutMapping,
  MDSLayoutOptions,
  RadialLayoutOptions,
  RandomLayoutOptions,
} from '@antv/layout';
import type { GraphCore } from './data';

type BuiltInLayoutOptions =
  | CircularLayout
  | RandomLayout
  | ConcentricLayout
  | GridLayout
  | MDSLayout
  | RadialLayout
  | FruchtermanLayout
  | D3ForceLayout
  | ForceLayout
  | ForceAtlas2;

// TODO 后面可能不需要，如果手动布局直接更新数据中位置即可
export type ImmediatelyInvokedLayoutOptions = {
  /**
   * like an IIFE.
   */
  execute: (graph: GraphCore, options?: any) => Promise<LayoutMapping>;
} & Animatable &
  PresetLayoutOptions;

export type STDLayoutOptions = BuiltInLayoutOptions & Animatable & Workerized & PresetLayoutOptions;

export type LayoutOptions = STDLayoutOptions | ImmediatelyInvokedLayoutOptions;

/**
 *
 * @param options
 * @internal
 */
export function isImmediatelyInvokedLayoutOptions(options: any): options is ImmediatelyInvokedLayoutOptions {
  return !!options.execute;
}

/**
 *
 * @param options
 * @internal
 */
export function isLayoutWorkerized(options: STDLayoutOptions) {
  return (
    [
      'circular',
      'random',
      'grid',
      'mds',
      'concentric',
      'radial',
      'fruchterman',
      'fruchtermanGPU',
      'd3force',
      'force',
      'gforce',
      'forceAtlas2',
    ].indexOf(options.type) > -1
  );
}

interface CircularLayout extends CircularLayoutOptions {
  type: 'circular';
}

interface RandomLayout extends RandomLayoutOptions {
  type: 'random';
}

interface GridLayout extends GridLayoutOptions {
  type: 'grid';
}

interface MDSLayout extends MDSLayoutOptions {
  type: 'mds';
}

interface ConcentricLayout extends ConcentricLayoutOptions {
  type: 'concentric';
}

interface RadialLayout extends RadialLayoutOptions {
  type: 'radial';
}

interface FruchtermanLayout extends FruchtermanLayoutOptions {
  type: 'fruchterman' | 'fruchtermanGPU';
}

interface D3ForceLayout extends D3ForceLayoutOptions {
  type: 'd3force';
}

interface ForceLayout extends ForceLayoutOptions {
  type: 'force' | 'gforce';
}

interface ForceAtlas2 extends ForceAtlas2LayoutOptions {
  type: 'forceAtlas2';
}

type Animatable = {
  /**
   * Make layout animated. For layouts with iterations, transitions will happen between ticks.
   */
  animated?: boolean;

  /**
   * Effect timing of animation for layouts without iterations.
   * @see https://g.antv.antgroup.com/api/animation/waapi#effecttiming
   */
  animationEffectTiming?: Partial<IAnimationEffectTiming>;
};

type Workerized = {
  /**
   * Make layout running in WebWorker.
   */
  workerEnabled?: boolean;

  /**
   * Iterations for iterable layouts such as Force.
   */
  iterations?: number;
};

interface PresetLayoutOptions {
  presetLayout?: Partial<BuiltInLayoutOptions>;
}

export interface LayoutRegistry {
  [key: string]: Layout<LayoutOptions> & {
    type?: string;
  };
}
