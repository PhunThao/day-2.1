let balloons = [];
let distractionChance = 0.3;
let distractionLinks = [
  "https://archive.org/details/the-pillow-book/page/n4/mode/1up",
  "https://www.crescentmall.com.vn/tenants/ovs",
  "https://s3.amazonaws.com/giin-web-assets/iris/assets/files/guidance/2019-12-12_IRIS-HT-Data%20Collection_R5.pdf",
  "https://genius.com/Lola-young-messy-lyrics",
  "https://nhipcaudautu.vn/phong-cach-song/di-tim-gia-tri-cho-cong-dong-lgbt-3357185/",
  "https://matca.vn/khoa-hoc-nhiep-anh-nang-cao-cung-jamie-maxtone-graham/",
  "https://tuoitre.vn/co-gi-o-mang-den-thien-duong-hong-ma-ca-ngan-du-khach-ve-tham-20231231183607197.htm" ,
  "https://thienvu.com.vn/tuyen-tap-100-bai-hat-karaoke-nhac-tre-hay-thinh-hanh-nhat", "https://www.vinmec.com/vie/bai-viet/dau-day-kinh-chan-phai-dieu-tri-nao-vi", "https://www.vinmec.com/vie/bai-viet/dau-day-kinh-chan-phai-dieu-tri-nao-vi", "https://www.google.com/search?kgmid=/m/07ydljn&hl=vi-VN&q=L%C6%B0+M%E1%BA%ABn+San&shndl=17&source=sh/x/kp/osrp/m5/4&kgs=a6e07bbf100b0670"
  
];

function setup() {
  createCanvas(800, 600); // Create a canvas of size 800x600
  background(0); // Set background to black
  for (let i = 0; i < 10; i++) {
    balloons.push(new Balloon(random(width), random(height), random(-2, 2), random(-2, 2)));
  }
  setInterval(addBalloon, 2000); // Add a new balloon every 2 seconds
}

function draw() {
  background(0); // Keep the background black
  for (let balloon of balloons) {
    balloon.move(); // Move balloons
    balloon.display(); // Display balloons
  }
}

function mousePressed() {
  for (let i = balloons.length - 1; i >= 0; i--) {
    if (balloons[i].isClicked(mouseX, mouseY)) {
      if (random() < distractionChance) {
        let selectedLinks = [];
        for (let j = 0; j < 3; j++) {
          selectedLinks.push(random(distractionLinks));
        }
        
        // Open links in a new tab if pop-ups are allowed
        selectedLinks.forEach(link => {
          let newTab = window.open(link, "_blank");
          if (!newTab) {
            window.open(link, "_blank");
          }
        });
      }
      balloons.splice(i, 1); // Remove balloon when clicked
      break;
    }
  }
}

function addBalloon() {
  balloons.push(new Balloon(random(width), random(height), random(-2, 2), random(-2, 2))); // Continuously add balloons
}

class Balloon {
  constructor(x, y, speedX, speedY) {
    this.x = x; // X position
    this.y = y; // Y position
    this.speedX = speedX; // Horizontal speed
    this.speedY = speedY; // Vertical speed
    this.size = 50; // Balloon size
    this.color = color(255, 255, 255, 200); // White balloon with transparency
  }

  move() {
    this.x += this.speedX; // Move horizontally
    this.y += this.speedY; // Move vertically
    if (this.x > width || this.x < 0) {
      this.speedX *= -1; // Bounce off horizontal edges
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1; // Bounce off vertical edges
    }
  }

  display() {
    fill(this.color); // Set fill color
    stroke(255); // White stroke to enhance visibility
    strokeWeight(2);
    ellipse(this.x, this.y, this.size, this.size); // Draw the balloon
    
    // Add a subtle highlight effect for a realistic look
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(this.x - this.size / 4, this.y - this.size / 4, this.size / 4, this.size / 4);
  }

  isClicked(px, py) {
    let d = dist(px, py, this.x, this.y); // Calculate distance from click to balloon
    return d < this.size / 2; // Check if inside balloon
  }
}