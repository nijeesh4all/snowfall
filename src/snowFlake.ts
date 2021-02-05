import { SnowFlakeConfig } from '../@types/snow-flake';

const default_configs = require('./default-configs')


const random_between = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const map = (value: number, start1: number, stop1: number, start2: number, stop2: number): number => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

const random_color = (): string => Math.floor(Math.random() * 16777215).toString(16)



export class SnowFlake {

    /** @ignore */
    static DEFAULT_CONFIG: SnowFlakeConfig = default_configs.default;
    
    /** @ignore */
    static _flake: any = null;

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
    _node: any

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

    static config(config:SnowFlakeConfig = {}) {
        this.DEFAULT_CONFIG = Object.assign(this.DEFAULT_CONFIG, config)
    }

    /** @ignore */
    static parseSVG() {
        if (!this._flake) {
            this._flake = new DOMParser().parseFromString(SnowFlake.DEFAULT_CONFIG.flake, 'text/xml').children[0]
        }

        return this._flake
    }


    /** Creates new clone of the snowflake svg element */
    static cloneElement():Document {
        return SnowFlake.parseSVG().cloneNode(true)
    }

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
    constructor(options: SnowFlakeConfig = {}) {
        this.config = Object.assign(SnowFlake.DEFAULT_CONFIG, options)

        this._y = this.config.start_y
        this._z = random_between(1, this.config.max_z_index)

        this._node = SnowFlake.cloneElement()

        console.log(this._node)

        this.vertical_speed = this._mapToZindex(this.config.vertical_speed - this.config.speed_delta, this.config.vertical_speed)
        this.horizontal_speed = this._mapToZindex(this.config.horizontal_speed - this.config.speed_delta, this.config.horizontal_speed)

        this.scale = this._mapToZindex(this.config.min_scale, this.config.max_scale)
        this._node.style.position = 'fixed'
        this._init()

        document.body.append(this._node)
    }

    /**
     * resets the flake to the inital position and restart the animation
     */

    restart() {
        this._init()
        this.animate()
    }

    /** @ignore */
    private _init() {
        this._x = random_between(-this.horizontal_speed, document.body.offsetWidth)
        this._node.style.top = `${this._y}px`
        this._node.style.left = `${this._x}px`
        this._node.style.transform = `scale(${this.scale}, ${this.scale})`
        this._node.style.width = `${this.config.flake_width}px`
        this._node.style.height = `${this.config.flake_height}px`
        this.setColor()
    }

    /**
     * start the animation
     */

    animate() {
        const v_animation: Animation = this._node.animate(
            {
                transform: `translate(${random_between(0, this.horizontal_speed)}px,${window.innerHeight + 50}px) rotate(${random_between(0, this.config.rotation)}deg)
                            `
            },
            {
                duration: this._animation_duration(), iterations: 1, delay: random_between(0, 2000)
            }
        )

        v_animation.onfinish = ((_this) => {
            return () => {
                _this.restart()
            }
        })(this)

    }

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

    setColor(color?: string) {
        color = color || this.config.color
        this._node.style.color = color == 'random' ? random_color() : color
    }

    /** @ignore */
    private _animation_duration(): number {
        return (window.innerHeight / this.vertical_speed) * 1000
    }

    /** @ignore */
    private _mapToZindex(start: number, end: number): number {
        return map(this._z, 1, this.config.max_z_index, start, end)
    }
}

export class SnowFall {
    count: number;

    /**
     * 
     * @param count set the number of specs
     */
    constructor(count = 100) {
        this.count = count
    }

    /**
     * start the spec falling animation
     */
    start() {
        for (let i = 0; i < this.count; i++) {
            const flake = new SnowFlake()
            flake.animate()
        }
    }
}