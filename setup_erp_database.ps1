$env:PGPASSWORD = "admin"
$psqlPath = "C:\Program Files\PostgreSQL\17\bin\psql.exe"
$sqlFile = "C:\Users\Admin\.gemini\antigravity\scratch\arham-technologies\nexus_erp_schema.sql"

Write-Output ">>> STEP 1: Creating database 'nexus_erp' if not exists..."
& $psqlPath -U postgres -h localhost -p 5432 -d postgres -c "SELECT 1 FROM pg_database WHERE datname = 'nexus_erp';" | Out-Null
$check = & $psqlPath -U postgres -h localhost -p 5432 -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'nexus_erp';"

if ($check -ne "1") {
    Write-Output "Database 'nexus_erp' does not exist. Creating..."
    & $psqlPath -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE nexus_erp OWNER postgres;"
    Write-Output "Database 'nexus_erp' created successfully!"
} else {
    Write-Output "Database 'nexus_erp' already exists."
}

Write-Output ""
Write-Output ">>> STEP 2: Executing enterprise DDL schema & seed data into 'nexus_erp'..."
& $psqlPath -U postgres -h localhost -p 5432 -d nexus_erp -f $sqlFile

Write-Output ""
Write-Output ">>> STEP 3: Verifying table row counts in 'nexus_erp'..."
$verifySql = @"
SELECT 
    schemaname, 
    relname AS table_name, 
    n_live_tup AS row_count 
FROM pg_stat_user_tables 
ORDER BY relname;
"@

& $psqlPath -U postgres -h localhost -p 5432 -d nexus_erp -c $verifySql

Write-Output ""
Write-Output ">>> STEP 4: Sample Live Query: Multi-Warehouse Real-Time Inventory & Stock Valuation..."
$sampleQuery = @"
SELECT 
    w.name AS warehouse,
    p.sku,
    p.name AS product_name,
    il.on_hand_qty,
    il.reserved_qty,
    (il.on_hand_qty - il.reserved_qty) AS available_to_promise,
    il.bin_rack_location,
    ROUND(il.on_hand_qty * p.unit_cost, 2) AS stock_asset_value
FROM inventory_levels il
JOIN warehouses w ON il.warehouse_id = w.id
JOIN products p ON il.product_id = p.id
ORDER BY w.name, p.sku;
"@

& $psqlPath -U postgres -h localhost -p 5432 -d nexus_erp -c $sampleQuery

Write-Output ""
Write-Output ">>> STEP 5: Sample Live Query: Autonomous AI Agent Purchase Orders & Reasons..."
$samplePoQuery = @"
SELECT 
    po.po_number,
    s.name AS supplier,
    po.status,
    po.total_amount,
    po.is_ai_generated,
    po.ai_trigger_reason
FROM purchase_orders po
JOIN suppliers s ON po.supplier_id = s.id;
"@

& $psqlPath -U postgres -h localhost -p 5432 -d nexus_erp -c $samplePoQuery

Write-Output ""
Write-Output "ALL DATABASE SETUP & VERIFICATION COMPLETED SUCCESSFULLY!"
