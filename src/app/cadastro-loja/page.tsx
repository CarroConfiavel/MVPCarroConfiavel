"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/navbar";
import { Upload, Loader2 } from "lucide-react";

export default function CadastroLoja() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Você precisa estar logado para cadastrar uma loja");
        setLoading(false);
        return;
      }

      let logoUrl = "";

      // Upload logo if provided
      if (logoFile) {
        const fileExt = logoFile.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("lojas")
          .upload(`logos/${fileName}`, logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("lojas")
          .getPublicUrl(`logos/${fileName}`);
        
        logoUrl = publicUrl;
      }

      // Insert loja
      const { data: loja, error: lojaError } = await supabase
        .from("lojas")
        .insert({
          nome: formData.get("nome") as string,
          cnpj: formData.get("cnpj") as string,
          razao_social: formData.get("razao_social") as string,
          telefone: formData.get("telefone") as string,
          email: formData.get("email") as string,
          endereco: formData.get("endereco") as string,
          cidade: formData.get("cidade") as string,
          estado: formData.get("estado") as string,
          cep: formData.get("cep") as string,
          descricao: formData.get("descricao") as string,
          logo_url: logoUrl,
        })
        .select()
        .single();

      if (lojaError) throw lojaError;

      // Update user profile with loja_id
      const { error: updateError } = await supabase
        .from("users")
        .update({ 
          loja_id: loja.id,
          tipo_usuario: "loja"
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar loja");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-2xl rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="space-y-2 text-center mb-6">
            <h1 className="text-3xl font-semibold tracking-tight">Cadastro de Loja</h1>
            <p className="text-sm text-muted-foreground">
              Preencha os dados da sua loja para começar a vender
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Loja *</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Auto Center Silva"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="razao_social">Razão Social *</Label>
                  <Input
                    id="razao_social"
                    name="razao_social"
                    type="text"
                    placeholder="Auto Center Silva LTDA"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="contato@loja.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  type="text"
                  placeholder="Rua das Flores, 123"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    name="cidade"
                    type="text"
                    placeholder="São Paulo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    name="estado"
                    type="text"
                    placeholder="SP"
                    maxLength={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="cep"
                    type="text"
                    placeholder="00000-000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  placeholder="Conte um pouco sobre sua loja..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo da Loja</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="flex-1"
                  />
                  {logoPreview && (
                    <div className="w-16 h-16 rounded-md border border-border overflow-hidden">
                      <img
                        src={logoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                "Cadastrar Loja"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
