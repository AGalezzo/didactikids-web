export interface Product {
  name: string;
  code: string;
  category: string;
  description: string;
  price: number;
}

export const products: Product[] = [
  { name: 'Caneca para Ropa', code: '100030', category: 'aseo', description: 'Alto 50cm, Ancho 30cm. Polipropileno. Incluye tapa.', price: 45000 },
  { name: 'Balde con Escurridor Grande', code: '100009', category: 'aseo', description: 'Alto 87cm, Capacidad 35L. 4 ruedas. Polipropileno.', price: 58000 },
  { name: 'Set Punto Ecológico', code: '100206', category: 'aseo', description: '3 papeleras 50L c/u. Colores: azul, gris, verde.', price: 125000 },
  { name: 'Caldero 25L', code: '100025', category: 'cocina', description: 'Diámetro 50cm. Capacidad 25L. Aluminio Fundido.', price: 180000 },
  { name: 'Olla a Presión 10L', code: '100150', category: 'cocina', description: 'Capacidad 10L. Acero Inoxidable. Tapa hermética.', price: 220000 },
  { name: 'Licuadora Industrial', code: '100124', category: 'cocina', description: 'Capacidad 15L. Acero inoxidable 304.', price: 350000 },
  { name: 'Balanza Pesa Bebés', code: '100007', category: 'antropometrico', description: 'Capacidad 20kg. Función BMIF, Auto-HOLD.', price: 350000 },
  { name: 'Infantómetro', code: '100086', category: 'antropometrico', description: 'Rango 10-100 cm. Medición móvil, TARA.', price: 450000 },
  { name: 'Tallímetro', code: '100221', category: 'antropometrico', description: 'Rango 20-205 cm. Peso neto 2.4 kg.', price: 320000 },
  { name: 'Televisor 40"', code: '100227', category: 'apoyo', description: 'LED, WIFI, USB, HDMI. Control remoto incluido.', price: 850000 },
  { name: 'Reproductor de Video', code: '100185', category: 'apoyo', description: 'Blu-ray, DVD, CD, WIFI, USB. HDMI incluido.', price: 420000 },
  { name: 'Ventilador de Pared', code: '100243', category: 'apoyo', description: '3 velocidades. Para climas cálidos. 45w.', price: 95000 },
  { name: 'Colchonetas', code: '100045', category: 'lenceria', description: 'Alto 5cm, Ancho 80cm. Espuma densidad 26.', price: 75000 },
  { name: 'Cobija Térmica Cuna', code: '100040', category: 'lenceria', description: '90cm x 140cm. Lana de Franela. 100% Poliester.', price: 65000 },
  { name: 'Juego de Sábanas', code: '100193', category: 'lenceria', description: 'Telas sanforizadas. 180 hilos. Sábana + sobre sabana.', price: 85000 },
  { name: 'Mesa Infantil', code: '100139', category: 'mobiliario', description: 'Alto 52cm, Ancho 60cm. Polipropileno.', price: 95000 },
  { name: 'Silla Infantil', code: '100210', category: 'mobiliario', description: 'Alto 53cm, Ancho 38cm. Polipropileno. Apilable.', price: 45000 },
  { name: 'Estante Almacenamiento', code: '100143', category: 'mobiliario', description: '200cm x 92cm x 30cm. Polipropileno. 3 entrepaños.', price: 185000 },
  { name: 'Extintor 20lb ABC', code: '100074', category: 'emergencia', description: 'Polvo químico seco. Lámina cold roll cal 16.', price: 125000 },
  { name: 'Botiquín Tipo A', code: '100020', category: 'emergencia', description: 'Gabinete metálico. 40cm x 27cm. 13 elementos.', price: 85000 },
  { name: 'Linterna Recargable', code: '100127', category: 'emergencia', description: 'Carga 16h. 150 lúmenes. Polipropileno.', price: 45000 },
  { name: 'Balones Canguro', code: '100089', category: 'pedagogico', description: '2 balones PVC (40cm y 55cm). Resistencia 200kg.', price: 65000 },
  { name: 'Aros Hula Hula', code: '100088', category: 'pedagogico', description: '8 aros (4x50cm, 4x70cm). Material HDPE.', price: 55000 },
  { name: 'Cubo Actividades', code: '100050', category: 'pedagogico', description: '30x30x30cm. Madera con 5 actividades.', price: 95000 }
];
