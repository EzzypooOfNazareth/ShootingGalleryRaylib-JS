const r = require('raylib');

// Initialized positions
var crosshair = {
    left: {
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 0
        }
    },
    top: {
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 0
        }
    },
    right: {
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 0
        }
    },
    bottom: {
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 0
        }
    }
}

module.exports = {
    update: function crosshairsUpdate() {
        crosshair = {
            left: {
                start: {
                    x: 0,
                    y: r.GetMouseY()
                },
                end: {
                    x: r.GetMouseX(),
                    y: r.GetMouseY()
                }
            },
            top: {
                start: {
                    x: r.GetMouseX(),
                    y: 0
                },
                end: {
                    x: r.GetMouseX(),
                    y: r.GetMouseY()
                }
            },
            right: {
                start: {
                    x: r.GetScreenWidth(),
                    y: r.GetMouseY()
                },
                end: {
                    x: r.GetMouseX(),
                    y: r.GetMouseY()
                }
            },
            bottom: {
                start: {
                    x: r.GetMouseX(),
                    y: r.GetScreenHeight()
                },
                end: {
                    x: r.GetMouseX(),
                    y: r.GetMouseY()
                }
            }
        }
    },
    draw: function crosshairsDraw() {
        r.DrawLine(crosshair.left.start.x, crosshair.left.start.y, crosshair.left.end.x, crosshair.left.end.y, r.BLACK);
        r.DrawLine(crosshair.top.start.x, crosshair.top.start.y, crosshair.top.end.x, crosshair.top.end.y, r.BLACK);
        r.DrawLine(crosshair.right.start.x, crosshair.right.start.y, crosshair.right.end.x, crosshair.right.end.y, r.BLACK);
        r.DrawLine(crosshair.bottom.start.x, crosshair.bottom.start.y, crosshair.bottom.end.x, crosshair.bottom.end.y, r.BLACK);
    }
}