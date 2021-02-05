import { SnowFlakeConfig } from '../@types/snow-flake';
export declare class SnowFlake {
    /** @ignore */
    static DEFAULT_CONFIG: SnowFlakeConfig;
    /** @ignore */
    static _flake: any;
    /**
     * configuration object for configuring
     * the diffrect aspects of each snowflake
     */
    config: SnowFlakeConfig;
    /** @ignore */
    _y: number;
    /** @ignore */
    _x: number;
    /** @ignore */
    _z: number;
    /** @ignore */
    _node: any;
    /** @ignore */
    vertical_speed: number;
    /** @ignore */
    horizontal_speed: number;
    /** @ignore */
    scale: number;
    /** call this and set configurations you need to apply to all snowflakes
     * eg:-
     *
     *  ```typescript
     * SnowFlake.config({color: white})
     * ```
     *
     * will set all snowflakes to white
     *
     * you can pass any params thats defined in the {@link SnowFlakeConfig}
     *
    */
    static config(config?: SnowFlakeConfig): void;
    /** @ignore */
    static parseSVG(): any;
    /** Creates new clone of the snowflake svg element */
    static cloneElement(): Document;
    /**
     *
     * @param options pass configuration param to tweek each flake individually
     * ```typescript
     * const red_flake = new SnowFlake({color: 'red'})
     * const yellow_flake = new SnowFlake({color:'yellow'})
     *
     * red_flake.animate()
     * yellow_flake.animate()
     * ```
     * will make two flakes one red and one yellow
     *
     */
    constructor(options?: SnowFlakeConfig);
    /**
     * resets the flake to the inital position and restart the animation
     */
    restart(): void;
    /** @ignore */
    private _init;
    /**
     * start the animation
     */
    animate(): void;
    /**
     *
     * @param color set the color for each inidividual spec
     *
     * ```
     * setColor('red')
     * setColor('#ff0000')
     * setColor('rgb(255,0,0)')
     * ```
     */
    setColor(color?: string): void;
    /** @ignore */
    private _animation_duration;
    /** @ignore */
    private _mapToZindex;
}
export declare class SnowFall {
    count: number;
    /**
     *
     * @param count set the number of specs
     */
    constructor(count?: number);
    /**
     * start the spec falling animation
     */
    start(): void;
}
