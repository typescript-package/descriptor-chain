// Abstract.
import { DescriptorChainBase } from './descriptor-chain-base.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
/**
 * @description The class representing a chain of property descriptors.
 * @export
 * @abstract
 * @class DescriptorChain
 * @template [O=any] The type of the object that the property descriptors are associated with.
 * @template {keyof O} [K=keyof O] The type of the property name in the object.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value accessed by the property.
 * @template {boolean} [A=boolean] The type of active property.
 * @template {boolean} [N=boolean] The type of enabled property.
 * @template {boolean} [C=boolean] The type of configurable property.
 * @template {boolean} [E=boolean] The type of enumerable property.
 * @template {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} [D=WrappedPropertyDescriptor<O, K, V, A, N, C, E, any>] The type of wrapped property descriptor.
 * @extends {DescriptorChainBase<O, K, V, A, N, C, E, D>}
 */
export class DescriptorChain<
  // Object.
  O = any,
  // Key.
  K extends keyof O = keyof O,
  // Value.
  V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
  // Active.
  A extends boolean = boolean,
  // Enabled.
  N extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  // Descriptor
  D extends WrappedPropertyDescriptor<O, K, V, A, N, C, E, D> = WrappedPropertyDescriptor<O, K, V, A, N, C, E, any>,
> extends DescriptorChainBase<O, K, V, A, N, C, E, D> {
  /**
   * @inheritdoc
   */
  public add(descriptor: D): this {
    super.data.push(descriptor);
    return this;
  }
}
