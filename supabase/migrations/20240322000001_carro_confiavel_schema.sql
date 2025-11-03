CREATE TYPE anuncio_status AS ENUM ('rascunho', 'ativo', 'vendido', 'inativo', 'removido');
CREATE TYPE condicao_veiculo AS ENUM ('novo', 'seminovo', 'usado');
CREATE TYPE boost_level AS ENUM ('bronze', 'prata', 'ouro', 'platina');
CREATE TYPE laudo_status_enum AS ENUM ('pendente', 'em_analise', 'aprovado', 'reprovado', 'expirado');
CREATE TYPE gravidade_enum AS ENUM ('leve', 'moderada', 'grave', 'critica');
CREATE TYPE denuncia_motivo_enum AS ENUM ('informacao_falsa', 'preco_abusivo', 'veiculo_irregular', 'fraude', 'outro');
CREATE TYPE denuncia_status_enum AS ENUM ('pendente', 'em_analise', 'procedente', 'improcedente', 'resolvida');

CREATE TABLE IF NOT EXISTS public.marcas (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome text NOT NULL UNIQUE,
    logo_url text,
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS marcas_nome_idx ON public.marcas(nome);
CREATE INDEX IF NOT EXISTS marcas_ativo_idx ON public.marcas(ativo);

CREATE TABLE IF NOT EXISTS public.lojas (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome text NOT NULL,
    cnpj text UNIQUE NOT NULL,
    razao_social text NOT NULL,
    telefone text,
    email text,
    endereco text,
    cidade text,
    estado text,
    cep text,
    logo_url text,
    descricao text,
    horario_funcionamento jsonb,
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS lojas_cnpj_idx ON public.lojas(cnpj);
CREATE INDEX IF NOT EXISTS lojas_ativo_idx ON public.lojas(ativo);
CREATE INDEX IF NOT EXISTS lojas_cidade_estado_idx ON public.lojas(cidade, estado);

CREATE TABLE IF NOT EXISTS public.empresas_laudo (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome text NOT NULL,
    cnpj text UNIQUE NOT NULL,
    razao_social text NOT NULL,
    telefone text,
    email text,
    endereco text,
    cidade text,
    estado text,
    certificacoes jsonb,
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS empresas_laudo_cnpj_idx ON public.empresas_laudo(cnpj);
CREATE INDEX IF NOT EXISTS empresas_laudo_ativo_idx ON public.empresas_laudo(ativo);

CREATE TABLE IF NOT EXISTS public.modelos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    marca_id uuid NOT NULL REFERENCES public.marcas(id) ON DELETE CASCADE,
    nome text NOT NULL,
    categoria text,
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE(marca_id, nome)
);

CREATE INDEX IF NOT EXISTS modelos_marca_id_idx ON public.modelos(marca_id);
CREATE INDEX IF NOT EXISTS modelos_nome_idx ON public.modelos(nome);
CREATE INDEX IF NOT EXISTS modelos_ativo_idx ON public.modelos(ativo);

CREATE TABLE IF NOT EXISTS public.versoes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    modelo_id uuid NOT NULL REFERENCES public.modelos(id) ON DELETE CASCADE,
    nome text NOT NULL,
    ano_inicio integer,
    ano_fim integer,
    motor text,
    combustivel text,
    transmissao text,
    portas integer,
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE(modelo_id, nome, ano_inicio)
);

CREATE INDEX IF NOT EXISTS versoes_modelo_id_idx ON public.versoes(modelo_id);
CREATE INDEX IF NOT EXISTS versoes_ativo_idx ON public.versoes(ativo);

CREATE TABLE IF NOT EXISTS public.anuncios (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    marca_id uuid NOT NULL REFERENCES public.marcas(id),
    modelo_id uuid NOT NULL REFERENCES public.modelos(id),
    versao_id uuid REFERENCES public.versoes(id),
    titulo text NOT NULL,
    descricao text,
    preco numeric(12, 2) NOT NULL,
    ano_fabricacao integer NOT NULL,
    ano_modelo integer NOT NULL,
    quilometragem integer NOT NULL,
    cor text,
    placa text UNIQUE,
    condicao condicao_veiculo NOT NULL DEFAULT 'usado',
    status anuncio_status NOT NULL DEFAULT 'rascunho',
    fotos jsonb,
    caracteristicas jsonb,
    opcionais jsonb,
    cidade text,
    estado text,
    cep text,
    visualizacoes integer DEFAULT 0,
    favoritos integer DEFAULT 0,
    boost_level boost_level,
    boost_expira_em timestamp with time zone,
    destaque boolean DEFAULT false,
    aceita_troca boolean DEFAULT false,
    ipva_pago boolean DEFAULT false,
    unico_dono boolean DEFAULT false,
    licenciado boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    publicado_em timestamp with time zone,
    vendido_em timestamp with time zone
);

CREATE INDEX IF NOT EXISTS anuncios_user_id_idx ON public.anuncios(user_id);
CREATE INDEX IF NOT EXISTS anuncios_marca_id_idx ON public.anuncios(marca_id);
CREATE INDEX IF NOT EXISTS anuncios_modelo_id_idx ON public.anuncios(modelo_id);
CREATE INDEX IF NOT EXISTS anuncios_versao_id_idx ON public.anuncios(versao_id);
CREATE INDEX IF NOT EXISTS anuncios_placa_idx ON public.anuncios(placa);
CREATE INDEX IF NOT EXISTS anuncios_status_idx ON public.anuncios(status);
CREATE INDEX IF NOT EXISTS anuncios_condicao_idx ON public.anuncios(condicao);
CREATE INDEX IF NOT EXISTS anuncios_preco_idx ON public.anuncios(preco);
CREATE INDEX IF NOT EXISTS anuncios_cidade_estado_idx ON public.anuncios(cidade, estado);
CREATE INDEX IF NOT EXISTS anuncios_boost_level_idx ON public.anuncios(boost_level);
CREATE INDEX IF NOT EXISTS anuncios_created_at_idx ON public.anuncios(created_at DESC);

alter publication supabase_realtime add table anuncios;

CREATE TABLE IF NOT EXISTS public.laudos_cautelares (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    anuncio_id uuid NOT NULL REFERENCES public.anuncios(id) ON DELETE CASCADE,
    empresa_laudo_id uuid NOT NULL REFERENCES public.empresas_laudo(id),
    numero_laudo text UNIQUE NOT NULL,
    data_inspecao timestamp with time zone NOT NULL,
    validade timestamp with time zone NOT NULL,
    status laudo_status_enum NOT NULL DEFAULT 'pendente',
    nota_geral numeric(3, 1),
    observacoes text,
    itens_verificados jsonb,
    problemas_encontrados jsonb,
    fotos_laudo jsonb,
    documento_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS laudos_cautelares_anuncio_id_idx ON public.laudos_cautelares(anuncio_id);
CREATE INDEX IF NOT EXISTS laudos_cautelares_empresa_laudo_id_idx ON public.laudos_cautelares(empresa_laudo_id);
CREATE INDEX IF NOT EXISTS laudos_cautelares_numero_laudo_idx ON public.laudos_cautelares(numero_laudo);
CREATE INDEX IF NOT EXISTS laudos_cautelares_status_idx ON public.laudos_cautelares(status);
CREATE INDEX IF NOT EXISTS laudos_cautelares_validade_idx ON public.laudos_cautelares(validade);

alter publication supabase_realtime add table laudos_cautelares;

CREATE TABLE IF NOT EXISTS public.problemas_laudo (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    laudo_id uuid NOT NULL REFERENCES public.laudos_cautelares(id) ON DELETE CASCADE,
    categoria text NOT NULL,
    descricao text NOT NULL,
    gravidade gravidade_enum NOT NULL,
    custo_estimado numeric(10, 2),
    fotos jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS problemas_laudo_laudo_id_idx ON public.problemas_laudo(laudo_id);
CREATE INDEX IF NOT EXISTS problemas_laudo_gravidade_idx ON public.problemas_laudo(gravidade);

CREATE TABLE IF NOT EXISTS public.denuncias (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    anuncio_id uuid NOT NULL REFERENCES public.anuncios(id) ON DELETE CASCADE,
    denunciante_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    motivo denuncia_motivo_enum NOT NULL,
    descricao text NOT NULL,
    status denuncia_status_enum NOT NULL DEFAULT 'pendente',
    resposta text,
    respondido_por uuid REFERENCES auth.users(id),
    respondido_em timestamp with time zone,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS denuncias_anuncio_id_idx ON public.denuncias(anuncio_id);
CREATE INDEX IF NOT EXISTS denuncias_denunciante_id_idx ON public.denuncias(denunciante_id);
CREATE INDEX IF NOT EXISTS denuncias_status_idx ON public.denuncias(status);
CREATE INDEX IF NOT EXISTS denuncias_created_at_idx ON public.denuncias(created_at DESC);

CREATE TABLE IF NOT EXISTS public.boost_historico (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    anuncio_id uuid NOT NULL REFERENCES public.anuncios(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    boost_level boost_level NOT NULL,
    valor_pago numeric(10, 2) NOT NULL,
    inicio timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    fim timestamp with time zone NOT NULL,
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS boost_historico_anuncio_id_idx ON public.boost_historico(anuncio_id);
CREATE INDEX IF NOT EXISTS boost_historico_user_id_idx ON public.boost_historico(user_id);
CREATE INDEX IF NOT EXISTS boost_historico_ativo_idx ON public.boost_historico(ativo);

CREATE TABLE IF NOT EXISTS public.favoritos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    anuncio_id uuid NOT NULL REFERENCES public.anuncios(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, anuncio_id)
);

CREATE INDEX IF NOT EXISTS favoritos_user_id_idx ON public.favoritos(user_id);
CREATE INDEX IF NOT EXISTS favoritos_anuncio_id_idx ON public.favoritos(anuncio_id);

CREATE TABLE IF NOT EXISTS public.mensagens (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    anuncio_id uuid NOT NULL REFERENCES public.anuncios(id) ON DELETE CASCADE,
    remetente_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    destinatario_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    mensagem text NOT NULL,
    lida boolean DEFAULT false,
    lida_em timestamp with time zone,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS mensagens_anuncio_id_idx ON public.mensagens(anuncio_id);
CREATE INDEX IF NOT EXISTS mensagens_remetente_id_idx ON public.mensagens(remetente_id);
CREATE INDEX IF NOT EXISTS mensagens_destinatario_id_idx ON public.mensagens(destinatario_id);
CREATE INDEX IF NOT EXISTS mensagens_lida_idx ON public.mensagens(lida);
CREATE INDEX IF NOT EXISTS mensagens_created_at_idx ON public.mensagens(created_at DESC);

alter publication supabase_realtime add table mensagens;

CREATE TABLE IF NOT EXISTS public.avaliacoes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    anuncio_id uuid NOT NULL REFERENCES public.anuncios(id) ON DELETE CASCADE,
    avaliador_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    avaliado_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nota integer NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(anuncio_id, avaliador_id)
);

CREATE INDEX IF NOT EXISTS avaliacoes_anuncio_id_idx ON public.avaliacoes(anuncio_id);
CREATE INDEX IF NOT EXISTS avaliacoes_avaliador_id_idx ON public.avaliacoes(avaliador_id);
CREATE INDEX IF NOT EXISTS avaliacoes_avaliado_id_idx ON public.avaliacoes(avaliado_id);

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS nome_completo text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS cpf text UNIQUE;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS telefone text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS loja_id uuid REFERENCES public.lojas(id) ON DELETE SET NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS tipo_usuario text DEFAULT 'pessoa_fisica' CHECK (tipo_usuario IN ('pessoa_fisica', 'loja'));
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS endereco text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS cidade text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS estado text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS cep text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS data_nascimento date;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS verificado boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS users_loja_id_idx ON public.users(loja_id);
CREATE INDEX IF NOT EXISTS users_cpf_idx ON public.users(cpf);
CREATE INDEX IF NOT EXISTS users_tipo_usuario_idx ON public.users(tipo_usuario);