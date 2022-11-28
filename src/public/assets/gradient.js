function normalizeColor(n){return[(n>>16&255)/255,(n>>8&255)/255,(255&n)/255,]}["SCREEN","LINEAR_LIGHT"].reduce((n,t,i)=>Object.assign(n,{[t]:i}),{});class MiniGl{constructor(n,t,i,s=!1){let o=this,r=-1!==document.location.search.toLowerCase().indexOf("debug=webgl");o.canvas=n,o.gl=o.canvas.getContext("webgl",{antialias:!0}),o.meshes=[];let a=o.gl;t&&i&&this.setSize(t,i),o.lastDebugMsg,o.debug=s&&r?function(n){let t=new Date;t-o.lastDebugMsg>1e3&&console.log("---"),console.log(t.toLocaleTimeString()+Array(Math.max(0,32-n.length)).join(" ")+n+": ",...Array.from(arguments).slice(1)),o.lastDebugMsg=t}:()=>{},Object.defineProperties(o,{Material:{enumerable:!1,value:class{constructor(n,t,i={}){let s=this;function r(n,t){let i=a.createShader(n);return a.shaderSource(i,t),a.compileShader(i),a.getShaderParameter(i,a.COMPILE_STATUS)||console.error(a.getShaderInfoLog(i)),o.debug("Material.compileShaderSource",{source:t}),i}function l(n,t){return Object.entries(n).map(([n,i])=>i.getDeclaration(n,t)).join("\n")}s.uniforms=i,s.uniformInstances=[];let d="\n              precision highp float;\n            ";s.vertexSource=`
              ${d}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${l(o.commonUniforms,"vertex")}
              ${l(i,"vertex")}
              ${n}
            `,s.Source=`
              ${d}
              ${l(o.commonUniforms,"fragment")}
              ${l(i,"fragment")}
              ${t}
            `,s.vertexShader=r(a.VERTEX_SHADER,s.vertexSource),s.fragmentShader=r(a.FRAGMENT_SHADER,s.Source),s.program=a.createProgram(),a.attachShader(s.program,s.vertexShader),a.attachShader(s.program,s.fragmentShader),a.linkProgram(s.program),a.getProgramParameter(s.program,a.LINK_STATUS)||console.error(a.getProgramInfoLog(s.program)),a.useProgram(s.program),s.attachUniforms(void 0,o.commonUniforms),s.attachUniforms(void 0,s.uniforms)}attachUniforms(n,t){let i=this;void 0===n?Object.entries(t).forEach(([n,t])=>{i.attachUniforms(n,t)}):"array"==t.type?t.value.forEach((t,s)=>i.attachUniforms(`${n}[${s}]`,t)):"struct"==t.type?Object.entries(t.value).forEach(([t,s])=>i.attachUniforms(`${n}.${t}`,s)):(o.debug("Material.attachUniforms",{name:n,uniform:t}),i.uniformInstances.push({uniform:t,location:a.getUniformLocation(i.program,n)}))}}},Uniform:{enumerable:!1,value:class{constructor(n){this.type="float",Object.assign(this,n),this.typeFn=({float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"})[this.type]||"1f",this.update()}update(n){void 0!==this.value&&a[`uniform${this.typeFn}`](n,0===this.typeFn.indexOf("Matrix")?this.transpose:this.value,0===this.typeFn.indexOf("Matrix")?this.value:null)}getDeclaration(n,t,i){if(this.excludeFrom!==t){if("array"===this.type)return this.value[0].getDeclaration(n,t,this.value.length)+`
const int ${n}_length = ${this.value.length};`;if("struct"===this.type){let s=n.replace("u_","");return`uniform struct ${s=s.charAt(0).toUpperCase()+s.slice(1)} 
                                  {
`+Object.entries(this.value).map(([n,i])=>i.getDeclaration(n,t).replace(/^uniform/,"")).join("")+`
} ${n}${i>0?`[${i}]`:""};`}return`uniform ${this.type} ${n}${i>0?`[${i}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(n,t,i,s,r){a.createBuffer(),this.attributes={position:new o.Attribute({target:a.ARRAY_BUFFER,size:3}),uv:new o.Attribute({target:a.ARRAY_BUFFER,size:2}),uvNorm:new o.Attribute({target:a.ARRAY_BUFFER,size:2}),index:new o.Attribute({target:a.ELEMENT_ARRAY_BUFFER,size:3,type:a.UNSIGNED_SHORT})},this.setTopology(i,s),this.setSize(n,t,r)}setTopology(n=1,t=1){let i=this;i.xSegCount=n,i.ySegCount=t,i.vertexCount=(i.xSegCount+1)*(i.ySegCount+1),i.quadCount=i.xSegCount*i.ySegCount*2,i.attributes.uv.values=new Float32Array(2*i.vertexCount),i.attributes.uvNorm.values=new Float32Array(2*i.vertexCount),i.attributes.index.values=new Uint16Array(3*i.quadCount);for(let s=0;s<=i.ySegCount;s++)for(let r=0;r<=i.xSegCount;r++){let a=s*(i.xSegCount+1)+r;if(i.attributes.uv.values[2*a]=r/i.xSegCount,i.attributes.uv.values[2*a+1]=1-s/i.ySegCount,i.attributes.uvNorm.values[2*a]=r/i.xSegCount*2-1,i.attributes.uvNorm.values[2*a+1]=1-s/i.ySegCount*2,r<i.xSegCount&&s<i.ySegCount){let l=s*i.xSegCount+r;i.attributes.index.values[6*l]=a,i.attributes.index.values[6*l+1]=a+1+i.xSegCount,i.attributes.index.values[6*l+2]=a+1,i.attributes.index.values[6*l+3]=a+1,i.attributes.index.values[6*l+4]=a+1+i.xSegCount,i.attributes.index.values[6*l+5]=a+2+i.xSegCount}}i.attributes.uv.update(),i.attributes.uvNorm.update(),i.attributes.index.update(),o.debug("Geometry.setTopology",{uv:i.attributes.uv,uvNorm:i.attributes.uvNorm,index:i.attributes.index})}setSize(n=1,t=1,i="xz"){let s=this;s.width=n,s.height=t,s.orientation=i,s.attributes.position.values&&s.attributes.position.values.length===3*s.vertexCount||(s.attributes.position.values=new Float32Array(3*s.vertexCount));let r=-(n/2),a=-(t/2),l=n/s.xSegCount,d=t/s.ySegCount;for(let h=0;h<=s.ySegCount;h++){let c=a+h*d;for(let u=0;u<=s.xSegCount;u++){let b=r+u*l,v=h*(s.xSegCount+1)+u;s.attributes.position.values[3*v+"xyz".indexOf(i[0])]=b,s.attributes.position.values[3*v+"xyz".indexOf(i[1])]=-c}}s.attributes.position.update(),o.debug("Geometry.setSize",{position:s.attributes.position})}}},Mesh:{enumerable:!1,value:class{constructor(n,t){let i=this;i.geometry=n,i.material=t,i.wireframe=!1,i.attributeInstances=[],Object.entries(i.geometry.attributes).forEach(([n,t])=>{i.attributeInstances.push({attribute:t,location:t.attach(n,i.material.program)})}),o.meshes.push(i),o.debug("Mesh.constructor",{mesh:i})}draw(){a.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:n,location:t})=>n.update(t)),this.attributeInstances.forEach(({attribute:n,location:t})=>n.use(t)),a.drawElements(this.wireframe?a.LINES:a.TRIANGLES,this.geometry.attributes.index.values.length,a.UNSIGNED_SHORT,0)}remove(){o.meshes=o.meshes.filter(n=>n!=this)}}},Attribute:{enumerable:!1,value:class{constructor(n){this.type=a.FLOAT,this.normalized=!1,this.buffer=a.createBuffer(),Object.assign(this,n),this.update()}update(){void 0!==this.values&&(a.bindBuffer(this.target,this.buffer),a.bufferData(this.target,this.values,a.STATIC_DRAW))}attach(n,t){let i=a.getAttribLocation(t,n);return this.target===a.ARRAY_BUFFER&&(a.enableVertexAttribArray(i),a.vertexAttribPointer(i,this.size,this.type,this.normalized,0,0)),i}use(n){a.bindBuffer(this.target,this.buffer),this.target===a.ARRAY_BUFFER&&(a.enableVertexAttribArray(n),a.vertexAttribPointer(n,this.size,this.type,this.normalized,0,0))}}}});let l=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];o.commonUniforms={projectionMatrix:new o.Uniform({type:"mat4",value:l}),modelViewMatrix:new o.Uniform({type:"mat4",value:l}),resolution:new o.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new o.Uniform({type:"float",value:1})}}setSize(n=640,t=480){this.width=n,this.height=t,this.canvas.width=n,this.canvas.height=t,this.gl.viewport(0,0,n,t),this.commonUniforms.resolution.value=[n,t],this.commonUniforms.aspectRatio.value=n/t,this.debug("MiniGL.setSize",{width:n,height:t})}setOrthographicCamera(n=0,t=0,i=0,s=-2e3,o=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(s-o),0,n,t,i,1,],this.debug("setOrthographicCamera",this.commonUniforms.projectionMatrix.value)}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(n=>n.draw())}}function e(n,t,i){return t in n?Object.defineProperty(n,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[t]=i,n}class Gradient{constructor(...n){e(this,"el",void 0),e(this,"cssVarRetries",0),e(this,"maxCssVarRetries",200),e(this,"angle",0),e(this,"RenderizadoClass",!1),e(this,"isScrolling",!1),e(this,"scrollingTimeout",void 0),e(this,"scrollingRefreshDelay",200),e(this,"isIntersecting",!1),e(this,"shaderFiles",void 0),e(this,"vertexShader",void 0),e(this,"sectionColors",void 0),e(this,"computedCanvasStyle",void 0),e(this,"conf",void 0),e(this,"uniforms",void 0),e(this,"t",1253106),e(this,"last",0),e(this,"width",void 0),e(this,"minWidth",1111),e(this,"height",600),e(this,"xSegCount",void 0),e(this,"ySegCount",void 0),e(this,"mesh",void 0),e(this,"material",void 0),e(this,"geometry",void 0),e(this,"minigl",void 0),e(this,"scrollObserver",void 0),e(this,"amp",320),e(this,"seed",5),e(this,"freqX",14e-5),e(this,"freqY",29e-5),e(this,"freqDelta",1e-5),e(this,"activeColors",[1,1,1,1]),e(this,"isMetaKey",!1),e(this,"isGradientLegendVisible",!1),e(this,"isMouseDown",!1),e(this,"handleScroll",()=>{clearTimeout(this.scrollingTimeout),this.scrollingTimeout=setTimeout(this.handleScrollEnd,this.scrollingRefreshDelay),this.isGradientLegendVisible&&this.hideGradientLegend(),this.conf.playing&&(this.isScrolling=!0,this.pause()),console.info("Cargando tiempo del degradado")}),e(this,"handleScrollEnd",()=>{this.isScrolling=!1,this.isIntersecting&&this.play()}),e(this,"resize",()=>{this.width=window.innerWidth,this.minigl.setSize(this.width,this.height),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}),e(this,"handleMouseDown",n=>{this.isGradientLegendVisible&&(this.isMetaKey=n.metaKey,this.isMouseDown=!0,!1===this.conf.playing&&requestAnimationFrame(this.animate))}),e(this,"handleMouseUp",()=>{this.isMouseDown=!1}),e(this,"animate",n=>{if(!this.shouldSkipFrame(n)||this.isMouseDown){if(this.t+=Math.min(n-this.last,1e3/15),this.last=n,this.isMouseDown){let t=160;this.isMetaKey&&(t=-160),this.t+=t}this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render()}if(0!==this.last&&this.isStatic)return this.minigl.render(),void this.disconnect();(this.conf.playing||this.isMouseDown)&&requestAnimationFrame(this.animate)}),e(this,"addRenderizadoClass",()=>{this.RenderizadoClass||(this.RenderizadoClass=!0,this.el.classList.add("Renderizado"),setTimeout(()=>{this.el.parentElement.classList.add("Renderizado")},3e3))}),e(this,"pause",()=>{this.conf.playing=!1}),e(this,"play",()=>{requestAnimationFrame(this.animate),this.conf.playing=!0}),e(this,"initGradient",n=>(this.el=document.querySelector(n),this.connect(),this))}async connect(){this.shaderFiles={vertex:"varying vec3 v_color;\n\nvoid main() {\n  float time = u_time * u_global.noiseSpeed;\n\n  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;\n\n  vec2 st = 1. - uvNorm.xy;\n\n  //\n  // Tilting the plane\n  //\n\n  // Front-to-back tilt\n  float tilt = resolution.y / 2.0 * uvNorm.y;\n\n  // Left-to-right angle\n  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;\n\n  // Up-down shift to offset incline\n  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);\n\n  //\n  // Vertex noise\n  //\n\n  float noise = snoise(vec3(\n    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,\n    noiseCoord.y * u_vertDeform.noiseFreq.y,\n    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed\n  )) * u_vertDeform.noiseAmp;\n\n  // Fade noise to zero at edges\n  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);\n\n  // Clamp to 0\n  noise = max(0.0, noise);\n\n  vec3 pos = vec3(\n    position.x,\n    position.y + tilt + incline + noise - offset,\n    position.z\n  );\n\n  //\n  // Vertex color, to be passed to fragment shader\n  //\n\n  if (u_active_colors[0] == 1.) {\n    v_color = u_baseColor;\n  }\n\n  for (int i = 0; i < u_waveLayers_length; i++) {\n    if (u_active_colors[i + 1] == 1.) {\n      WaveLayers layer = u_waveLayers[i];\n\n      float noise = smoothstep(\n        layer.noiseFloor,\n        layer.noiseCeil,\n        snoise(vec3(\n          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,\n          noiseCoord.y * layer.noiseFreq.y,\n          time * layer.noiseSpeed + layer.noiseSeed\n        )) / 2.0 + 0.5\n      );\n\n      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));\n    }\n  }\n\n  //\n  // Finish\n  //\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}",noise:"//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : stegu\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//               https://github.com/stegu/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n{\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n}",blend:"//\n// https://github.com/jamieowen/glsl-blend\n//\n\n// Normal\n\nvec3 blendNormal(vec3 base, vec3 blend) {\n	return blend;\n}\n\nvec3 blendNormal(vec3 base, vec3 blend, float opacity) {\n	return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Screen\n\nfloat blendScreen(float base, float blend) {\n	return 1.0-((1.0-base)*(1.0-blend));\n}\n\nvec3 blendScreen(vec3 base, vec3 blend) {\n	return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));\n}\n\nvec3 blendScreen(vec3 base, vec3 blend, float opacity) {\n	return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Multiply\n\nvec3 blendMultiply(vec3 base, vec3 blend) {\n	return base*blend;\n}\n\nvec3 blendMultiply(vec3 base, vec3 blend, float opacity) {\n	return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Overlay\n\nfloat blendOverlay(float base, float blend) {\n	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));\n}\n\nvec3 blendOverlay(vec3 base, vec3 blend) {\n	return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));\n}\n\nvec3 blendOverlay(vec3 base, vec3 blend, float opacity) {\n	return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Hard light\n\nvec3 blendHardLight(vec3 base, vec3 blend) {\n	return blendOverlay(blend,base);\n}\n\nvec3 blendHardLight(vec3 base, vec3 blend, float opacity) {\n	return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Soft light\n\nfloat blendSoftLight(float base, float blend) {\n	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));\n}\n\nvec3 blendSoftLight(vec3 base, vec3 blend) {\n	return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));\n}\n\nvec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {\n	return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Color dodge\n\nfloat blendColorDodge(float base, float blend) {\n	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);\n}\n\nvec3 blendColorDodge(vec3 base, vec3 blend) {\n	return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));\n}\n\nvec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {\n	return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Color burn\n\nfloat blendColorBurn(float base, float blend) {\n	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);\n}\n\nvec3 blendColorBurn(vec3 base, vec3 blend) {\n	return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));\n}\n\nvec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {\n	return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Vivid Light\n\nfloat blendVividLight(float base, float blend) {\n	return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));\n}\n\nvec3 blendVividLight(vec3 base, vec3 blend) {\n	return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));\n}\n\nvec3 blendVividLight(vec3 base, vec3 blend, float opacity) {\n	return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Lighten\n\nfloat blendLighten(float base, float blend) {\n	return max(blend,base);\n}\n\nvec3 blendLighten(vec3 base, vec3 blend) {\n	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));\n}\n\nvec3 blendLighten(vec3 base, vec3 blend, float opacity) {\n	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Linear burn\n\nfloat blendLinearBurn(float base, float blend) {\n	// Note : Same implementation as BlendSubtractf\n	return max(base+blend-1.0,0.0);\n}\n\nvec3 blendLinearBurn(vec3 base, vec3 blend) {\n	// Note : Same implementation as BlendSubtract\n	return max(base+blend-vec3(1.0),vec3(0.0));\n}\n\nvec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {\n	return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Linear dodge\n\nfloat blendLinearDodge(float base, float blend) {\n	// Note : Same implementation as BlendAddf\n	return min(base+blend,1.0);\n}\n\nvec3 blendLinearDodge(vec3 base, vec3 blend) {\n	// Note : Same implementation as BlendAdd\n	return min(base+blend,vec3(1.0));\n}\n\nvec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {\n	return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Linear light\n\nfloat blendLinearLight(float base, float blend) {\n	return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));\n}\n\nvec3 blendLinearLight(vec3 base, vec3 blend) {\n	return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));\n}\n\nvec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {\n	return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));\n}",fragment:"varying vec3 v_color;\n\nvoid main() {\n  vec3 color = v_color;\n  if (u_darken_top == 1.0) {\n    vec2 st = gl_FragCoord.xy/resolution.xy;\n    color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;\n  }\n  gl_FragColor = vec4(color, 1.0);\n}"},this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},document.querySelectorAll("canvas").length<1?console.log("DID NOT LOAD HERO STRIPE CANVAS"):(this.minigl=new MiniGl(this.el,null,null,!0),requestAnimationFrame(()=>{this.el&&(this.computedCanvasStyle=getComputedStyle(this.el),this.waitForCssVars())}))}disconnect(){this.scrollObserver&&(window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("keydown",this.handleKeyDown),this.scrollObserver.disconnect()),window.removeEventListener("resize",this.resize)}initMaterial(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:10}),u_darken_top:new this.minigl.Uniform({value:""===this.el.dataset.jsDarkenTop?1:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let n=1;n<this.sectionColors.length;n+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[n],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+n/this.sectionColors.length,3+n/this.sectionColors.length,],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*n}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*n}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*n}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*n})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex,].join("\n\n"),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}shouldSkipFrame(n){return!!window.document.hidden||!this.conf.playing||parseInt(n,10)%2==0||void 0}updateFrequency(n){this.freqX+=n,this.freqY+=n}toggleColor(n){this.activeColors[n]=0===this.activeColors[n]?1:0}showGradientLegend(){this.width>this.minWidth&&(this.isGradientLegendVisible=!0,document.body.classList.add("isGradientLegendVisible"))}hideGradientLegend(){this.isGradientLegendVisible=!1,document.body.classList.remove("isGradientLegendVisible")}init(){this.initGradientColors(),this.initMesh(),this.resize(),requestAnimationFrame(this.animate),window.addEventListener("resize",this.resize)}waitForCssVars(){if(this.computedCanvasStyle&&-1!==this.computedCanvasStyle.getPropertyValue("--gradient-color-1").indexOf("#"))this.init(),this.addRenderizadoClass();else{if(this.cssVarRetries+=1,this.cssVarRetries>this.maxCssVarRetries)return this.sectionColors=[16711680,16711680,16711935,65280,255],void this.init();requestAnimationFrame(()=>this.waitForCssVars())}}initGradientColors(){this.sectionColors=["--gradient-color-1","--gradient-color-2","--gradient-color-3","--gradient-color-4",].map(n=>{let t=this.computedCanvasStyle.getPropertyValue(n).trim();if(4===t.length){let i=t.substr(1).split("").map(n=>n+n).join("");t=`#${i}`}return t&&`0x${t.substr(1)}`}).filter(Boolean).map(normalizeColor)}}