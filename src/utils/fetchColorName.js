async function fetchColorName(hex) {
    try {
        const cleanHex = hex.replace('#', '');
        const response = await fetch(`https://www.thecolorapi.com/id?hex=${cleanHex}`);
        const data = await response.json();
        return data.name.value;
    } catch (error) {
        console.error('Error al obtener nombre del color', error);
        return 'Unknown';

    }
}



export { fetchColorName };