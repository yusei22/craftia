#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_texture;
uniform float u_threshold;
uniform int u_radius;

void main() {
    float kernelLength = (float(u_radius) * 2.0f + 1.0f) * (float(u_radius) * 2.0f + 1.0f);

    vec2 onePixel = vec2(1) / vec2(textureSize(u_texture, 0));
    vec3 destColor = vec3(0.0f);
    float totalWeight = 0.0f;

    for(int y = -u_radius; y <= u_radius; y++) {
        for(int x = -u_radius; x <= u_radius; x++) {

            vec2 offset = vec2(float(x), float(y)) * onePixel;
            vec3 sampleColor = texture(u_texture, v_texCoord + offset).rgb;
            float weight = offset == vec2(0.0f) ? 1.0f + (kernelLength - 1.0f) * u_threshold / kernelLength : -u_threshold / kernelLength;

            totalWeight += weight;
            destColor += sampleColor * weight;
        }
    }

    outColor = vec4((destColor / totalWeight).rgb, texture(u_texture, v_texCoord).a);
}
