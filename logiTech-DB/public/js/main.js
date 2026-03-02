 // 1. Settings and instances
const API_URL = '/api';

/*  // 2. Services (calls to the API)
const PaymentService = {
    // Corregido: res => res.json() para que la promesa resuelva el cuerpo
    getAll: (payment = '') => 
        fetch(`${API_URL}/payments?payment_id=${payment}`).then(res => res.json()),
    
    // Agregamos el servicio de migración
    migrate: (formData) => 
        fetch(`${API_URL}/migrate`, { method: 'POST', body: formData }).then(res => res.json())
}; 
  */
 
const ProductService = {
    getData: (name) => fetch(`${API_URL}/deleted/${name}/history`).then(res => res.json())
};
 
/* // 3. UI components (RENDERING)
// Wrapped loose logic into renderDoctorTable function to fix reference errors
function renderPaymentTable(doctors) {
    const tbody = document.getElementById('doctor-tbody');
    if (!tbody) return;

    // 2. Mapeo de datos (Ajustado a los campos de MariaDB)
    tbody.innerHTML = doctors.map(pay => `
        <tr class="border-b hover:bg-slate-50 transition">
            <td class="py-4 px-2 font-mono text-blue-600 text-sm">
                ${pay.transaction_id || 'N/A'}
            </td>
            <td class="py-4 px-2 font-medium">
                ${pay.date || 'Unknown'}
            </td>
            <td class="py-4 px-2 text-sm">
                <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase">
                    ${pay.total_line_value || 'General'}
                </span>
            </td>
        </tr>
    `).join('');
} 
 */
function renderDeletedProduct(data) {
    const display = document.querySelector('#json-display');
    if (display) {
        display.innerText = JSON.stringify(data, null, 2);
    }
}

/*  // 4. Event controllers
document.addEventListener('DOMContentLoaded', async () => {
    // Initial Load
    const initialPayments = await PaymentService.getAll();
    renderDoctorTable(initialPayments);  */

    // Search Deleted Product
    const btnSearch = document.querySelector('#btn-search');
    const textInput = document.querySelector('#name-search');

    btnSearch?.addEventListener('click', async () => {
        // Use trim to avoid empty spaces in the text search
        const text = textInput.value.trim();
        if (!text) return alert("Please enter a product name");
        
        renderDeletedProduct({ status: "Searching..." });
        try {
            const data = await ProductService.getData(text);
            renderDeletedProduct(data);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    });

/*     // Filter payments
    document.querySelector('#specialty-filter')?.addEventListener('change', async (e) => {
        const filtered = await DoctorService.getAll(e.target.value);
        renderDoctorTable(filtered);
    }); */

/*     // Handle Migration Form
    document.querySelector('#upload-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const result = await DoctorService.migrate(new FormData(e.target));
        alert(result.message || result.error);
        if (result.message) location.reload(); 
    });
});  */