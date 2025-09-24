import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileServices } from "@/services/file.service";
import { useAlert } from "@/context/AlertContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFamiliesQuery } from "@/queries/family.queries";
export function UploadFile({ family_id }: { family_id?: string }) {
  const { data: families } = useFamiliesQuery();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [familyId, setFamilyId] = useState<string>(family_id || "");
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    // Si es imagen, genera una URL de vista previa
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // Limpieza de URL cuando cambia el archivo o se desmonta el componente
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      setLoading(true);
      const res = await FileServices.upload({
        file: selectedFile,
        family_id: familyId,
      });

      showAlert({
        type: "success",
        title: "Archivo subido correctamente",
        description: `Archivo: ${res.fileName} subido exitosamente.`,
      });

      // Limpia después de subir
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      showAlert({
        type: "error",
        title: "Error al subir el archivo",
        description: "Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 flex flex-col p-10">
      <Label htmlFor="file-upload" className="text-sm font-medium">
        Seleccionar comprobante
      </Label>

      {!family_id && (
        <Select onValueChange={setFamilyId} value={familyId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Familia" />
          </SelectTrigger>
          <SelectContent>
            {families?.map((family) => (
              <SelectItem key={family.id} value={family.id}>
                {family.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <div className="flex items-center gap-3">
        <Input
          id="file-upload"
          type="file"
          className="w-auto"
          onChange={handleFileChange}
        />
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !familyId}
          isLoading={loading}
        >
          Cargar pago
        </Button>
      </div>

      {selectedFile && (
        <>
          <p className="text-sm text-muted-foreground">
            Archivo seleccionado:{" "}
            <span className="font-medium">{selectedFile.name}</span>
          </p>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Vista previa"
              className="max-w-xs rounded shadow border"
            />
          )}
        </>
      )}
    </div>
  );
}
