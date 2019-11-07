export function createButton(game, x, y, image, width, height, cb) {
    let button = game.add.button(x, y, image, cb, game);

    button.width = width;
    button.height = height;

    return button;
}
