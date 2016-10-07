import * as Onodrim from "onodrim";
export default class MyScene extends Onodrim.Scene {
    constructor() {
        super();
        let entity = new Onodrim.Entity();
        entity.addComponent(new Onodrim.Components.TransformComponent(entity));
        let sprite = new Onodrim.Components.SpriteComponent(entity, {
            alpha: 1,
            offset: new Onodrim.Math.Point(0.5, 0.5),
            x: 0,
            y: 0
        });
        entity.addComponent(sprite);
        sprite.setTexture(new Onodrim.Resources.Texture("assets/tile.png"), );
        let transform = entity.getComponent(Onodrim.Components.TransformComponent);
        transform.x = 200;
        transform.y = 10;
        this.addEntity(entity);

        entity = new Onodrim.Entity();
        entity.addComponent(new Onodrim.Components.TransformComponent(entity));
        sprite = new Onodrim.Components.SpriteComponent(entity, {
            alpha: 1,
            offset: new Onodrim.Math.Point(0.5, 0.5),
            x: 0,
            y: 0,
            depth: -1
        });
        entity.addComponent(sprite);
        sprite.setTexture(new Onodrim.Resources.Texture("assets/square.png"), );
        transform = entity.getComponent(Onodrim.Components.TransformComponent);
        transform.x = 200;
        transform.y = 0;
        transform.scaleX = 0.5;
        transform.scaleY = 0.5;

        let entity2 = new Onodrim.Entity();
        entity.addComponent(new Onodrim.Components.TransformComponent(entity));
        let sprite2 = Onodrim.Components.AnimationComponent.CreateFromRect(entity2,{
            texture: new Onodrim.Resources.Texture('assets/SlimeA.png'),
            autoStart: true,
            fps: 24
        }, new Onodrim.Math.Rect(0, 0, 16, 16));
        entity2.addComponent(sprite2);
        sprite2.offset = new Onodrim.Math.Point(0.5, 0.5);
        transform = entity.getComponent(Onodrim.Components.TransformComponent);
        transform.x = 400;
        transform.y = 100;
        this.addEntity(entity);

        let entity3 = new Onodrim.Entity();
        entity3.addComponent(new Onodrim.Components.TransformComponent(entity3));
        entity3.addComponent(new Onodrim.Graphics.ParticleComponent(entity3, {
            system:new ImplParticleSystem()
        }));
        this.addEntity(entity3);
        entity3.getComponent(Onodrim.Graphics.ParticleComponent).system.start();
        //let ps = new ImplParticleSystem();
        //this.addEntity(ps);
        //ps.start();
    }
}
Onodrim.Resources.ResourceManager.loadImages([
    'assets/star.png',
    'assets/SlimeA.png',
    'assets/square.png',
    'assets/tile.png'
]).then((value) => {
    let core:Onodrim.Core;
    let scene:Onodrim.Scene;
    core = new Onodrim.Core();
    scene = new MyScene();
    Onodrim.Scene.ChangeScene(scene);
    core.start();
});


const fireRate:number = 0.05;
class ImplParticleSystem extends Onodrim.Graphics.ParticleSystem {
    public delta:number;
    private _timer: number;
    private _particlesLeft:number;
    constructor() {
        super();
        this._particlesLeft = 100000;
        this._timer = 0;
    }
    public fixedUpdate() {
        super.fixedUpdate();
        this._timer += Onodrim.Time.deltaTime;
    }
    protected _shouldFireParticle() {
        return this._timer >= fireRate && this._particlesLeft > 0;
    }
    protected _fireParticle() {
        super._fireParticle();
        this._timer-=fireRate;
        this._particlesLeft--;
    }
    protected _shouldStop():boolean {
        return this._particlesLeft <= 0;
    }
    protected _setParticleType() {
        this._particleConstructor = ImplParticle;
    }
}

const lifeTime = 2;
class ImplParticle extends Onodrim.Graphics.Particle {
    public velocity: Onodrim.Math.Vector2;
    public time: number;
    public sprite:Onodrim.Components.SpriteComponent;
    constructor() {
        super();
        this.sprite = this.renderComponent as Onodrim.Components.SpriteComponent;
        this.sprite.setTexture(new Onodrim.Resources.Texture('assets/square.png'))
        this.sprite.offset.x = this.sprite.offset.y = 0.5;
        this.transform.scale = new Onodrim.Math.Point(0.025, 0.025);
        this.velocity = new Onodrim.Math.Vector2(0, 0);
    }

    public init(owner: Onodrim.Graphics.ParticleSystem) {
        super.init(owner);
        let dir = (Math.random()*Math.PI*2);
        this.velocity.x = Math.cos(dir);
        this.velocity.y = Math.sin(dir);
        this.time = 0;

    }
    public fixedUpdate(): boolean {
        this.transform.x += this.velocity.x;
        this.transform.y += this.velocity.y;
        this.velocity.y += Onodrim.Time.deltaTime;
        this.time += Onodrim.Time.deltaTime;
        this.sprite.alpha = 1 - (this.time / lifeTime);
        return super.fixedUpdate();
    }

    protected _isAlive(): boolean {
        return (this.time < lifeTime);
    }
}