// // import html2pdf from "html2pdf.js";


// // const exportToPDF = () => {

// //   const element = document.getElementById("pdf-content");
// //   console.log(element);

// //   // Ajustes para asegurar que el contenido quede dentro de los márgenes
// //   const contentDiv = element.querySelector(".pdf-content-inner");
// //   if (contentDiv) {
// //     // Eliminar transformaciones que pueden causar problemas
// //     contentDiv.style.transform = "none";
// //     contentDiv.style.position = "static";
// //     contentDiv.style.left = "0";
// //     contentDiv.style.top = "0";
// //     contentDiv.style.width = "100%";
// //     contentDiv.style.maxWidth = "260mm"; // Ancho ajustado para landscape
// //     contentDiv.style.maxHeight = "210mm"; // alto ajustado para landscape
// //     contentDiv.style.margin = "0 auto";
// //   }

// //   const options = {
// //     margin: [10, 2, 2, 10], // [top, right, bottom, left] en mm
// //     filename: "paleta_de_colores_landscape.pdf",
// //     image: { type: "jpeg", quality: 0.98 }, // Mejor calidad de imagen
// //     html2canvas: {
// //       scale: 2, // Un valor moderado para buena calidad sin distorsión
// //       useCORS: true,
// //       logging: true,
// //       letterRendering: true,
// //     },
// //     jsPDF: {
// //       unit: "mm",
// //       format: "letter",
// //       orientation: "landscape", // Cambio a orientación horizontal
// //       compress: true,
// //     },
// //   };

// //   html2pdf()
// //     .set(options)
// //     .from(element)
// //     .toPdf()
// //     .get("pdf")
// //     .then((pdf) => {
// //       pdf.save("paleta_de_colores_landscape.pdf");
// //     });
// // };

// // export { exportToPDF };

// import html2pdf from "html2pdf.js";

// const exportToPDF = () => {
//   const element = document.getElementById("pdf-content");

//   const contentDiv = element.querySelector(".pdf-content-inner");
//   if (contentDiv) {
//     contentDiv.style.transform = "none";
//     contentDiv.style.position = "static";
//     contentDiv.style.width = "100%";
//     contentDiv.style.height = "95%";
//     contentDiv.style.margin = "0";
//   }

//   const options = {
//     margin: [2, 2, 2, 2],
//     filename: "paleta_de_colores_landscape.pdf",
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: {
//       scale: 2,
//       useCORS: true,
//       logging: true,
//       letterRendering: true,
//       width: 1056,
//       height: 810,
//     },
//     jsPDF: {
//       unit: "mm",
//       format: "letter",
//       orientation: "landscape",
//       compress: true,
//     },
//   };

//   html2pdf().set(options).from(element).save();
// };

// export { exportToPDF };