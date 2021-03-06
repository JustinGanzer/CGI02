precision mediump float;

//uniforms for checkboxes
uniform int dayOn;
uniform int nightOn;
uniform int cloudsOn;

// uniform lights (we only have the sun)
uniform vec3 directionalLightColor[MAX_DIR_LIGHTS];
uniform vec3 directionalLightDirection[MAX_DIR_LIGHTS];
uniform vec3 ambientLightColor[1];

// uniform material constants k_a, k_d, k_s, alpha
uniform vec3 phongDiffuseMaterial;
uniform vec3 phongSpecularMaterial;
uniform vec3 phongAmbientMaterial;
uniform float phongShininessMaterial;

// uniform sampler2D textures
uniform sampler2D daytimeTexture;
uniform sampler2D nightTexture;
uniform sampler2D cloudTexture;

// three js only supports int no bool
// if you want a boolean value in the shader, use int

// data from the vertex shader
varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
varying mat4 projectionMatrixx;

uniform float time;

vec3 phong(vec3 p, vec3 v, vec3 n, vec3 lightPos, vec3 lightColor) {

    vec3 textureDayColor = texture2D(daytimeTexture, vUv).rgb * 3.0;
    vec3 textureNightColor = texture2D(nightTexture, vUv).rgb * 1.0;
    vec3 textureCloudColor = texture2D(cloudTexture, vUv).rgb * 2.0;

//+vec2(time*0.2,0.0)
    if(dot(v,n) < 0.0) return vec3(0,0,0);
    vec3 toLight = normalize(lightPos - p);
    vec3 reflectLight = reflect(-toLight, n);
    float ndots = max( dot(toLight,n), 0.0);
    float rdotv = max( dot(reflectLight, v), 0.0);

    vec3 ambi;
    if(nightOn == 1) {
            ambi = textureNightColor * ambientLightColor[0];
            ambi = pow(ambi, vec3(0.6))*2.0;
        } else {
            ambi = phongAmbientMaterial * ambientLightColor[0];
        }


    // diffuse contribution
        vec3 diffuseCoeff = (dayOn == 1 )? textureDayColor : phongDiffuseMaterial;
    // clouds at day?
        if(cloudsOn == 1) {
            diffuseCoeff = (1.0-textureCloudColor)*diffuseCoeff + textureCloudColor*vec3(1,1,1);
        }
        // final diffuse term for daytime
        vec3 diff =  diffuseCoeff * directionalLightColor[0] * ndots;

     //ambi = ambi * ambientLightColor[0] * 5.0;
     //diff = diff * ndots * lightColor;
    vec3 spec = phongSpecularMaterial * pow(rdotv, phongShininessMaterial ) * lightColor;
    vec3 returnValue;

    if(ndots != 0.0){
    returnValue = diff + spec;
    }
    else{
    returnValue = ambi + diff + spec;
    }

    return returnValue;
}

void main() {


    // get color from different textures
    vec3 color1 = texture2D(daytimeTexture, vUv).rgb;
    vec3 color2 = texture2D(nightTexture, vUv).rgb;
    vec3 color3 = texture2D(cloudTexture, vUv).rgb;

   
    // normalize normal after projection

    vec3 ecNormal = normalize(ecNormal);
    
    // do we use a perspective or an orthogonal projection matrix?

    bool usePerspective = projectionMatrixx[2][3] != 0.0;

    // for perspective mode, the viewing direction (in eye coords) points
    // from the vertex to the origin (0,0,0) --> use -ecPosition as direction.
    // for orthogonal mode, the viewing direction is simply (0,0,1)

    vec3 v = vec3 (0.0,0.0,0.0);
    if(usePerspective){
    vec3 v = vec3 (0.0-ecPosition.x,0.0-ecPosition.y,0.0-ecPosition.z);
    }
    else{
    vec3 v = vec3 (0.0,0.0,1.0);
    }
    
    // calculate color using phong illumination
    // depending on GUI checkbox:
    // color from night texture and clouds are added to ambient term (instead of ambient material k_a)
    // color from day texture are added to diffuse term (instead of diffuse material k_d)

    // Note: the texture value might have to get rescaled (gamma corrected)
    //       e.g. color = pow(color, vec3(0.6))*2.0;
    
    // vector from light to current point
    //vec3 l = normalize(directionalLightDirection[0]);

    
    // diffuse contribution
    //vec3 diffuseCoeff = (daytimeTextureBool == 1 )? dayCol : diffuseMaterial;
    // clouds at day?
    //if(cloudsTextureBool == 1) {
    //    diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
    //}
    // final diffuse term for daytime
    //vec3 diffuse =  diffuseCoeff * directionalLightColor[0] * ndotl;

    // ambient part contains lights; modify depending on time of day
    // when ndotl == 1.0 the ambient term should be zero

    //vec3 color = ambient + diffuse + specular;


    v = (-ecPosition.xyz);

    vec3 newColor = phong(ecPosition.xyz,v,ecNormal,directionalLightDirection[0],directionalLightColor[0]);
    gl_FragColor = vec4(newColor,1.0);

}
