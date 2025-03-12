import jsPDF from "jspdf";

const exportToPDF = async (palette) => {
    // Crear el documento PDF con tamaño "letter" y orientación landscape
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "letter",
    });

    // Cargar la fuente Lobster dinámicamente
    const loadFont = async () => {
        const response = await fetch("/fonts/Lobster-Regular.ttf"); // Ruta relativa al public
        if (!response.ok) throw new Error("No se pudo cargar la fuente");
        const fontBlob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result); // Resultado en base64
            reader.readAsDataURL(fontBlob);
        });
    };

    // Obtener la fuente en base64
    const lobsterFontBase64 = await loadFont();

    // Dimensiones del documento "letter" en landscape
    const pageWidth = 279.4;
    const pageHeight = 215.9;
    const contentWidth = 251.46;
    const contentHeight = 194.31;
    const marginX = (pageWidth - contentWidth) / 2;
    const marginY = (pageHeight - contentHeight) / 2;

    const innerWidth = contentWidth * 0.9;
    const innerHeight = contentHeight * 0.9;
    const innerX = marginX + (contentWidth - innerWidth) / 2;
    const innerY = marginY + (contentHeight - innerHeight) / 2;
    const padding = 6;

    doc.setFillColor(255, 255, 255);
    doc.rect(innerX, innerY, innerWidth, innerHeight, "F");

    const gridWidth = innerWidth - 2 * padding;
    const gridHeight = innerHeight - 2 * padding - 20;
    const cellWidth = gridWidth / 3;
    const cellHeight = gridHeight / 2;
    const rectHeight = 64;

    const gridX = innerX + padding;
    const gridY = innerY + padding;

    palette.colors.forEach((color, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const cellX = gridX + col * cellWidth;
        const cellY = gridY + row * cellHeight;

        doc.setFillColor(color);
        doc.roundedRect(cellX, cellY, cellWidth - 2, rectHeight, 3, 3, "F");

        doc.setDrawColor(209, 213, 219);
        doc.roundedRect(cellX, cellY, cellWidth - 2, rectHeight, 3, 3);

        doc.setFontSize(12);
        doc.setTextColor(31, 41, 55);
        doc.setFont("helvetica", "bold");
        doc.text(color, cellX + 2, cellY + rectHeight + 5);
    });

    // Agregar la fuente personalizada "Lobster"
    doc.addFont(lobsterFontBase64, "Lobster", "normal");

    // Añadir el texto "Colorsitos.app" con la fuente personalizada
    const textX = innerX + innerWidth - 50;
    const textY = innerY + innerHeight - 10;
    doc.setFontSize(24);
    doc.setFont("Lobster", "normal");
    doc.setTextColor(31, 41, 55);
    doc.text("Colorsitos.app", textX, textY);

    // Guardar el archivo PDF
    doc.save("paleta_de_colores_letter.pdf");
};

export { exportToPDF };