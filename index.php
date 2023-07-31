<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pfe</title>
</head>

<body>
    <h1>Press to execut scrpit</h1>
    <form action="" method="post">
        <input type="submit" value="Execute" name="submit">
    </form>

    <?php
    if (isset($_POST['submit'])) {
        echo '<h4>Sumbit</h4>';
        $servername = "localhost"; // Replace with your database server name
        $username = "root"; // Replace with your database username
        $password = ""; // Replace with your database password
        $database = "gestion_commerciale"; // Replace with your database name

        // Create a connection to the database
        $conn = new mysqli($servername, $username, $password, $database);

        // Check the connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        // SQL script to create the "user" table
        $createUserTableSql = "CREATE TABLE IF NOT EXISTS user (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at DATE NULL,
            last_modification DATE NULL
        )";

        // Execute the SQL script to create the "user" table
        if ($conn->query($createUserTableSql) === TRUE) {
            echo "Table 'user' created successfully.<br>";
        } else {
            echo "Error creating table 'user' - Error: " . $conn->error . "<br>";
        }

        // Get a list of all tables in the database
        $sql = "SHOW TABLES";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $tableName = $row['Tables_in_' . $database];

                // Add the "created_at" and "last_modification" columns to each table
                $alterTableSql = "ALTER TABLE $tableName
                                  ADD COLUMN created_at DATE NULL,
                                  ADD COLUMN last_modification DATE NULL";

                if ($conn->query($alterTableSql) === TRUE) {
                    echo "Columns added successfully to table: $tableName<br>";
                } else {
                    echo "Error adding columns to table: $tableName - Error: " . $conn->error . "<br>";
                }
            }
        } else {
            echo "No tables found in the database.";
        }

        // Close the database connection
        $conn->close();
    }
    ?>
</body>

</html>