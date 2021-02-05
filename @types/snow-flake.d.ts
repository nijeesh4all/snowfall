/**
 configuration object for configuring 
 the diffrect aspects of each snowflake
*/

export type SnowFlakeConfig = {
    /** 
        svg tag for each flake, by deafult a snowflake is given
    */
    flake?: string

    /** 
        z index value for defining the paralax effect, setting it to 1 will disable the parallax, by default `20`
    */
    max_z_index?: number

    /** 
        starting position of each flake, by default it starts 30 above he screen
    */

    start_y?: number
    
    /** 
      Downwards falling speed  
    */
    vertical_speed?: number

    /** 
      sideways drifiting speed
    */
    horizontal_speed?: number

    /**
     * speed differance between the fastest falling spec and the slowest falling spec
     *  used for calculating the parallax speed
     */
    speed_delta?: number

    /**
     * percentage of scale factor for smallest spec
     */
    min_scale?: number

    /**
     * percentage of scale factor for largest spec
     */
    max_scale?: number

    /**
     * starting height for each spec in pixels, scale based on the parallax position is calculated from this, better set this is 
     * `SnowFlake.config()` for consistancy
     */
    flake_height?: number

    /**
     * starting width for each spec in pixels, scale based on the parallax position is calculated from this, better set this is 
     * `SnowFlake.config()` for consistancy
     */
    flake_width?: number

    
    /**
     * color of each spec
     */
    color?: string

    /**
     * the angle of rotation when falling
     */
    rotation?: number
}