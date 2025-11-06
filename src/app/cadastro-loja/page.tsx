"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "../../../supabase/client";
import { Upload } from "lucide-react";

export default function CadastroLojaPage() {
  const [nomeLoja, setNomeLoja] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/sign-in");
        return;
      }
      
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [supabase, router]);

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

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
        return;
      }

      let logoUrl = null;
      let bannerUrl = null;

      // Upload logo to 'logos' bucket
      if (logoFile) {
        const logoFileName = `${user.id}-logo-${Date.now()}.${logoFile.name.split('.').pop()}`;
        const { error: logoError } = await supabase.storage
          .from("logos")
          .upload(logoFileName, logoFile);

        if (logoError) throw logoError;
        
        const { data: { publicUrl } } = supabase.storage
          .from("logos")
          .getPublicUrl(logoFileName);
        
        logoUrl = publicUrl;
      }

      // Upload banner to 'banners' bucket
      if (bannerFile) {
        const bannerFileName = `${user.id}-banner-${Date.now()}.${bannerFile.name.split('.').pop()}`;
        const { error: bannerError } = await supabase.storage
          .from("banners")
          .upload(bannerFileName, bannerFile);

        if (bannerError) throw bannerError;
        
        const { data: { publicUrl } } = supabase.storage
          .from("banners")
          .getPublicUrl(bannerFileName);
        
        bannerUrl = publicUrl;
      }

      // Insert store data into 'lojas' table
      const { data: lojaData, error: insertError } = await supabase
        .from("lojas")
        .insert({
          nome: nomeLoja,
          cnpj,
          endereco,
          logo_url: logoUrl,
          banner_url: bannerUrl,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Update user profile with loja_id and tipo_usuario
      const { error: updateError } = await supabase
        .from("usuarios")
        .update({
          loja_id: lojaData.id,
          tipo_usuario: 'loja'
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setMessage({ type: "success", text: "Loja cadastrada com sucesso! Redirecionando..." });
      
      // Reset form
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao cadastrar loja:", error);
      setMessage({ type: "error", text: error.message || "Erro ao cadastrar loja." });
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Verificando autenticação...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Cadastro de Loja
          </CardTitle>
          <CardDescription>
            Preencha os dados da sua loja no CarroConfiável
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nomeLoja" className="text-sm font-medium">
                  Nome da Loja
                </Label>
                <Input
                  id="nomeLoja"
                  type="text"
                  placeholder="Auto Center Silva"
                  value={nomeLoja}
                  onChange={(e) => setNomeLoja(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj" className="text-sm font-medium">
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco" className="text-sm font-medium">
                  Endereço
                </Label>
                <Input
                  id="endereco"
                  type="text"
                  placeholder="Rua Exemplo, 123 - Bairro - Cidade/UF"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo" className="text-sm font-medium">
                  Logo da Loja
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full"
                  />
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-16 w-16 rounded-md object-cover border"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner" className="text-sm font-medium">
                  Banner da Loja
                </Label>
                <div className="flex flex-col gap-4">
                  <Input
                    id="banner"
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="w-full"
                  />
                  {bannerPreview && (
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="h-32 w-full rounded-md object-cover border"
                    />
                  )}
                </div>
              </div>
            </div>

            {message && (
              <div
                className={`rounded-md p-4 text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Salvando..." : "Salvar Cadastro"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}