# Eventos Customizados - Google Analytics 4 (GA4)

## Eventos de Engajamento

### `explore_work_click`
- **Categoria**: `engagement`
- **Ação**: `explore_work_click`
- **Parâmetros**: `label` (fonte do clique)
- **Uso**: Clique em botões "Explore Our Work"

### `cta_click`
- **Categoria**: `engagement`
- **Ação**: `cta_click`
- **Parâmetros**: `label` (nome do CTA), `cta_location` (localização na página)
- **Uso**: Clique em Call-to-Action principal

### `testimonial_interaction`
- **Categoria**: `engagement`
- **Ação**: `testimonial_interaction`
- **Parâmetros**: `label` (tipo: next/previous/dot), `testimonial_index` (índice)
- **Uso**: Interação com carrossel de depoimentos

### `scroll_to_section`
- **Categoria**: `engagement`
- **Ação**: `scroll_to_section`
- **Parâmetros**: `label` (ID da seção), `percent_visible` (0-100)
- **Uso**: Scroll até seção específica

### `time_on_page`
- **Categoria**: `engagement`
- **Ação**: `time_on_page`
- **Parâmetros**: `label` (caminho da página), `value` (tempo em segundos), `time_seconds` (tempo em segundos)
- **Uso**: Tempo de permanência em página

---

## Eventos de Recrutamento

### `view_jobs_page`
- **Categoria**: `recruitment`
- **Ação**: `view_jobs_page`
- **Parâmetros**: `label` ("open_positions")
- **Uso**: Visualização da página de vagas abertas

### `view_job`
- **Categoria**: `recruitment`
- **Ação**: `view_job`
- **Parâmetros**: `label` (título da vaga), `job_id` (ID único)
- **Uso**: Visualização de detalhes de uma vaga específica

### `begin_application`
- **Categoria**: `recruitment`
- **Ação**: `begin_application`
- **Parâmetros**: `label` (título da vaga), `job_id` (ID único)
- **Uso**: Clique no botão "Candidatar-se" (início do processo)

### `application_complete` ⭐ **CONVERSÃO**
- **Categoria**: `recruitment`
- **Ação**: `application_complete`
- **Parâmetros**: `label` (título da vaga), `job_id` (ID único), `conversion` (true)
- **Uso**: Aplicação completa a uma vaga (evento de conversão principal)

---

## Eventos de Navegação

### `section_view`
- **Categoria**: `navigation`
- **Ação**: `section_view`
- **Parâmetros**: `label` (nome da seção)
- **Uso**: Visualização de uma seção específica da página

---

## Eventos de Configurações

### `language_change`
- **Categoria**: `settings`
- **Ação**: `language_change`
- **Parâmetros**: `label` (formato: "{fromLang}_to_{toLang}"), `from_language`, `to_language`
- **Uso**: Mudança de idioma do site

---

## Eventos de Links Externos

### `external_link_click`
- **Categoria**: `outbound`
- **Ação**: `external_link_click`
- **Parâmetros**: `label` (texto do link), `destination_url` (URL de destino)
- **Uso**: Clique em links externos

---

## Eventos de Marketing

### `campaign_visit`
- **Categoria**: `marketing`
- **Ação**: `campaign_visit`
- **Parâmetros**: `label` (nome da campanha), `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` (opcional), `utm_content` (opcional)
- **Uso**: Visita com parâmetros UTM na URL (disparado automaticamente)

---

## Eventos Automáticos do GA4

| Evento | Descrição | Quando é Disparado |
|--------|-----------|-------------------|
| `page_view` | Visualização de página | Cada navegação de página |
| `first_visit` | Primeira visita do usuário | Primeira vez que o usuário acessa o site |
| `session_start` | Início de sessão | Início de uma nova sessão |
| `user_engagement` | Engajamento do usuário | Interações na página (scroll, clique, etc.) |

---

**Última atualização**: Dezembro 2025
