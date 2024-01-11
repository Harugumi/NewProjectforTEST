document.addEventListener('DOMContentLoaded', function () {
    showEquipmentList();
});

function showEquipmentList() {
    fetch('/api/equipmentList')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('equipment-table-body');
            tableBody.innerHTML = "";

            data.forEach(equipment => {
                const row = tableBody.insertRow();
                const cells = ['id_equipment', 'equipment_name', 'available_quantity', 'total_quantity', 'status', 'description'];

                cells.forEach(cellName => {
                    const cell = row.insertCell();
                    cell.textContent = equipment[cellName];
                });
            });

            // เรียกใช้ DataTables
            $('#equipment-table').DataTable();
        })
        .catch(error => console.error('Error fetching equipment data:', error));
}
