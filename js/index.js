document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    let c = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Snow {
        constructor() {
            this.radius = Math.floor(Math.random() * 3);
            this.x = Math.floor(Math.random() * canvas.width);
            this.y = 0 - this.radius;
            this.color = "#ffffff";
            this.velocity = {
                x: Math.random() * 4 - 2,
                y: Math.random() * 4 + 2
            };
        }
        draw(c) {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = this.color;
            c.shadowColor = this.color;
            c.shadowBlur = 5;
            c.fill();
            c.closePath();
        }
        update(c) {
            this.y += this.velocity.y;
            this.x += this.velocity.x;
            if(this.y >= canvas.height - 2)
                this.velocity.y = 0
            this.draw(c);
        }
    }

    let arraySnow = [];
    function init() {
        arraySnow.push(new Snow());
        if(arraySnow.length >= 500)
            arraySnow.shift();
        console.log(arraySnow.length);
    }

    function animate() {
        window.requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        arraySnow.forEach(snow => {
            snow.update(c);
        });
        init();
    }
    animate();
});
