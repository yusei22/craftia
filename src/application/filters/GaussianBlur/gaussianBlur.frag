#version 300 es
precision highp float;

const float M_PI = 3.141592653589793f;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_texture;
uniform int u_radius;
uniform bool u_horizontal;
uniform float u_sigma;

float gaussian(float x, float sigma) {
    return exp(-0.5f * (x * x) / (sigma * sigma)) / (sigma * sqrt(2.0f * M_PI));
}

void main() {

    vec2 onePixel = vec2(1) / vec2(textureSize(u_texture, 0));
    vec4 destColor = vec4(0.0f);
    float totalWeight = 0.0f;

    for(int x = -u_radius; x <= u_radius; x++) {

        vec2 offset = u_horizontal ? vec2(float(x), float(0)) * onePixel : vec2(float(0), float(x)) * onePixel;

        vec4 sampleColor = texture(u_texture, v_texCoord + offset);

        float weight = gaussian(float(x), u_sigma);

        destColor += sampleColor * weight;
        totalWeight += weight;
    }

    outColor = vec4(destColor / totalWeight);
}