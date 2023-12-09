#version 300 es
precision highp float;

#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

uniform sampler2D u_texture;
uniform sampler2D u_tone;
uniform float u_threshold_1;
uniform float u_threshold_2;

in vec2 v_texCoord;
out vec4 outColor;

const vec3 monochromeScale = vec3(R_LUMINANCE, G_LUMINANCE, B_LUMINANCE);

void main() {
    vec4 color = texture(u_texture, v_texCoord);
    float grayColor = dot(color.rgb, monochromeScale);

    if(grayColor > u_threshold_1) {
        outColor = vec4(vec3(1.0f), color.a);
        return;
    }

    if(grayColor > u_threshold_2) {
        outColor = texture(u_tone, v_texCoord);
        return;
    }
    
    outColor = vec4(vec3(0.0f), color.a);
}