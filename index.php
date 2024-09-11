<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Black & White Form</title>
    <link rel="stylesheet" href="styles.css"> <!-- Link to external stylesheet -->
</head>

<body>
    <div id="filters">
        <a href="/">Reset</a>
    </div>
    <form id="postForm">
        <input type="text" name="name" placeholder="Navn">
        <input type="text" name="brand" placeholder="Brand">
        <input type="text" name="calories" placeholder="Kalorier (du er tyk)">
        <button type="submit" class="form-button">Submit</button>
    </form>
    <div id="content"></div>
    <script src="./script.js"></script>
</body>

</html>