TRUNCATE TABLE 
  public.agents,
  public.bank_accounts,
  public.certificates,
  public.crm_agente_ia,
  public."CRM_geral",
  public.customers,
  public.documents,
  public.financial_transactions,
  public."Itens_Produto",
  public.media_inventory,
  public.n8n_chat_histories,
  public.partner_leads,
  public.partners,
  public."Pedidos",
  public."Pessoas",
  public.stg_importacao_raw
RESTART IDENTITY CASCADE;
