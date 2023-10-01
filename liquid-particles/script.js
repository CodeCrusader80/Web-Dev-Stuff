const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particles {
    constructor(effect) {
        this.effect = effect;
        this.radius = Math.floor(Math.random() * 15 + 10);
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() - 0.6;
        this.vy = Math.random() - 0.6;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 1;
    }
    draw(context) {
        const particlescolors = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        particlescolors.addColorStop(0, '#a020f0');
        particlescolors.addColorStop(0.5, '#ff9a4d');
        particlescolors.addColorStop(1, '#c0c0c0');
        ctx.fillStyle = particlescolors;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
    reform() {
        if(this.effect.mouse.pressed) {
            const dx = this.x - this.effect.mouse.x;
            const dy = this.y - this.effect.mouse.y;
            const dist = Math.hypot(dx, dy);
            const strong = (this.effect.mouse.radius / dist);
            if(dist < this.effect.mouse.radius){
                const angle = Math.atan2(dy, dx);
                this.pushX += Math.cos(angle) * strong;
                this.pushY += Math.sin(angle) * strong;
            }
        }
        this.x += (this.pushX + this.vx) * this.friction;
        this.y += (this.pushY + this.vy) * this.friction;


        if(this.x < this.radius) {
            this.x = this.radius;
            this.vx *= -1;
        } else if (this.x > this.effect.width - this.radius){
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
        }
        if(this.y < this.radius) {
            this.y = this.radius;
            this.vy *= -1;
        } else if (this.y > this.effect.height - this.radius){
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
        }
        this.pushX = 0;
        this.pushY = 0;
    }
    altered() {
        this.vx = Math.random() - 0.5;
        this.vy = Math.random() - 0.5;
    }
}

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = []
        this.number = 100;
        this.createParticles();
        this.mouse = {
            x: 0,
            y: 0,
            pressed: false,
            radius: 100
        }
    }

    createParticles() {
        for(let i = 0; i < this.number; i++) {
            this.particles.push(new Particles(this));
        }
    }
    liftParticles(context) {
        this.particlesHold(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.reform();
        });
    }
    particlesHold(context) {
        const maxDist = 100;
        for(let a = 0; a < this.particles.length; a++){
            for(let b = a; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const dist = Math.hypot(dx, dy);
                if(dist < maxDist) {
                    context.save();
                    context.globalAlpha = 1 - (dist / maxDist);
                    context.strokeStyle = '#f2f2f2';
                    context.beginPath();
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;

        this.particles.forEach(particle => {
            particle.altered();
        });
    }
}

window.addEventListener('resize', e => {
    effect.resize(e.target.window.innerWidth, e.target.window.innerHeight);
});
window.addEventListener('mousemove', e => {
    if(effect.mouse.pressed){
        effect.mouse.x = e.x;
        effect.mouse.y = e.y;
    }
});
window.addEventListener('mousedown', e => {
    effect.mouse.pressed = true;
    effect.mouse.x = e.x;
    effect.mouse.y = e.y;
});
window.addEventListener('mouseup', () => {
    effect.mouse.pressed = false;
});
window.addEventListener('touchstart', e => {
    e.preventDefault();
    effect.mouse.pressed = true;
    effect.mouse.x = e.touches[0].clientX;
    effect.mouse.y = e.touches[0].clientY;
});

window.addEventListener('touchmove', e => {
    e.preventDefault();
    if (effect.mouse.pressed) {
        effect.mouse.x = e.touches[0].clientX;
        effect.mouse.y = e.touches[0].clientY;
    }
});

window.addEventListener('touchend', () => {
    effect.mouse.pressed = false;
});


const effect = new Effect(canvas, ctx);

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    effect.liftParticles(ctx);
    requestAnimationFrame(animate)
}
animate()