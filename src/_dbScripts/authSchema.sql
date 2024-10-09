CREATE TABLE IF NOT EXISTS auth_user (
    id TEXT PRIMARY KEY  DEFAULT uuid_generate_v4(),
    user_email TEXT NOT NULL,
    tenant_id TEXT NOT NULL,
    hashed_password TEXT,
    user_first_name TEXT NOT NULL,
    user_last_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT NOT NULL REFERENCES auth_user(id)
);

CREATE TABLE IF NOT EXISTS tenants (
    id Serial PRIMARY KEY,
    tenant_name TEXT NOT NULL,
    owner_first_name TEXT NOT NULL,
    owner_last_name TEXT NOT NULL,
    owner_email TEXT NOT NULL,
    owner_phone TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS onboarding (
    id SERIAL PRIMARY KEY,
    tenant_name TEXT NOT NULL,
    tenant_email TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    onboarding_status TEXT DEFAULT 'Pending'
);

CREATE TABLE IF NOT EXISTS notification_channels (
  id SERIAL PRIMARY KEY,
  schema_name TEXT NOT NULL,
  trigger_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  channel_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'inactive',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(schema_name, trigger_name, event_type)
);


CREATE TABLE IF NOT EXISTS api_authorization (
    id SERIAL PRIMARY KEY,
    api_id UUID NOT NULL,
    workflow_id UUID NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    tenant_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (workflow_id, tenant_id)
);

CREATE TABLE IF NOT EXISTS contact_us (
    id SERIAL PRIMARY KEY,
    tenant_name TEXT NOT NULL,
    owner_first_name TEXT NOT NULL,
    owner_last_name TEXT NOT NULL,
    owner_email TEXT NOT NULL,
    owner_phone TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);