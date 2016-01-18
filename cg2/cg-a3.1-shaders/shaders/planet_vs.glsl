precision mediump float;

varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;

uniform float time;
uniform sampler2D topoTexture;

void main() {
vUv=uv;
    vec4 RGB = texture2D( topoTexture, vUv );
    float h = RGB.r*0.3+1.0;
    vec4 ecPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 ecNormal = normalize(normal);
    gl_Position = projectionMatrix *modelViewMatrix * vec4(position*h,1.0);

}

