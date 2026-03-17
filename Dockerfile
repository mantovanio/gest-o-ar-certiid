# ==========================================
# ESTÁGIO 1: CONSTRUÇÃO (BUILD)
# ==========================================
# Usando a imagem oficial do Node.js de peso leve (alpine)
FROM node:20-alpine AS builder

# Instala o gerenciador de pacotes que esse projeto usa (pnpm)
RUN npm install -g pnpm

# Define a pasta de trabalho dentro da máquina virtual
WORKDIR /app

# Copia os arquivos de configuração das bibliotecas
COPY package.json pnpm-lock.yaml ./

# Instala todas as ferramentas necessárias para rodar o projeto
RUN pnpm install --frozen-lockfile

# Copia o resto do código da sua máquina para dentro do Docker
COPY . .

# Recebe as variáveis secretas do Supabase passadas pelo docker-compose
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY

# Expõe as variáveis para o Vite usar durante a compilação
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

# Roda o comando de compilação do Vite
# Isso vai gerar a pasta com site "mastigado" e leve.
RUN pnpm run build

# ==========================================
# ESTÁGIO 2: SERVIDOR (PRODUCTION)
# ==========================================
# Usando o Nginx (servidor web extremamente rápido)
FROM nginx:alpine

# Limpa a pasta padrão de sites do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia a pasta compilada (do Estágio 1) para a pasta que o Nginx entrega para a web
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia nosso arquivo específico de rotas para garantir que os links não quebrem
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Informa ao Docker que essa máquina usa a porta 80 (Web)
EXPOSE 80

# Liga o servidor Nginx e o mantém rodando
CMD ["nginx", "-g", "daemon off;"]
