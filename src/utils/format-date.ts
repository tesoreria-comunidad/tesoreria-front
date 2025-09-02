export function formatDate(date: string) {
  const DAYS = [
    { short: "dom", long: "Domingo" },
    { short: "lun", long: "Lunes" },
    { short: "mar", long: "Martes" },
    { short: "mie", long: "Miércoles" },
    { short: "jue", long: "Jueves" },
    { short: "vie", long: "Viernes" },
    { short: "sab", long: "Sábado" },
  ];
  const MONTHS = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const weekDay = DAYS[new Date(date).getDay()]?.long;
  const number = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  const month = MONTHS[new Date(date).getMonth()];
  return `${weekDay}, ${number} de ${month}, ${year}`;
}
