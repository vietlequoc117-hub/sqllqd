import { DatabaseConfig } from '../types';
import { formatSql } from './formatSql';

export interface OfflineAiResult {
  text: string;
  sqlOnly?: string;
}

/**
 * Knowledge Base of Senior SQL Programming Expert for High School Students (Tin học 12)
 * Provides comprehensive explanations, syntax structure, practical examples, and tips.
 */
function getOfflineSyntaxAnswer(
  prompt: string,
  dbConfig: DatabaseConfig
): OfflineAiResult | null {
  const p = prompt.toLowerCase().trim();

  // 1. GROUP BY and/or HAVING
  if (
    p.includes('group by') ||
    p.includes('having') ||
    (p.includes('nhóm') && p.includes('cú pháp')) ||
    (p.includes('gom') && p.includes('nhóm'))
  ) {
    let exampleSql = '';
    let exampleExplain = '';

    if (dbConfig.id === 'HOC_SINH') {
      exampleSql = `SELECT To_Hoc, COUNT(*) AS SoLuongHS, AVG(Diem_Toan) AS DiemTB_Toan\nFROM HOC_SINH\nGROUP BY To_Hoc\nHAVING AVG(Diem_Toan) >= 7.5;`;
      exampleExplain = `Câu lệnh trên gom nhóm học sinh theo từng **To_Hoc**, đếm số lượng học sinh (\`COUNT(*)\`) và tính điểm trung bình môn Toán (\`AVG(Diem_Toan)\`). Mệnh đề \`HAVING\` lọc ra chỉ những tổ có điểm trung bình Toán từ 7.5 trở lên.`;
    } else if (dbConfig.id === 'QL_TV') {
      exampleSql = `SELECT TheLoai, COUNT(*) AS TongSoSach\nFROM SACH\nGROUP BY TheLoai\nHAVING COUNT(*) >= 2;`;
      exampleExplain = `Gom nhóm các cuốn sách theo **TheLoai** và đếm tổng số lượng sách trong mỗi thể loại. Mệnh đề \`HAVING\` chỉ giữ lại những thể loại có từ 2 cuốn sách trở lên.`;
    } else if (dbConfig.id === 'KINH_DOANH') {
      exampleSql = `SELECT Ma_MH, SUM(So_Luong) AS TongBan\nFROM HOA_DON\nGROUP BY Ma_MH\nHAVING SUM(So_Luong) > 5;`;
      exampleExplain = `Gom nhóm hóa đơn theo mã mặt hàng (**Ma_MH**), tính tổng số lượng đã bán (\`SUM(So_Luong)\`). Mệnh đề \`HAVING\` chỉ lấy các mặt hàng bán được trên 5 sản phẩm.`;
    } else if (dbConfig.id === 'CSDL_QLDIEN') {
      exampleSql = `SELECT MASD, COUNT(*) AS SoHo, SUM(SOKW) AS TongSoKW\nFROM CHITIET\nGROUP BY MASD\nHAVING SUM(SOKW) > 650;`;
      exampleExplain = `Gom nhóm chi tiết tiêu thụ điện theo **MASD** (KD, SH, SX), đếm số hộ và tính tổng số KW (\`SUM(SOKW)\`). Mệnh đề \`HAVING\` chỉ giữ lại loại sử dụng có tổng số KW trên 650.`;
    } else if (dbConfig.id === 'CSDL_QLLUONG') {
      exampleSql = `SELECT MADV, COUNT(*) AS SoNV, ROUND(AVG(HSLUONG), 2) AS HSLuong_TB\nFROM BANGLUONG\nGROUP BY MADV\nHAVING COUNT(*) >= 2;`;
      exampleExplain = `Gom nhóm nhân viên theo **MADV**, đếm số nhân viên (\`COUNT(*)\`) và tính hệ số lương trung bình (\`AVG(HSLUONG)\`). Mệnh đề \`HAVING\` chỉ lấy các đơn vị có từ 2 nhân viên trở lên.`;
    } else if (dbConfig.id === 'CSDL_VANTAI') {
      exampleSql = `SELECT MATUYEN, COUNT(*) AS SoChuyen, SUM(SOVE) AS TongSoVe\nFROM CHITIET\nGROUP BY MATUYEN\nHAVING SUM(SOVE) >= 85;`;
      exampleExplain = `Gom nhóm chi tiết bán vé theo **MATUYEN**, đếm số lượt chạy (\`COUNT(*)\`) và tính tổng số vé bán ra (\`SUM(SOVE)\`). Mệnh đề \`HAVING\` chỉ giữ lại các tuyến có tổng số vé từ 85 trở lên.`;
    } else if (dbConfig.id === 'CSDL_QLKHO') {
      exampleSql = `SELECT MAKHO, COUNT(*) AS SoLuot, SUM(SOLUONG) AS TongSoLuong\nFROM CTNX\nGROUP BY MAKHO\nHAVING SUM(SOLUONG) >= 1000;`;
      exampleExplain = `Gom nhóm chi tiết nhập xuất theo **MAKHO**, đếm số lượt giao dịch (\`COUNT(*)\`) và tính tổng số lượng (\`SUM(SOLUONG)\`). Mệnh đề \`HAVING\` chỉ giữ lại các kho có tổng số lượng từ 1.000 trở lên.`;
    } else if (dbConfig.id === 'CSDL_KDSACH') {
      exampleSql = `SELECT MALOAI, COUNT(*) AS SoLuot, SUM(SOLUONG) AS TongSoLuong\nFROM CTHOADON\nGROUP BY MALOAI\nHAVING SUM(SOLUONG) >= 20;`;
      exampleExplain = `Gom nhóm chi tiết hóa đơn theo **MALOAI**, đếm số lượt giao dịch (\`COUNT(*)\`) và tính tổng số lượng sách (\`SUM(SOLUONG)\`). Mệnh đề \`HAVING\` chỉ giữ lại các loại sách có tổng số lượng từ 20 cuốn trở lên.`;
    } else if (dbConfig.id === 'CSDL_QLTAU') {
      exampleSql = `SELECT MaTau, COUNT(*) AS SoChuyen\nFROM LICHTRINH\nGROUP BY MaTau\nHAVING COUNT(*) >= 2;`;
      exampleExplain = `Gom nhóm lịch trình theo **MaTau**, đếm số chuyến tàu (\`COUNT(*)\`). Mệnh đề \`HAVING\` chỉ giữ lại các con tàu đã thực hiện từ 2 chuyến lịch trình trở lên.`;
    } else if (dbConfig.id === 'CSDL_CUUHOA') {
      exampleSql = `SELECT MaVu, COUNT(*) AS SoXeDieuDong\nFROM DIEU_DONG_XE\nGROUP BY MaVu\nHAVING COUNT(*) >= 2;`;
      exampleExplain = `Gom nhóm lệnh điều động theo **MaVu**, đếm số xe chữa cháy tham gia (\`COUNT(*)\`). Mệnh đề \`HAVING\` chỉ giữ lại các vụ cháy huy động từ 2 xe chữa cháy trở lên.`;
    } else {
      exampleSql = `SELECT Cot_Gom_Nhom, COUNT(*) AS TongSo, AVG(Cot_So) AS TrungBinh\nFROM TenBang\nGROUP BY Cot_Gom_Nhom\nHAVING COUNT(*) >= 2;`;
      exampleExplain = `Gom nhóm dữ liệu theo cột chỉ định và áp dụng hàm gộp tính toán, sau đó dùng HAVING để lọc nhóm thỏa mãn.`;
    }

    const formattedSql = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Hướng dẫn Cú pháp GROUP BY & HAVING

#### 1. 🎯 Bản chất & Mục đích
- **GROUP BY**: Dùng để **gom các dòng có giá trị giống nhau** ở một hoặc nhiều cột thành các nhóm thu gọn (ví dụ: gom theo tổ học, theo giới tính, theo thể loại sách). Thường kết hợp với các **hàm gộp** như \`COUNT()\`, \`SUM()\`, \`AVG()\`, \`MIN()\`, \`MAX()\`.
- **HAVING**: Dùng để **lọc các nhóm** sau khi đã gom nhóm. 

> 💡 **Phân biệt then chốt:** \`WHERE\` lọc từng hàng dữ liệu **trước** khi gom nhóm (không được chứa hàm gộp), còn \`HAVING\` lọc các nhóm **sau** khi gom nhóm (chứa điều kiện về hàm gộp).

---

#### 2. 📋 Cấu trúc cú pháp chuẩn
\`\`\`sql
SELECT Cot_Gom_Nhom, HAM_GOP(Cot_Tinh_Toan)
FROM Ten_Bang
[WHERE Dieu_Kien_Loc_Dong]
GROUP BY Cot_Gom_Nhom
[HAVING Dieu_Kien_Loc_Nhom]
[ORDER BY Cot_Sap_Xep];
\`\`\`

---

#### 3. 💡 Ví dụ minh họa thực tế (Áp dụng ngay trên CSDL ${dbConfig.name})
\`\`\`sql
${formattedSql}
\`\`\`

---

#### 4. 🔍 Giải thích từng bước của ví dụ
- ${exampleExplain}
- Học sinh có thể nhấn nút **"Chèn vào Editor"** hoặc **"Chạy ngay"** bên dưới để thấy ngay bảng kết quả tổng hợp!

---

#### 5. ⚠️ Mẹo làm bài & Lỗi học sinh hay gặp
- **Quy tắc vàng:** Mọi cột nằm trong mệnh đề \`SELECT\` mà **không** nằm trong hàm gộp (như \`COUNT\`, \`SUM\`, \`AVG\`) thì **bắt buộc phải xuất hiện trong mệnh đề \`GROUP BY\`**!
- **Lỗi phổ biến:** Dùng hàm gộp trong \`WHERE\` (ví dụ: \`WHERE AVG(Diem) > 8\` là **SAI CÚ PHÁP**, phải chuyển thành \`HAVING AVG(Diem) > 8\`).`;

    return { text, sqlOnly: formattedSql };
  }

  // 2. WHERE vs HAVING comparison
  if (
    (p.includes('phân biệt') || p.includes('phan biet') || p.includes('khác nhau') || p.includes('khac nhau')) &&
    (p.includes('where') || p.includes('having'))
  ) {
    const exampleSql = dbConfig.id === 'HOC_SINH'
      ? `SELECT To_Hoc, AVG(Diem_Toan) AS TB_Toan_Nu\nFROM HOC_SINH\nWHERE GT = 'Nữ'\nGROUP BY To_Hoc\nHAVING AVG(Diem_Toan) >= 8.0;`
      : `SELECT Cot_Nhom, COUNT(*) AS SoLuong\nFROM TenBang\nWHERE DieuKienTungDong = 'GiaTri'\nGROUP BY Cot_Nhom\nHAVING COUNT(*) >= 2;`;

    const formatted = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Phân biệt Mệnh đề WHERE và HAVING

#### 1. 🎯 Điểm khác biệt cốt lõi
| Tiêu chí so sánh | Mệnh đề \`WHERE\` | Mệnh đề \`HAVING\` |
| :--- | :--- | :--- |
| **Đối tượng áp dụng** | Lọc từng **hàng dữ liệu riêng lẻ** | Lọc trên từng **nhóm dữ liệu** sau khi gom nhóm |
| **Thời điểm thực thi** | Chạy **TRƯỚC** khi gom nhóm \`GROUP BY\` | Chạy **SAU** khi dữ liệu đã được gom nhóm |
| **Sử dụng hàm gộp** | **KHÔNG ĐƯỢC PHÉP** dùng (\`COUNT\`, \`SUM\`, \`AVG\`...) | **ĐƯỢC PHÉP** và chuyên dùng với hàm gộp |
| **Bắt buộc có GROUP BY?**| Không bắt buộc | Thường đi kèm với \`GROUP BY\` |

---

#### 2. 💡 Ví dụ minh họa kết hợp cả WHERE và HAVING
\`\`\`sql
${formatted}
\`\`\`

---

#### 3. 🔍 Phân tích cách chạy từng bước:
1. **Bước 1 (\`WHERE GT = 'Nữ'\`):** Lọc trước, chỉ giữ lại các học sinh mang giới tính "Nữ". Các học sinh Nam bị loại ngay lập tức.
2. **Bước 2 (\`GROUP BY To_Hoc\`):** Gom các bạn nữ lại theo từng tổ (Tổ 1, Tổ 2, Tổ 3...).
3. **Bước 3 (\`HAVING AVG(Diem_Toan) >= 8.0\`):** Tính điểm trung bình Toán của nữ trong mỗi tổ, nhóm tổ nào có điểm TB < 8.0 sẽ bị loại bỏ.
4. **Bước 4 (\`SELECT\`):** Xuất bảng kết quả cuối cùng ra màn hình.

---

#### 4. ⚠️ Lưu ý ghi nhớ khi thi Tin học 12
- Đề bài hỏi: *"Lọc những bạn có điểm Toán > 8"* ➡️ Dùng \`WHERE\`.
- Đề bài hỏi: *"Lọc những tổ có điểm trung bình Toán > 8"* ➡️ Dùng \`HAVING\` vì có chữ *"trung bình"* (hàm gộp).`;

    return { text, sqlOnly: formatted };
  }

  // 3. JOIN (INNER JOIN, LEFT JOIN)
  if (
    p.includes('join') ||
    p.includes('kết nối bảng') ||
    p.includes('ket noi bang') ||
    p.includes('liên kết bảng') ||
    p.includes('lien ket bang')
  ) {
    let exampleSql = '';
    let joinExplain = '';

    if (dbConfig.id === 'QL_TV') {
      exampleSql = `SELECT mt.MaPhieu, dg.HoTen, s.TenSach, mt.NgayMuon, mt.TrangThai\nFROM MUON_TRA mt\nJOIN DOCGIA dg ON mt.MaDocGia = dg.MaDocGia\nJOIN SACH s ON mt.MaSach = s.MaSach;`;
      joinExplain = `Bảng \`MUON_TRA\` chỉ lưu \`MaDocGia\` và \`MaSach\`. Nhờ \`JOIN\`, ta lấy được họ tên bạn đọc (\`dg.HoTen\`) và tên sách (\`s.TenSach\`) hiển thị đầy đủ, trực quan.`;
    } else if (dbConfig.id === 'KINH_DOANH') {
      exampleSql = `SELECT hd.So_HD, kh.Ten_KH, mh.Ten_MH, hd.So_Luong, hd.Don_Gia\nFROM HOA_DON hd\nJOIN KHACH_HANG kh ON hd.Ma_KH = kh.Ma_KH\nJOIN MAT_HANG mh ON hd.Ma_MH = mh.Ma_MH;`;
      joinExplain = `Kết nối 3 bảng: Bảng \`HOA_DON\` liên kết với \`KHACH_HANG\` thông qua \`Ma_KH\`, và liên kết với \`MAT_HANG\` thông qua \`Ma_MH\`.`;
    } else if (dbConfig.id === 'HOC_TAP') {
      exampleSql = `SELECT hs.Ten, mh.TenMon, bd.Diem\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.MaHS = hs.MaHS\nJOIN MON_HOC mh ON bd.MaMon = mh.MaMon;`;
      joinExplain = `Kết nối bảng \`BANG_DIEM\` với \`HOC_SINH\` và \`MON_HOC\` để hiển thị tên học sinh cùng điểm số của từng môn học cụ thể.`;
    } else if (dbConfig.id === 'CSDL_QLDIEN') {
      exampleSql = `SELECT ct.MAKH, kh.TENKHACH, sd.LOAISD, ct.SOKW, sd.DONGIA, (ct.SOKW * sd.DONGIA) AS THANHTIEN\nFROM CHITIET ct\nJOIN KHACHHANG kh ON ct.MAKH = kh.MAKH\nJOIN SUDUNG sd ON ct.MASD = sd.MASD;`;
      joinExplain = `Kết nối 3 bảng \`CHITIET\`, \`KHACHHANG\` và \`SUDUNG\` qua cặp khóa \`MAKH\` và \`MASD\` để hiển thị tên khách hàng, loại hình sử dụng điện và tính Thành tiền = SOKW * DONGIA.`;
    } else if (dbConfig.id === 'CSDL_QLLUONG') {
      exampleSql = `SELECT bl.MANV, bl.HOTEN, bl.DIACHI AS DiaChi_NV, dv.TENDV, bl.HSLUONG, bl.NGAYCONG\nFROM BANGLUONG bl\nJOIN DMDV dv ON bl.MADV = dv.MADV;`;
      joinExplain = `Kết nối bảng \`BANGLUONG\` với \`DMDV\` qua khóa ngoại \`MADV\` để hiển thị tên đơn vị công tác của từng nhân viên.`;
    } else if (dbConfig.id === 'CSDL_VANTAI') {
      exampleSql = `SELECT ct.SONT, nt.NGAY, xe.TENXE, xe.TENLAIXE, td.TENTUYEN, ct.SOVE, (ct.SOVE * td.GIAVE) AS THANHTIEN\nFROM CHITIET ct\nJOIN NHATTRINH nt ON ct.SONT = nt.SONT\nJOIN DMXE xe ON nt.MAXE = xe.MAXE\nJOIN TUYENDUONG td ON ct.MATUYEN = td.MATUYEN;`;
      joinExplain = `Kết nối 4 bảng \`CHITIET\`, \`NHATTRINH\`, \`DMXE\` và \`TUYENDUONG\` để hiển thị chi tiết chuyến xe, lái xe, tuyến đường và tính Thành tiền = SOVE * GIAVE.`;
    } else if (dbConfig.id === 'CSDL_QLKHO') {
      exampleSql = `SELECT ct.SOHD, nx.NGAY, nx.LOAIHD, k.TENKHO, hh.TENHH, ct.SOLUONG, (ct.SOLUONG * hh.DONGIA) AS THANHTIEN\nFROM CTNX ct\nJOIN NXKHO nx ON ct.SOHD = nx.SOHD\nJOIN DMKHO k ON ct.MAKHO = k.MAKHO\nJOIN DMHH hh ON ct.MAHH = hh.MAHH;`;
      joinExplain = `Kết nối 4 bảng \`CTNX\`, \`NXKHO\`, \`DMKHO\` và \`DMHH\` để hiển thị đầy đủ thông tin chứng từ, tên kho, tên hàng hóa và tính Thành tiền = SOLUONG * DONGIA.`;
    } else if (dbConfig.id === 'CSDL_KDSACH') {
      exampleSql = `SELECT ct.SOCTU, hd.HOTEN, s.TENSACH, ls.LOAISACH, ct.SOLUONG, (ct.SOLUONG * s.DONGIA) AS THANHTIEN\nFROM CTHOADON ct\nJOIN HOADON hd ON ct.SOCTU = hd.SOCTU\nJOIN DMSACH s ON ct.MASACH = s.MASACH\nJOIN LOAISACH ls ON ct.MALOAI = ls.MALOAI;`;
      joinExplain = `Kết nối 4 bảng \`CTHOADON\`, \`HOADON\`, \`DMSACH\` và \`LOAISACH\` để hiển thị họ tên khách hàng, tên sách, loại sách và tính Thành tiền = SOLUONG * DONGIA.`;
    } else if (dbConfig.id === 'CSDL_QLTAU') {
      exampleSql = `SELECT lt.Malichtrinh, t.TenTau, tv.TenThuyenVien, mh.TenMatHang, lt.CangXuatPhat, lt.CangDen\nFROM LICHTRINH lt\nJOIN TAU t ON lt.MaTau = t.MaTau\nJOIN THUYENVIEN tv ON lt.MaThuyenVien = tv.MaThuyenVien\nJOIN MATHANG mh ON lt.MaMatHang = mh.MaMatHang;`;
      joinExplain = `Kết nối 4 bảng \`LICHTRINH\`, \`TAU\`, \`THUYENVIEN\` và \`MATHANG\` để hiển thị đầy đủ tên tàu, tên thuyền viên, tên mặt hàng, cảng xuất phát và cảng đến.`;
    } else if (dbConfig.id === 'CSDL_CUUHOA') {
      exampleSql = `SELECT dd.MaDieuDong, vc.DiaDiem, vc.ThoiGianBao, xe.BienSo, xe.DungTichNuoc, dd.GioXuatPhat\nFROM DIEU_DONG_XE dd\nJOIN VU_CHAY vc ON dd.MaVu = vc.MaVu\nJOIN XE_CHUA_CHAY xe ON dd.MaXe = xe.MaXe;`;
      joinExplain = `Kết nối 3 bảng \`DIEU_DONG_XE\`, \`VU_CHAY\` và \`XE_CHUA_CHAY\` qua \`MaVu\` và \`MaXe\` để hiển thị địa điểm cháy, biển số xe chữa cháy, dung tích nước và giờ xuất phát.`;
    } else {
      exampleSql = `SELECT A.Cot1, B.Cot2\nFROM BangA A\nJOIN BangB B ON A.KhoaChinh = B.KhoaNgoai;`;
      joinExplain = `Kết nối BangA với BangB dựa trên điều kiện cặp khóa chính - khóa ngoại tương ứng.`;
    }

    const formatted = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Hướng dẫn Cú pháp Lệnh JOIN (Kết nối bảng)

#### 1. 🎯 Bản chất & Mục đích
Trong Cơ sở dữ liệu quan hệ, dữ liệu được chia nhỏ thành nhiều bảng để tránh dư thừa (chuẩn hóa). Lệnh **JOIN** dùng để **ghép các dòng từ 2 hay nhiều bảng lại với nhau** dựa trên mối quan hệ giữa các cột chung (thường là **Khóa chính** và **Khóa ngoại**).

- **INNER JOIN (hoặc JOIN)**: Chỉ giữ lại các hàng có giá trị khớp nhau ở **cả hai bảng**.
- **LEFT JOIN**: Giữ lại **toàn bộ hàng ở bảng bên trái**, nếu bảng bên phải không có dữ liệu khớp thì các cột bên phải sẽ điền giá trị \`NULL\`.

---

#### 2. 📋 Cấu trúc cú pháp chuẩn
\`\`\`sql
SELECT BangA.Cot1, BangB.Cot2
FROM BangA
[INNER] JOIN BangB ON BangA.Khoa_Chinh = BangB.Khoa_Ngoai;
\`\`\`

---

#### 3. 💡 Ví dụ minh họa thực tế (Trên CSDL ${dbConfig.name})
\`\`\`sql
${formatted}
\`\`\`

---

#### 4. 🔍 Phân tích chi tiết:
- ${joinExplain}
- Mệnh đề \`ON\`: Xác định điều kiện ghép nối (ví dụ: \`mt.MaDocGia = dg.MaDocGia\`).
- Đặt bí danh (Alias): Đặt tên viết tắt ngắn gọn cho bảng (\`FROM MUON_TRA mt\`, \`JOIN DOCGIA dg\`) giúp câu lệnh gọn gàng và tránh nhầm lẫn giữa các cột trùng tên.

---

#### 5. ⚠️ Lỗi học sinh hay gặp:
- **Lỗi cột mơ hồ (Ambiguous column name):** Khi 2 bảng cùng có cột tên \`MaDocGia\`, nếu bạn chỉ gõ \`SELECT MaDocGia\` thì hệ thống sẽ báo lỗi không biết lấy từ bảng nào. **Khắc phục:** Luôn ghi rõ tên bảng hoặc bí danh phía trước cột: \`dg.MaDocGia\` hoặc \`mt.MaDocGia\`.`;

    return { text, sqlOnly: formatted };
  }

  // 4. LIKE operator and wildcards (% and _)
  if (
    p.includes('like') ||
    p.includes('tìm kiếm chuỗi') ||
    p.includes('tim kiem chuoi') ||
    p.includes('ký tự đại diện') ||
    p.includes('ky tu dai dien') ||
    p.includes('dấu %') ||
    p.includes('dấu _')
  ) {
    let exampleSql = '';
    let likeExplain = '';

    if (dbConfig.id === 'HOC_SINH') {
      exampleSql = `SELECT Ma_HS, Ho_Dem, Ten, To_Hoc\nFROM HOC_SINH\nWHERE Ho_Dem LIKE 'Nguyễn%';`;
      likeExplain = `Tìm tất cả học sinh có họ bắt đầu bằng chữ "Nguyễn". Dấu \`%\` đại diện cho phần đệm còn lại dài bao nhiêu ký tự cũng được.`;
    } else if (dbConfig.id === 'QL_TV') {
      exampleSql = `SELECT MaSach, TenSach, TacGia, TheLoai\nFROM SACH\nWHERE TenSach LIKE '%Tin học%';`;
      likeExplain = `Tìm những cuốn sách có chứa cụm từ "Tin học" ở bất kỳ vị trí nào trong tên sách (ở đầu, ở giữa hoặc ở cuối).`;
    } else if (dbConfig.id === 'CSDL_QLDIEN') {
      exampleSql = `SELECT MAKH, TENKHACH, DIACHI\nFROM KHACHHANG\nWHERE DIACHI LIKE '%PHÚ CƯỜNG%';`;
      likeExplain = `Tìm tất cả khách hàng có địa chỉ ở khu vực "PHÚ CƯỜNG" bằng mẫu \`LIKE '%PHÚ CƯỜNG%'\`.`;
    } else if (dbConfig.id === 'CSDL_QLLUONG') {
      exampleSql = `SELECT MANV, HOTEN, DIACHI, MADV, HSLUONG, NGAYCONG\nFROM BANGLUONG\nWHERE MANV LIKE 'KT%';`;
      likeExplain = `Tìm tất cả nhân viên thuộc bộ phận Kế toán có mã \`MANV\` bắt đầu bằng "KT" (như KT01, KT02, KT05, KT06).`;
    } else if (dbConfig.id === 'CSDL_VANTAI') {
      exampleSql = `SELECT MATUYEN, TENTUYEN, SOKM, GIAVE\nFROM TUYENDUONG\nWHERE TENTUYEN LIKE '%TPHCM%';`;
      likeExplain = `Tìm tuyến đường có tên chứa cụm từ "TPHCM" bằng mẫu \`LIKE '%TPHCM%'\`.`;
    } else if (dbConfig.id === 'CSDL_QLKHO') {
      exampleSql = `SELECT MAHH, TENHH, DONGIA\nFROM DMHH\nWHERE TENHH LIKE 'Quạt điện%';`;
      likeExplain = `Tìm tất cả mặt hàng có tên bắt đầu bằng "Quạt điện" bằng mẫu \`LIKE 'Quạt điện%'\`.`;
    } else if (dbConfig.id === 'CSDL_KDSACH') {
      exampleSql = `SELECT MASACH, TENSACH, DONGIA\nFROM DMSACH\nWHERE TENSACH LIKE 'VẬT LÝ%';`;
      likeExplain = `Tìm tất cả các cuốn sách có tên bắt đầu bằng "VẬT LÝ" bằng mẫu \`LIKE 'VẬT LÝ%'\`.`;
    } else if (dbConfig.id === 'CSDL_QLTAU') {
      exampleSql = `SELECT MaThuyenVien, TenThuyenVien, ChucDanh, MucLuong\nFROM THUYENVIEN\nWHERE ChucDanh LIKE 'Thuyền%';`;
      likeExplain = `Tìm tất cả thuyền viên có chức danh bắt đầu bằng "Thuyền" (Thuyền trưởng, Thuyền phó) bằng mẫu \`LIKE 'Thuyền%'\`.`;
    } else if (dbConfig.id === 'CSDL_CUUHOA') {
      exampleSql = `SELECT MaXe, BienSo, DungTichNuoc\nFROM XE_CHUA_CHAY\nWHERE BienSo LIKE '51A%';`;
      likeExplain = `Tìm tất cả các xe chữa cháy mang biển số TP.HCM bắt đầu bằng "51A" bằng mẫu \`LIKE '51A%'\`.`;
    } else {
      exampleSql = `SELECT *\nFROM TenBang\nWHERE TenCot LIKE 'A%';`;
      likeExplain = `Tìm các bản ghi có giá trị cột bắt đầu bằng chữ 'A'.`;
    }

    const formatted = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Hướng dẫn Toán tử LIKE & Ký tự đại diện

#### 1. 🎯 Bản chất & Mục đích
Toán tử **LIKE** dùng trong mệnh đề \`WHERE\` để **tìm kiếm chuỗi ký tự theo mẫu (khớp mẫu)** thay vì so sánh bằng chính xác (\`=\`).

SQL cung cấp 2 ký tự đại diện (Wildcard characters) cực kỳ mạnh mẽ:
- **Dấu phần trăm (\`%\`)**: Đại diện cho **0, 1 hoặc nhiều ký tự bất kỳ**.
- **Dấu gạch dưới (\`_\`)**: Đại diện cho **đúng duy nhất 1 ký tự bất kỳ**.

---

#### 2. 📋 Bảng mẫu tìm kiếm thông dụng
| Cú pháp mẫu | Ý nghĩa tìm kiếm | Ví dụ thực tế |
| :--- | :--- | :--- |
| \`LIKE 'Nguyễn%'\` | Bắt đầu bằng chữ "Nguyễn" | Nguyễn Văn A, Nguyễn Thị B |
| \`LIKE '%Hà Nội'\` | Kết thúc bằng chữ "Hà Nội" | Phố Cổ Hà Nội, Cầu Giấy Hà Nội |
| \`LIKE '%Toán%'\` | Chứa từ "Toán" ở bất cứ vị trí nào | Sách Toán 12, Giải bài tập Toán |
| \`LIKE '_a%'\` | Ký tự thứ 2 là chữ 'a' | Nam, Mai, Lan, Hạnh |
| \`LIKE '___'\` | Chuỗi có độ dài **đúng 3 ký tự** | 12A, Anh, Huy |

---

#### 3. 💡 Ví dụ minh họa thực tế (Trên CSDL ${dbConfig.name})
\`\`\`sql
${formatted}
\`\`\`

---

#### 4. 🔍 Giải thích:
- ${likeExplain}
- Chuỗi mẫu tìm kiếm trong \`LIKE\` luôn phải đặt trong **cặp dấu nháy đơn** \`' '\`.`;

    return { text, sqlOnly: formatted };
  }

  // 5. UPDATE syntax
  if (
    p.includes('update') ||
    p.includes('cập nhật') ||
    p.includes('cap nhat') ||
    p.includes('sửa dữ liệu') ||
    p.includes('sua du lieu')
  ) {
    let exampleSql = '';
    if (dbConfig.id === 'HOC_SINH') {
      exampleSql = `UPDATE HOC_SINH\nSET Diem_Toan = 9.5, To_Hoc = 1\nWHERE Ma_HS = 'HS01';`;
    } else if (dbConfig.id === 'QL_TV') {
      exampleSql = `UPDATE MUON_TRA\nSET TrangThai = 'Đã trả', NgayTra = '2024-05-20'\nWHERE MaPhieu = 'PM01';`;
    } else if (dbConfig.id === 'CSDL_QLDIEN') {
      exampleSql = `UPDATE CHITIET\nSET THANHTIEN = SOKW * (\n  SELECT DONGIA\n  FROM SUDUNG\n  WHERE SUDUNG.MASD = CHITIET.MASD\n);`;
    } else if (dbConfig.id === 'CSDL_QLLUONG') {
      exampleSql = `UPDATE BANGLUONG\nSET HSLUONG = ROUND(HSLUONG + 0.2, 2)\nWHERE NGAYCONG >= 27;`;
    } else if (dbConfig.id === 'CSDL_VANTAI') {
      exampleSql = `UPDATE TUYENDUONG\nSET GIAVE = GIAVE + 1000\nWHERE MATUYEN = 'BD01';`;
    } else if (dbConfig.id === 'CSDL_QLKHO') {
      exampleSql = `UPDATE DMHH\nSET DONGIA = DONGIA * 1.1\nWHERE MAHH = 'A001';`;
    } else if (dbConfig.id === 'CSDL_KDSACH') {
      exampleSql = `UPDATE DMSACH\nSET DONGIA = DONGIA + 2000\nWHERE MASACH = 'ACC001';`;
    } else if (dbConfig.id === 'CSDL_QLTAU') {
      exampleSql = `UPDATE THUYENVIEN\nSET MucLuong = MucLuong + 2000000\nWHERE ChucDanh = 'Thuyền trưởng';`;
    } else if (dbConfig.id === 'CSDL_CUUHOA') {
      exampleSql = `UPDATE TRU_NUOC\nSET ApLucChuan = 5.2\nWHERE MaTru = 'TN01';`;
    } else {
      exampleSql = `UPDATE TenBang\nSET Cot1 = GiaTriMoi\nWHERE DieuKien;`;
    }

    const formatted = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Hướng dẫn Cú pháp Lệnh UPDATE (Cập nhật dữ liệu)

#### 1. 🎯 Bản chất & Mục đích
Lệnh **UPDATE** thuộc nhóm DML (Data Manipulation Language), dùng để **sửa đổi, cập nhật giá trị của một hoặc nhiều cột** trong các bản ghi hiện có của bảng.

---

#### 2. 📋 Cấu trúc cú pháp chuẩn
\`\`\`sql
UPDATE Ten_Bang
SET Cot_1 = Gia_Tri_Moi_1,
    Cot_2 = Gia_Tri_Moi_2
WHERE Dieu_Kien_Loc;
\`\`\`

---

#### 3. 💡 Ví dụ minh họa thực tế (Trên CSDL ${dbConfig.name})
\`\`\`sql
${formatted}
\`\`\`

---

#### 4. 🔍 Phân tích chi tiết:
- \`UPDATE HOC_SINH\`: Chỉ định bảng cần sửa đổi.
- \`SET Diem_Toan = 9.5, To_Hoc = 1\`: Gán điểm Toán mới thành 9.5 và đổi sang Tổ 1. Nhiều cột phân cách nhau bằng dấu phẩy.
- \`WHERE Ma_HS = 'HS01'\`: **Điều kiện bắt buộc** để chỉ cập nhật đúng học sinh có mã 'HS01'.

---

#### 5. ⚠️ CẢNH BÁO NGUY HIỂM:
- **Nếu quên mệnh đề \`WHERE\`**: Hệ thống sẽ **cập nhật TẤT CẢ các dòng trong bảng** thành giá trị mới!
- Do đó, trước khi chạy \`UPDATE\`, hãy luôn kiểm tra kỹ mệnh đề \`WHERE\` xem đã đúng đối tượng cần sửa chưa.`;

    return { text, sqlOnly: formatted };
  }

  // 6. DELETE syntax
  if (
    p.includes('delete') ||
    p.includes('xóa bản ghi') ||
    p.includes('xoa ban ghi') ||
    p.includes('xóa dữ liệu') ||
    p.includes('xoa du lieu') ||
    p.includes('lệnh delete')
  ) {
    let exampleSql = '';
    if (dbConfig.id === 'HOC_SINH') {
      exampleSql = `DELETE FROM HOC_SINH\nWHERE Ma_HS = 'HS10';`;
    } else if (dbConfig.id === 'QL_TV') {
      exampleSql = `DELETE FROM MUON_TRA\nWHERE MaPhieu = 'PM05';`;
    } else {
      exampleSql = `DELETE FROM TenBang\nWHERE DieuKien;`;
    }

    const formatted = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Hướng dẫn Cú pháp Lệnh DELETE (Xóa dữ liệu)

#### 1. 🎯 Bản chất & Mục đích
Lệnh **DELETE** dùng để **xóa một hoặc nhiều bản ghi (hàng)** khỏi bảng dữ liệu theo điều kiện lọc nhất định.

---

#### 2. 📋 Cấu trúc cú pháp chuẩn
\`\`\`sql
DELETE FROM Ten_Bang
WHERE Dieu_Kien_Xoa;
\`\`\`

---

#### 3. 💡 Ví dụ minh họa thực tế (Trên CSDL ${dbConfig.name})
\`\`\`sql
${formatted}
\`\`\`

---

#### 4. ⚠️ CẢNH BÁO SỐNG CÒN TRONG SQL:
- **Nếu bạn viết \`DELETE FROM TenBang;\` mà không có \`WHERE\`**: Toàn bộ dữ liệu của bảng sẽ bị **xóa sạch hoàn toàn**!
- Lệnh DELETE chỉ xóa các hàng dữ liệu bên trong bảng, **không xóa cấu trúc bảng**. (Nếu muốn xóa luôn cả bảng và cấu trúc, dùng lệnh \`DROP TABLE TenBang;\`).`;

    return { text, sqlOnly: formatted };
  }

  // 7. Aggregate functions (COUNT, SUM, AVG, MIN, MAX)
  if (
    p.includes('hàm gộp') ||
    p.includes('ham gop') ||
    p.includes('hàm tổng hợp') ||
    p.includes('count') ||
    p.includes('sum') ||
    p.includes('avg') ||
    p.includes('min') ||
    p.includes('max')
  ) {
    let exampleSql = '';
    if (dbConfig.id === 'HOC_SINH') {
      exampleSql = `SELECT \n  COUNT(*) AS TongSoHocSinh,\n  AVG(Diem_Toan) AS DiemTB_Toan,\n  MAX(Diem_Toan) AS ToanCaoNhat,\n  MIN(Diem_Van) AS VanThapNhat\nFROM HOC_SINH;`;
    } else {
      exampleSql = `SELECT COUNT(*) AS TongSo, AVG(Diem) AS TrungBinh, MAX(Diem) AS CaoNhat, MIN(Diem) AS ThapNhat\nFROM TenBang;`;
    }

    const formatted = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: 5 Hàm gộp tổng hợp chuẩn (Aggregate Functions)

#### 1. 🎯 Danh mục 5 hàm gộp bắt buộc nhớ trong Tin học 12
1. **\`COUNT(*)\` hoặc \`COUNT(Cot)\`**: Đếm tổng số dòng (bản ghi). \`COUNT(*)\` đếm cả dòng chứa NULL; \`COUNT(Cot)\` bỏ qua giá trị NULL.
2. **\`SUM(Cot)\`**: Tính tổng giá trị số của các dòng trong cột.
3. **\`AVG(Cot)\`**: Tính giá trị trung bình cộng số học của cột.
4. **\`MAX(Cot)\`**: Tìm giá trị lớn nhất (điểm cao nhất, ngày muộn nhất...).
5. **\`MIN(Cot)\`**: Tìm giá trị nhỏ nhất (điểm thấp nhất, ngày sớm nhất...).

---

#### 2. 💡 Ví dụ minh họa thực tế (Trên CSDL ${dbConfig.name})
\`\`\`sql
${formatted}
\`\`\`

---

#### 3. 🔍 Lưu ý sư phạm:
- Sử dụng từ khóa \`AS TenMoi\` để đặt tên gợi nhớ cho cột kết quả hiển thị (ví dụ: \`AVG(Diem_Toan) AS DiemTB_Toan\`).
- Khi kết hợp hàm gộp với các cột thông thường, bắt buộc phải dùng kèm mệnh đề \`GROUP BY\`!`;

    return { text, sqlOnly: formatted };
  }

  // 8. INSERT INTO syntax
  if (
    p.includes('insert') ||
    p.includes('thêm bản ghi') ||
    p.includes('them ban ghi') ||
    p.includes('chèn dữ liệu') ||
    p.includes('chen du lieu')
  ) {
    let exampleSql = '';
    if (dbConfig.id === 'HOC_SINH') {
      exampleSql = `INSERT INTO HOC_SINH (Ma_HS, Ho_Dem, Ten, GT, Ngay_Sinh, Doan_Vien, To_Hoc, Diem_Toan, Diem_Van)\nVALUES ('HS11', 'Trần Văn', 'Bình', 'Nam', '2006-03-15', 1, 1, 8.5, 7.8);`;
    } else if (dbConfig.id === 'QL_TV') {
      exampleSql = `INSERT INTO SACH (MaSach, TenSach, TacGia, TheLoai, SoTrang, SoLuongKho)\nVALUES ('S09', 'Cơ sở dữ liệu căn bản', 'Lê Quốc Việt', 'Tin học', 280, 15);`;
    } else {
      exampleSql = `INSERT INTO TenBang (Cot1, Cot2, Cot3)\nVALUES ('GiaTri1', 'GiaTri2', 100);`;
    }

    const formatted = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Hướng dẫn Cú pháp Lệnh INSERT INTO (Thêm bản ghi)

#### 1. 🎯 Bản chất & Mục đích
Lệnh **INSERT INTO** dùng để **chèn thêm một hoặc nhiều bản ghi mới** vào bảng dữ liệu.

---

#### 2. 📋 Cấu trúc cú pháp chuẩn
\`\`\`sql
INSERT INTO Ten_Bang (Cot_1, Cot_2, Cot_3, ...)
VALUES (Gia_Tri_1, Gia_Tri_2, Gia_Tri_3, ...);
\`\`\`

---

#### 3. 💡 Ví dụ minh họa thực tế (Trên CSDL ${dbConfig.name})
\`\`\`sql
${formatted}
\`\`\`

---

#### 4. 🔍 Nguyên tắc kiểu dữ liệu:
- Dữ liệu dạng **chuỗi (TEXT/VARCHAR)** và **ngày tháng (DATE)**: Bắt buộc đặt trong dấu ngoặc đơn: \`'Trần Văn'\`, \`'2006-03-15'\`.
- Dữ liệu dạng **số nguyên/số thực (INTEGER/REAL)**: Viết trực tiếp, không có dấu nháy: \`8.5\`, \`15\`.`;

    return { text, sqlOnly: formatted };
  }

  // 9. NULL and IS NULL
  if (
    p.includes('null') ||
    p.includes('is null') ||
    p.includes('is not null')
  ) {
    const exampleSql = dbConfig.id === 'HOC_SINH'
      ? `SELECT Ma_HS, Ho_Dem, Ten, Diem_Toan\nFROM HOC_SINH\nWHERE Diem_Toan IS NULL;`
      : `SELECT *\nFROM TenBang\nWHERE TenCot IS NULL;`;

    const formatted = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Bản chất Giá trị NULL & Toán tử IS NULL

#### 1. 🎯 Bản chất của NULL trong SQL
- **NULL không phải là số 0, cũng không phải là chuỗi rỗng ('')**.
- NULL đại diện cho trạng thái **chưa có dữ liệu, bị bỏ trống, hoặc chưa xác định**.

---

#### 2. ⚠️ Lỗi kinh điển mà 90% học sinh mắc phải:
- ❌ **VIẾT SAI:** \`WHERE Diem_Toan = NULL;\` (Không bao giờ so sánh được với NULL bằng dấu \`=\`, câu truy vấn sẽ luôn trả về rỗng!).
- ✅ **VIẾT ĐÚNG:** \`WHERE Diem_Toan IS NULL;\` hoặc \`WHERE Diem_Toan IS NOT NULL;\`.

---

#### 3. 💡 Ví dụ minh họa thực tế
\`\`\`sql
${formatted}
\`\`\`

- Dùng \`IS NULL\` khi cần tìm những học sinh chưa có điểm kiểm tra.
- Dùng \`IS NOT NULL\` khi muốn lọc ra danh sách những bạn đã có điểm đầy đủ.`;

    return { text, sqlOnly: formatted };
  }

  // 10. PRIMARY KEY & FOREIGN KEY
  if (
    p.includes('khóa chính') ||
    p.includes('khoa chinh') ||
    p.includes('khóa ngoại') ||
    p.includes('khoa ngoai') ||
    p.includes('primary key') ||
    p.includes('foreign key')
  ) {
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Phân biệt Khóa chính (Primary Key) & Khóa ngoại (Foreign Key)

#### 1. 🎯 Khóa chính (PRIMARY KEY - PK)
- **Định nghĩa:** Là một hoặc tập hợp các thuộc tính giúp **định danh duy nhất** mỗi bản ghi (hàng) trong một bảng.
- **Quy tắc bất di bất dịch:**
  1. **Duy nhất (Unique):** Không được phép có 2 hàng trùng giá trị khóa chính.
  2. **Không rỗng (NOT NULL):** Tuyệt đối không được để trống khóa chính.
- *Ví dụ:* Cột \`Ma_HS\` trong bảng \`HOC_SINH\`, \`MaSach\` trong bảng \`SACH\`.

---

#### 2. 🎯 Khóa ngoại (FOREIGN KEY - FK)
- **Định nghĩa:** Là một cột trong bảng này nhưng **tham chiếu đến Khóa chính của bảng khác**, dùng để tạo mối liên kết và bảo toàn tính toàn vẹn tham chiếu giữa 2 bảng.
- *Ví dụ:* Cột \`MaDocGia\` trong bảng \`MUON_TRA\` là Khóa ngoại tham chiếu tới \`MaDocGia\` (Khóa chính) của bảng \`DOCGIA\`. Nhờ vậy, thư viện không thể tạo phiếu mượn cho một mã độc giả không hề tồn tại!

---

#### 3. 📋 Cú pháp khai báo khi tạo bảng (CREATE TABLE)
\`\`\`sql
CREATE TABLE MUON_TRA (
  MaPhieu TEXT PRIMARY KEY,       -- Khóa chính
  MaDocGia TEXT,                  -- Khóa ngoại
  MaSach TEXT,                    -- Khóa ngoại
  NgayMuon DATE,
  FOREIGN KEY (MaDocGia) REFERENCES DOCGIA(MaDocGia),
  FOREIGN KEY (MaSach) REFERENCES SACH(MaSach)
);
\`\`\``;

    return { text };
  }

  // 11. General SELECT query structure & syntax
  if (
    p.includes('cú pháp select') ||
    p.includes('cấu trúc select') ||
    p.includes('thứ tự mệnh đề') ||
    p.includes('cấu trúc câu lệnh sql') ||
    p.includes('cú pháp câu lệnh sql')
  ) {
    const exampleSql = `SELECT To_Hoc, COUNT(*) AS SoLuong, AVG(Diem_Toan) AS DiemTB\nFROM HOC_SINH\nWHERE GT = 'Nữ'\nGROUP BY To_Hoc\nHAVING AVG(Diem_Toan) >= 8.0\nORDER BY DiemTB DESC\nLIMIT 5;`;
    const formatted = formatSql(exampleSql);
    const text = `### 🎓 [Chuyên gia cấp cao SQL]: Cấu trúc & Thứ tự chuẩn của Câu lệnh SELECT

#### 1. 📋 Thứ tự viết lệnh chuẩn (Syntax Order):
\`\`\`sql
SELECT [DISTINCT] Danh_Sach_Cot
FROM Ten_Bang
[JOIN Bang_Khac ON Dieu_Kien_Join]
[WHERE Dieu_Kien_Loc_Dong]
[GROUP BY Cot_Gom_Nhom]
[HAVING Dieu_Kien_Loc_Nhom]
[ORDER BY Cot_Sap_Xep ASC|DESC]
[LIMIT So_Dong OFFSET Vi_Tri_Bat_Dau];
\`\`\`

---

#### 2. 🧠 Thứ tự hệ thống SQL thực sự xử lý (Execution Order):
1. \`FROM & JOIN\`: Xác định nguồn dữ liệu và ghép bảng.
2. \`WHERE\`: Lọc các dòng thô ban đầu.
3. \`GROUP BY\`: Gom nhóm các dòng lại.
4. \`HAVING\`: Lọc các nhóm theo điều kiện hàm gộp.
5. \`SELECT\`: Chọn các cột cần xuất và tính toán biểu thức.
6. \`DISTINCT\`: Khử các dòng trùng lặp.
7. \`ORDER BY\`: Sắp xếp thứ tự kết quả cuối cùng.
8. \`LIMIT / OFFSET\`: Giới hạn số lượng dòng hiển thị ra màn hình.

---

#### 3. 💡 Ví dụ đầy đủ chuẩn mực:
\`\`\`sql
${formatted}
\`\`\``;

    return { text, sqlOnly: formatted };
  }

  return null;
}

/**
 * Intelligent pedagogical SQL generation for high school curriculum (Tin học 12)
 * when Gemini API is unavailable or offline.
 */
export function generateOfflineSql(
  prompt: string,
  dbConfig: DatabaseConfig
): OfflineAiResult {
  const pLower = prompt.toLowerCase().trim();

  // 1. Check if student is asking about SQL syntax, concepts, or examples
  const syntaxAnswer = getOfflineSyntaxAnswer(prompt, dbConfig);
  if (syntaxAnswer) {
    return syntaxAnswer;
  }

  // 2. Try matching predefined sample queries for this database
  for (const sample of dbConfig.sampleQueries) {
    const titleLower = sample.title.toLowerCase();
    const words = pLower.split(/\s+/).filter(w => w.length > 2);
    const matchCount = words.filter(w => titleLower.includes(w)).length;
    if (matchCount >= 2 || titleLower.includes(pLower) || pLower.includes(titleLower.slice(0, 15))) {
      const formatted = formatSql(sample.sql);
      const text = `### 🎓 [Chuyên gia cấp cao SQL]: Lời giải câu lệnh SQL

**Yêu cầu:** "${prompt}"

\`\`\`sql
${formatted}
\`\`\`

#### 🔍 Giải thích logic thực thi:
- **Mục đích:** ${sample.explanation}
- **Độ khó:** Mức độ **${sample.difficulty}** theo chuẩn chương trình Tin học 12.
- **Cách áp dụng:** Bạn có thể nhấn nút **"Chèn vào Editor"** hoặc **"Chạy ngay"** để kiểm tra bảng kết quả lập tức!`;
      return { text, sqlOnly: formatted };
    }
  }

  // 3. Extract available tables and columns from DDL
  const tableMatches = Array.from(dbConfig.ddl.matchAll(/CREATE\s+TABLE\s+([A-Za-z0-9_]+)\s*\(([\s\S]*?)\);/gi));
  const tables = tableMatches.map(m => ({
    name: m[1],
    columns: m[2]
      .split('\n')
      .map(line => line.trim().split(/\s+/)[0])
      .filter(col => col && !['PRIMARY', 'FOREIGN', 'CONSTRAINT', ')'].includes(col.toUpperCase())),
  }));

  const mainTable = tables[0]?.name || 'DATA';

  // 4. Heuristic generation based on high school query patterns
  let generatedSql = '';
  let rationale = '';

  if (pLower.includes('đếm') || pLower.includes('bao nhiêu') || pLower.includes('thống kê số')) {
    generatedSql = `SELECT COUNT(*) AS Tong_So\nFROM ${mainTable};`;
    rationale = `Sử dụng hàm gộp COUNT(*) từ bảng ${mainTable} để đếm tổng số lượng bản ghi thỏa mãn.`;
  } else if (pLower.includes('nữ')) {
    generatedSql = `SELECT *\nFROM HOC_SINH\nWHERE GT = 'Nữ';`;
    rationale = `Lọc danh sách học sinh mang giới tính 'Nữ' theo chuẩn sách giáo khoa.`;
  } else if (pLower.includes('nam')) {
    generatedSql = `SELECT *\nFROM HOC_SINH\nWHERE GT = 'Nam';`;
    rationale = `Lọc danh sách học sinh mang giới tính 'Nam'.`;
  } else if (pLower.includes('chưa trả') || pLower.includes('đang mượn')) {
    if (dbConfig.id === 'QL_TV') {
      generatedSql = `SELECT s.TenSach, dg.HoTen, mt.NgayMuon, mt.TrangThai\nFROM MUON_TRA mt\nJOIN SACH s ON mt.MaSach = s.MaSach\nJOIN DOCGIA dg ON mt.MaDocGia = dg.MaDocGia\nWHERE mt.TrangThai = 'Đang mượn';`;
      rationale = `Kết hợp bảng MUON_TRA, SACH và DOCGIA, lọc điều kiện TrangThai = 'Đang mượn'.`;
    } else {
      generatedSql = `SELECT * FROM ${mainTable} WHERE TrangThai = 'Chưa trả';`;
      rationale = `Lọc các bản ghi đang mượn chưa hoàn trả.`;
    }
  } else if (pLower.includes('cao nhất') || pLower.includes('lớn nhất') || pLower.includes('top')) {
    const colName = tables[0]?.columns[1] || 'Diem';
    generatedSql = `SELECT *\nFROM ${mainTable}\nORDER BY ${colName} DESC\nLIMIT 1;`;
    rationale = `Sắp xếp giảm dần (DESC) theo cột đánh giá và giới hạn 1 kết quả cao nhất bằng LIMIT 1.`;
  } else {
    // Default safe SELECT *
    generatedSql = `SELECT *\nFROM ${mainTable}\nLIMIT 10;`;
    rationale = `Truy vấn hiển thị thông tin tổng quan từ bảng ${mainTable}.`;
  }

  const formatted = formatSql(generatedSql);
  const text = `### 🎓 [Chuyên gia cấp cao SQL]: Đề xuất câu lệnh SQL

\`\`\`sql
${formatted}
\`\`\`

#### 🔍 Giải thích sư phạm:
- ${rationale}
- Dữ liệu được truy vấn trực tiếp từ cơ sở dữ liệu **${dbConfig.name}**.
- Bạn có thể bấm **"Chèn vào Editor"** hoặc **"Chạy ngay"** để thực hành trên bảng dữ liệu thật.`;

  return { text, sqlOnly: formatted };
}

/**
 * Intelligent pedagogical SQL query explainer for high school students
 */
export function explainOfflineSql(
  sqlQuery: string,
  dbConfig: DatabaseConfig
): OfflineAiResult {
  const cleanSql = sqlQuery.trim();
  const selectMatch = cleanSql.match(/SELECT\s+([\s\S]*?)\s+FROM/i);
  const fromMatch = cleanSql.match(/FROM\s+([A-Za-z0-9_]+)/i);
  const whereMatch = cleanSql.match(/WHERE\s+([\s\S]*?)(?:GROUP|ORDER|LIMIT|;|$)/i);
  const joinMatches = Array.from(cleanSql.matchAll(/JOIN\s+([A-Za-z0-9_]+)/gi)).map(m => m[1]);
  const orderMatch = cleanSql.match(/ORDER\s+BY\s+([\s\S]*?)(?:LIMIT|;|$)/i);
  const groupMatch = cleanSql.match(/GROUP\s+BY\s+([\s\S]*?)(?:HAVING|ORDER|LIMIT|;|$)/i);
  const limitMatch = cleanSql.match(/LIMIT\s+([0-9]+)/i);

  let explanation = `### 🎓 [Chuyên gia cấp cao SQL]: Phân tích chi tiết câu lệnh (${dbConfig.name})\n\n`;
  explanation += `#### 1. 🎯 Mục đích tổng quát:\n`;
  explanation += `- Truy vấn và hiển thị dữ liệu từ bảng **${fromMatch ? fromMatch[1] : 'CSDL'}** trong cơ sở dữ liệu.\n\n`;

  explanation += `#### 2. 📋 Chi tiết từng mệnh đề:\n`;
  if (selectMatch) {
    const cols = selectMatch[1].trim();
    if (cols === '*') {
      explanation += `- **Mệnh đề SELECT *:** Lấy toàn bộ các cột thông tin có trong bảng.\n`;
    } else {
      explanation += `- **Mệnh đề SELECT ${cols}:** Chỉ định rõ các cột dữ liệu cần hiển thị trong bảng kết quả.\n`;
    }
  }

  if (fromMatch) {
    explanation += `- **Mệnh đề FROM ${fromMatch[1]}:** Xác định bảng nguồn cung cấp dữ liệu ban đầu.\n`;
  }

  if (joinMatches.length > 0) {
    explanation += `- **Mệnh đề JOIN (${joinMatches.join(', ')}):** Kết nối nhiều bảng lại với nhau thông qua các khóa ngoại (Foreign Key) để tổng hợp thông tin.\n`;
  }

  if (whereMatch) {
    explanation += `- **Mệnh đề WHERE ${whereMatch[1].trim()}:** Áp dụng điều kiện lọc dữ liệu; chỉ những hàng dữ liệu thỏa mãn điều kiện này mới được giữ lại trong kết quả.\n`;
  }

  if (groupMatch) {
    explanation += `- **Mệnh đề GROUP BY ${groupMatch[1].trim()}:** Gom nhóm các dòng có cùng giá trị lại để tính toán các hàm tổng hợp như COUNT, SUM, AVG.\n`;
  }

  if (orderMatch) {
    const isDesc = /DESC/i.test(orderMatch[1]);
    explanation += `- **Mệnh đề ORDER BY ${orderMatch[1].trim()}:** Sắp xếp thứ tự các hàng theo chiều ${isDesc ? 'giảm dần (từ lớn đến bé)' : 'tăng dần (từ bé đến lớn)'}.\n`;
  }

  if (limitMatch) {
    explanation += `- **Mệnh đề LIMIT ${limitMatch[1]}:** Giới hạn chỉ lấy tối đa ${limitMatch[1]} dòng đầu tiên.\n`;
  }

  explanation += `\n#### 3. 💡 Ý nghĩa thực hành sư phạm:\n- Giúp người học làm quen với cú pháp chuẩn của hệ quản trị cơ sở dữ liệu quan hệ SQLite theo chương trình Tin học 12.`;

  return { text: explanation };
}

/**
 * Intelligent pedagogical SQL error fixer
 */
export function fixOfflineSql(
  sqlQuery: string,
  errorMessage: string,
  dbConfig: DatabaseConfig
): OfflineAiResult {
  let fixedSql = sqlQuery;
  let reason = '';
  let tip = '';

  // Case 1: Checking NULL with = instead of IS NULL
  if (/=\s*NULL/i.test(fixedSql)) {
    fixedSql = fixedSql.replace(/=\s*NULL/gi, 'IS NULL');
    reason = `Trong SQL, giá trị \`NULL\` đại diện cho dữ liệu chưa xác định, không thể dùng phép toán so sánh bằng (\`=\`). Phải dùng toán tử \`IS NULL\`.`;
    tip = `Luôn ghi nhớ: So sánh với NULL luôn dùng \`IS NULL\` hoặc \`IS NOT NULL\`.`;
  } else if (/(!=|<>\s*NULL)/i.test(fixedSql)) {
    fixedSql = fixedSql.replace(/(!=|<>\s*NULL)/gi, 'IS NOT NULL');
    reason = `Không được dùng \`!= NULL\` hoặc \`<> NULL\`. Phải dùng toán tử \`IS NOT NULL\`.`;
    tip = `Luôn dùng \`IS NOT NULL\` khi muốn lọc các ô có dữ liệu.`;
  }
  // Case 2: Missing quotation marks around string literal (e.g., Lop = 11B)
  else if (errorMessage.toLowerCase().includes('no such column')) {
    const missingColMatch = errorMessage.match(/no such column:\s*([A-Za-z0-9_]+)/i);
    const missingCol = missingColMatch ? missingColMatch[1] : '';

    if (missingCol && !['SELECT', 'FROM', 'WHERE'].includes(missingCol.toUpperCase())) {
      // If student wrote Lop = 11B without quotes
      if (fixedSql.includes(`= ${missingCol}`) || fixedSql.includes(`=${missingCol}`)) {
        fixedSql = fixedSql.replace(new RegExp(`(=|!=)\\s*${missingCol}`, 'g'), `$1 '${missingCol}'`);
        reason = `Hệ thống tưởng \`${missingCol}\` là tên một cột trong bảng vì thiếu dấu nháy đơn bao bọc chuỗi ký tự.`;
        tip = `Dữ liệu chuỗi ký tự (text/varchar) trong SQL luôn phải đặt trong dấu ngoặc đơn, ví dụ: '${missingCol}'.`;
      } else {
        reason = `Cột \`${missingCol}\` không tồn tại trong cơ sở dữ liệu này.`;
        tip = `Vui lòng kiểm tra bảng lược đồ CSDL bên trái để chọn đúng tên cột.`;
      }
    }
  }
  // Case 3: Syntax error near token
  else if (errorMessage.toLowerCase().includes('syntax error')) {
    reason = `Lỗi cú pháp SQL (sai thứ tự các mệnh đề hoặc gõ thiếu từ khóa).`;
    tip = `Thứ tự chuẩn của câu lệnh SQL: SELECT ... FROM ... [JOIN ...] [WHERE ...] [GROUP BY ...] [HAVING ...] [ORDER BY ...] [LIMIT ...];`;
  }
  // Case 4: General error
  else {
    reason = `Phát hiện lỗi khi thực thi câu truy vấn: "${errorMessage}".`;
    tip = `Hãy kiểm tra lại tên bảng, tên cột và kết thúc câu lệnh bằng dấu chấm phẩy (;).`;
  }

  // Ensure semicolon at the end
  if (!fixedSql.trim().endsWith(';')) {
    fixedSql = fixedSql.trim() + ';';
  }

  const formatted = formatSql(fixedSql);
  const text = `### 🛠️ [Chuyên gia cấp cao SQL]: Chẩn đoán & Sửa lỗi câu lệnh

**Nguyên nhân gây lỗi:**
- ${reason}

**Câu lệnh đã được sửa chuẩn xác:**
\`\`\`sql
${formatted}
\`\`\`

💡 **Mẹo sư phạm dành cho học sinh:**
- ${tip}`;

  return { text, sqlOnly: formatted };
}
