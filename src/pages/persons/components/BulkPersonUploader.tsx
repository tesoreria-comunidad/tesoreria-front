import { type ChangeEvent, useRef, useState } from "react";
import Papa from "papaparse";
import { CreatePersonSchema, type TCreatePerson } from "@/models";
import { Input } from "@/components/ui/input";
import { BulkPersonsTable } from "./table/PersonsTableBulk";
import { PersonsServices } from "@/services/persons.service";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";

export function BulkPersonUploader() {
  const [validPersons, setValidPersons] = useState<TCreatePerson[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed = result.data as any[];
        const valid: TCreatePerson[] = [];
        const errs: string[] = [];

        parsed.forEach((row, index) => {
          // Limpiar valores
          const cleaned = Object.fromEntries(
            Object.entries(row).map(([k, v]) => [k.trim(), String(v).trim()])
          );

          const validation = CreatePersonSchema.safeParse(cleaned);
          if (validation.success) {
            valid.push(validation.data);
          } else {
            errs.push(
              `Fila ${index + 2}: ${validation.error.issues
                .map((e) => e.message)
                .join(", ")}`
            );
          }
        });

        setValidPersons(valid);
        setErrors(errs);
      },
    });
  };

  const handleSubmit = async () => {
    if (!validPersons.length) return alert("No hay datos válidos para enviar");
    setLoading(true);
    try {
      await PersonsServices.bulkCreate(validPersons);
      alert("Personas cargadas correctamente");
      setValidPersons([]);
    } catch (err) {
      console.error(err);
      alert("Error al enviar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Button type="button" onClick={handleClick}>
        <Paperclip /> Cargar Listado
      </Button>
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
      {errors.length > 0 && (
        <div className="text-red-600">
          <h4>Errores en el archivo:</h4>
          <ul className="list-disc pl-5">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      {validPersons.length > 0 && (
        <div>
          <BulkPersonsTable persons={validPersons} />
          <p>{validPersons.length} personas cargadas.</p>
          <Button onClick={handleSubmit} isLoading={loading}>
            Enviar al backend
          </Button>
        </div>
      )}
    </div>
  );
}
