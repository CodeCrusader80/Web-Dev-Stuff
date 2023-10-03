void main(){
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.);
    gl_PointSize = size*5. * (1. / - mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
}