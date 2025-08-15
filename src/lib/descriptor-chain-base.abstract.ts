// Abstract.
import { DescriptorChainCore } from './descriptor-chain-core.abstract';
// Class.
import { Descriptor } from '@typescript-package/descriptor';
// Type.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
/**
 * @description The base abstraction class representing a chain of property descriptors.
 * @export
 * @abstract
 * @class DescriptorChainBase
 * @template [O=any] The type of the object that the property descriptors are associated with.
 * @template {keyof O} [K=keyof O] The type of the property name in the object.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value accessed by the property.
 * @template {boolean} [A=boolean] The type of active property.
 * @template {boolean} [N=boolean] The type of enabled property.
 * @template {boolean} [C=boolean] The type of configurable property.
 * @template {boolean} [E=boolean] The type of enumerable property.
 * @template {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} [D=WrappedPropertyDescriptor<O, K, V, A, N, C, E, any>] The type of wrapped property descriptor.
 * @extends {DescriptorChainCore<O, K, V, A, N, C, E, D>}
 */
export abstract class DescriptorChainBase<
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
> extends DescriptorChainCore<O, K, V, A, N, C, E, D> {
  /**
   * @inheritdoc
   */
  get active(): A {
    return this.#active;
  }

  /**
   * @inheritdoc
   */
  get current(): D {
    return this.#data[this.currentIndex];
  }

  /**
   * @inheritdoc
   */
  get currentIndex(): number {
    return this.#currentIndex;
  }

  /**
   * @inheritdoc
   */
  protected get data(): D[] {
    return this.#data;
  }

  /**
   * @inheritdoc
   */
  protected get descriptor() {
    return this.#descriptor;
  }

  /**
   * @inheritdoc
   */
  get enabled(): N {
    return this.#enabled;
  }

  /**
   * @inheritdoc
   */
  get key(): K {
    return this.#key;
  }

  /**
   * @inheritdoc
   */
  get lastIndex(): number {
    return this.#data.length - 1;
  }

  /**
   * @inheritdoc
   */
  get nextIndex(): number | undefined {
    return typeof this.currentIndex === 'number' ? this.currentIndex + 1 : undefined;
  }

  /**
   * @inheritdoc
   */
  get object(): O {
    return this.#object;
  }

  /**
   * @inheritdoc
   */
  get next(): D | undefined {
    return typeof this.nextIndex === 'number' ? this.#data[this.nextIndex] : undefined;
  }

  /**
   * @inheritdoc
   */
  get previous(): D | undefined {
    return typeof this.previousIndex === 'number' ? this.#data[this.previousIndex] : undefined;
  }

  /**
   * @inheritdoc
   */
  get previousIndex(): number | undefined {
    return typeof this.currentIndex === 'number' ? this.currentIndex - 1 : undefined;
  }

  /**
   * @inheritdoc
   */
  get size(): number {
    return this.#data.length
  }

  /**
   * @description
   * @type {A}
   */
  #active: A = true as A;

  /**
   * @description 
   * @type {new (
   *     object: O,
   *     key: K,
   *     attributes: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
   *   ) => D}
   */
  #descriptor: new (
    object: O,
    key: K,
    attributes: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
  ) => D;

  /**
   * @description Privately stored enabled state.
   * @type {N}
   */
  #enabled: N = true as N;

  /**
   * @description
   * @type {number}
   */
  #currentIndex: number = 0;

  /**
   * @description
   * @type {D[]}
   */
  #data: D[] = new Array<D>();

  /**
   * @description
   * @type {K}
   */
  #key: K;

  /**
   * @description
   * @type {O}
   */
  #object: O;
  
  /**
   * Creates an instance of `DescriptorChainBase` child class.
   * @constructor
   * @param {O} object The object containing the property.
   * @param {K} key The key of the property.
   * @param {new (
   *       object: O,
   *       key: K,
   *       attributes: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
   *     ) => D} descriptor 
   */
  constructor(
    object: O,
    key: K,
    descriptor: new (
      object: O,
      key: K,
      attributes: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
    ) => D
  ) {
    super();
    this.#descriptor = descriptor;
    this.#key = key;
    this.#object = object;
  }

  /**
   * @inheritdoc
   */
  public activate(): this {
    this.#active = true as A;
    return this;
  }

  /**
   * @inheritdoc
   */
  public clear(): this {
    this.#data.length = 0;
    return this;
  }

  /**
   * @inheritdoc
   */
  public delete(index: number): this {
    this.#data.splice(index, 1);
    return this;
  }

  /**
   * @inheritdoc
   */
  public deactivate(): this {
    this.#active = false as A;
    return this;
  }

  /**
   * @inheritdoc
   */
  public disable(): this {
    this.#enabled = false as N;
    return this;
  }

  /**
   * @inheritdoc
   */
  public enable(): this {
    this.#enabled = true as N;
    return this;
  }

  /**
   * @inheritdoc
   */
  public entries(): IterableIterator<[number, D]> {
    return this.#data.entries();
  }

  /**
   * @inheritdoc
   */
  public first(): D {
    return this.#data[0];
  }

  /**
   * @inheritdoc
   */
  public get(index: number): D {
    return this.#data[index];
  }

  /**
   * @inheritdoc
   */
  public has(index: number): boolean {
    return index >= 0 && index < this.#data.length;
  }

  /**
   * @inheritdoc
   */
  public last(): D {
    return this.#data[this.lastIndex] as D;
  }

  /**
   * @inheritdoc
   */
  public load(): this {
    const descriptor = Descriptor.fromProperty(
      this.#object,
      this.#key
    ) as D;
    if (descriptor) {
      this.add(descriptor);
    } else {
      throw new Error(`Descriptor not found for key: ${String(this.#key)}`);
    }
    return this;
  }

  /**
   * @inheritdoc
   */
  public set(index: number, value: D): this {
    this.#data[index] = value;
    return this;
  }
  
  /**
   * @inheritdoc
   */
  public setCurrentIndex(index: number): this {
    this.#currentIndex = index;
    return this;
  }

  /**
   * @inheritdoc
   */
  public update(index: number, value: D): this {
    this.#data[index] = {
      ...this.#data[index],
      ...value
    };
    return this;
  }

  /**
   * @inheritdoc
   */
  public values(): IterableIterator<D> {
    return this.#data.values();
  }
}
