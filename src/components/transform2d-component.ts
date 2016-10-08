// heavily based upon https://github.com/pixijs/pixi.js/blob/master/src/core/display/DisplayObject.js
import Point, {PointTemplate} from "../math/point";
import Entity from "../entity";
import TransformComponent from "./transform-component";
export interface Transform2DComponentTemplate {
    position?:PointTemplate;
    scale?:PointTemplate;
    origo?:PointTemplate;
    rotation?:number;
}

const enum ParentCache {
    x,
    y,
    scaleX,
    scaleY,
    rotation
};

export default class Transform2DComponent extends TransformComponent {
    protected _position:Point;
    protected _origo:Point;
    protected _scale:Point;
    protected _rotation:number;
    protected _rotationCache:number;
    protected _cr:number;
    protected _sr:number;
    protected _isDirty:boolean;

    private _parentCache:Array<number>;

    get parent():Transform2DComponent {
        return this._parent as Transform2DComponent;
    }
    get entity():Entity {
        return this._entity;
    }
    get position():Point {
        return this._position;
    }
    set position(value:Point) {
        this._position = value;
        this.setDirty();
    }
    get x():number {
        return this._position.x;
    }
    set x(value:number) {
        this._position.x = value;
        this.setDirty();
    }
    get y():number {
        return this._position.y;
    }
    set y(value:number) {
        this._position.y = value;
        this.setDirty();
    }
    get scale():Point {
        return this._scale;
    }
    set scale(value:Point) {
        this._scale = value;
        this.setDirty();
    }
    get scaleX():number {
        return this._scale.x;
    }
    set scaleX(value:number) {
        this._scale.x = value;
        this.setDirty();
    }
    get scaleY():number {
        return this._scale.y;
    }
    set scaleY(value:number) {
        this._scale.y = value;
        this.setDirty();
    }
    get origo():Point {
        return this._origo;
    }
    set origo(value:Point) {
        this._origo = value;
        this.setDirty();
    }
    set rotation(value:number) {
        this._rotation = value;
        this.setDirty();
    }
    get rotation():number {
        return this._rotation;
    }

    get worldX():number {
        return this._parentCache[ParentCache.x] + this._position.x;
    }
    get worldY():number {
        return this._parentCache[ParentCache.y] + this._position.y;
    }
    get worldScaleX():number {
        return this._parentCache[ParentCache.scaleX] + this._scale.x;
    }
    get worldScaleY():number {
        return this._parentCache[ParentCache.scaleY] + this._scale.y;
    }
    get worldRotation():number {
        return this._parentCache[ParentCache.rotation] + this._rotation;
    }

    get isDirty():boolean {
        return this._isDirty;
    }
    constructor(entity:Entity, template:Transform2DComponentTemplate = {}) {
        super(entity);
        this._position = template.position ? new Point(template.position.x,template.position.y) : new Point();
        this._origo = template.origo ? new Point(template.origo.x,template.origo.y) : new Point();
        this._scale = template.origo ? new Point(template.origo.x,template.origo.y) : new Point(1,1);
        this._rotation = template.rotation || 0;
        this._rotationCache = 0;
        this._parent = null;
        this._cr = 1;
        this._sr = 0;
        this._isDirty = true;

        this._parentCache = new Array<number>(5);
        for(let i = 0; i < 5; i++) {
            this._parentCache[i] = 0;
        }
    }

    public fixedUpdate() {
        if (this.parent && this.parent.isDirty) {
            this._isDirty = true;
            this._parentCache[ParentCache.x] = this.parent.worldX;
            this._parentCache[ParentCache.y] = this.parent.worldY;
            this._parentCache[ParentCache.scaleX] = this.parent.worldScaleX;
            this._parentCache[ParentCache.scaleY] = this.parent.worldScaleY;
            this._parentCache[ParentCache.rotation] = this.parent.worldRotation;
        }
        for(let i = 0, l = this._children.length; i < l; i++) {
            let child = this._children[i];
            let components = child.getEntity().getAllComponents();
            for(let i = 0; i < components.length; i++) {
                components[i].fixedUpdate();
            }
        }
        this._isDirty = false;
    }

    public update() {
        if (this.parent && this.parent.isDirty) {
            this._isDirty = true;
            this._parentCache[ParentCache.x] = this.parent.worldX;
            this._parentCache[ParentCache.y] = this.parent.worldY;
            this._parentCache[ParentCache.scaleX] = this.parent.worldScaleX;
            this._parentCache[ParentCache.scaleY] = this.parent.worldScaleY;
            this._parentCache[ParentCache.rotation] = this.parent.worldRotation;
        }
        for(let i = 0, l = this._children.length; i < l; i++) {
            let child = this._children[i];
            let components = child.getEntity().getAllComponents();
            for(let i = 0; i < components.length; i++) {
                components[i].update();
            }
        }
        this._isDirty = false;
    }

    private setDirty() {
        this._isDirty = true;
    }
}