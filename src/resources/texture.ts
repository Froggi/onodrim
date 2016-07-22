import ResourceManager from './resource-manager'
import Rect from '../math/rect'
import WebGLRenderer from '../systems/webgl-renderer'
export default class Texture {
    image: HTMLImageElement;
    loaded:any;
    url:string;
    rect:Rect;
    glTexture:WebGLTexture;
    constructor(url:string) {
        if(ResourceManager.isImageLoaded(url)) {
            this.image = ResourceManager.getImage(url);
        }
        else {
            ResourceManager.loadImage(url);
            this.image = ResourceManager.getImage(url);
        }
        this.url = url;
        this.rect = new Rect(0,0,this.image.width, this.image.height);

        if (WebGLRenderer.gl) {
            this.initGL(WebGLRenderer.gl);
        }
    }

    initGL(gl:WebGLRenderingContext) {
        this.glTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}