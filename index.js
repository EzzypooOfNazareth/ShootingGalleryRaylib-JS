// Libraries and Constants
const r = require('raylib');
const config = require('./external/constants.js');

// Import Updates and Draws
var crosshair = require('./external/crosshair.js');
var reload = require('./external/reload.js');
var target = require('./external/target.js');

r.InitWindow(config.SCREEN_WIDTH, config.SCREEN_HEIGHT, config.SCREEN_TITLE);
r.HideCursor();

r.InitAudioDevice();

const shot = r.LoadSound(__dirname + '/audio/shoot.mp3');
const jam = r.LoadSound(__dirname + '/audio/jam.mp3');

// Global Variables
var bullets = 10;

while (!r.WindowShouldClose())
{
    // Update
    target.update(bullets);
    crosshair.update();
    reload.update();

    if (reload.reload()) {
        bullets = 10;
    }

    // Inputs
    if (r.IsMouseButtonPressed(r.MOUSE_LEFT_BUTTON)) {
        if (bullets > 0) {
            r.PlaySound(shot);
            bullets--;
        }
        else {
            r.PlaySound(jam);
        }
    }

    if (r.IsKeyPressed(r.KEY_ESCAPE)) {
        r.CloseWindow();
    }

    // Draw
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    target.draw();
    crosshair.draw();
    reload.draw();

    r.DrawText("Shooting Gallery", 10, 10, 20, r.BLACK);
    r.DrawText("Bullets: " + bullets, r.GetScreenWidth() - r.MeasureText("Bullets: XX", 20), 10, 20, r.BLACK);
    r.DrawText("Score: " + target.getScore().toFixed(0), r.GetScreenWidth()/2 - r.MeasureText("Score: XXX", 20)/2, 10, 20, r.BLACK);

    r.EndDrawing();
}

r.CloseWindow();