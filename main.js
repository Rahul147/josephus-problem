const soldiers = [];
const numberOfSoldiers = 3;
let currentIndex = 0;
let prevIndex = 0;
let slider;

const getNextUserIndex = (currentIndex) => (++currentIndex) % numberOfSoldiers;


function setup() {
    createCanvas(400, 400);
    textSize(20);
    frameRate(5);
    const r = 150;
    const theta = 360 / numberOfSoldiers;
    strokeWeight(8)
    for (let i = 1; i <= numberOfSoldiers; i++) {
        const x = height / 2 + r * cos(radians(theta * i));
        const y = width / 2 + r * sin(radians(theta * i));
        const soldier = new Soldier(x, y, i - 1);
        soldiers.push(soldier);
    }
}

function draw() {
    background(220);
    soldiers.forEach(soldier => soldier.show());
    if (Soldier.numberOfAliveSoldiers === 1) {
        const aliveSoldier = soldiers.find((soldier) => soldier.isAlive);
        console.log(`Soldier number ${aliveSoldier.index + 1} lives`);
        return noLoop();
    }

    prevIndex = currentIndex;
    currentIndex = getNextUserIndex(currentIndex);

    while (!soldiers[currentIndex].isAlive) {
        currentIndex = getNextUserIndex(currentIndex);
    }

    console.log(`Soldier number ${prevIndex + 1} kills Soldier number ${currentIndex + 1}`);

    soldiers[prevIndex].kill(soldiers[currentIndex])

    while (!soldiers[currentIndex].isAlive) {
        currentIndex = getNextUserIndex(currentIndex);
    }
}
