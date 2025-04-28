const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const shapes = [];
const colors = ['#00ffff', '#ff00ff', '#f0f', '#0ff']; // Vibrant futuristic colors
const shapeTypes = ['box', 'circle', 'triangle'];

class Shape {
    constructor(type, x, y, size, color, speed) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.opacity = Math.random() * 0.5 + 0.5; // Random opacity
        this.rotation = Math.random() * Math.PI; // Random rotation
        this.rotationSpeed = (Math.random() - 0.5) * 0.01; // Slow rotation
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        if (this.y > height + this.size) {
            this.reset();
        }
    }

    draw() {
        ctx.save(); // Save current state
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2); // Translate to center
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();

        switch (this.type) {
            case 'box':
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                break;
            case 'circle':
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                break;
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(-this.size / 2, this.size / 2);
                ctx.lineTo(0, -this.size / 2);
                ctx.lineTo(this.size / 2, this.size / 2);
                ctx.closePath();
                ctx.fill();
                break;
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore(); // Restore original state
    }

    reset() {
        this.y = -this.size;
        this.x = Math.random() * width;
        this.speed = Math.random() * 2 + 0.5;
        this.size = Math.random() * 20 + 10;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.5;
    }
}

function createShape() {
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    let x = Math.random() * width;
    let y = -10;
    let size = Math.random() * 20 + 10;
    let color = colors[Math.floor(Math.random() * colors.length)];
    let speed = Math.random() * 2 + 0.5;

    shapes.push(new Shape(type, x, y, size, color, speed));
}

function update() {
    ctx.clearRect(0, 0, width, height);
    shapes.forEach(shape => {
        shape.update();
        shape.draw();
    });
    requestAnimationFrame(update);
}

for (let i = 0; i < 30; i++) {
    setTimeout(createShape, i * 100);
}

update();

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

// Interactive sections
const infoSections = document.querySelectorAll('.info-section');
infoSections.forEach(section => {
    section.addEventListener('click', () => {
        section.classList.toggle('expanded');
    });
});