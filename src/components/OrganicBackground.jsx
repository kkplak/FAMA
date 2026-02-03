import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const OrganicBackground = () => {
  const meshRef = useRef();
  const { size } = useThree();
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));

  // Track mouse position (optional)
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - event.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Initialize uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  );

  // Update resolution on resize
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uResolution.value.set(
        size.width,
        size.height,
      );
    }
  }, [size]);

  // Animation loop
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
      meshRef.current.material.uniforms.uMouse.value.lerp(
        mouseRef.current,
        0.02,
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export default OrganicBackground;
// ========================================
// Vertex Shader
// ========================================
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// ========================================
// Fragment Shader
// ========================================
const fragmentShader = `
  precision highp float;
  
  // === UNIFORMS ===
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  
  // === TUNABLE PARAMETERS ===
  #define SPEED 0.3            // Animation speed multiplier
  #define WARP_STRENGTH 0.2    // UV warping intensity (reduced for smoother curves)
  #define BLOB_SCALE 0.1       // Size of gradient blob
  #define VIGNETTE_STRENGTH 0.0 // Edge darkening intensity (0.0 - 1.0)
  #define GRAIN_STRENGTH 0.025   // Film grain intensity (subtle, no lines)
  #define BLUR_ITERATIONS 1     // Smoothing passes (higher = softer)
  #define CURVE_FREQUENCY 2.0  // Frequency of the curved waves
  
  // === COLOR PALETTE ===
  // Deep navy/blue -> teal/cyan -> warm yellow -> orange/red
  const vec3 COLOR_1 = vec3(0.00, 0.00, 0.0);  // Deep navy (almost black)
  const vec3 COLOR_2 = vec3(0.05, 0.15, 0.35);  // Navy blue
  const vec3 COLOR_3 = vec3(0.1, 0.5, 0.6);     // Teal/cyan
  const vec3 COLOR_4 = vec3(0.9, 0.7, 0.2);     // Warm yellow
  const vec3 COLOR_5 = vec3(1.0, 0.4, 0.15);    // Orange/red 
  
  
  // ========================================
  // 2D VALUE NOISE (Lightweight)
  // ========================================
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // Smoothstep interpolation
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  // ========================================
  // FRACTIONAL BROWNIAN MOTION (FBM)
  // ========================================
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    // 3 octaves for performance
    for(int i = 0; i < 3; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    
    return value;
  }
  
  // ========================================
  // GRADIENT FIELD (Animated curves)
  // ========================================
  float gradientField(vec2 uv, float time) {
    // Create smooth flowing curves using sine waves
    float curve1 = sin(uv.x * CURVE_FREQUENCY + time * SPEED * 0.5) * 0.5;
    float curve2 = sin(uv.y * CURVE_FREQUENCY * 0.8 - time * SPEED * 0.3) * 0.3;
    float curve3 = sin((uv.x - uv.y) * CURVE_FREQUENCY * 0.6 + time * SPEED * 0.4) * 0.4;
    
    // Base diagonal gradient with curves (normalized to reasonable range)
    float diagonal = (uv.x + uv.y) * 0.3 + curve1 + curve2 + curve3;
    
    // Add subtle organic variation with noise
    vec2 warpUV = uv + vec2(time * SPEED * 0.3, time * SPEED * 0.2);
    float warp1 = fbm(warpUV * BLOB_SCALE);
    
    vec2 warpUV2 = uv + vec2(-time * SPEED * 0.25, time * SPEED * 0.35);
    float warp2 = fbm((warpUV2 + vec2(5.0, 2.5)) * BLOB_SCALE * 1.3);
    
    // Combine curves with subtle noise warping
    float field = diagonal + (warp1 - 0.5) * WARP_STRENGTH + (warp2 - 0.5) * WARP_STRENGTH * 0.5;
    
    // Add breathing/pulsing motion
    field += sin(time * SPEED * 0.5) * 0.1;
    
    return field;
  }
  
  // ========================================
  // COLOR MAPPING (Smooth gradient stops)
  // ========================================
  vec3 mapColor(float t) {
    t = clamp(t, 0.0, 1.0);
    
    // Compress the range for yellow/orange even more (0.85-1.0)
    // Black -> Navy -> Teal takes up most space (0-0.85)
    // Yellow -> Orange only in very high peaks (0.85-1.0)
    vec3 color;
    
    if (t < 0.35) {
      // COLOR_1 -> COLOR_2 (wider range)
      float blend = smoothstep(0.0, 0.35, t);
      color = mix(COLOR_1, COLOR_2, blend);
    } else if (t < 0.7) {
      // COLOR_2 -> COLOR_3 (wider range)
      float blend = smoothstep(0.35, 0.7, t);
      color = mix(COLOR_2, COLOR_3, blend);
    } else if (t < 0.9) {
      // COLOR_3 -> COLOR_4 (narrow range)
      float blend = smoothstep(0.7, 0.9, t);
      color = mix(COLOR_3, COLOR_4, blend);
    } else {
      // COLOR_4 -> COLOR_5 (very narrow range)
      float blend = smoothstep(0.9, 1.0, t);
      color = mix(COLOR_4, COLOR_5, blend);
    }
    
    return color;
  }
  
  // ========================================
  // VIGNETTE EFFECT
  // ========================================
  float vignette(vec2 uv) {
    uv = uv * 2.0 - 1.0; // Center coordinates
    float dist = length(uv);
    return smoothstep(1.0, 0.3, dist);
  }
  
  // ========================================
  // FILM GRAIN / NOISE
  // ========================================
  float grain(vec2 uv, float time) {
    // Better hash function to avoid patterns/lines
    vec2 p = uv * 0.5 + fract(time * 0.3);
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
  }
  
  // ========================================
  // MAIN
  // ========================================
  void main() {
    // Aspect-corrected UV coordinates (centered)
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUV = (uv - 0.5) * vec2(aspect, 1.0);
    
    // Generate gradient field
    float field = gradientField(centeredUV, uTime);
    
    // Additional blur/smoothing by sampling nearby positions
    float blurredField = field;
    float blurRadius = 0.08;
    for(int i = 0; i < BLUR_ITERATIONS; i++) {
      float angle = float(i) * 2.094; // ~120 degrees
      vec2 offset = vec2(cos(angle), sin(angle)) * blurRadius;
      blurredField += gradientField(centeredUV + offset, uTime);
    }
    blurredField /= float(BLUR_ITERATIONS + 1);
    
    // Apply power function to create concentrated peaks with black base
    // This creates sharp falloff - mostly black with concentrated color clusters
    float normalized = blurredField * 0.4 + 0.5; // Normalize to 0-1 range
    normalized = clamp(normalized, 0.0, 1.0);
    float t = pow(normalized, 2.5); // Power function creates concentration
    vec3 color = mapColor(t);
    
    // Apply vignette
    float vig = mix(1.0, vignette(uv), VIGNETTE_STRENGTH);
    color *= vig;
    
    // Add subtle film grain (dithering to prevent banding)
    float grainValue = grain(uv * uResolution, uTime) * GRAIN_STRENGTH;
    color += grainValue;
    
    // Keep in linear color space (Three.js handles sRGB conversion)
    gl_FragColor = vec4(color, 1.0);
  }
`;
