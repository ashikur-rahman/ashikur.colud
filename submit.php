<?php
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || empty($input["user_question"])) {
    echo json_encode(["message" => "Missing question"]);
    exit;
}

$session_id = $input["session_id"] ?? "unknown_session";

$payload = [
    "body" => [
        "user_email"    => $input["user_email"] ?? "unknown@example.com",
        "user_question" => $input["user_question"],
        "session_id"    => $session_id   // 🔥 IMPORTANT
    ]
];

$N8N_WEBHOOK = "https://n8n.srv1062687.hstgr.cloud/webhook/61842f10-db21-4447-8bee-24e8615b2449";
//$N8N_WEBHOOK = "https://n8n.srv1062687.hstgr.cloud/webhook-test/61842f10-db21-4447-8bee-24e8615b2449";

// SEND TO N8N
$ch = curl_init($N8N_WEBHOOK);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
curl_close($ch);

// PARSE N8N RESPONSE
$data = json_decode($response, true);

$clean = "";

// CASE 1: AI Agent returns array
if (isset($data[0]["json"]["output"])) {
    $clean = $data[0]["json"]["output"];
}
// CASE 2: AI Agent returns object
elseif (isset($data["output"])) {
    $clean = $data["output"];
}
// fallback
else {
    $clean = $response;
}

// formatting
$clean = str_replace("\\n", "\n", $clean);
$clean = nl2br($clean);
$clean = htmlspecialchars_decode($clean);

echo json_encode([
    "message_clean" => $clean
]);
exit;

