#version 300 es
precision highp float;

uniform sampler2D u_texture;
in vec2 v_texCoord;
out vec4 outColor;

void main() {
    vec4 color = texture(u_texture, v_texCoord);
    outColor = vec4(1.0f - color.r, 1.0f - color.g, 1.0f - color.b, color.a);
}