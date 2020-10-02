const r = require('raylib');
const path = require('path');

const ding = r.LoadSound(path.join(__dirname, '../audio/ding.mp3'));

var targetState = 0;
var score = 0;

var target_pos = {
    x: 0,
    y: 0
}

module.exports = {
    update: function targetUpdate(b) {
        if (targetState === 0) {
            randomPos();
            targetState++;
        }

        if (r.IsMouseButtonPressed(r.MOUSE_LEFT_BUTTON)) {
            if (checkDistance() < 45 && b > 0) {
                score += Math.ceil(10 * (1/checkDistance()));
                r.PlaySound(ding);
                randomPos();
            }
        }
    },
    draw: function targetDraw() {
        r.DrawCircleV(target_pos, 45, r.RED);
        r.DrawCircleV(target_pos, 35, r.WHITE);
        r.DrawCircleV(target_pos, 25, r.RED);
        r.DrawCircleV(target_pos, 15, r.WHITE);
        r.DrawCircleV(target_pos, 5, r.RED);
    },
    getScore: function getScore() {
        return score;
    }
}

function randomPos() {
    target_pos.x = Math.floor((Math.random() * ((r.GetScreenWidth() - 50) - 100))) + 1;
    target_pos.y = Math.floor((Math.random() * ((r.GetScreenHeight() - 50) - 100))) + 1;
}

function checkDistance() {
    return Math.abs(Math.sqrt(Math.pow(target_pos.x - r.GetMouseX(), 2) + Math.pow(target_pos.y - r.GetMouseY(), 2)));
}