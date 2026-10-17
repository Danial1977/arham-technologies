-- ==============================================================================
-- NexusFlow ERP: Enterprise AI Supply Chain & Intelligent Inventory Database Schema
-- Target Engine: PostgreSQL 17+
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. ORGANIZATIONS (Multi-Tenant Core)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS ai_demand_forecasts CASCADE;
DROP TABLE IF EXISTS sales_order_items CASCADE;
DROP TABLE IF EXISTS sales_orders CASCADE;
DROP TABLE IF EXISTS purchase_order_items CASCADE;
DROP TABLE IF EXISTS purchase_orders CASCADE;
DROP TABLE IF EXISTS inventory_transactions CASCADE;
DROP TABLE IF EXISTS inventory_levels CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS suppliers CASCADE;
DROP TABLE IF EXISTS warehouses CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    subscription_tier VARCHAR(50) DEFAULT 'Enterprise',
    currency VARCHAR(3) DEFAULT 'USD',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 2. USERS & RBAC (Role-Based Access Control)
-- -----------------------------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Executive', 'Warehouse_Manager', 'Procurement_Lead', 'Auditor')),
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_org ON users(organization_id);

-- -----------------------------------------------------------------------------
-- 3. WAREHOUSES & HUBS
-- -----------------------------------------------------------------------------
CREATE TABLE warehouses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    capacity_sqft INT NOT NULL DEFAULT 50000,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_warehouses_org ON warehouses(organization_id);

-- -----------------------------------------------------------------------------
-- 4. SUPPLIERS / VENDORS
-- -----------------------------------------------------------------------------
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    lead_time_days INT NOT NULL DEFAULT 7,
    reliability_rating NUMERIC(4, 2) DEFAULT 95.00 CHECK (reliability_rating BETWEEN 0 AND 100),
    payment_terms VARCHAR(50) DEFAULT 'Net 30',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_suppliers_org ON suppliers(organization_id);

-- -----------------------------------------------------------------------------
-- 5. PRODUCTS / MASTER SKUs
-- -----------------------------------------------------------------------------
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    barcode VARCHAR(100) UNIQUE,
    category VARCHAR(100) NOT NULL,
    unit_cost NUMERIC(12, 2) NOT NULL,
    selling_price NUMERIC(12, 2) NOT NULL,
    reorder_point INT NOT NULL DEFAULT 50,
    target_stock INT NOT NULL DEFAULT 200,
    uom VARCHAR(20) DEFAULT 'PCS',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_org ON products(organization_id);
CREATE INDEX idx_products_sku ON products(sku);

-- -----------------------------------------------------------------------------
-- 6. INVENTORY LEVELS (Real-time Stock per Warehouse)
-- -----------------------------------------------------------------------------
CREATE TABLE inventory_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warehouse_id UUID NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    on_hand_qty INT NOT NULL DEFAULT 0 CHECK (on_hand_qty >= 0),
    reserved_qty INT NOT NULL DEFAULT 0 CHECK (reserved_qty >= 0),
    in_transit_qty INT NOT NULL DEFAULT 0 CHECK (in_transit_qty >= 0),
    bin_rack_location VARCHAR(50),
    last_counted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_warehouse_product UNIQUE(warehouse_id, product_id)
);

CREATE INDEX idx_inv_levels_wh ON inventory_levels(warehouse_id);
CREATE INDEX idx_inv_levels_prod ON inventory_levels(product_id);

-- -----------------------------------------------------------------------------
-- 7. INVENTORY TRANSACTIONS (Double-Entry Immutable Ledger)
-- -----------------------------------------------------------------------------
CREATE TABLE inventory_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warehouse_id UUID NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    authorized_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('INBOUND_RECEIPT', 'OUTBOUND_SALE', 'TRANSFER', 'CYCLE_COUNT_ADJUSTMENT')),
    quantity_delta INT NOT NULL,
    balance_after INT NOT NULL,
    reference_type VARCHAR(50) NOT NULL CHECK (reference_type IN ('PURCHASE_ORDER', 'SALES_ORDER', 'TRANSFER_TICKET', 'SYSTEM_AUDIT')),
    reference_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inv_txn_wh_prod ON inventory_transactions(warehouse_id, product_id);
CREATE INDEX idx_inv_txn_created ON inventory_transactions(created_at DESC);

-- -----------------------------------------------------------------------------
-- 8. PURCHASE ORDERS (Procurement & Supplier Inflow)
-- -----------------------------------------------------------------------------
CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
    created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    po_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SUBMITTED', 'CONFIRMED', 'IN_TRANSIT', 'RECEIVED', 'CANCELLED')),
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    ai_trigger_reason TEXT,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expected_delivery DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE purchase_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_order_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity_ordered INT NOT NULL CHECK (quantity_ordered > 0),
    unit_price NUMERIC(12, 2) NOT NULL,
    quantity_received INT NOT NULL DEFAULT 0 CHECK (quantity_received >= 0),
    subtotal NUMERIC(14, 2) GENERATED ALWAYS AS (quantity_ordered * unit_price) STORED
);

CREATE INDEX idx_po_org ON purchase_orders(organization_id);
CREATE INDEX idx_po_supplier ON purchase_orders(supplier_id);

-- -----------------------------------------------------------------------------
-- 9. SALES ORDERS (Customer Demand & Outflow)
-- -----------------------------------------------------------------------------
CREATE TABLE sales_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    so_number VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'ALLOCATED', 'DISPATCHED', 'DELIVERED', 'CANCELLED')),
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sales_order_id UUID NOT NULL REFERENCES sales_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL,
    subtotal NUMERIC(14, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

CREATE INDEX idx_so_org ON sales_orders(organization_id);

-- -----------------------------------------------------------------------------
-- 10. AI DEMAND FORECASTS (Predictive Intelligence Model)
-- -----------------------------------------------------------------------------
CREATE TABLE ai_demand_forecasts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    warehouse_id UUID NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
    forecast_month DATE NOT NULL,
    predicted_demand_qty INT NOT NULL,
    confidence_score NUMERIC(5, 4) NOT NULL CHECK (confidence_score BETWEEN 0.0000 AND 1.0000),
    recommended_reorder_qty INT NOT NULL,
    model_version VARCHAR(50) DEFAULT 'Prophet-v3.2-Ensemble',
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_forecast_prod_wh_month UNIQUE(product_id, warehouse_id, forecast_month)
);

CREATE INDEX idx_forecast_prod ON ai_demand_forecasts(product_id);
CREATE INDEX idx_forecast_wh ON ai_demand_forecasts(warehouse_id);

-- -----------------------------------------------------------------------------
-- 11. AUDIT LOGS (Compliance & Security Event Tracking)
-- -----------------------------------------------------------------------------
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    metadata JSONB,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_org ON audit_logs(organization_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

-- ==============================================================================
-- SEED DATA: ENTERPRISE DEMO DATASET
-- ==============================================================================

-- 1. Insert Organization
INSERT INTO organizations (id, name, slug, subscription_tier, currency)
VALUES ('a0000000-0000-0000-0000-000000000001', 'Arham Global Supply Chain Corp', 'arham-global', 'Enterprise Ultra', 'USD');

-- 2. Insert Users
INSERT INTO users (id, organization_id, email, full_name, role) VALUES
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'yasir@arhamtechnologies.com', 'Yasir Islam Butt', 'Executive'),
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'ops.manager@arhamcorp.io', 'Marcus Vance', 'Warehouse_Manager'),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'procure.lead@arhamcorp.io', 'Elena Rostova', 'Procurement_Lead');

-- 3. Insert Warehouses
INSERT INTO warehouses (id, organization_id, code, name, city, country, capacity_sqft) VALUES
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'WH-DXB-01', 'Dubai South Mega Hub', 'Dubai', 'UAE', 120000),
('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'WH-NYC-02', 'New York Metro Logistics Center', 'New York', 'USA', 95000),
('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'WH-SIN-03', 'Singapore Free Port Terminal', 'Singapore', 'Singapore', 80000);

-- 4. Insert Suppliers
INSERT INTO suppliers (id, organization_id, code, name, contact_email, lead_time_days, reliability_rating, payment_terms) VALUES
('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'SUP-TYO-01', 'Tokyo Robotics & Sensors Ltd', 'orders@tokyorobotics.co.jp', 8, 98.40, 'Net 30'),
('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'SUP-MUC-02', 'Bavaria Industrial Automation GmbH', 'b2b@bavaria-automation.de', 12, 96.10, 'Net 45'),
('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'SUP-SZN-03', 'Shenzhen Vision Tech Hardware Co', 'export@shenzhenvision.cn', 5, 94.75, 'Net 15');

-- 5. Insert Products
INSERT INTO products (id, organization_id, sku, name, barcode, category, unit_cost, selling_price, reorder_point, target_stock) VALUES
('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'ROB-LIDAR-4K', 'Autonomous LiDAR Precision Sensor 4K', '890123450001', 'Robotics & Vision', 320.00, 580.00, 40, 200),
('e0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'EDGE-TPU-X1', 'Neural Edge Processing Unit TPU-X1', '890123450002', 'Edge Computing', 180.00, 340.00, 50, 250),
('e0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'DRV-SERVO-800W', 'High-Torque Brushless Servo Motor 800W', '890123450003', 'Actuators & Motors', 145.00, 290.00, 30, 150),
('e0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'BAT-LIFEPO4-48V', 'Industrial LiFePO4 Power Block 48V 100Ah', '890123450004', 'Energy Storage', 850.00, 1420.00, 15, 60),
('e0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'OPT-FIBER-100G', 'Sub-Zero Rugged Optical Transceiver 100G', '890123450005', 'Networking', 95.00, 185.00, 60, 300);

-- 6. Insert Inventory Levels
INSERT INTO inventory_levels (warehouse_id, product_id, on_hand_qty, reserved_qty, in_transit_qty, bin_rack_location) VALUES
('c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 145, 20, 50, 'Aisle-01-Rack-A3'),
('c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 190, 15, 0, 'Aisle-01-Rack-B1'),
('c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000003', 28, 5, 100, 'Aisle-02-Rack-C4'), -- Below reorder threshold!
('c0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 82, 10, 0, 'Bay-NY-04'),
('c0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000004', 34, 4, 20, 'Heavy-Zone-01'),
('c0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 110, 0, 40, 'SG-Terminal-R7'),
('c0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000005', 215, 30, 0, 'Clean-Vault-02');

-- 7. Insert Inventory Ledger Transactions
INSERT INTO inventory_transactions (warehouse_id, product_id, authorized_by_user_id, type, quantity_delta, balance_after, reference_type, reference_number, notes) VALUES
('c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 'INBOUND_RECEIPT', 150, 150, 'PURCHASE_ORDER', 'PO-2026-0001', 'Initial consignment arrival from Tokyo Robotics'),
('c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 'OUTBOUND_SALE', -5, 145, 'SALES_ORDER', 'SO-2026-0089', 'Order fulfillment for AeroNav Dynamics');

-- 8. Insert Purchase Orders (including AI Autonomous Trigger)
INSERT INTO purchase_orders (id, organization_id, supplier_id, created_by_user_id, po_number, status, total_amount, is_ai_generated, ai_trigger_reason, expected_delivery) VALUES
('f0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'PO-2026-0001', 'RECEIVED', 48000.00, FALSE, NULL, '2026-09-15'),
('f0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'PO-2026-0042', 'CONFIRMED', 14500.00, TRUE, 'Autonomous Agent detected Dubai Hub Servo Motor stock (28) fell below safety threshold (30). Triggered restock of 100 units.', '2026-10-02');

INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity_ordered, unit_price, quantity_received) VALUES
('f0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 150, 320.00, 150),
('f0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 100, 145.00, 0);

-- 9. Insert Sales Orders
INSERT INTO sales_orders (id, organization_id, so_number, customer_name, customer_email, status, total_amount) VALUES
('90000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'SO-2026-0089', 'AeroNav Dynamics Global', 'procurement@aeronav.com', 'DISPATCHED', 2900.00),
('90000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'SO-2026-0090', 'Nordic Drone Systems AS', 'inbound@nordicdrones.no', 'ALLOCATED', 17000.00);

INSERT INTO sales_order_items (sales_order_id, product_id, quantity, unit_price) VALUES
('90000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 5, 580.00),
('90000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 50, 340.00);

-- 10. Insert AI Demand Forecasts (Q4 2026 predictions)
INSERT INTO ai_demand_forecasts (product_id, warehouse_id, forecast_month, predicted_demand_qty, confidence_score, recommended_reorder_qty, model_version) VALUES
('e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', '2026-10-01', 180, 0.9620, 120, 'Prophet-v3.2-Ensemble'),
('e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', '2026-10-01', 230, 0.9480, 150, 'Prophet-v3.2-Ensemble'),
('e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', '2026-10-01', 140, 0.9710, 100, 'Prophet-v3.2-Ensemble'),
('e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000002', '2026-10-01', 45, 0.9150, 30, 'DeepAR-v2.1-LSTM');

-- 11. Insert Audit Log
INSERT INTO audit_logs (organization_id, user_id, action, entity_name, entity_id, metadata) VALUES
('a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'INITIALIZE_SCHEMA', 'DATABASE', 'nexus_erp', '{"version": "1.0.0", "status": "DEPLOYED", "engine": "PostgreSQL 17.6"}');
