const paintingShape = {
    square: (painting) => ({
        height: painting.height / Math.sqrt(500),
        width: painting.width / Math.sqrt(500),
    }),
    tall: (painting) => ({
        height: painting.height / 50,
        width: painting.width / 10,
    }),
    wide: (painting) => ({
        height: painting.height / 10,
        width: painting.width / 50,
    }),
};

const maxStrokes = 500;

const generateRandomBrushstroke = (painting, color, order) => {
    let sizes = {
        height: 25,
        width: 20,
    };

    if (Math.max(painting.height, painting.width) / Math.min(painting.height, painting.width) < 1.25) {
        sizes = paintingShape.square(painting);
    } else if (painting.height > painting.width) {
        sizes = paintingShape.tall(painting);
    } else {
        sizes = paintingShape.wide(painting);
    }

    return {
        fromX: Math.floor(Math.random() * painting.width || 0),
        fromY: Math.floor(Math.random() * painting.height || 0),
        toX: Math.floor(Math.random() * painting.width || 0),
        toY: Math.floor(Math.random() * painting.height || 0),
        color,
        width: sizes.height,
        order,
    }
};

const generateDimensionalBrushstrokes = (painting, color, index) => {
    const widths = [
        (painting.height * 6) / 21,
        (painting.height * 5) / 21,
        (painting.height * 4) / 21,
        (painting.height * 3) / 21,
        (painting.height * 2) / 21,
        (painting.height * 1) / 21,
    ];

    let fromY = 0;
    for (let i = 5; i > index; i--) {
        fromY = fromY + widths[i];
    }
    // starts from center, not from 0
    fromY = fromY + (widths[index] / 2);

    const stats = {
        fromX: 0,
        toX: painting.width,
        fromY: Math.floor(fromY),
        toY: Math.floor(fromY),
        color,
        width: Math.floor(widths[index]),
        order: 6 - index,
    };

    return stats;
};

export const getRandomBrushstrokes = (painting, colors) => {
    let sizes = {
        height: 25,
        width: 20,
    };

    if (Math.max(painting.height, painting.width) / Math.min(painting.height, painting.width) < 1.25) {
        sizes = paintingShape.square(painting);
    } else if (painting.height > painting.width) {
        sizes = paintingShape.tall(painting);
    } else {
        sizes = paintingShape.wide(painting);
    }

    const brushstrokes = [];
    // Random Brushstrokes
    // for (let i = 0; i < maxStrokes; i++) {
    //     brushstrokes.push(generateRandomBrushstroke(painting, colors[i % (colors.length - 1)], i));
    // }

    // Color-Sorted Brushstrokes
    for (let i = 0; i < colors.length; i++) {
        brushstrokes.push(generateDimensionalBrushstrokes(painting, colors[i], i));
    }

    return brushstrokes;
};
