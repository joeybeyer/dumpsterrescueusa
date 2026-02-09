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

$data = json_decode(file_get_contents('php://input'), true);

$to = 'dumpsterrescue@gmail.com';
$subject = 'New Quote Request from DumpsterRescueUSA.com';

$zip = $data['zip'] ?? $data['zipCode'] ?? 'Not provided';
$service = $data['service'] ?? $data['projectType'] ?? 'Not provided';
$dumpsterSize = $data['dumpsterSize'] ?? 'Not provided';
$city = $data['city'] ?? 'Not provided';
$state = $data['state'] ?? 'Not provided';
$smsOptIn = isset($data['smsOptIn']) ? ($data['smsOptIn'] ? 'Yes' : 'No') : 'Not provided';
$source = $data['source'] ?? 'Not provided';

$message = "New Quote Request\n";
$message .= "=================\n\n";
$message .= "ZIP Code: " . $zip . "\n";
$message .= "City/State: " . $city . ", " . $state . "\n";
$message .= "Name: " . ($data['name'] ?? 'Not provided') . "\n";
$message .= "Email: " . ($data['email'] ?? 'Not provided') . "\n";
$message .= "Phone: " . ($data['phone'] ?? 'Not provided') . "\n";
$message .= "Service Type: " . $service . "\n";
$message .= "Dumpster Size: " . $dumpsterSize . "\n";
$message .= "SMS Opt-In: " . $smsOptIn . "\n";
$message .= "Message: " . ($data['message'] ?? 'Not provided') . "\n";
$message .= "Source: " . $source . "\n";
$message .= "\n-----------------\n";
$message .= "Submitted: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: noreply@dumpsterrescueusa.com\r\n";
$headers .= "Reply-To: " . ($data['email'] ?? 'noreply@dumpsterrescueusa.com') . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Form submitted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
