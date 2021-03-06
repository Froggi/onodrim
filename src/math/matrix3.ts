// heavily based upon https://github.com/pixijs/pixi.js/blob/master/src/core/math/Matrix.js
import Rect from './rect';
export const enum Value {
    a=0, b=1,   // empty
    c=3, d=4,   // empty
    tx=6, ty=7, // empty
}
export default class Matrix {
    public static identity:Matrix = new Matrix();
    public static count:number = 9;
    public static makeTranslation(tx:number, ty:number):Matrix {
        return new Matrix([
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1
        ]);
    }
    public static makeRotation(rotation:number):Matrix {
        const c = Math.cos(rotation);
        const s = Math.sin(rotation);
        return new Matrix([
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        ]);
    }
    public static makeScale(sx:number, sy:number):Matrix {
        return new Matrix([
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ]);
    }
    public static multiply(a:Matrix, b:Matrix):Matrix {
        const a00 = a.values[0*3+0];
        const a01 = a.values[0*3+1];
        const a02 = a.values[0*3+2];
        const a10 = a.values[1*3+0];
        const a11 = a.values[1*3+1];
        const a12 = a.values[1*3+2];
        const a20 = a.values[2*3+0];
        const a21 = a.values[2*3+1];
        const a22 = a.values[2*3+2];
        const b00 = b.values[0*3+0];
        const b01 = b.values[0*3+1];
        const b02 = b.values[0*3+2];
        const b10 = b.values[1*3+0];
        const b11 = b.values[1*3+1];
        const b12 = b.values[1*3+2];
        const b20 = b.values[2*3+0];
        const b21 = b.values[2*3+1];
        const b22 = b.values[2*3+2];
        return new Matrix([
            a00 * b00 + a01 * b10 + a02 * b20,
            a00 * b01 + a01 * b11 + a02 * b21,
            a00 * b02 + a01 * b12 + a02 * b22,
            a10 * b00 + a11 * b10 + a12 * b20,
            a10 * b01 + a11 * b11 + a12 * b21,
            a10 * b02 + a11 * b12 + a12 * b22,
            a20 * b00 + a21 * b10 + a22 * b20,
            a20 * b01 + a21 * b11 + a22 * b21,
            a20 * b02 + a21 * b12 + a22 * b22
        ]);
    }
    private static tmp:Matrix = new Matrix();

    public values:Float32Array;

    constructor(values?:number[]) {
        if (values) {
            this.values = new Float32Array(values);
        }
        else {
            this.values = new Float32Array([
                1,0,0,
                0,1,0,
                0,0,1
            ]);
        }

    }
    public identity():Matrix {
        return this.set(
            1,0,0,
            0,1,0,
            0,0,1
        );
    }
    public set(a:number,b:number,c:number,d:number,e:number,f:number,g:number,tx:number,ty:number) {
        this.values[0] = a;
        this.values[1] = b;
        this.values[2] = c;
        this.values[3] = d;
        this.values[4] = e;
        this.values[5] = f;
        this.values[6] = g;
        this.values[7] = tx;
        this.values[8] = ty;
        return this;
    }

    public copy(matrix:Matrix) {
        this.values[0] = matrix.values[0];
        this.values[1] = matrix.values[1];
        this.values[2] = matrix.values[2];
        this.values[3] = matrix.values[3];
        this.values[4] = matrix.values[4];
        this.values[5] = matrix.values[5];
        this.values[6] = matrix.values[6];
        this.values[7] = matrix.values[7];
        this.values[8] = matrix.values[8];
        return this;
    }

    public multiply(b:Matrix):Matrix {
        const a00 = this.values[0*3+0];
        const a01 = this.values[0*3+1];
        const a02 = this.values[0*3+2];
        const a10 = this.values[1*3+0];
        const a11 = this.values[1*3+1];
        const a12 = this.values[1*3+2];
        const a20 = this.values[2*3+0];
        const a21 = this.values[2*3+1];
        const a22 = this.values[2*3+2];
        const b00 = b.values[0*3+0];
        const b01 = b.values[0*3+1];
        const b02 = b.values[0*3+2];
        const b10 = b.values[1*3+0];
        const b11 = b.values[1*3+1];
        const b12 = b.values[1*3+2];
        const b20 = b.values[2*3+0];
        const b21 = b.values[2*3+1];
        const b22 = b.values[2*3+2];
        this.set(
            a00 * b00 + a01 * b10 + a02 * b20,
            a00 * b01 + a01 * b11 + a02 * b21,
            a00 * b02 + a01 * b12 + a02 * b22,
            a10 * b00 + a11 * b10 + a12 * b20,
            a10 * b01 + a11 * b11 + a12 * b21,
            a10 * b02 + a11 * b12 + a12 * b22,
            a20 * b00 + a21 * b10 + a22 * b20,
            a20 * b01 + a21 * b11 + a22 * b21,
            a20 * b02 + a21 * b12 + a22 * b22
        );
        return this;
    }

    public scale(x:number, y:number): Matrix {
        Matrix.tmp.set(
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        );
        return this.multiply(Matrix.tmp);
    }

    public rotate(rotation:number):Matrix {
        const s = Math.sin(rotation);
        const c = Math.cos(rotation);
        Matrix.tmp.set(
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        );
        return this.multiply(Matrix.tmp);
    }

    public translate(x:number,y:number):Matrix {
        Matrix.tmp.set(
            1, 0, 0,
            0, 1, 0,
            x, y, 1
        );
        return this.multiply(Matrix.tmp);
    }

    public equals(matrix:Matrix) {
        return (
            this.values[0] === matrix.values[0] &&
            this.values[1] === matrix.values[1] &&
            this.values[2] === matrix.values[2] &&
            this.values[3] === matrix.values[3] &&
            this.values[4] === matrix.values[4] &&
            this.values[5] === matrix.values[5] &&
            this.values[6] === matrix.values[6] &&
            this.values[7] === matrix.values[7] &&
            this.values[8] === matrix.values[8]
        );
    }

    public toVertexData() {
        const a = this.values[0];
        const b = this.values[1];
        const c = this.values[3];
        const d = this.values[4];
        const tx = this.values[6];
        const ty = this.values[7];
        const vertexData = new Float32Array(8);

        const w0 = 1;       // should be texture width
        const w1 = -1;

        const h0 = 1;
        const h1 = -1;

        let i = -1;
        // top left
        vertexData[++i] = (a * w1) + (c * h1) + tx;
        vertexData[++i] = (d * h1) + (b * w1) + ty;

        // top right
        vertexData[++i] = (a * w0) + (c * h1) + tx;
        vertexData[++i] = (d * h1) + (b * w0) + ty;

         // bottom right
        vertexData[++i] = (a * w0) + (c * h0) + tx;
        vertexData[++i] = (d * h0) + (b * w0) + ty;

        // bottom left
        vertexData[++i] = (a * w1) + (c * h0) + tx;
        vertexData[++i] = (d * h0) + (b * w1) + ty;

        return vertexData;
    }

    public setVertexData(target:Float32Array, offset:number, size:Rect) {
        const a = this.values[0];
        const b = this.values[1];
        const c = this.values[3];
        const d = this.values[4];
        const tx = this.values[6];
        const ty = this.values[7];

        // should calculate from pixels to on screen coordinates
        const w0 = size.w * 0.5;
        const w1 = size.w * -0.5;

        const h0 = size.h * 0.5;
        const h1 = size.h * -0.5;

        let i = -1;
        // top left
        target[offset + ++i] = (a * w1) + (c * h1) + tx;
        target[offset + ++i] = (d * h1) + (b * w1) + ty;

        // top right
        target[offset + ++i] = (a * w0) + (c * h1) + tx;
        target[offset + ++i] = (d * h1) + (b * w0) + ty;

         // bottom right
        target[offset + ++i] = (a * w0) + (c * h0) + tx;
        target[offset + ++i] = (d * h0) + (b * w0) + ty;

        // bottom left
        target[offset + ++i] = (a * w1) + (c * h0) + tx;
        target[offset + ++i] = (d * h0) + (b * w1) + ty;
    }
}
