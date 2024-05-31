<?php

// Get the SQL query from the request body
$data = json_decode(file_get_contents('php://input'), true);
$query = $data['query'];

// Connect to your database (replace dbname, username, password with your database credentials)
$pdo = new PDO('mysql:host=localhost;dbname=mydatabase', 'username', 'password');

// Prepare and execute the SQL query
$statement = $pdo->prepare($query);
$statement->execute();

// Fetch results
$results = $statement->fetchAll(PDO::FETCH_ASSOC);

// Return results as JSON
echo json_encode($results);
