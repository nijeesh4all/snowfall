import { SnowFlakeConfig } from '../@types/snow-flake';

const random_between = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const map = (value: number, start1: number, stop1: number, start2: number, stop2: number): number => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

const random_color = (): string => Math.floor(Math.random() * 16777215).toString(16)

const SNOWFLAKE_SVG = ` <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'>
                        <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' height='100%' width='100%'
                        d='M256 32v448M313.72 80A111.47 111.47 0 01256 96a111.47 111.47 0 01-57.72-16M198.28 432a112.11 112.11 0 01115.44 0M449.99 144L62.01 368M437.27 218a112.09 112.09 0 01-57.71-100M74.73 294a112.09 112.09 0 0157.71 100M62.01 144l387.98 224M74.73 218a112.09 112.09 0 0057.71-100M437.27 294a112.09 112.09 0 00-57.71 100' />
                        </svg>`

const default_configs: SnowFlakeConfig = {
    flake: SNOWFLAKE_SVG,
    max_z_index: 20,
    start_y: -30,
    vertical_speed: 150,
    horizontal_speed: 75,
    speed_delta: 100,
    min_scale: 0.4,
    max_scale: 1.6,
    flake_height: 25,
    flake_width: 25,
    color: 'white',
    rotation: 90
}

export class SnowFlake {

    static DEFAULT_CONFIG: SnowFlakeConfig = default_configs;
    static _flake: any = null;

    config: SnowFlakeConfig;

    _y: number;
    _x: number;
    _z: number;

    _node: any
    vertical_speed: number;
    horizontal_speed: number;
    scale: number;



    static config(config = {}) {
        this.DEFAULT_CONFIG = Object.assign(this.DEFAULT_CONFIG, config)
    }

    static parseSVG() {
        if (!this._flake) {
            this._flake = new DOMParser().parseFromString(SnowFlake.DEFAULT_CONFIG.flake, 'text/xml').children[0]
        }

        return this._flake
    }

    static cloneElement() {
        return SnowFlake.parseSVG().cloneNode(true)
    }

    constructor(options:SnowFlakeConfig = {}) {
        this.config = Object.assign(SnowFlake.DEFAULT_CONFIG, options)

        this._y = this.config.start_y
        this._z = random_between(1, this.config.max_z_index)

        this._node = SnowFlake.cloneElement()

        debugger

        this.vertical_speed = this._mapToZindex(this.config.vertical_speed - this.config.speed_delta, this.config.vertical_speed)
        this.horizontal_speed = this._mapToZindex(this.config.horizontal_speed - this.config.speed_delta, this.config.horizontal_speed)

        this.scale = this._mapToZindex(this.config.min_scale, this.config.max_scale)
        this._node.style.position = 'fixed'
        this._init()
    }

    restart() {
        this._init()
        this.animate()
    }

    _init() {
        this._x = random_between(-this.horizontal_speed, document.body.offsetWidth)
        this._node.style.top = `${this._y}px`
        this._node.style.left = `${this._x}px`
        this._node.style.transform = `scale(${this.scale}, ${this.scale})`
        this._node.style.width = `${this.config.flake_width}px`
        this._node.style.height = `${this.config.flake_height}px`
        this.setColor()
    }

    animate() {
        const x_delta = 2
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

    setColor(color?: string) {
        color = color || this.config.color
        this._node.style.color = color == 'random' ? random_color() : color
    }

    append() {
        document.body.append(this._node)
    }

    _animation_duration(): number {
        return (window.innerHeight / this.vertical_speed) * 1000
    }

    _mapToZindex(start: number, end: number): number {
        return map(this._z, 1, this.config.max_z_index, start, end)
    }
}

export class SnowFall {
    count: number;

    constructor(count = 100) {
        this.count = count
    }

    start() {
        for (let i = 0; i < this.count; i++) {
            const flake = new SnowFlake()
            // @ts-ignore
            flake.append(window.document.body)
            flake.animate()
        }
    }
}