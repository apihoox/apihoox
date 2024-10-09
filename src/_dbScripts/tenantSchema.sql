CREATE SCHEMA IF NOT EXISTS :schemaName;

CREATE TABLE IF NOT EXISTS :schemaName.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT NOT NULL UNIQUE,
    tenant_id TEXT NOT NULL,
    hashed_password TEXT,
    user_first_name TEXT NOT NULL,
    user_last_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    skip_trigger BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);


CREATE TABLE IF NOT EXISTS :schemaName.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name TEXT NOT NULL UNIQUE,
    role_description TEXT,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS :schemaName.groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_name TEXT NOT NULL UNIQUE,
    group_description TEXT,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS :schemaName.user_roles (
    user_id UUID,
    role_id UUID,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES :schemaName.users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES :schemaName.roles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS :schemaName.group_users (
    group_id UUID,
    user_id UUID,
    skip_trigger BOOLEAN DEFAULT FALSE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES :schemaName.groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES :schemaName.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS :schemaName.group_roles (
    group_id UUID,
    role_id UUID,
    skip_trigger BOOLEAN DEFAULT FALSE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, role_id),
    FOREIGN KEY (group_id) REFERENCES :schemaName.groups(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES :schemaName.roles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS :schemaName.access_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_name TEXT NOT NULL UNIQUE,
    description TEXT,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS :schemaName.role_access (
    role_id UUID,
    access_template_id UUID,
    can_create BOOLEAN DEFAULT FALSE,
    can_read BOOLEAN DEFAULT TRUE,
    can_update BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, access_template_id),
    FOREIGN KEY (role_id) REFERENCES :schemaName.roles(id) ON DELETE CASCADE,
    FOREIGN KEY (access_template_id) REFERENCES :schemaName.access_templates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS :schemaName.access_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_name TEXT NOT NULL UNIQUE,
    description TEXT,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS :schemaName.access_template_modules (
    access_template_id UUID,
    module_id UUID,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ( access_template_id, module_id),
    FOREIGN KEY (access_template_id) REFERENCES :schemaName.access_templates(id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES :schemaName.access_modules(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS :schemaName.workflows (
  id                UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
  nodes             TEXT,
  edges             TEXT,
  name              VARCHAR NOT NULL,
  flowPath          TEXT,
  publish           BOOLEAN     DEFAULT false,
  description       TEXT NOT NULL,
  skip_trigger BOOLEAN DEFAULT FALSE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userId            UUID NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES :schemaName.users(id)
);

CREATE TABLE IF NOT EXISTS :schemaName.workflows_history (
  id                UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
  nodes             TEXT,
  edges             TEXT,
  name              VARCHAR NOT NULL,
  flowPath          TEXT,
  publish           BOOLEAN     DEFAULT false,
  description       TEXT NOT NULL,
  skip_trigger BOOLEAN DEFAULT FALSE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userId            UUID NOT NULL,
  status    Text DEFAULT 'in-progress',
  CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES :schemaName.users(id)
);

CREATE TABLE IF NOT EXISTS :schemaName.workflow_models (
  id SERIAL PRIMARY KEY,
  workflow_id UUID NOT NULL,
  table_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  tenant_id TEXT NOT NULL,
  state BOOLEAN NOT NULL DEFAULT FALSE,
  skip_trigger BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS :schemaName.field_metadata (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(255) NOT NULL,
    field_name VARCHAR(255) NOT NULL,
    field_label TEXT NOT NULL,
    field_type VARCHAR(50) NOT NULL,
    description TEXT,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT field_metadata_unique_name_table UNIQUE (field_name, table_name)
);

CREATE TABLE IF NOT EXISTS :schemaName.notification_log (
  id SERIAL PRIMARY KEY,
  channel_name VARCHAR(255) NOT NULL,
  schema_name VARCHAR(255) NOT NULL,
  operation VARCHAR(50),
  table_name VARCHAR(255),
  previous_record JSONB,
  latest_record JSONB,
  skip_trigger BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS :schemaName.received_api_requests (
    id SERIAL PRIMARY KEY,
    api_id UUID NOT NULL,
    workflow_id UUID NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    body JSONB NOT NULL,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS :schemaName.api_payload_maps (
    id SERIAL PRIMARY KEY,
    endpoint_address UUID NOT NULL,
    payload JSONB NOT NULL,
    response TEXT NOT NULL,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (endpoint_address)
);


CREATE TABLE IF NOT EXISTS :schemaName.steps_executed (
    id SERIAL PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    workflow_history_id UUID NOT NULL,
    run_response JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'executed',
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS :schemaName.active_connectors (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    path TEXT NOT NULL UNIQUE,
    logo TEXT NOT NULL,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the schema and table for connections
CREATE TABLE IF NOT EXISTS :schemaName.connections (
    id SERIAL PRIMARY KEY,
    connector TEXT NOT NULL REFERENCES :schemaName.active_connectors(path),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tenant_id TEXT NOT NULL,
    email_address TEXT,
    tokens JSONB,
    status VARCHAR(50) DEFAULT 'Disconnected',
    state VARCHAR(50) DEFAULT 'Inactive',
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email_address, connector)
);
CREATE TABLE IF NOT EXISTS :schemaName.connector_actions (
    id SERIAL PRIMARY KEY,
    connector TEXT NOT NULL REFERENCES :schemaName.active_connectors(path),
    action_name TEXT NOT NULL,
    description TEXT,
    config JSONB,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (connector, action_name)
);

INSERT INTO :schemaName.active_connectors (
    title,
    description,
    path,
    logo
) VALUES
    (
    'Gmail',
    'Connect your Gmail to monitor emails and respond.',
    'gmail',
    '/logos/gmail.svg'
  ),
  (
    'Google Calendar',
    'Connect your Google Calendar to schedule meetings.',
    'googleCalendar',
    '/logos/googleCalendar.svg'
  ),
  (
    'Facebook Leads',
    'Connect your Facebook to monitor incoming leads.',
    'facebookLeads',
    '/logos/meta.svg'
  ),
  (
    'Microsoft Teams',
    'Connect your Teams to communicate with your teams.',
    'microsoftTeams',
    '/logos/msTeams.svg'
  ),
  (
    'Slack',
    'Connect your Slack to communicate with your teams.',
    'slack',
    '/logos/slack.svg'
  ),
  (
    'Microsoft Outlook',
    'Connect your Outlook to monitor emails and respond.',
    'outlook',
    '/logos/outlook.svg'
  ),
  (
    'Outlook Calendar',
    'Connect your Outlook Calendar to schedule meetings.',
    'outlookCalendar',
    '/logos/outlookCalendar.svg'
  ),
  (
    'Zoom Meetings',
    'Connect your Zoom to schedule meetings.',
    'zoomMeetings',
    '/logos/zoom.svg'
  ),
  (
    'Salesforce',
    'Connect your Salesforce to integrate leads into CRM.',
    'salesforce',
    '/logos/salesforce.svg'
  ),
  (
    'AWS',
    'Connect your AWS Account to integrate AWS events.',
    'aws',
    '/logos/aws.svg'
  ),
  (
    'WordPress',
    'Connect your WordPress Account to integrate your WordPress.',
    'wordpress',
    '/logos/wordpress.svg'
  ),
  (
    'Shopify',
    'Connect your Shopify Account to integrate your Shopify.',
    'shopify',
    '/logos/shopify.svg'
  )
on conflict do nothing;

--Under Progress

CREATE TABLE IF NOT EXISTS :schemaName.notifications (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    message JSONB,
    link TEXT,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS :schemaName.fetched_notifications (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    message JSONB,
    link TEXT,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS :schemaName.poller_jobs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Inactive',
    purpose VARCHAR(255) CHECK (purpose IS NULL OR purpose IN ('Action', 'Workflow')),
    action TEXT,
    workflow TEXT,
    workflow_payload JSONB,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    interval INTEGER NOT NULL DEFAULT 5,
    sid TEXT,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS :schemaName.hoox_functions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    code TEXT NOT NULL DEFAULT 'async function handleFunction(input) {
     return input
     }',
    tested BOOLEAN NOT NULL DEFAULT false,
    inputs TEXT,
    output_keys TEXT,
    output_type TEXT,
    skip_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
