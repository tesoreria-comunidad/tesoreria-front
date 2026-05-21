import type { TAlertSeverity } from "@/models";

export const SEVERITY_ORDER: TAlertSeverity[] = [
  "CRITICA",
  "ALTA",
  "MEDIA",
  "BAJA",
];

export const SEVERITY_CONFIG: Record<
  TAlertSeverity,
  {
    label: string;
    badgeVariant: "destructive" | "default" | "secondary" | "outline";
    rowClass: string;
  }
> = {
  CRITICA: {
    label: "Crítica",
    badgeVariant: "destructive",
    rowClass: "border-destructive/30 bg-destructive/5",
  },
  ALTA: {
    label: "Alta",
    badgeVariant: "default",
    rowClass: "border-orange-300/50 bg-orange-50 dark:bg-orange-950/20",
  },
  MEDIA: {
    label: "Media",
    badgeVariant: "secondary",
    rowClass: "",
  },
  BAJA: {
    label: "Baja",
    badgeVariant: "outline",
    rowClass: "",
  },
};

// Ruta a la que llevar al usuario para resolver cada alerta de tipo User.
// Las alertas de tipo Family/Balance generan la ruta dinámica /family/:id en el componente.
export const ALERT_RESOLVE_PATH: Record<string, string> = {
  C1: "/family",
  C2: "/ramas",
  C3: "/users",
  C7: "/users",
  A1: "/users",
  A2: "/users",
  A3: "/users",
  A6: "/users",
  M1: "/users",
  M2: "/users",
  M3: "/users",
  M4: "/users",
  M5: "/users",
  M7: "/ramas",
};

export const ALERT_CATALOG: Record<
  string,
  { explanation: string; action: string }
> = {
  // CRÍTICAS
  C1: {
    explanation:
      "Un beneficiario sin familia asignada no puede recibir cobros de cuota. El sistema calcula los cobros a nivel de familia, por lo que este usuario quedará excluido del proceso de cobranza mensual.",
    action:
      "Asignar el usuario a una familia existente desde la pantalla de edición de usuario, o crear una nueva familia y agregarlo como miembro.",
  },
  C2: {
    explanation:
      "Sin rama asignada, el beneficiario no tiene un dirigente responsable y no aparecerá en las vistas de ningún jefe de rama. Tampoco podrá participar de las actividades de ningún grupo.",
    action:
      "Asignar el usuario a la rama que corresponda según su edad y grupo (Scouts/Guías) desde la pantalla de edición de usuario.",
  },
  C3: {
    explanation:
      "El beneficiario existe en el sistema pero no tiene ningún vínculo: ni familia ni rama. Es un registro huérfano que no puede ser gestionado por nadie ni incluido en ningún proceso.",
    action:
      "Asignar el usuario a una rama y a una familia. Si el usuario fue creado por error, considerar desactivarlo.",
  },
  C4: {
    explanation:
      "La familia fue creada pero no tiene ningún miembro registrado. Su balance existe pero nunca recibirá cobros ni pagos porque no hay beneficiarios asociados.",
    action:
      "Agregar al menos un beneficiario a la familia o eliminar la familia si fue creada por error.",
  },
  C5: {
    explanation:
      "La familia no tiene un usuario con el rol de administrador (FAMILY). Sin administrador no hay responsable de los pagos ni acceso a la vista familiar desde el sistema.",
    action:
      "Crear o asignar un usuario con rol FAMILY a esta familia desde la pantalla de gestión de familias.",
  },
  C7: {
    explanation:
      "El historial de ramas registra más de una entrada activa (sin fecha de egreso) para el mismo usuario. Esto indica una inconsistencia: el traspaso de rama no se completó correctamente y el usuario aparece simultáneamente en dos ramas.",
    action:
      "Revisar el historial de ramas del usuario afectado y cerrar manualmente el registro duplicado estableciendo una fecha de egreso. Contactar al administrador del sistema si el problema persiste.",
  },

  // ALTAS
  A1: {
    explanation:
      "Sin email registrado, el usuario no puede recuperar su contraseña ni recibir notificaciones por correo. Además, el email es la principal vía de contacto para comunicados de la institución.",
    action:
      "Completar el campo de email en el perfil del usuario. Para beneficiarios menores de edad, puede ser el email del padre/madre/tutor.",
  },
  A2: {
    explanation:
      "Sin teléfono registrado, no hay forma de contactar directamente al usuario o a su familia en situaciones urgentes (salidas, accidentes, comunicados de última hora).",
    action:
      "Completar el campo de teléfono en el perfil del usuario con el número del beneficiario o de su responsable.",
  },
  A3: {
    explanation:
      "El número de documento es requerido para la identificación legal del menor, especialmente en actividades de campamento, salidas y documentación oficial del grupo scout.",
    action:
      "Ingresar el DNI del beneficiario en su perfil. Para beneficiarios extranjeros, usar el número de documento equivalente.",
  },
  A4: {
    explanation:
      "La familia tiene activa la opción de cuota personalizada pero el valor configurado es cero. Esto generará que se le cobre $0 en el próximo ciclo, lo que puede ser un error de configuración.",
    action:
      "Revisar la configuración de balance de la familia: o bien ingresar el valor correcto de la cuota personalizada, o bien desactivar la opción de cuota personalizada para que se aplique la cuota global.",
  },
  A5: {
    explanation:
      "La familia tiene activo el CFA personalizado pero el valor es cero. El CFA (Cargo Fijo Administrativo) con valor cero implica que no se cobrará este concepto en el próximo ciclo.",
    action:
      "Revisar la configuración de balance de la familia: ingresar el valor correcto del CFA personalizado o desactivar la opción para usar el CFA global.",
  },
  A6: {
    explanation:
      "Un dirigente sin rama asignada no tiene acceso a ningún grupo de beneficiarios. Su vista en el sistema estará vacía y no podrá gestionar ningún usuario.",
    action:
      "Asignar la rama correspondiente al dirigente desde la pantalla de edición de usuario.",
  },

  // MEDIAS
  M1: {
    explanation:
      "Sin fecha de nacimiento no es posible calcular la edad del beneficiario ni verificar si corresponde al rango etario de su rama. También impide generar estadísticas demográficas del grupo.",
    action:
      "Completar la fecha de nacimiento en el perfil del beneficiario.",
  },
  M2: {
    explanation:
      "El género es un dato de perfil requerido para estadísticas, comunicaciones formales y documentación oficial del grupo scout.",
    action: "Completar el campo de género en el perfil del beneficiario.",
  },
  M3: {
    explanation:
      "La ciudadanía es necesaria para la documentación oficial, especialmente en actividades internacionales, viajes y registros ante la asociación scout nacional.",
    action:
      "Completar el campo de ciudadanía en el perfil del beneficiario.",
  },
  M4: {
    explanation:
      "La dirección del beneficiario es un dato de contacto básico requerido para registros oficiales y para poder localizar al responsable en situaciones de emergencia.",
    action: "Completar el campo de dirección en el perfil del beneficiario.",
  },
  M5: {
    explanation:
      "Cada beneficiario debería tener una carpeta de documentos asociada para almacenar historia clínica y foto. Sin carpeta, no se pueden subir documentos para este usuario.",
    action:
      "Crear la carpeta de documentos del beneficiario desde la pantalla de edición de usuario o desde el módulo de carpetas.",
  },
  M6: {
    explanation:
      "Sin teléfono de contacto en la familia, no hay forma directa de comunicarse con el grupo familiar ante situaciones urgentes o comunicados generales.",
    action:
      "Completar el teléfono de la familia desde la pantalla de gestión de familias.",
  },
  M7: {
    explanation:
      "La edad del beneficiario, calculada a partir de su fecha de nacimiento, cae fuera del rango etario establecido para su rama actual. Esto puede indicar que el usuario no fue traspasado a tiempo o que fue asignado a la rama incorrecta.",
    action:
      "Verificar si el beneficiario debe ser traspasado a la rama que corresponde a su edad actual, usando la función de traspaso de rama.",
  },
};
