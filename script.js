// Atık türleri ve puanlar
const wastePoints = {
    "Kağıt": 10,
    "Cam": 15,
    "Plastik": 5,
    "Organik": 2,
    "Yağ": 20,
    "Tekstil": 8,
    "Elektronik Atık": 50,
    "Pil": 30
};

// Öğrenci bilgileri (Örnek)
let students = [
    { studentName: "Ahmet", studentSurname: "Yılmaz", studentNumber: "12345", studentEmail: "ahmet@example.com", totalPoints: 0 },
    { studentName: "Mehmet", studentSurname: "Kaya", studentNumber: "67890", studentEmail: "mehmet@example.com", totalPoints: 0 }
];

// Sayfa gösterme fonksiyonu
function showPage(page) {
    const contentDiv = document.getElementById('page-content');
    let pageContent = '';

    switch (page) {
        case 'ekolojik-kredi':
            pageContent = getEcologicalCreditInfo();
            break;
        case 'geri-donusum':
            pageContent = getRecyclingInfo();
            break;
        case 'toplam-atik':
            pageContent = getTotalWasteInfo();
            break;
        case 'ekolojik-kredi-sistemi':
            pageContent = getEcologicalCreditSystemPage();
            break;
        case 'kayit-ol':
            pageContent = getRegistrationForm();
            break;
        case 'veri-giris':
            pageContent = getWasteEntryForm();
            break;
        case 'veri-goruntule':
            pageContent = getDataViewPage();
            break;
        default:
            pageContent = '<h3>Sayfa Bulunamadı</h3>';
            break;
    }

    contentDiv.innerHTML = pageContent;
}

// Ekolojik kredi hakkında bilgi döndüren fonksiyon
function getEcologicalCreditInfo() {
    return `
        <h3>Ekolojik Kredi</h3>
        <p>Ekolojik kredi, geri dönüşüm ve çevre dostu faaliyetlere katılım gösteren bireylere verilen bir ödül sistemidir. Bu sistem, çevreye duyarlı bireylerin katkılarını ödüllendirir. Öğrenciler, geri dönüşüm yaparak veya çevre dostu projelere katılarak puan toplar ve bu puanları ödüllerle takas edebilirler.</p>
    `;
}

// Ekolojik kredi sisteminin sayfası
function getEcologicalCreditSystemPage() {
    return `
        <h3>Ekolojik Kredi Sistemi</h3>
        <p>Bu sayfada, öğrenci başına kazanılan toplam ekolojik kredi puanları görüntülenir. Öğrenciler, yaptıkları her geri dönüşümle puan kazanır ve bu puanlar belirli ödüllere dönüştürülebilir.</p>
        <h4>Öğrenci Kredi Durumu</h4>
        <table>
            <tr>
                <th>Öğrenci Adı</th>
                <th>Öğrenci Numarası</th>
                <th>Toplam Puan</th>
            </tr>
            ${students.map(student => `
                <tr>
                    <td>${student.studentName} ${student.studentSurname}</td>
                    <td>${student.studentNumber}</td>
                    <td>${student.totalPoints}</td>
                </tr>
            `).join('')}
        </table>
    `;
}

// Atık girişi formunu döndüren fonksiyon (devam)
function getWasteEntryForm() {
    return `
        <h3>Atık Girişi</h3>
        <form id="waste-entry-form" onsubmit="handleWasteEntry(event)">
            <label for="studentNumber">Öğrenci Numarası:</label>
            <input type="text" id="studentNumber" required><br>

            <label for="wasteType">Atık Türü:</label>
            <select id="wasteType" required>
                <option value="Kağıt">Kağıt</option>
                <option value="Cam">Cam</option>
                <option value="Plastik">Plastik</option>
                <option value="Organik">Organik</option>
                <option value="Yağ">Yağ</option>
                <option value="Tekstil">Tekstil</option>
                <option value="Elektronik Atık">Elektronik Atık</option>
                <option value="Pil">Pil</option>
            </select><br>

            <label for="quantity">Atık Miktarı (kg):</label>
            <input type="number" id="quantity" min="0" step="0.1" required><br>

            <button type="submit">Kaydet</button>
        </form>
    `;
}

// Atık girişi yapıldığında bu fonksiyon çalışacak
function handleWasteEntry(event) {
    event.preventDefault();

    const studentNumber = document.getElementById('studentNumber').value;
    const wasteType = document.getElementById('wasteType').value;
    const quantity = parseFloat(document.getElementById('quantity').value);

    // Öğrenciyi bul
    const student = students.find(s => s.studentNumber === studentNumber);
    if (student) {
        const pointsEarned = wastePoints[wasteType] * quantity; // Puan hesaplama
        student.totalPoints += pointsEarned; // Öğrencinin puanını güncelle
        alert(`Atık girişiniz başarıyla kaydedildi. Kazandığınız puan: ${pointsEarned}`);
        showPage('ekolojik-kredi-sistemi'); // Ekolojik kredi sistemini göster
    } else {
        alert("Öğrenci numarası geçersiz!");
    }
}

// Veri görüntüleme sayfasını döndüren fonksiyon
function getDataViewPage() {
    return `
        <h3>Öğrenci Veri Görüntüleme</h3>
        <form id="student-data-form" onsubmit="viewStudentData(event)">
            <label for="viewStudentNumber">Öğrenci Numarası:</label>
            <input type="text" id="viewStudentNumber" required><br>
            <button type="submit">Veri Görüntüle</button>
        </form>
        <div id="student-data"></div>
    `;
}

// Öğrenci verilerini görüntüleme işlemi
function viewStudentData(event) {
    event.preventDefault();

    const studentNumber = document.getElementById('viewStudentNumber').value;

    // Öğrenciyi bul
    const student = students.find(s => s.studentNumber === studentNumber);
    if (student) {
        const studentDataDiv = document.getElementById('student-data');
        studentDataDiv.innerHTML = `
            <h4>Öğrenci Bilgileri</h4>
            <p>Adı: ${student.studentName} ${student.studentSurname}</p>
            <p>Öğrenci Numarası: ${student.studentNumber}</p>
            <p>Email: ${student.studentEmail}</p>
            <p>Toplam Puan: ${student.totalPoints}</p>
        `;
    } else {
        alert("Öğrenci numarası geçersiz!");
    }
}

// Ekolojik kredi hakkında bilgi
function getEcologicalCreditInfo() {
    return `
        <h3>Ekolojik Kredi Nedir?</h3>
        <p>Ekolojik kredi, geri dönüşüm ve çevre dostu faaliyetlere katılım gösteren bireylere verilen bir ödül sistemidir. Bu sistem, çevreye duyarlı bireylerin katkılarını ödüllendirir. Öğrenciler, geri dönüşüm yaparak veya çevre dostu projelere katılarak puan toplar ve bu puanları ödüllerle takas edebilirler.</p>
    `;
}

// Geri dönüşüm hakkında bilgi
function getRecyclingInfo() {
    return `
        <h3>Geri Dönüşüm Nedir?</h3>
        <p>Geri dönüşüm, atıkların yeniden işlenmesi ve doğal kaynakların korunması için önemli bir işlemdir. Kağıt, cam, plastik, organik atıklar ve diğer birçok malzeme geri dönüşüm yoluyla yeniden kullanılabilir. Geri dönüşüm, doğa için önemli bir adımdır ve tüm bireylerin katkısı büyük bir fark yaratabilir.</p>
    `;
}

// Toplam atık hakkında bilgi
function getTotalWasteInfo() {
    return `
        <h3>Toplam Atık Kilosu</h3>
        <p>Bu sayfada, sistemdeki toplam atık miktarı gösterilebilir. Öğrenciler ve okullar, topladıkları atık miktarına göre puan kazanır ve bu puanlar takip edilir.</p>
    `;
}
