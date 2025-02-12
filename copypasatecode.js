const favoriteColors = {
    "OPwPb6SEnHWtK0VQMuLVZyTRdIs1": {
        "-OIrBhfl0dPgMEKlHcwu": {
            "colorHex": "#4174BF",
            "colorName": "Lapis Lazuli"
        },
        "-OIrDA5OLVi64GKbEdFR": {
            "colorHex": "#B97BC3",
            "colorName": "Fuchsia"
        },
        "-OIraA9hqrfQI86R6WNi": {
            "colorHex": "#AA7A1C",
            "colorName": "Mandalay"
        },
        "-OIraDqK4ehQDG-UCNjC": {
            "colorHex": "#F3BC88",
            "colorName": "Manhattan"
        }
    }
};


const colorsArray = Object.entries(favoriteColors).map(([key, color]) => ({
    ...color,
    key, // Agregar la clave única al objeto del color
}));

console.log(colorsArray)