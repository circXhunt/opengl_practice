#version 330 core
layout (triangles) in;
layout (triangle_strip, max_vertices = 3) out;

in VS_OUT {
    vec2 TexCoords;
    vec3 Normal;
    vec3 FragPos;  
} gs_in[];

out vec2 TexCoords; 
out vec3 Normal;
out vec3 FragPos;

uniform float time;



vec3 GetNormal()
{
   vec3 a = vec3(gl_in[0].gl_Position) - vec3(gl_in[1].gl_Position);
   vec3 b = vec3(gl_in[2].gl_Position) - vec3(gl_in[1].gl_Position);
   return normalize(cross(a, b));
}
vec4 explode(vec4 position, vec3 normal)
{
    float magnitude = 2.0;
    vec3 direction = normal * ((sin(time) + 1.0) / 2.0) * magnitude; 
    return position + vec4(direction, 0.0);
}
void main() {    
    vec3 normal = GetNormal();

    //gl_Position = explode(gl_in[0].gl_Position, normal);
    gl_Position = gl_in[0].gl_Position;
    TexCoords = gs_in[0].TexCoords;
    Normal = gs_in[0].Normal;
    FragPos = gs_in[0].FragPos;
    EmitVertex();
    //gl_Position = explode(gl_in[1].gl_Position, normal);
    gl_Position = gl_in[1].gl_Position;
    TexCoords = gs_in[1].TexCoords;
    Normal = gs_in[1].Normal;
    FragPos = gs_in[1].FragPos;
    EmitVertex();
    //gl_Position = explode(gl_in[2].gl_Position, normal);
    gl_Position = gl_in[2].gl_Position;
    TexCoords = gs_in[2].TexCoords;
    Normal = gs_in[2].Normal;
    FragPos = gs_in[2].FragPos;
    EmitVertex();
    EndPrimitive();
}