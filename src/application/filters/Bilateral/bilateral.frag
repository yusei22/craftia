#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_texture;
uniform int u_radius;

const float sigmaColor = 0.1f; 
const float sigmaSpace = 1.5f; 

float gaussian(float x, float sigma) {
    return exp(-(x * x) / (2.0f * sigma * sigma));
}

void main() {
    vec2 onePixel = vec2(1) / vec2(textureSize(u_texture, 0));
    vec3 centerColor = texture(u_texture, v_texCoord).rgb;
    vec3 destColor = vec3(0.0f);
    float totalWeight = 0.0f;

    for(int y = -u_radius; y <= u_radius; y++) {
        for(int x = -u_radius; x <= u_radius; x++) {
            
            vec2 offset = vec2(float(y), float(x)) * onePixel;
            vec3 sampleColor = texture(u_texture, v_texCoord + offset).rgb;

            float colorWeight = gaussian(distance(centerColor, sampleColor), sigmaColor);
            float spatialWeight = gaussian(length(offset), sigmaSpace);

            float weight = colorWeight * spatialWeight;
            destColor += sampleColor * weight;
            totalWeight += weight;
        }
    }

    outColor = vec4(destColor / totalWeight, 1.0f);
}