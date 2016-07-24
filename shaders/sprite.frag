precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;
uniform vec4 u_color;
uniform vec4 u_texCoordOffset;
uniform float u_alpha;

void main(void) {
    vec4 sample = texture2D(u_image, u_texCoordOffset.xy + (v_texCoord * u_texCoordOffset.zw));
    gl_FragColor = vec4(sample.xyz, sample.a * u_alpha);
    //gl_FragColor = u_color;
}