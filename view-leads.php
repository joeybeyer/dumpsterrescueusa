<?php
// Simple password protection
$password = 'dumpster2024'; // CHANGE THIS!
session_start();

if (!isset($_SESSION['authenticated'])) {
    if (isset($_POST['password'])) {
        if ($_POST['password'] === $password) {
            $_SESSION['authenticated'] = true;
        } else {
            $error = 'Invalid password';
        }
    }

    if (!isset($_SESSION['authenticated'])) {
        ?>
        <!DOCTYPE html>
        <html>
        <head>
            <title>View Leads - Login</title>
            <style>
                body { font-family: Arial; max-width: 400px; margin: 100px auto; padding: 20px; }
                input { width: 100%; padding: 10px; margin: 10px 0; }
                button { background: #e53e3e; color: white; padding: 10px 20px; border: none; cursor: pointer; }
            </style>
        </head>
        <body>
            <h2>Lead Viewer Login</h2>
            <?php if (isset($error)) echo "<p style='color:red'>$error</p>"; ?>
            <form method="POST">
                <input type="password" name="password" placeholder="Enter password" required>
                <button type="submit">Login</button>
            </form>
        </body>
        </html>
        <?php
        exit;
    }
}

// Database configuration - MATCH send-form.php
$db_host = 'localhost';
$db_name = 'dumpster_leads';
$db_user = 'dumpster_user';
$db_pass = 'YOUR_DATABASE_PASSWORD'; // Update this!

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get filter
    $days = isset($_GET['days']) ? (int)$_GET['days'] : 30;

    $stmt = $pdo->prepare("
        SELECT * FROM leads
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL :days DAY)
        ORDER BY created_at DESC
    ");
    $stmt->execute([':days' => $days]);
    $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get total count
    $totalStmt = $pdo->query("SELECT COUNT(*) as count FROM leads");
    $total = $totalStmt->fetch(PDO::FETCH_ASSOC)['count'];

} catch (PDOException $e) {
    die("Database error: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Lead Manager - Dumpster Rescue USA</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: #f7fafc; }
        .header { background: #1a202c; color: white; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header h1 { font-size: 24px; }
        .header .logout { float: right; color: #fed7d7; text-decoration: none; }
        .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-card h3 { font-size: 14px; color: #718096; margin-bottom: 8px; }
        .stat-card .number { font-size: 32px; font-weight: bold; color: #2d3748; }
        .filters { background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .filters a { margin-right: 15px; padding: 8px 16px; text-decoration: none; color: #4a5568; border-radius: 4px; }
        .filters a.active { background: #e53e3e; color: white; }
        table { width: 100%; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        th { background: #2d3748; color: white; text-align: left; padding: 12px; font-weight: 600; }
        td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
        tr:last-child td { border-bottom: none; }
        tr:hover { background: #f7fafc; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
        .badge-new { background: #48bb78; color: white; }
        .badge-old { background: #cbd5e0; color: #2d3748; }
        .no-leads { text-align: center; padding: 60px; color: #a0aec0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Lead Manager - Dumpster Rescue USA</h1>
        <a href="?logout=1" class="logout">Logout</a>
    </div>

    <div class="container">
        <div class="stats">
            <div class="stat-card">
                <h3>Total Leads</h3>
                <div class="number"><?php echo $total; ?></div>
            </div>
            <div class="stat-card">
                <h3>Last <?php echo $days; ?> Days</h3>
                <div class="number"><?php echo count($leads); ?></div>
            </div>
            <div class="stat-card">
                <h3>Today</h3>
                <div class="number">
                    <?php
                    echo count(array_filter($leads, function($l) {
                        return date('Y-m-d', strtotime($l['created_at'])) === date('Y-m-d');
                    }));
                    ?>
                </div>
            </div>
        </div>

        <div class="filters">
            <a href="?days=7" class="<?php echo $days == 7 ? 'active' : ''; ?>">Last 7 Days</a>
            <a href="?days=30" class="<?php echo $days == 30 ? 'active' : ''; ?>">Last 30 Days</a>
            <a href="?days=90" class="<?php echo $days == 90 ? 'active' : ''; ?>">Last 90 Days</a>
            <a href="?days=365" class="<?php echo $days == 365 ? 'active' : ''; ?>">All Time</a>
        </div>

        <?php if (count($leads) > 0): ?>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Service</th>
                    <th>Size</th>
                    <th>Source</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($leads as $lead):
                    $isNew = strtotime($lead['created_at']) > strtotime('-24 hours');
                ?>
                <tr>
                    <td>
                        <?php echo date('M j, Y g:i A', strtotime($lead['created_at'])); ?>
                        <?php if ($isNew): ?>
                            <span class="badge badge-new">NEW</span>
                        <?php endif; ?>
                    </td>
                    <td><strong><?php echo htmlspecialchars($lead['name']); ?></strong></td>
                    <td>
                        <a href="mailto:<?php echo htmlspecialchars($lead['email']); ?>">
                            <?php echo htmlspecialchars($lead['email']); ?>
                        </a><br>
                        <a href="tel:<?php echo htmlspecialchars($lead['phone']); ?>">
                            <?php echo htmlspecialchars($lead['phone']); ?>
                        </a>
                    </td>
                    <td>
                        <?php echo htmlspecialchars($lead['city']); ?>,
                        <?php echo htmlspecialchars($lead['state']); ?>
                        <?php echo htmlspecialchars($lead['zip_code']); ?>
                    </td>
                    <td><?php echo htmlspecialchars($lead['project_type']); ?></td>
                    <td><?php echo htmlspecialchars($lead['dumpster_size']); ?></td>
                    <td><?php echo htmlspecialchars($lead['source']); ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php else: ?>
        <div class="no-leads">
            <h2>No leads found for the selected period</h2>
            <p>Try selecting a different time range</p>
        </div>
        <?php endif; ?>
    </div>
</body>
</html>

<?php
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: view-leads.php');
    exit;
}
?>
