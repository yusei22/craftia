#version 300 es
precision highp float;

#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

uniform sampler2D u_texture;
uniform float u_lateralKernel[9];
uniform float u_verticalKernel[9];
uniform vec3 u_lineColor ;

in vec2 v_texCoord;
out vec4 outColor;

const vec3 monochromeScale = vec3(R_LUMINANCE, G_LUMINANCE, B_LUMINANCE);

vec3 grayColoor(vec3 color) {
    float grayColor = dot(color.rgb, monochromeScale);
    return vec3(grayColor);
}

vec3 lateralColor() {
    vec2 onePixel = vec2(1) / vec2(textureSize(u_texture, 0));
    vec3 destColor = vec3(0.0f);

    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(-1, -1)).rgb) * u_lateralKernel[0];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(0, -1)).rgb) * u_lateralKernel[1];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(1, -1)).rgb) * u_lateralKernel[2];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(-1, 0)).rgb) * u_lateralKernel[3];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(0, 0)).rgb) * u_lateralKernel[4];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(1, 0)).rgb) * u_lateralKernel[5];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(-1, 1)).rgb) * u_lateralKernel[6];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(0, 1)).rgb) * u_lateralKernel[7];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(1, 1)).rgb) * u_lateralKernel[8];
    return destColor;
}
vec3 verticalColor() {
    vec2 onePixel = vec2(1) / vec2(textureSize(u_texture, 0));
    vec3 destColor = vec3(0.0f);
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(-1, -1)).rgb) * u_verticalKernel[0];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(0, -1)).rgb) * u_verticalKernel[1];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(1, -1)).rgb) * u_verticalKernel[2];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(-1, 0)).rgb) * u_verticalKernel[3];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(0, 0)).rgb) * u_verticalKernel[4];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(1, 0)).rgb) * u_verticalKernel[5];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(-1, 1)).rgb) * u_verticalKernel[6];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(0, 1)).rgb) * u_verticalKernel[7];
    destColor += grayColoor(texture(u_texture, v_texCoord + onePixel * vec2(1, 1)).rgb) * u_verticalKernel[8];
    return destColor;
}
void main() {
    vec3 verticalColor = verticalColor();
    vec3 lateralColor = lateralColor();
    vec3 edge = verticalColor + lateralColor / 2.0f;
    float alpha = (edge.r + edge.g + edge.b) / 3.0f;
    outColor = vec4(u_lineColor * alpha, alpha);
}