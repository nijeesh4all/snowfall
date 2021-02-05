import { SnowFlakeConfig } from '../@types/snow-flake';

const SNOWFLAKE_SVG = ` <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'>
                        <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' height='100%' width='100%'
                        d='M256 32v448M313.72 80A111.47 111.47 0 01256 96a111.47 111.47 0 01-57.72-16M198.28 432a112.11 112.11 0 01115.44 0M449.99 144L62.01 368M437.27 218a112.09 112.09 0 01-57.71-100M74.73 294a112.09 112.09 0 0157.71 100M62.01 144l387.98 224M74.73 218a112.09 112.09 0 0057.71-100M437.27 294a112.09 112.09 0 00-57.71 100' />
                        </svg>`


 const default_configs:SnowFlakeConfig =  {
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

export default default_configs;