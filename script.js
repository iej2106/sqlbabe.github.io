document.getElementById('run-query').addEventListener('click', function() {
    // Get the SQL query entered by the user
    var query = document.getElementById('sql-query').value;
    
    // Send the SQL query to the server for execution
    fetch('query.php', {
        method: 'POST',
        body: JSON.stringify({ query: query }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Display the results returned by the server
        var output = document.getElementById('output');
        output.innerHTML = ''; // Clear previous results
        
        // Create a table to display the results
        var table = document.createElement('table');
        table.border = '1';
        
        // Create table headers
        var thead = document.createElement('thead');
        var headerRow = document.createElement('tr');
        for (var key in data[0]) {
            var th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table rows and cells for each result row
        var tbody = document.createElement('tbody');
        data.forEach(function(rowData) {
            var row = document.createElement('tr');
            for (var key in rowData) {
                var cell = document.createElement('td');
                cell.textContent = rowData[key];
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        
        // Append the table to the output div
        output.appendChild(table);
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        var output = document.getElementById('output');
        output.innerHTML = 'An error occurred. Please try again.';
    });
});
