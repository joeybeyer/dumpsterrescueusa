<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Database configuration - UPDATE THESE WITH YOUR CREDENTIALS
$db_host = 'localhost';
$db_name = 'dumpster_leads';
$db_user = 'dumpster_user';
$db_pass = 'YOUR_DATABASE_PASSWORD'; // Update this!

// Email configuration
$to = 'dumpsterrescue@gmail.com';
$subject = 'New Quote Request from DumpsterRescueUSA.com';

$data = json_decode(file_get_contents('php://input'), true);

// Extract form data
$zip = $data['zip'] ?? $data['zipCode'] ?? 'Not provided';
$service = $data['service'] ?? $data['projectType'] ?? 'Not provided';
$dumpsterSize = $data['dumpsterSize'] ?? 'Not provided';
$city = $data['city'] ?? 'Not provided';
$state = $data['state'] ?? 'Not provided';
$name = $data['name'] ?? 'Not provided';
$email = $data['email'] ?? 'Not provided';
$phone = $data['phone'] ?? 'Not provided';
$smsOptIn = isset($data['smsOptIn']) ? ($data['smsOptIn'] ? 'Yes' : 'No') : 'Not provided';
$source = $data['source'] ?? 'Not provided';
$message_text = $data['message'] ?? 'Not provided';

// Connect to database
try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insert into database
    $stmt = $pdo->prepare("
        INSERT INTO leads (
            name, email, phone, city, state, zip_code,
            project_type, dumpster_size, message, source,
            sms_opt_in, created_at
        ) VALUES (
            :name, :email, :phone, :city, :state, :zip,
            :project_type, :dumpster_size, :message, :source,
            :sms_opt_in, NOW()
        )
    ");

    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':city' => $city,
        ':state' => $state,
        ':zip' => $zip,
        ':project_type' => $service,
        ':dumpster_size' => $dumpsterSize,
        ':message' => $message_text,
        ':source' => $source,
        ':sms_opt_in' => $smsOptIn
    ]);

    $lead_id = $pdo->lastInsertId();

} catch (PDOException $e) {
    // Log error but don't fail the form submission
    error_log("Database error: " . $e->getMessage());
    $lead_id = null;
}

// Send email notification
$message = "New Quote Request\n";
$message .= "=================\n\n";
$message .= "ZIP Code: " . $zip . "\n";
$message .= "City/State: " . $city . ", " . $state . "\n";
$message .= "Name: " . $name . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Phone: " . $phone . "\n";
$message .= "Service Type: " . $service . "\n";
$message .= "Dumpster Size: " . $dumpsterSize . "\n";
$message .= "SMS Opt-In: " . $smsOptIn . "\n";
$message .= "Message: " . $message_text . "\n";
$message .= "Source: " . $source . "\n";
$message .= "\n-----------------\n";
$message .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
if ($lead_id) {
    $message .= "Lead ID: " . $lead_id . "\n";
}

$headers = "From: noreply@dumpsterrescueusa.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

$emailSent = mail($to, $subject, $message, $headers);

if ($emailSent || $lead_id) {
    echo json_encode([
        'success' => true,
        'message' => 'Form submitted successfully',
        'lead_id' => $lead_id
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to process submission']);
}
?>
