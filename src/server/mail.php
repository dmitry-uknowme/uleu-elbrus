<?php

header('Content-Type: application/json; charset=utf-8');

$request = json_decode(file_get_contents("php://input"), true);

if (empty($request)) {
    http_response_code(400);
    echo json_encode(['message' => 'Данные не отправлены', 'result' => $request], JSON_UNESCAPED_UNICODE);
    return;
}

$request = $request['postData'];

$name = htmlspecialchars_decode($request['name']);
$phone = htmlspecialchars_decode($request['phone']);
$answers = $request['answers'];

$errors = [];

if (empty($name)) {
    $errors[] = "Поле 'Имя' должно быть заполнено";
}

if (empty($phone)) {
    $errors[] = "Поле 'Телефон' должно быть заполнено";
}

$need_answers_flag = true;
if (empty($answers)) {
    $need_answers_flag = false;
} else {
    if (is_array($answers)) {
        foreach ($answers as $answer) {
            // Если не существует ответа или вопроса
            if (!(isset($answer['question']) && isset($answer['answer']))) {
                $need_answers_flag = false;
            }
        }
    }
}

if (count($errors) > 0) {
    http_response_code(400);
    echo json_encode(['message' => 'Нет нужной информации', 'result' => [$errors, $request]], JSON_UNESCAPED_UNICODE);
    return;
}

$mail_to = 'd.prytckov@yandex.ru';
$mail_from = 'support@elbrus.ru';
$mail_header = 'Получена заявка!';
$content = '';

$content .= "<h1>Заявка на обратный звонок от elbrus</h1>";
$content .= "<br>";
$content .= "<h2>Контактные данные</h2>";
$content .= "<hr>";
$content .= "<p><b>Имя: </b>$name</p>";
$content .= "<p><b>Телефон: </b>$phone</p>";
$content .= "<br>";

if ($need_answers_flag) {
    $content .= "<h2>Данные из формы</h2>";
    foreach ($answers as $answer) {
        $content .= "<p><b>"
            . htmlspecialchars_decode($answer['question'])
            .": </b>"
            . htmlspecialchars_decode($answer['answer'])
            . "</p>";
    }
}

$mail_result = mail(
  $mail_to,
  $mail_header,
  $content,
  "From: " . $mail_from . "\r\n"
  . "Content-type: text/html; charset=utf-8\r\n"
  . "X-Mailer: PHP mail script"
);

if (!$mail_result) {
    http_response_code(500);
    echo json_encode(['message' => 'Неизвестная ошибка сервера', 'result' => $request], JSON_UNESCAPED_UNICODE);
    return;
}

http_response_code(200);
echo json_encode(['message' => 'Ваша заявка принята', 'result' => ''], JSON_UNESCAPED_UNICODE);
return;