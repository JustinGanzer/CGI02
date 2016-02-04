uniform sampler2D explosionTex;
uniform float colorScale;

varying float noise;
//varying 

float position;

void main() {

    // noise values can be negative / we need to use its absolute values
    // our noise values might also not be in the full range between 0-1
    // add a scale (brightness) value that is controlled by a uniform variable
    position = noise * colorScale;

    // our goal is to access a color in our texture (explosion.png)
    // therefore we need a texture (uv) coordinate (vec2) that accesses a
    // value in the texture

    vec2 positionTex = vec2( 0.0, 1.0-colorScale*noise);
    vec4 color = texture2D( explosionTex, positionTex );

    // a small noise value should access a dark value in the texture
    // a high noise value should return a light value



    gl_FragColor = vec4( noise , noise , noise, 1.0 );

}
	