const r = require('raylib');
const path = require('path');

const reloadSound = r.LoadSound(path.join(__dirname, '../audio/reload.mp3'));
const jamSound = r.LoadSound(path.join(__dirname, '../audio/jam.mp3'));

var reloadState = 0;
var rand = 0;
var a_counter = 0;
var a_state = 'inc';

var frameCounter = 0;

// Container Rectangle
var container_pos = {
    x: r.GetMouseX(),
    y: r.GetMouseY() - 30,
    width: 100,
    height: 30
}
var container_dest = {
    x: container_pos.width / 2,
    y: container_pos.height / 2
}
var container_color = r.BLACK;

// Checkbox Rectangle
var c_pos = {
    x: (container_pos.x - (container_pos.width/2 + 25/2)) + rand,
    y: container_pos.y,
    width: 25,
    height: 30
}
var c_dest = {
    x: c_pos.width / 2,
    y: c_pos.height / 2
}
var c_color = r.MAROON;

// Actionbox Rectangle
var a_pos = {
    x: 0,
    y: 0,
    width: 10,
    height: 30
}
var a_dest = {
    x: a_pos.width / 2,
    y: a_pos.height / 2
}
var a_color = r.GOLD;

module.exports = {
    update: function reloadUpdate() {
        if (reloadState === 0) {
            if (r.IsKeyPressed(r.KEY_R)) {
                reloadState = 1;
            }
        }

        else if (reloadState === 1) {
            a_color = r.GOLD;

            rand = Math.floor(Math.random() * (container_pos.width - c_pos.width)) + 1;
            reloadState = 2;
        }
        else if (reloadState === 2) {
            if (r.IsKeyPressed(r.KEY_R)) {
                reloadState = 3;
            }

            if (a_state === 'inc') {
                if (a_counter <= (container_pos.width - a_pos.width)) {
                    a_counter += 1 * r.GetFrameTime() * 200;
                }
                else {
                    a_state = 'dec';
                }
            }
            else if (a_state === 'dec') {
                if (a_counter >= 0) {
                    a_counter -= 1 * r.GetFrameTime() * 200;
                }
                else {
                    a_state = 'inc';
                }
            }
        }
        else if (reloadState === 3) {
            checkPos();
        }
        else if (reloadState === 4) {
            r.PlaySound(reloadSound);

            frameCounter += r.GetFrameTime() * 2;

            if (frameCounter > 3) {
                frameCounter = 0;
                reloadState = 0;
            }

            if (Math.floor(frameCounter) % 2 == 1)
            {
                a_color = r.GOLD;
            }
            else {
                a_color = r.GREEN;
            }
        }
        else if (reloadState === 5) {
            r.PlaySound(jamSound);

            frameCounter += r.GetFrameTime() * 2;

            if (frameCounter > 2) {
                frameCounter = 0;
                reloadState = 0;
            }

            a_color = r.RED;
        }

        // Position Updates
        container_pos.x = r.GetMouseX();
        container_pos.y = r.GetMouseY() - 30;

        c_pos.x = ((container_pos.x - container_pos.width/2) + c_pos.width/2) + rand;
        c_pos.y = container_pos.y

        a_pos.x = ((container_pos.x - container_pos.width/2) + a_pos.width/2) + a_counter;
        a_pos.y = container_pos.y;
    },
    draw: function reloadDraw() {
        if (reloadState >= 2) {
            r.DrawRectanglePro(container_pos, container_dest, 0, container_color);
            r.DrawRectanglePro(c_pos, c_dest, 0, c_color);
            r.DrawRectanglePro(a_pos, a_dest, 0, a_color);
        }
    },
    reload: function reload() {
        if (reloadState === 4) {
            return true;
        }
        else {
            return false;
        }
    }
}

function checkPos() {
    if (getLength(c_pos.x, a_pos.x) < (c_pos.width/2)) {
        reloadState = 4;
    }
    else {
        reloadState = 5;
    }

    console.log(getLength(c_pos.x, a_pos.x));
    console.log(reloadState);
}

function getLength(x1, x2) {
    return Math.abs(x2 - x1);
}