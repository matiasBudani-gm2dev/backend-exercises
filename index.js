import {createApp} from './app.js';

const PORT = process.env.PORT || 3000;

createApp().listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
console.log(`🎯 Arquitectura: Routes → Service → Repository + Model → MySQL DB`)