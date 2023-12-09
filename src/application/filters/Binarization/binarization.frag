#version 300 es
precision highp float;

#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

uniform sampler2D u_texture;
uniform float u_threshold;

in vec2 v_texCoord;
out vec4 outColor;

const vec3 monochromeScale = vec3(R_LUMINANCE, G_LUMINANCE, B_LUMINANCE);

void main() {
    vec4 color = texture(u_texture, v_texCoord);
    float grayColor = dot(color.rgb, monochromeScale);

    outColor = vec4(vec3(grayColor > u_threshold ? 1.0f : 0.0f), color.a);
}