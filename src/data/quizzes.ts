import { DatabaseId, QuizQuestion } from '../types';

export const QUIZZES_BY_DATABASE: Record<DatabaseId, QuizQuestion[]> = {
  // ==========================================
  // 1. CSDL HỌC SINH (1 Bảng - Điểm & Hồ Sơ)
  // ==========================================
  HOC_SINH: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'HS-Q01',
      databaseId: 'HOC_SINH',
      level: 'Nhận biết',
      order: 1,
      question: 'Cú pháp SQL chuẩn nào được dùng để trích xuất toàn bộ dữ liệu (tất cả các cột và các dòng) từ bảng HOC_SINH?',
      options: [
        { key: 'A', text: 'SELECT ALL FROM HOC_SINH;' },
        { key: 'B', text: 'SELECT * FROM HOC_SINH;' },
        { key: 'C', text: 'GET * FROM HOC_SINH;' },
        { key: 'D', text: 'EXTRACT ALL HOC_SINH;' },
      ],
      correctAnswer: 'B',
      explanation: 'Ký tự đại diện dấu sao (*) trong mệnh đề SELECT đại diện cho toàn bộ các cột trong bảng được chỉ định sau FROM.',
      relatedSql: 'SELECT *\nFROM HOC_SINH;',
    },
    {
      id: 'HS-Q02',
      databaseId: 'HOC_SINH',
      level: 'Nhận biết',
      order: 2,
      question: 'Trong bảng HOC_SINH, cột MaSo được gán ràng buộc "PRIMARY KEY AUTOINCREMENT". Ý nghĩa của ràng buộc này là gì?',
      options: [
        { key: 'A', text: 'Là cột cho phép chứa giá trị trùng nhau và có thể để trống (NULL).' },
        { key: 'B', text: 'Là khóa chính định danh duy nhất mỗi học sinh, tự động tăng giá trị số nguyên khi thêm học sinh mới và không được để trống.' },
        { key: 'C', text: 'Là khóa ngoại tham chiếu đến bảng lớp học bên ngoài.' },
        { key: 'D', text: 'Tự động tính điểm trung bình khi học sinh có điểm môn Toán và Văn.' },
      ],
      correctAnswer: 'B',
      explanation: 'PRIMARY KEY xác định trường khóa chính duy nhất không trùng lặp và không NULL; AUTOINCREMENT tự động tăng giá trị số nguyên cho mỗi bản ghi mới chèn vào.',
      relatedSql: 'SELECT MaSo, HoDem, Ten\nFROM HOC_SINH\nORDER BY MaSo ASC;',
    },
    {
      id: 'HS-Q03',
      databaseId: 'HOC_SINH',
      level: 'Nhận biết',
      order: 3,
      question: 'Mệnh đề nào trong câu lệnh SQL được sử dụng để sắp xếp thứ tự các bản ghi kết quả trả về theo một hoặc nhiều cột?',
      options: [
        { key: 'A', text: 'GROUP BY' },
        { key: 'B', text: 'ORDER BY' },
        { key: 'C', text: 'SORT BY' },
        { key: 'D', text: 'ARRANGE BY' },
      ],
      correctAnswer: 'B',
      explanation: 'Mệnh đề ORDER BY dùng để sắp xếp kết quả tăng dần (ASC - mặc định) hoặc giảm dần (DESC).',
      relatedSql: 'SELECT MaSo, Ten, Toan\nFROM HOC_SINH\nORDER BY Toan DESC;',
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'HS-Q04',
      databaseId: 'HOC_SINH',
      level: 'Thông hiểu',
      order: 4,
      question: 'Quan sát câu lệnh SQL sau:\nSELECT COUNT(*) AS So_Luong\nFROM HOC_SINH\nWHERE GT = \'Nữ\';\nKết quả trả về sẽ là bao nhiêu bản ghi nữ dựa trên dữ liệu hiện có của bảng HOC_SINH?',
      sqlSnippet: `SELECT COUNT(*) AS So_Luong\nFROM HOC_SINH\nWHERE GT = 'Nữ';`,
      options: [
        { key: 'A', text: '3 học sinh' },
        { key: 'B', text: '4 học sinh (Mai, Hà, Nga, Vy)' },
        { key: 'C', text: '5 học sinh' },
        { key: 'D', text: '8 học sinh' },
      ],
      correctAnswer: 'B',
      explanation: 'Trong dữ liệu mẫu có 8 học sinh: 4 Nam (Hoàng, Tuấn, Nam, Khánh) và 4 Nữ (Mai, Hà, Nga, Vy). Hàm COUNT(*) với điều kiện GT = \'Nữ\' sẽ trả về kết quả là 4.',
      relatedSql: `SELECT COUNT(*) AS So_Luong_Nu\nFROM HOC_SINH\nWHERE GT = 'Nữ';`,
    },
    {
      id: 'HS-Q05',
      databaseId: 'HOC_SINH',
      level: 'Thông hiểu',
      order: 5,
      question: 'Điều kiện lọc sau đây trong mệnh đề WHERE có ý nghĩa gì?\nWHERE Toan >= 8.0 AND Van >= 8.0',
      sqlSnippet: `SELECT MaSo, HoDem, Ten, Toan, Van\nFROM HOC_SINH\nWHERE Toan >= 8.0 AND Van >= 8.0;`,
      options: [
        { key: 'A', text: 'Lọc những học sinh có điểm môn Toán hoặc môn Văn đạt từ 8.0 trở lên.' },
        { key: 'B', text: 'Lọc những học sinh có cả hai điểm môn Toán và Văn đồng thời phải đạt từ 8.0 trở lên.' },
        { key: 'C', text: 'Lọc những học sinh có điểm trung bình cộng hai môn lớn hơn hoặc bằng 8.0.' },
        { key: 'D', text: 'Lọc những học sinh có tổng điểm hai môn đạt 16.0 điểm.' },
      ],
      correctAnswer: 'B',
      explanation: 'Toán tử logic AND đòi hỏi cả hai vế điều kiện (Toan >= 8.0 và Van >= 8.0) phải cùng đúng đồng thời trên từng bản ghi.',
      relatedSql: `SELECT MaSo, HoDem || ' ' || Ten AS HoTen, Toan, Van\nFROM HOC_SINH\nWHERE Toan >= 8.0 AND Van >= 8.0;`,
    },
    {
      id: 'HS-Q06',
      databaseId: 'HOC_SINH',
      level: 'Thông hiểu',
      order: 6,
      question: 'Cho câu lệnh SQL:\nSELECT DISTINCT To_hoc FROM HOC_SINH;\nKết quả câu lệnh này trả về điều gì?',
      sqlSnippet: `SELECT DISTINCT To_hoc\nFROM HOC_SINH;`,
      options: [
        { key: 'A', text: 'Tổng số lượng học sinh trong mỗi tổ học tập.' },
        { key: 'B', text: 'Danh sách các tổ học tập duy nhất không bị trùng lặp (gồm các giá trị: 1, 2, 3).' },
        { key: 'C', text: 'Danh sách tất cả 8 dòng giá trị tổ của 8 học sinh.' },
        { key: 'D', text: 'Báo lỗi cú pháp vì DISTINCT bắt buộc phải đi kèm với hàm gộp COUNT().' },
      ],
      correctAnswer: 'B',
      explanation: 'Từ khóa DISTINCT loại bỏ các giá trị lặp lại trong cột To_hoc, chỉ giữ lại tập các giá trị phân biệt duy nhất (1, 2, 3).',
      relatedSql: `SELECT DISTINCT To_hoc\nFROM HOC_SINH;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'HS-Q07',
      databaseId: 'HOC_SINH',
      level: 'Vận dụng',
      order: 7,
      question: 'Để tính điểm trung bình môn Toán và điểm trung bình môn Văn theo từng Tổ học tập (To_hoc), câu lệnh SQL nào sau đây là chuẩn xác nhất?',
      options: [
        { key: 'A', text: 'SELECT To_hoc, ROUND(AVG(Toan), 2) AS DTB_Toan, ROUND(AVG(Van), 2) AS DTB_Van FROM HOC_SINH GROUP BY To_hoc;' },
        { key: 'B', text: 'SELECT To_hoc, SUM(Toan) / COUNT(Toan) FROM HOC_SINH ORDER BY To_hoc;' },
        { key: 'C', text: 'SELECT To_hoc, AVG(Toan, Van) FROM HOC_SINH;' },
        { key: 'D', text: 'SELECT To_hoc, MEAN(Toan), MEAN(Van) FROM HOC_SINH GROUP BY Toan;' },
      ],
      correctAnswer: 'A',
      explanation: 'Để thống kê theo từng nhóm, cần dùng GROUP BY To_hoc kết hợp các hàm gộp AVG(Toan) và AVG(Van), bọc ROUND(..., 2) để làm tròn số thập phân.',
      relatedSql: `SELECT To_hoc, COUNT(*) AS SiSo, ROUND(AVG(Toan), 2) AS DTB_Toan, ROUND(AVG(Van), 2) AS DTB_Van\nFROM HOC_SINH\nGROUP BY To_hoc;`,
    },
    {
      id: 'HS-Q08',
      databaseId: 'HOC_SINH',
      level: 'Vận dụng',
      order: 8,
      question: 'Cần tìm học sinh Nữ có điểm môn Toán cao nhất trong bảng HOC_SINH. Câu lệnh SQL nào dưới đây cho kết quả chính xác và ngắn gọn nhất?',
      options: [
        { key: 'A', text: 'SELECT MaSo, HoDem || \' \' || Ten AS HoTen, Toan FROM HOC_SINH WHERE GT = \'Nữ\' ORDER BY Toan DESC LIMIT 1;' },
        { key: 'B', text: 'SELECT MaSo, Ten, MAX(Toan) FROM HOC_SINH WHERE GT = \'Nữ\';' },
        { key: 'C', text: 'SELECT * FROM HOC_SINH WHERE Toan = MAX(Toan) AND GT = \'Nữ\';' },
        { key: 'D', text: 'SELECT Ten FROM HOC_SINH GROUP BY GT HAVING MAX(Toan);' },
      ],
      correctAnswer: 'A',
      explanation: 'Lọc điều kiện GT = \'Nữ\', sắp xếp điểm Toán giảm dần (ORDER BY Toan DESC) và lấy bản ghi đầu tiên bằng LIMIT 1 để được học sinh nữ có điểm Toán cao nhất (bạn Đỗ Quỳnh Nga, 9.5 điểm).',
      relatedSql: `SELECT MaSo, HoDem || ' ' || Ten AS HoTen, GT, Toan\nFROM HOC_SINH\nWHERE GT = 'Nữ'\nORDER BY Toan DESC\nLIMIT 1;`,
    },
    {
      id: 'HS-Q09',
      databaseId: 'HOC_SINH',
      level: 'Vận dụng',
      order: 9,
      question: 'Muốn cập nhật tăng thêm 0.5 điểm môn Văn cho tất cả học sinh thuộc Tổ 2 có điểm Văn dưới 8.0, câu lệnh SQL nào dưới đây là đúng?',
      options: [
        { key: 'A', text: 'UPDATE HOC_SINH SET Van = Van + 0.5 WHERE To_hoc = 2 AND Van < 8.0;' },
        { key: 'B', text: 'MODIFY HOC_SINH SET Van = Van + 0.5 WHERE To_hoc = 2 AND Van < 8.0;' },
        { key: 'C', text: 'ALTER TABLE HOC_SINH UPDATE Van = Van + 0.5 WHERE To_hoc = 2;' },
        { key: 'D', text: 'UPDATE TABLE HOC_SINH SET Van = Van + 0.5 HAVING To_hoc = 2;' },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp DML cập nhật dữ liệu chuẩn là: UPDATE tên_bảng SET cột = biểu_thức WHERE điều_kiện.',
      relatedSql: `UPDATE HOC_SINH\nSET Van = Van + 0.5\nWHERE To_hoc = 2 AND Van < 8.0;`,
    },
    {
      id: 'HS-Q10',
      databaseId: 'HOC_SINH',
      level: 'Vận dụng',
      order: 10,
      question: 'Để lọc ra các Tổ học tập có điểm trung bình môn Toán lớn hơn hoặc bằng 8.0, câu lệnh SQL nào sau đây sử dụng đúng cú pháp mệnh đề HAVING?',
      options: [
        { key: 'A', text: 'SELECT To_hoc, AVG(Toan) AS DTB FROM HOC_SINH WHERE AVG(Toan) >= 8.0 GROUP BY To_hoc;' },
        { key: 'B', text: 'SELECT To_hoc, ROUND(AVG(Toan), 2) AS DTB_Toan FROM HOC_SINH GROUP BY To_hoc HAVING AVG(Toan) >= 8.0;' },
        { key: 'C', text: 'SELECT To_hoc, AVG(Toan) AS DTB FROM HOC_SINH GROUP BY To_hoc WHERE Toan >= 8.0;' },
        { key: 'D', text: 'SELECT To_hoc FROM HOC_SINH HAVING Toan >= 8.0 GROUP BY To_hoc;' },
      ],
      correctAnswer: 'B',
      explanation: 'Mệnh đề WHERE lọc từng bản ghi trước khi gom nhóm và không thể chứa hàm gộp (như AVG). Muốn lọc theo kết quả của hàm gộp sau khi nhóm, bắt buộc phải dùng mệnh đề HAVING AVG(Toan) >= 8.0 sau GROUP BY.',
      relatedSql: `SELECT To_hoc, ROUND(AVG(Toan), 2) AS DTB_Toan\nFROM HOC_SINH\nGROUP BY To_hoc\nHAVING AVG(Toan) >= 8.0;`,
    },
  ],

  // ==========================================
  // 2. CSDL KINH DOANH (3 Bảng - Bán Hàng)
  // ==========================================
  KINH_DOANH: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'KD-Q01',
      databaseId: 'KINH_DOANH',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong bảng HOA_DON, hai cột Ma_khach_hang và Ma_mat_hang mang ràng buộc FOREIGN KEY có vai trò chính là gì?',
      options: [
        { key: 'A', text: 'Tự động tính thành tiền của hóa đơn khi nhân số lượng với đơn giá.' },
        { key: 'B', text: 'Thiết lập mối quan hệ tham chiếu đến khóa chính của bảng KHACH_HANG và MAT_HANG, đảm bảo tính toàn vẹn dữ liệu.' },
        { key: 'C', text: 'Ngăn chặn việc chỉnh sửa số lượng sản phẩm sau khi đã lập hóa đơn.' },
        { key: 'D', text: 'Đánh số thứ tự tăng dần tự động cho các hóa đơn.' },
      ],
      correctAnswer: 'B',
      explanation: 'Khóa ngoại (Foreign Key) tạo mối liên kết tham chiếu giữa bảng con (HOA_DON) và các bảng cha (KHACH_HANG, MAT_HANG), bảo đảm không tồn tại hóa đơn với mã khách hoặc mã hàng không có thật.',
      relatedSql: `SELECT hd.So_don, hd.Ma_khach_hang, hd.Ma_mat_hang\nFROM HOA_DON hd;`,
    },
    {
      id: 'KD-Q02',
      databaseId: 'KINH_DOANH',
      level: 'Nhận biết',
      order: 2,
      question: 'Cú pháp SQL nào sau đây được sử dụng để chèn thêm một bản ghi khách hàng mới vào bảng KHACH_HANG?',
      options: [
        { key: 'A', text: 'ADD INTO KHACH_HANG VALUES (\'KH06\', \'Trần Văn Nam\', \'Hải Dương\');' },
        { key: 'B', text: 'INSERT INTO KHACH_HANG (Ma_khach_hang, Ho_ten, Dia_chi) VALUES (\'KH06\', \'Trần Văn Nam\', \'Hải Dương\');' },
        { key: 'C', text: 'CREATE ROW KHACH_HANG (\'KH06\', \'Trần Văn Nam\', \'Hải Dương\');' },
        { key: 'D', text: 'UPDATE KHACH_HANG INSERT (\'KH06\', \'Trần Văn Nam\', \'Hải Dương\');' },
      ],
      correctAnswer: 'B',
      explanation: 'Cú pháp chuẩn để thêm bản ghi mới trong SQL là: INSERT INTO tên_bảng (các_cột) VALUES (các_giá_trị);.',
      relatedSql: `INSERT INTO KHACH_HANG (Ma_khach_hang, Ho_ten, Dia_chi)\nVALUES ('KH06', 'Trần Văn Nam', 'Hải Dương');`,
    },
    {
      id: 'KD-Q03',
      databaseId: 'KINH_DOANH',
      level: 'Nhận biết',
      order: 3,
      question: 'Cột So_luong trong bảng HOA_DON có ràng buộc CHECK(So_luong > 0). Ràng buộc này có ý nghĩa gì?',
      options: [
        { key: 'A', text: 'Số lượng mua hàng bắt buộc phải là số nguyên dương lớn hơn 0, không chấp nhận số âm hay số 0.' },
        { key: 'B', text: 'Số lượng mua hàng luôn được làm tròn thành số 1.' },
        { key: 'C', text: 'Số lượng mua hàng tối đa là 100 sản phẩm.' },
        { key: 'D', text: 'Tự động trừ số lượng hàng tồn kho.' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề CHECK(So_luong > 0) là ràng buộc miền giá trị kiểm tra dữ liệu trước khi lưu, từ chối bất kỳ giá trị nào nhỏ hơn hoặc bằng 0.',
      relatedSql: `SELECT So_don, So_luong\nFROM HOA_DON\nWHERE So_luong > 0;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'KD-Q04',
      databaseId: 'KINH_DOANH',
      level: 'Thông hiểu',
      order: 4,
      question: 'Trong câu lệnh kết nối hai bảng sau:\nSELECT hd.So_don, kh.Ho_ten\nFROM HOA_DON hd JOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang;\nĐiều kiện trong mệnh đề ON có vai trò gì?',
      sqlSnippet: `SELECT hd.So_don, kh.Ho_ten\nFROM HOA_DON hd JOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang;`,
      options: [
        { key: 'A', text: 'Chỉ định tiêu chí kết nối: chỉ ghép các bản ghi khi mã khách hàng ở bảng HOA_DON trùng khớp với mã khách hàng ở bảng KHACH_HANG.' },
        { key: 'B', text: 'Nhân tất cả các dòng của bảng này với tất cả các dòng của bảng kia.' },
        { key: 'C', text: 'Sắp xếp danh sách hóa đơn theo tên của khách hàng.' },
        { key: 'D', text: 'Xóa đi các khách hàng chưa có hóa đơn mua hàng.' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề ON chỉ rõ biểu thức điều kiện kết nối (Join condition) để ghép cặp chính xác dòng dữ liệu tương ứng giữa hai quan hệ.',
      relatedSql: `SELECT hd.So_don, kh.Ho_ten, hd.Ngay_giao_hang\nFROM HOA_DON hd\nJOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang;`,
    },
    {
      id: 'KD-Q05',
      databaseId: 'KINH_DOANH',
      level: 'Thông hiểu',
      order: 5,
      question: 'Cho câu lệnh SQL:\nSELECT COUNT(DISTINCT Ma_khach_hang) AS So_Khach_Mua\nFROM HOA_DON;\nÝ nghĩa nghiệp vụ thực tế của câu lệnh trên là gì?',
      sqlSnippet: `SELECT COUNT(DISTINCT Ma_khach_hang) AS So_Khach_Mua\nFROM HOA_DON;`,
      options: [
        { key: 'A', text: 'Đếm tổng số đơn hàng đã được giao dịch.' },
        { key: 'B', text: 'Đếm số lượng khách hàng phân biệt đã từng phát sinh ít nhất một giao dịch mua hàng.' },
        { key: 'C', text: 'Đếm tổng số lượng tất cả các sản phẩm đã bán ra.' },
        { key: 'D', text: 'Đếm số lượng khách hàng chưa mua hàng lần nào.' },
      ],
      correctAnswer: 'B',
      explanation: 'Một khách hàng có thể mua nhiều đơn hàng (mã khách lặp lại trong HOA_DON). Từ khóa DISTINCT loại bỏ sự trùng lặp trước khi COUNT, cho biết có bao nhiêu khách hàng riêng biệt đã mua.',
      relatedSql: `SELECT COUNT(DISTINCT Ma_khach_hang) AS So_Khach_Mua\nFROM HOA_DON;`,
    },
    {
      id: 'KD-Q06',
      databaseId: 'KINH_DOANH',
      level: 'Thông hiểu',
      order: 6,
      question: 'Câu lệnh: SELECT * FROM MAT_HANG WHERE Don_gia BETWEEN 70000 AND 130000; sẽ trả về những mặt hàng có đơn giá thỏa mãn điều kiện nào?',
      sqlSnippet: `SELECT * FROM MAT_HANG\nWHERE Don_gia BETWEEN 70000 AND 130000;`,
      options: [
        { key: 'A', text: 'Đơn giá lớn hơn 70.000 và nhỏ hơn 130.000 (không lấy giá trị 70.000 và 130.000).' },
        { key: 'B', text: 'Đơn giá nằm trong đoạn từ 70.000 đến 130.000 (bao gồm cả giá trị 70.000 và 130.000).' },
        { key: 'C', text: 'Đơn giá chỉ bằng đúng 70.000 hoặc 130.000.' },
        { key: 'D', text: 'Đơn giá nhỏ hơn 70.000 hoặc lớn hơn 130.000.' },
      ],
      correctAnswer: 'B',
      explanation: 'Toán tử BETWEEN x AND y trong SQL luôn tính đoạn đóng [x, y], tức là tương đương với: Don_gia >= 70000 AND Don_gia <= 130000.',
      relatedSql: `SELECT Ma_mat_hang, Ten_mat_hang, Don_gia\nFROM MAT_HANG\nWHERE Don_gia BETWEEN 70000 AND 130000;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'KD-Q07',
      databaseId: 'KINH_DOANH',
      level: 'Vận dụng',
      order: 7,
      question: 'Để xem chi tiết danh sách hóa đơn gồm: Số đơn, Tên khách hàng, Tên mặt hàng, Số lượng mua, Đơn giá và Thành tiền (Thành tiền = Số lượng * Đơn giá), câu lệnh SQL nào sau đây là chính xác?',
      options: [
        { key: 'A', text: `SELECT hd.So_don, kh.Ho_ten, mh.Ten_mat_hang, hd.So_luong, mh.Don_gia, (hd.So_luong * mh.Don_gia) AS Thanh_tien\nFROM HOA_DON hd\nJOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang;` },
        { key: 'B', text: `SELECT hd.So_don, kh.Ho_ten, mh.Ten_mat_hang, hd.So_luong * mh.Don_gia\nFROM HOA_DON hd, KHACH_HANG kh, MAT_HANG mh;` },
        { key: 'C', text: `SELECT hd.So_don, (hd.So_luong * mh.Don_gia) AS Thanh_tien\nFROM HOA_DON hd;` },
        { key: 'D', text: `SELECT hd.So_don, MULTIPLY(hd.So_luong, mh.Don_gia) FROM HOA_DON hd JOIN MAT_HANG mh;` },
      ],
      correctAnswer: 'A',
      explanation: 'Cần kết nối 3 bảng qua 2 phép JOIN (HOA_DON nối với KHACH_HANG qua Ma_khach_hang, nối với MAT_HANG qua Ma_mat_hang) và tính biểu thức (hd.So_luong * mh.Don_gia).',
      relatedSql: `SELECT hd.So_don, kh.Ho_ten, mh.Ten_mat_hang, hd.So_luong, mh.Don_gia, (hd.So_luong * mh.Don_gia) AS Thanh_tien\nFROM HOA_DON hd\nJOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang\nORDER BY hd.So_don;`,
    },
    {
      id: 'KD-Q08',
      databaseId: 'KINH_DOANH',
      level: 'Vận dụng',
      order: 8,
      question: 'Câu lệnh SQL nào dưới đây tính tổng số lượng đã bán và tổng doanh thu cho từng Mặt hàng, sắp xếp theo tổng doanh thu giảm dần?',
      options: [
        { key: 'A', text: `SELECT mh.Ma_mat_hang, mh.Ten_mat_hang, SUM(hd.So_luong) AS Tong_ban, SUM(hd.So_luong * mh.Don_gia) AS Tong_doanh_thu\nFROM MAT_HANG mh\nJOIN HOA_DON hd ON mh.Ma_mat_hang = hd.Ma_mat_hang\nGROUP BY mh.Ma_mat_hang, mh.Ten_mat_hang\nORDER BY Tong_doanh_thu DESC;` },
        { key: 'B', text: `SELECT mh.Ma_mat_hang, (hd.So_luong * mh.Don_gia) AS Tong_doanh_thu\nFROM MAT_HANG mh\nORDER BY Tong_doanh_thu DESC;` },
        { key: 'C', text: `SELECT mh.Ma_mat_hang, COUNT(hd.So_don) FROM MAT_HANG mh GROUP BY mh.Ma_mat_hang;` },
        { key: 'D', text: `SELECT mh.Ten_mat_hang, AVG(hd.So_luong) FROM HOA_DON hd GROUP BY mh.Ten_mat_hang;` },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối bảng MAT_HANG với HOA_DON, gom nhóm theo mặt hàng (GROUP BY mh.Ma_mat_hang, mh.Ten_mat_hang) và dùng hàm SUM để tính tổng số lượng cùng tổng tiền.',
      relatedSql: `SELECT mh.Ma_mat_hang, mh.Ten_mat_hang, SUM(hd.So_luong) AS Tong_ban, SUM(hd.So_luong * mh.Don_gia) AS Tong_doanh_thu\nFROM MAT_HANG mh\nJOIN HOA_DON hd ON mh.Ma_mat_hang = hd.Ma_mat_hang\nGROUP BY mh.Ma_mat_hang, mh.Ten_mat_hang\nORDER BY Tong_doanh_thu DESC;`,
    },
    {
      id: 'KD-Q09',
      databaseId: 'KINH_DOANH',
      level: 'Vận dụng',
      order: 9,
      question: 'Làm thế nào để tìm ra thông tin vị khách hàng đã chi tiêu số tiền mua hàng nhiều nhất trong hệ thống?',
      options: [
        { key: 'A', text: `SELECT kh.Ma_khach_hang, kh.Ho_ten, SUM(hd.So_luong * mh.Don_gia) AS Tong_chi_tieu\nFROM KHACH_HANG kh\nJOIN HOA_DON hd ON kh.Ma_khach_hang = hd.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang\nGROUP BY kh.Ma_khach_hang, kh.Ho_ten\nORDER BY Tong_chi_tieu DESC\nLIMIT 1;` },
        { key: 'B', text: `SELECT kh.Ho_ten, MAX(hd.So_luong * mh.Don_gia) FROM KHACH_HANG kh;` },
        { key: 'C', text: `SELECT kh.Ho_ten FROM KHACH_HANG kh WHERE Tong_chi_tieu = MAX();` },
        { key: 'D', text: `SELECT kh.Ho_ten, SUM(hd.So_luong) FROM HOA_DON hd GROUP BY kh.Ho_ten;` },
      ],
      correctAnswer: 'A',
      explanation: 'Nhóm theo từng khách hàng, tính tổng tiền chi tiêu SUM(hd.So_luong * mh.Don_gia), sắp xếp giảm dần (ORDER BY Tong_chi_tieu DESC) và lấy bản ghi đứng đầu bảng bằng LIMIT 1.',
      relatedSql: `SELECT kh.Ma_khach_hang, kh.Ho_ten, kh.Dia_chi, SUM(hd.So_luong * mh.Don_gia) AS Tong_chi_tieu\nFROM KHACH_HANG kh\nJOIN HOA_DON hd ON kh.Ma_khach_hang = hd.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang\nGROUP BY kh.Ma_khach_hang, kh.Ho_ten\nORDER BY Tong_chi_tieu DESC\nLIMIT 1;`,
    },
    {
      id: 'KD-Q10',
      databaseId: 'KINH_DOANH',
      level: 'Vận dụng',
      order: 10,
      question: 'Để tìm danh sách các khách hàng trong bảng KHACH_HANG mà chưa từng phát sinh bất kỳ đơn hàng nào trong bảng HOA_DON, câu lệnh truy vấn con (Subquery) nào sau đây là đúng?',
      options: [
        { key: 'A', text: `SELECT Ma_khach_hang, Ho_ten, Dia_chi\nFROM KHACH_HANG\nWHERE Ma_khach_hang NOT IN (SELECT Ma_khach_hang FROM HOA_DON);` },
        { key: 'B', text: `SELECT * FROM KHACH_HANG WHERE Ma_khach_hang IN (SELECT Ma_khach_hang FROM HOA_DON);` },
        { key: 'C', text: `SELECT * FROM KHACH_HANG kh JOIN HOA_DON hd ON kh.Ma_khach_hang = hd.Ma_khach_hang WHERE hd.So_don IS NULL;` },
        { key: 'D', text: `SELECT * FROM KHACH_HANG WHERE So_don = 0;` },
      ],
      correctAnswer: 'A',
      explanation: 'Toán tử NOT IN kết hợp truy vấn con (Subquery) lọc ra các mã khách hàng không hiện diện trong danh sách mã khách hàng của bảng HOA_DON (ở dữ liệu mẫu là khách KH05 - Võ Quốc Hưng).',
      relatedSql: `SELECT Ma_khach_hang, Ho_ten, Dia_chi\nFROM KHACH_HANG\nWHERE Ma_khach_hang NOT IN (SELECT Ma_khach_hang FROM HOA_DON);`,
    },
  ],

  // ==========================================
  // 3. CSDL HỌC TẬP (3 Bảng - Điểm Số)
  // ==========================================
  HOC_TAP: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'HT-Q01',
      databaseId: 'HOC_TAP',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong định nghĩa bảng BANG_DIEM, ràng buộc CHECK(Diem_so >= 0 AND Diem_so <= 10) có tác dụng gì?',
      options: [
        { key: 'A', text: 'Tự động tính điểm trung bình cho học sinh.' },
        { key: 'B', text: 'Bảo đảm điểm số nhập vào luôn hợp lệ trong thang điểm từ 0 đến 10, ngăn ngừa nhập điểm âm hoặc lớn hơn 10.' },
        { key: 'C', text: 'Giới hạn số lần kiểm tra tối đa của mỗi học sinh là 10 lần.' },
        { key: 'D', text: 'Tự động xếp loại học sinh theo mức điểm đạt được.' },
      ],
      correctAnswer: 'B',
      explanation: 'Ràng buộc CHECK định nghĩa điều kiện hợp lệ của giá trị cột: Diem_so chỉ được phép nằm trong khoảng từ 0.0 đến 10.0.',
      relatedSql: `SELECT ID, Ma_hoc_sinh, Ma_mon_hoc, Diem_so\nFROM BANG_DIEM;`,
    },
    {
      id: 'HT-Q02',
      databaseId: 'HOC_TAP',
      level: 'Nhận biết',
      order: 2,
      question: 'Bảng BANG_DIEM có bao nhiêu cột giữ vai trò là Khóa ngoại (Foreign Key)?',
      options: [
        { key: 'A', text: '1 cột (Ma_hoc_sinh)' },
        { key: 'B', text: '2 cột (Ma_hoc_sinh tham chiếu HOC_SINH và Ma_mon_hoc tham chiếu MON_HOC)' },
        { key: 'C', text: '3 cột' },
        { key: 'D', text: 'Không có cột nào là khóa ngoại' },
      ],
      correctAnswer: 'B',
      explanation: 'Bảng BANG_DIEM có 2 khóa ngoại: Ma_hoc_sinh tham chiếu tới HOC_SINH(Ma_hoc_sinh) và Ma_mon_hoc tham chiếu tới MON_HOC(Ma_mon_hoc).',
      relatedSql: `SELECT bd.ID, hs.Ten, mh.Ten_mon_hoc, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nJOIN MON_HOC mh ON bd.Ma_mon_hoc = mh.Ma_mon_hoc;`,
    },
    {
      id: 'HT-Q03',
      databaseId: 'HOC_TAP',
      level: 'Nhận biết',
      order: 3,
      question: 'Lệnh SQL nào sau đây sẽ xóa toàn bộ các dòng dữ liệu trong bảng BANG_DIEM nhưng vẫn giữ nguyên cấu trúc bảng?',
      options: [
        { key: 'A', text: 'DROP TABLE BANG_DIEM;' },
        { key: 'B', text: 'DELETE FROM BANG_DIEM;' },
        { key: 'C', text: 'REMOVE ALL FROM BANG_DIEM;' },
        { key: 'D', text: 'TRUNCATE SCHEMA BANG_DIEM;' },
      ],
      correctAnswer: 'B',
      explanation: 'Lệnh DELETE FROM BANG_DIEM; xóa toàn bộ các bản ghi trong bảng mà không hủy bỏ định nghĩa cấu trúc của bảng (khác với DROP TABLE sẽ xóa sạch cả cấu trúc bảng).',
      relatedSql: `SELECT COUNT(*) AS Tong_So_Ban_Ghi FROM BANG_DIEM;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'HT-Q04',
      databaseId: 'HOC_TAP',
      level: 'Thông hiểu',
      order: 4,
      question: 'Biểu thức SQL sau trong mệnh đề SELECT có ý nghĩa gì?\nhs.Ho_dem || \' \' || hs.Ten AS Ho_ten',
      sqlSnippet: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten\nFROM HOC_SINH hs;`,
      options: [
        { key: 'A', text: 'So sánh hai chuỗi họ đệm và tên xem có giống nhau không.' },
        { key: 'B', text: 'Sử dụng toán tử ghép chuỗi (||) để nối chuỗi Ho_dem, dấu cách và Ten thành một cột hiển thị thống nhất có bí danh là Ho_ten.' },
        { key: 'C', text: 'Thực hiện phép toán logic OR giữa họ và tên.' },
        { key: 'D', text: 'Tách chuỗi họ và tên thành hai dòng riêng biệt.' },
      ],
      correctAnswer: 'B',
      explanation: 'Trong chuẩn SQL và SQLite, toán tử hai gạch đứng (||) là toán tử nối chuỗi (String Concatenation), giúp ghép họ đệm và tên thành họ tên đầy đủ.',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten\nFROM HOC_SINH hs;`,
    },
    {
      id: 'HT-Q05',
      databaseId: 'HOC_TAP',
      level: 'Thông hiểu',
      order: 5,
      question: 'Cho câu lệnh SQL:\nSELECT AVG(Diem_so) AS DTB_Mon_Toan\nFROM BANG_DIEM\nWHERE Ma_mon_hoc = \'TOAN\';\nKết quả trả về của câu lệnh mang ý nghĩa gì?',
      sqlSnippet: `SELECT ROUND(AVG(Diem_so), 2) AS DTB_Mon_Toan\nFROM BANG_DIEM\nWHERE Ma_mon_hoc = 'TOAN';`,
      options: [
        { key: 'A', text: 'Điểm số môn Toán của học sinh đầu tiên trong bảng.' },
        { key: 'B', text: 'Điểm trung bình cộng của tất cả các bài kiểm tra thuộc môn Toán có trong bảng điểm.' },
        { key: 'C', text: 'Tổng số điểm môn Toán mà các bạn học sinh đạt được.' },
        { key: 'D', text: 'Số lượng học sinh đã tham gia thi môn Toán.' },
      ],
      correctAnswer: 'B',
      explanation: 'Hàm AVG(Diem_so) kết hợp điều kiện lọc WHERE Ma_mon_hoc = \'TOAN\' tính giá trị trung bình cộng điểm số của riêng các bài kiểm tra môn Toán.',
      relatedSql: `SELECT ROUND(AVG(Diem_so), 2) AS DTB_Mon_Toan\nFROM BANG_DIEM\nWHERE Ma_mon_hoc = 'TOAN';`,
    },
    {
      id: 'HT-Q06',
      databaseId: 'HOC_TAP',
      level: 'Thông hiểu',
      order: 6,
      question: 'Khi thực hiện liên kết giữa bảng HOC_SINH và BANG_DIEM, sự khác biệt giữa INNER JOIN và LEFT JOIN là gì?',
      options: [
        { key: 'A', text: 'INNER JOIN hiển thị cả những học sinh chưa có bất kỳ bài kiểm tra nào trong BANG_DIEM.' },
        { key: 'B', text: 'LEFT JOIN sẽ giữ lại tất cả các học sinh ở bảng HOC_SINH (bên trái), nếu học sinh đó chưa có bài kiểm tra nào thì các cột của BANG_DIEM sẽ mang giá trị NULL.' },
        { key: 'C', text: 'LEFT JOIN tự động loại bỏ các học sinh có điểm dưới trung bình.' },
        { key: 'D', text: 'Hai phép kết nối này luôn cho ra kết quả hoàn toàn giống hệt nhau.' },
      ],
      correctAnswer: 'B',
      explanation: 'LEFT JOIN bảo toàn mọi bản ghi ở bảng nguồn bên trái (HOC_SINH), điền NULL cho các trường ở bảng bên phải nếu không tìm thấy bản ghi tương ứng.',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ten, bd.Diem_so\nFROM HOC_SINH hs\nLEFT JOIN BANG_DIEM bd ON hs.Ma_hoc_sinh = bd.Ma_hoc_sinh;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'HT-Q07',
      databaseId: 'HOC_TAP',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh SQL nào sau đây hiển thị danh sách gồm: Mã học sinh, Họ tên, Tên môn học, Ngày kiểm tra và Điểm số cho tất cả bài kiểm tra đạt điểm giỏi (Diem_so >= 8.5)?',
      options: [
        { key: 'A', text: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, mh.Ten_mon_hoc, bd.Ngay_kiem_tra, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nJOIN MON_HOC mh ON bd.Ma_mon_hoc = mh.Ma_mon_hoc\nWHERE bd.Diem_so >= 8.5;` },
        { key: 'B', text: `SELECT * FROM BANG_DIEM WHERE Diem_so >= 8.5;` },
        { key: 'C', text: `SELECT hs.Ho_dem, mh.Ten_mon_hoc FROM HOC_SINH hs, MON_HOC mh WHERE Diem_so >= 8.5;` },
        { key: 'D', text: `SELECT hs.Ma_hoc_sinh, bd.Diem_so FROM BANG_DIEM bd HAVING bd.Diem_so >= 8.5;` },
      ],
      correctAnswer: 'A',
      explanation: 'Nối 3 bảng BANG_DIEM, HOC_SINH và MON_HOC bằng INNER JOIN với điều kiện lọc WHERE bd.Diem_so >= 8.5 để lấy đầy đủ thông tin tên học sinh và tên môn học.',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, mh.Ten_mon_hoc, bd.Ngay_kiem_tra, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nJOIN MON_HOC mh ON bd.Ma_mon_hoc = mh.Ma_mon_hoc\nWHERE bd.Diem_so >= 8.5;`,
    },
    {
      id: 'HT-Q08',
      databaseId: 'HOC_TAP',
      level: 'Vận dụng',
      order: 8,
      question: 'Viết câu lệnh tính điểm trung bình chung các bài kiểm tra của từng học sinh (hiển thị Ma_hoc_sinh, Ho_ten, Diem_TB) và chỉ lấy những bạn có Điểm_TB >= 8.0?',
      options: [
        { key: 'A', text: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, ROUND(AVG(bd.Diem_so), 2) AS Diem_TB\nFROM HOC_SINH hs\nJOIN BANG_DIEM bd ON hs.Ma_hoc_sinh = bd.Ma_hoc_sinh\nGROUP BY hs.Ma_hoc_sinh, Ho_ten\nHAVING AVG(bd.Diem_so) >= 8.0\nORDER BY Diem_TB DESC;` },
        { key: 'B', text: `SELECT hs.Ma_hoc_sinh, AVG(bd.Diem_so) AS Diem_TB FROM BANG_DIEM bd WHERE AVG(bd.Diem_so) >= 8.0 GROUP BY hs.Ma_hoc_sinh;` },
        { key: 'C', text: `SELECT hs.Ma_hoc_sinh, AVG(bd.Diem_so) FROM HOC_SINH hs WHERE Diem_so >= 8.0;` },
        { key: 'D', text: `SELECT hs.Ma_hoc_sinh, SUM(bd.Diem_so) AS Diem_TB FROM BANG_DIEM bd GROUP BY hs.Ma_hoc_sinh;` },
      ],
      correctAnswer: 'A',
      explanation: 'Gom nhóm theo học sinh (GROUP BY hs.Ma_hoc_sinh, Ho_ten), lọc nhóm bằng HAVING AVG(bd.Diem_so) >= 8.0 và làm tròn kết quả với ROUND().',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, COUNT(bd.ID) AS So_Bai, ROUND(AVG(bd.Diem_so), 2) AS Diem_TB\nFROM HOC_SINH hs\nJOIN BANG_DIEM bd ON hs.Ma_hoc_sinh = bd.Ma_hoc_sinh\nGROUP BY hs.Ma_hoc_sinh, Ho_ten\nHAVING AVG(bd.Diem_so) >= 8.0\nORDER BY Diem_TB DESC;`,
    },
    {
      id: 'HT-Q09',
      databaseId: 'HOC_TAP',
      level: 'Vận dụng',
      order: 9,
      question: 'Để tìm thông tin học sinh đạt điểm cao nhất trong môn Tin học (\'TIN\'), câu lệnh SQL nào dưới đây là chính xác và ngắn gọn nhất?',
      options: [
        { key: 'A', text: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nWHERE bd.Ma_mon_hoc = 'TIN'\nORDER BY bd.Diem_so DESC\nLIMIT 1;` },
        { key: 'B', text: `SELECT hs.Ho_ten, MAX(bd.Diem_so) FROM BANG_DIEM bd;` },
        { key: 'C', text: `SELECT * FROM BANG_DIEM WHERE Ma_mon_hoc = 'TIN' AND Diem_so = 10;` },
        { key: 'D', text: `SELECT hs.Ma_hoc_sinh FROM HOC_SINH hs WHERE Ma_mon_hoc = 'TIN';` },
      ],
      correctAnswer: 'A',
      explanation: 'Lọc điều kiện bd.Ma_mon_hoc = \'TIN\', sắp xếp điểm giảm dần (ORDER BY bd.Diem_so DESC) và lấy bản ghi vị trí đầu bảng với LIMIT 1 (học sinh Nguyễn Quốc Cường, 9.5 điểm).',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nWHERE bd.Ma_mon_hoc = 'TIN'\nORDER BY bd.Diem_so DESC\nLIMIT 1;`,
    },
    {
      id: 'HT-Q10',
      databaseId: 'HOC_TAP',
      level: 'Vận dụng',
      order: 10,
      question: 'Để thống kê số lượng bài kiểm tra đã thực hiện theo từng môn học (kể cả những môn học chưa có bài kiểm tra nào trong bảng BANG_DIEM), câu lệnh SQL nào sau đây là chuẩn xác?',
      options: [
        { key: 'A', text: `SELECT mh.Ma_mon_hoc, mh.Ten_mon_hoc, COUNT(bd.ID) AS So_bai_KT\nFROM MON_HOC mh\nLEFT JOIN BANG_DIEM bd ON mh.Ma_mon_hoc = bd.Ma_mon_hoc\nGROUP BY mh.Ma_mon_hoc, mh.Ten_mon_hoc;` },
        { key: 'B', text: `SELECT mh.Ten_mon_hoc, COUNT(*) FROM MON_HOC mh JOIN BANG_DIEM bd ON mh.Ma_mon_hoc = bd.Ma_mon_hoc;` },
        { key: 'C', text: `SELECT mh.Ten_mon_hoc, SUM(bd.ID) FROM MON_HOC mh GROUP BY mh.Ten_mon_hoc;` },
        { key: 'D', text: `SELECT mh.Ma_mon_hoc, COUNT(bd.ID) FROM BANG_DIEM bd GROUP BY bd.Ma_mon_hoc;` },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng LEFT JOIN từ MON_HOC sang BANG_DIEM và COUNT(bd.ID) (chứ không dùng COUNT(*)) để nếu môn học chưa có bài thi nào thì COUNT(NULL) sẽ trả về 0 chính xác.',
      relatedSql: `SELECT mh.Ma_mon_hoc, mh.Ten_mon_hoc, COUNT(bd.ID) AS So_bai_KT\nFROM MON_HOC mh\nLEFT JOIN BANG_DIEM bd ON mh.Ma_mon_hoc = bd.Ma_mon_hoc\nGROUP BY mh.Ma_mon_hoc, mh.Ten_mon_hoc;`,
    },
  ],

  // ==========================================
  // 4. CSDL ÂM NHẠC (4 Bảng - Nhạc Sĩ & Ca Sĩ)
  // ==========================================
  AM_NHAC: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'AN-Q01',
      databaseId: 'AM_NHAC',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong mô hình CSDL Âm nhạc, mối quan hệ nhiều - nhiều (N:N) giữa BAN_NHAC và CA_SI được giải quyết thông qua bảng trung gian nào?',
      options: [
        { key: 'A', text: 'Bảng NHAC_SI' },
        { key: 'B', text: 'Bảng BAN_THU_AM' },
        { key: 'C', text: 'Bảng THE_LOAI' },
        { key: 'D', text: 'Bảng ALBUM' },
      ],
      correctAnswer: 'B',
      explanation: 'Một bản nhạc có thể được nhiều ca sĩ thu âm, và một ca sĩ có thể thu âm nhiều bản nhạc. Bảng BAN_THU_AM đóng vai trò bảng liên kết (Junction Table) lưu trữ cặp (Mid, Sid).',
      relatedSql: `SELECT Mid, Sid\nFROM BAN_THU_AM;`,
    },
    {
      id: 'AN-Q02',
      databaseId: 'AM_NHAC',
      level: 'Nhận biết',
      order: 2,
      question: 'Trong bảng BAN_THU_AM, cặp thuộc tính (Mid, Sid) cùng giữ vai trò gì?',
      options: [
        { key: 'A', text: 'Chỉ là khóa ngoại đơn thuần' },
        { key: 'B', text: 'Là khóa chính kết hợp (Composite Primary Key), đồng thời mỗi thuộc tính là một khóa ngoại tham chiếu tương ứng đến BAN_NHAC và CA_SI' },
        { key: 'C', text: 'Là hai trường dữ liệu tùy chọn' },
        { key: 'D', text: 'Chỉ là chỉ mục tìm kiếm thông thường' },
      ],
      correctAnswer: 'B',
      explanation: 'Cặp (Mid, Sid) là PRIMARY KEY (Mid, Sid) để mỗi ca sĩ chỉ có một bản thu âm định danh duy nhất cho một bài hát, đồng thời Mid tham chiếu BAN_NHAC và Sid tham chiếu CA_SI.',
      relatedSql: `SELECT Mid, Sid\nFROM BAN_THU_AM\nORDER BY Mid;`,
    },
    {
      id: 'AN-Q03',
      databaseId: 'AM_NHAC',
      level: 'Nhận biết',
      order: 3,
      question: 'Để tìm các bản nhạc có tên bắt đầu bằng từ "Du kích", ta sử dụng mẫu so khớp chuỗi nào với toán tử LIKE?',
      options: [
        { key: 'A', text: 'WHERE TenBN LIKE \'Du kích*\'' },
        { key: 'B', text: 'WHERE TenBN LIKE \'Du kích%\'' },
        { key: 'C', text: 'WHERE TenBN = \'Du kích\'' },
        { key: 'D', text: 'WHERE TenBN IN (\'Du kích\')' },
      ],
      correctAnswer: 'B',
      explanation: 'Trong SQL chuẩn, ký tự phần trăm (%) đại diện cho chuỗi ký tự bất kỳ có độ dài tùy ý (0 hoặc nhiều ký tự). Cú pháp \'Du kích%\' khớp với mọi chuỗi bắt đầu bằng "Du kích".',
      relatedSql: `SELECT Mid, TenBN\nFROM BAN_NHAC\nWHERE TenBN LIKE 'Du kích%';`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'AN-Q04',
      databaseId: 'AM_NHAC',
      level: 'Thông hiểu',
      order: 4,
      question: 'Câu lệnh SQL sau đây thực hiện yêu cầu gì?\nSELECT bn.TenBN, ns.TenNS\nFROM BAN_NHAC bn\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = \'Văn Cao\';',
      sqlSnippet: `SELECT bn.TenBN, ns.TenNS\nFROM BAN_NHAC bn\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = 'Văn Cao';`,
      options: [
        { key: 'A', text: 'Tìm tất cả các ca sĩ từng thể hiện bài hát của nhạc sĩ Văn Cao.' },
        { key: 'B', text: 'Liệt kê danh sách tên các bản nhạc do nhạc sĩ Văn Cao sáng tác.' },
        { key: 'C', text: 'Đếm số lượng ca khúc do Văn Cao biểu diễn.' },
        { key: 'D', text: 'Tìm bài hát có tên là "Văn Cao".' },
      ],
      correctAnswer: 'B',
      explanation: 'Liên kết bảng BAN_NHAC với NHAC_SI qua khóa ngoại Aid và lọc ns.TenNS = \'Văn Cao\' để lấy danh sách sáng tác của ông (Trường ca Sông Lô, Tiến về Hà Nội).',
      relatedSql: `SELECT bn.Mid, bn.TenBN, ns.TenNS\nFROM BAN_NHAC bn\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = 'Văn Cao';`,
    },
    {
      id: 'AN-Q05',
      databaseId: 'AM_NHAC',
      level: 'Thông hiểu',
      order: 5,
      question: 'Cho câu lệnh SQL:\nSELECT Mid, COUNT(Sid) AS So_Ca_Si\nFROM BAN_THU_AM\nGROUP BY Mid\nHAVING COUNT(Sid) > 1;\nMệnh đề HAVING ở đây thực hiện chức năng gì?',
      sqlSnippet: `SELECT Mid, COUNT(Sid) AS So_Ca_Si\nFROM BAN_THU_AM\nGROUP BY Mid\nHAVING COUNT(Sid) > 1;`,
      options: [
        { key: 'A', text: 'Sắp xếp danh sách bài hát theo số ca sĩ tăng dần.' },
        { key: 'B', text: 'Lọc ra các bản nhạc (Mid) có nhiều hơn 1 ca sĩ tham gia thu âm.' },
        { key: 'C', text: 'Xóa đi các bản nhạc chỉ có 1 ca sĩ hát.' },
        { key: 'D', text: 'Lọc các ca sĩ hát nhiều hơn 1 bài.' },
      ],
      correctAnswer: 'B',
      explanation: 'HAVING COUNT(Sid) > 1 là điều kiện lọc nhóm sau khi gom nhóm theo Mid, chỉ giữ lại các tác phẩm có từ 2 ca sĩ thu âm trở lên.',
      relatedSql: `SELECT bn.Mid, bn.TenBN, COUNT(bta.Sid) AS So_Ca_Si\nFROM BAN_NHAC bn\nJOIN BAN_THU_AM bta ON bn.Mid = bta.Mid\nGROUP BY bn.Mid, bn.TenBN\nHAVING COUNT(bta.Sid) > 1;`,
    },
    {
      id: 'AN-Q06',
      databaseId: 'AM_NHAC',
      level: 'Thông hiểu',
      order: 6,
      question: 'Khi muốn lấy danh sách tên các ca sĩ duy nhất (không bị lặp lại) đã từng thực hiện ít nhất một bản thu âm, ta sử dụng từ khóa nào ngay sau SELECT?',
      options: [
        { key: 'A', text: 'UNIQUE' },
        { key: 'B', text: 'DISTINCT' },
        { key: 'C', text: 'PRIMARY' },
        { key: 'D', text: 'SINGLE' },
      ],
      correctAnswer: 'B',
      explanation: 'Từ khóa SELECT DISTINCT loại bỏ tất cả các dòng trùng lặp trong kết quả trả về, đảm bảo mỗi ca sĩ chỉ xuất hiện đúng một lần.',
      relatedSql: `SELECT DISTINCT cs.Sid, cs.TenCS\nFROM CA_SI cs\nJOIN BAN_THU_AM bta ON cs.Sid = bta.Sid;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'AN-Q07',
      databaseId: 'AM_NHAC',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh SQL nào sau đây hiển thị đầy đủ thông tin mỗi bản thu âm gồm: Mã bài hát, Tên bản nhạc, Tên ca sĩ thể hiện và Tên nhạc sĩ sáng tác bằng cách kết nối cả 4 bảng?',
      options: [
        { key: 'A', text: `SELECT bn.Mid, bn.TenBN, cs.TenCS, ns.TenNS\nFROM BAN_THU_AM bta\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN CA_SI cs ON bta.Sid = cs.Sid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nORDER BY bn.Mid, cs.TenCS;` },
        { key: 'B', text: `SELECT bn.TenBN, cs.TenCS, ns.TenNS FROM BAN_NHAC bn, CA_SI cs, NHAC_SI ns;` },
        { key: 'C', text: `SELECT * FROM BAN_THU_AM;` },
        { key: 'D', text: `SELECT bn.TenBN, ns.TenNS FROM BAN_NHAC bn JOIN NHAC_SI ns ON bn.Aid = ns.Aid;` },
      ],
      correctAnswer: 'A',
      explanation: 'Bảng BAN_THU_AM nối với BAN_NHAC qua Mid, nối với CA_SI qua Sid, và từ BAN_NHAC nối sang NHAC_SI qua Aid để lấy toàn bộ thông tin của 4 thực thể.',
      relatedSql: `SELECT bn.Mid, bn.TenBN, cs.TenCS, ns.TenNS\nFROM BAN_THU_AM bta\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN CA_SI cs ON bta.Sid = cs.Sid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nORDER BY bn.Mid, cs.TenCS;`,
    },
    {
      id: 'AN-Q08',
      databaseId: 'AM_NHAC',
      level: 'Vận dụng',
      order: 8,
      question: 'Câu lệnh SQL nào sau đây thống kê số lượng bản nhạc mà mỗi nhạc sĩ đã sáng tác (kể cả nhạc sĩ chưa có bài hát nào trong CSDL), sắp xếp theo số lượng tác phẩm giảm dần?',
      options: [
        { key: 'A', text: `SELECT ns.Aid, ns.TenNS, COUNT(bn.Mid) AS So_luong_tac_pham\nFROM NHAC_SI ns\nLEFT JOIN BAN_NHAC bn ON ns.Aid = bn.Aid\nGROUP BY ns.Aid, ns.TenNS\nORDER BY So_luong_tac_pham DESC;` },
        { key: 'B', text: `SELECT ns.TenNS, COUNT(*) FROM NHAC_SI ns JOIN BAN_NHAC bn ON ns.Aid = bn.Aid;` },
        { key: 'C', text: `SELECT ns.Aid, SUM(bn.Mid) FROM NHAC_SI ns GROUP BY ns.Aid;` },
        { key: 'D', text: `SELECT ns.TenNS, COUNT(bn.Mid) FROM BAN_NHAC bn GROUP BY bn.Aid;` },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng LEFT JOIN từ NHAC_SI sang BAN_NHAC kết hợp hàm COUNT(bn.Mid) để tính toán chính xác cả những nhạc sĩ chưa có tác phẩm nào (kết quả trả về 0 tác phẩm thay vì bị loại bỏ).',
      relatedSql: `SELECT ns.Aid, ns.TenNS, COUNT(bn.Mid) AS So_luong_tac_pham\nFROM NHAC_SI ns\nLEFT JOIN BAN_NHAC bn ON ns.Aid = bn.Aid\nGROUP BY ns.Aid, ns.TenNS\nORDER BY So_luong_tac_pham DESC;`,
    },
    {
      id: 'AN-Q09',
      databaseId: 'AM_NHAC',
      level: 'Vận dụng',
      order: 9,
      question: 'Tìm danh sách các ca sĩ (hiển thị Sid, TenCS) đã từng thể hiện ít nhất một ca khúc của nhạc sĩ \'Văn Cao\'.',
      options: [
        { key: 'A', text: `SELECT DISTINCT cs.Sid, cs.TenCS\nFROM CA_SI cs\nJOIN BAN_THU_AM bta ON cs.Sid = bta.Sid\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = 'Văn Cao';` },
        { key: 'B', text: `SELECT cs.TenCS FROM CA_SI cs WHERE cs.TenNS = 'Văn Cao';` },
        { key: 'C', text: `SELECT * FROM CA_SI cs JOIN NHAC_SI ns ON cs.Sid = ns.Aid WHERE ns.TenNS = 'Văn Cao';` },
        { key: 'D', text: `SELECT cs.TenCS FROM BAN_THU_AM WHERE Aid = 2;` },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối từ CA_SI -> BAN_THU_AM -> BAN_NHAC -> NHAC_SI, lọc theo ns.TenNS = \'Văn Cao\' và dùng DISTINCT để không lặp lại ca sĩ (kết quả là ca sĩ Trần Khánh - TK).',
      relatedSql: `SELECT DISTINCT cs.Sid, cs.TenCS\nFROM CA_SI cs\nJOIN BAN_THU_AM bta ON cs.Sid = bta.Sid\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = 'Văn Cao';`,
    },
    {
      id: 'AN-Q10',
      databaseId: 'AM_NHAC',
      level: 'Vận dụng',
      order: 10,
      question: 'Để ghi nhận một bản thu âm mới: ca sĩ \'TK\' (Trần Khánh) thể hiện bản nhạc mã \'0004\' (Xa khơi), câu lệnh SQL nào sau đây là chính xác?',
      options: [
        { key: 'A', text: `INSERT INTO BAN_THU_AM (Mid, Sid) VALUES ('0004', 'TK');` },
        { key: 'B', text: `ADD RECORD TO BAN_THU_AM VALUES ('0004', 'TK');` },
        { key: 'C', text: `UPDATE BAN_THU_AM SET Mid = '0004', Sid = 'TK';` },
        { key: 'D', text: `INSERT INTO BAN_NHAC VALUES ('0004', 'TK');` },
      ],
      correctAnswer: 'A',
      explanation: 'Chèn bản ghi vào bảng liên kết BAN_THU_AM với hai khóa ngoại: Mid = \'0004\' và Sid = \'TK\'.',
      relatedSql: `INSERT INTO BAN_THU_AM (Mid, Sid)\nVALUES ('0004', 'TK');`,
    },
  ],

  // ==========================================
  // 6. CSDL QL_XE (3 Bảng - Xe, Loại Xe, Hóa Đơn)
  // ==========================================
  QL_XE: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'XE-Q01',
      databaseId: 'QL_XE',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL QL_XE, trường MaLoai trong bảng DANH_MUC_XE đóng vai trò gì?',
      options: [
        { key: 'A', text: 'Khóa chính (PRIMARY KEY) định danh duy nhất cho từng xe trong bảng DANH_MUC_XE' },
        { key: 'B', text: 'Khóa ngoại (FOREIGN KEY) tham chiếu đến khóa chính MaLoai của bảng LOAI_XE' },
        { key: 'C', text: 'Thuộc tính chỉ mục không liên quan đến quan hệ giữa các bảng' },
        { key: 'D', text: 'Khóa chính tự tăng (AUTOINCREMENT) của bảng DANH_MUC_XE' },
      ],
      correctAnswer: 'B',
      explanation: 'MaLoai trong DANH_MUC_XE là khóa ngoại (FOREIGN KEY) tham chiếu tới bảng LOAI_XE(MaLoai) để xác định phân loại phương tiện.',
      relatedSql: 'SELECT x.MaXe, x.TenXe, x.MaLoai, l.LoaiXe\nFROM DANH_MUC_XE x\nJOIN LOAI_XE l ON x.MaLoai = l.MaLoai;',
    },
    {
      id: 'XE-Q02',
      databaseId: 'QL_XE',
      level: 'Nhận biết',
      order: 2,
      question: 'Cú pháp SQL chuẩn nào dùng để lấy danh sách toàn bộ các loại xe trong bảng LOAI_XE sắp xếp theo thứ tự bảng chữ cái A-Z của LoaiXe?',
      options: [
        { key: 'A', text: 'SELECT * FROM LOAI_XE ORDER BY LoaiXe ASC;' },
        { key: 'B', text: 'SELECT ALL FROM LOAI_XE SORT BY LoaiXe;' },
        { key: 'C', text: 'SELECT * FROM LOAI_XE GROUP BY LoaiXe ASC;' },
        { key: 'D', text: 'FILTER LOAI_XE ORDER BY LoaiXe;' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề ORDER BY LoaiXe ASC sắp xếp kết quả tăng dần từ A-Z theo tên loại xe.',
      relatedSql: 'SELECT MaLoai, LoaiXe\nFROM LOAI_XE\nORDER BY LoaiXe ASC;',
    },
    {
      id: 'XE-Q03',
      databaseId: 'QL_XE',
      level: 'Nhận biết',
      order: 3,
      question: 'Trong bảng HOA_DON, ràng buộc "CHECK(SoLuong > 0)" mang ý nghĩa gì trong thiết kế CSDL?',
      options: [
        { key: 'A', text: 'Tự động gán số lượng là 1 nếu người dùng không nhập' },
        { key: 'B', text: 'Ngăn chặn nhập số lượng âm hoặc bằng 0, đảm bảo số lượng bán phải là số dương hợp lệ' },
        { key: 'C', text: 'Giới hạn số lượng xe bán tối đa trong một hóa đơn là 10' },
        { key: 'D', text: 'Tự động tính tổng tiền khi số lượng thay đổi' },
      ],
      correctAnswer: 'B',
      explanation: 'Ràng buộc CHECK(SoLuong > 0) là ràng buộc toàn vẹn miền giá trị, đảm bảo mọi hóa đơn đều phải có số lượng bán lớn hơn 0.',
      relatedSql: 'SELECT SoHD, MaXe, SoLuong, DonGia\nFROM HOA_DON\nWHERE SoLuong > 0;',
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'XE-Q04',
      databaseId: 'QL_XE',
      level: 'Thông hiểu',
      order: 4,
      question: 'Cho câu lệnh: SELECT COUNT(*) FROM HOA_DON WHERE SoLuong >= 2; Kết quả của câu lệnh này thể hiện điều gì?',
      options: [
        { key: 'A', text: 'Tổng số xe đã bán trong tất cả các hóa đơn' },
        { key: 'B', text: 'Số lượng hóa đơn bán hàng có số lượng xe bán từ 2 chiếc trở lên' },
        { key: 'C', text: 'Tổng doanh thu của các hóa đơn bán từ 2 xe trở lên' },
        { key: 'D', text: 'Danh sách các mã xe có số lượng bán lớn hơn 2' },
      ],
      correctAnswer: 'B',
      explanation: 'Hàm COUNT(*) đếm số dòng (số bản ghi hóa đơn) thỏa mãn điều kiện lọc WHERE SoLuong >= 2.',
      relatedSql: 'SELECT COUNT(*) AS SoHoaDonBanLon\nFROM HOA_DON\nWHERE SoLuong >= 2;',
    },
    {
      id: 'XE-Q05',
      databaseId: 'QL_XE',
      level: 'Thông hiểu',
      order: 5,
      question: 'Để hiển thị danh sách các xe kèm tên loại xe tương ứng, điều kiện kết nối bảng (JOIN ON) nào sau đây là chính xác?',
      options: [
        { key: 'A', text: 'FROM DANH_MUC_XE x JOIN LOAI_XE l ON x.MaXe = l.MaLoai' },
        { key: 'B', text: 'FROM DANH_MUC_XE x JOIN LOAI_XE l ON x.MaLoai = l.MaLoai' },
        { key: 'C', text: 'FROM DANH_MUC_XE x JOIN LOAI_XE l ON x.TenXe = l.LoaiXe' },
        { key: 'D', text: 'FROM DANH_MUC_XE x JOIN LOAI_XE l ON x.MaLoai = l.LoaiXe' },
      ],
      correctAnswer: 'B',
      explanation: 'Trường liên kết khóa ngoại giữa DANH_MUC_XE và LOAI_XE là MaLoai, vì vậy điều kiện chuẩn là ON x.MaLoai = l.MaLoai.',
      relatedSql: 'SELECT x.MaXe, x.TenXe, l.LoaiXe\nFROM DANH_MUC_XE x\nJOIN LOAI_XE l ON x.MaLoai = l.MaLoai;',
    },
    {
      id: 'XE-Q06',
      databaseId: 'QL_XE',
      level: 'Thông hiểu',
      order: 6,
      question: 'Câu lệnh SQL nào tính thành tiền của từng hóa đơn (Thành tiền = Số lượng * Đơn giá)?',
      options: [
        { key: 'A', text: 'SELECT SoHD, MaXe, (SoLuong * DonGia) AS ThanhTien FROM HOA_DON;' },
        { key: 'B', text: 'SELECT SoHD, MaXe, SUM(SoLuong * DonGia) FROM HOA_DON;' },
        { key: 'C', text: 'SELECT SoHD, MaXe, (SoLuong + DonGia) AS ThanhTien FROM HOA_DON;' },
        { key: 'D', text: 'SELECT SoHD, MaXe, MULTIPLY(SoLuong, DonGia) FROM HOA_DON;' },
      ],
      correctAnswer: 'A',
      explanation: 'Trong SQL, phép toán nhân trên từng hàng được thực hiện trực tiếp bằng toán tử sao (*) giữa các cột số học: (SoLuong * DonGia) AS ThanhTien.',
      relatedSql: 'SELECT SoHD, MaXe, SoLuong, DonGia, (SoLuong * DonGia) AS ThanhTien\nFROM HOA_DON;',
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'XE-Q07',
      databaseId: 'QL_XE',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh SQL nào sau đây tính tổng số xe bán được và tổng doanh thu thu được theo từng Loại xe (LoaiXe)?',
      options: [
        {
          key: 'A',
          text: `SELECT l.LoaiXe, SUM(hd.SoLuong) AS TongBan, SUM(hd.SoLuong * hd.DonGia) AS DoanhThu\nFROM LOAI_XE l\nJOIN DANH_MUC_XE x ON l.MaLoai = x.MaLoai\nJOIN HOA_DON hd ON x.MaXe = hd.MaXe\nGROUP BY l.LoaiXe;`
        },
        {
          key: 'B',
          text: `SELECT l.LoaiXe, COUNT(hd.SoLuong), AVG(hd.DonGia)\nFROM LOAI_XE l, HOA_DON hd\nGROUP BY l.LoaiXe;`
        },
        {
          key: 'C',
          text: `SELECT l.LoaiXe, (hd.SoLuong * hd.DonGia) AS DoanhThu\nFROM LOAI_XE l\nJOIN DANH_MUC_XE x ON l.MaLoai = x.MaLoai;`
        },
        {
          key: 'D',
          text: `SELECT l.LoaiXe, SUM(x.MaXe) FROM LOAI_XE l GROUP BY l.LoaiXe;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Cần nối 3 bảng LOAI_XE -> DANH_MUC_XE -> HOA_DON, sau đó dùng GROUP BY l.LoaiXe kết hợp hàm gộp SUM(hd.SoLuong) và SUM(hd.SoLuong * hd.DonGia).',
      relatedSql: `SELECT l.LoaiXe, SUM(hd.SoLuong) AS TongBan, SUM(hd.SoLuong * hd.DonGia) AS DoanhThu\nFROM LOAI_XE l\nJOIN DANH_MUC_XE x ON l.MaLoai = x.MaLoai\nJOIN HOA_DON hd ON x.MaXe = hd.MaXe\nGROUP BY l.LoaiXe;`,
    },
    {
      id: 'XE-Q08',
      databaseId: 'QL_XE',
      level: 'Vận dụng',
      order: 8,
      question: 'Để lọc các dòng xe có tổng số lượng bán từ 3 chiếc trở lên sau khi gom nhóm (GROUP BY x.MaXe, x.TenXe), cần dùng mệnh đề nào?',
      options: [
        { key: 'A', text: 'WHERE SUM(hd.SoLuong) >= 3' },
        { key: 'B', text: 'HAVING SUM(hd.SoLuong) >= 3' },
        { key: 'C', text: 'ORDER BY SUM(hd.SoLuong) >= 3' },
        { key: 'D', text: 'FILTER SUM(hd.SoLuong) >= 3' },
      ],
      correctAnswer: 'B',
      explanation: 'Để lọc điều kiện trên giá trị của hàm gộp như SUM sau GROUP BY, bắt buộc phải dùng mệnh đề HAVING, mệnh đề WHERE không thể dùng với hàm gộp.',
      relatedSql: `SELECT x.MaXe, x.TenXe, SUM(hd.SoLuong) AS TongBan\nFROM DANH_MUC_XE x\nJOIN HOA_DON hd ON x.MaXe = hd.MaXe\nGROUP BY x.MaXe, x.TenXe\nHAVING SUM(hd.SoLuong) >= 3;`,
    },
    {
      id: 'XE-Q09',
      databaseId: 'QL_XE',
      level: 'Vận dụng',
      order: 9,
      question: 'Để tìm danh sách các dòng xe trong danh mục chưa từng phát sinh bất kỳ hóa đơn bán nào, câu lệnh SQL nào sau đây là chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT x.MaXe, x.TenXe\nFROM DANH_MUC_XE x\nLEFT JOIN HOA_DON hd ON x.MaXe = hd.MaXe\nWHERE hd.SoHD IS NULL;`
        },
        {
          key: 'B',
          text: `SELECT x.MaXe, x.TenXe\nFROM DANH_MUC_XE x\nINNER JOIN HOA_DON hd ON x.MaXe = hd.MaXe\nWHERE hd.SoLuong = 0;`
        },
        {
          key: 'C',
          text: `SELECT x.MaXe, x.TenXe\nFROM DANH_MUC_XE x\nWHERE x.MaXe IN (SELECT MaXe FROM HOA_DON);`
        },
        {
          key: 'D',
          text: `SELECT * FROM DANH_MUC_XE WHERE SoLuong IS NULL;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Phép nối ngoài LEFT JOIN giữ lại tất cả các xe trong DANH_MUC_XE; với những xe chưa bán được chiếc nào thì cột của HOA_DON sẽ là NULL, do đó WHERE hd.SoHD IS NULL sẽ lọc ra chính xác các xe này (kết quả là xe X09).',
      relatedSql: `SELECT x.MaXe, x.TenXe, l.LoaiXe\nFROM DANH_MUC_XE x\nJOIN LOAI_XE l ON x.MaLoai = l.MaLoai\nLEFT JOIN HOA_DON hd ON x.MaXe = hd.MaXe\nWHERE hd.SoHD IS NULL;`,
    },
    {
      id: 'XE-Q10',
      databaseId: 'QL_XE',
      level: 'Vận dụng',
      order: 10,
      question: 'Để thêm một dòng xe mới: Mã xe \'X10\', tên \'VinFast Evo 200\', thuộc loại xe \'L04\' (Xe máy điện) vào bảng DANH_MUC_XE, câu lệnh nào đúng chuẩn cú pháp SQL?',
      options: [
        { key: 'A', text: `INSERT INTO DANH_MUC_XE (MaXe, TenXe, MaLoai) VALUES ('X10', 'VinFast Evo 200', 'L04');` },
        { key: 'B', text: `ADD RECORD TO DANH_MUC_XE ('X10', 'VinFast Evo 200', 'L04');` },
        { key: 'C', text: `INSERT DANH_MUC_XE SET MaXe='X10', TenXe='VinFast Evo 200', MaLoai='L04';` },
        { key: 'D', text: `UPDATE DANH_MUC_XE SET MaXe = 'X10' WHERE TenXe = 'VinFast Evo 200';` },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp chuẩn để thêm bản ghi mới trong SQL là INSERT INTO <ten_bang> (danh_sach_cot) VALUES (danh_sach_gia_tri).',
      relatedSql: `INSERT INTO DANH_MUC_XE (MaXe, TenXe, MaLoai)\nVALUES ('X10', 'VinFast Evo 200', 'L04');`,
    },
  ],

  // ==========================================
  // 7. CSDL QL_VANG (3 Bảng - Loại Vàng, Sản Phẩm, Phiếu Bán)
  // ==========================================
  QL_VANG: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'VANG-Q01',
      databaseId: 'QL_VANG',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL QL_VANG, trường MaLoai trong bảng SAN_PHAM đóng vai trò gì?',
      options: [
        { key: 'A', text: 'Khóa chính (PRIMARY KEY) định danh duy nhất cho từng sản phẩm' },
        { key: 'B', text: 'Khóa ngoại (FOREIGN KEY) tham chiếu đến khóa chính MaLoai của bảng LOAI_VANG' },
        { key: 'C', text: 'Thuộc tính chỉ mục không liên quan đến quan hệ giữa các bảng' },
        { key: 'D', text: 'Khóa chính phức hợp kết hợp cùng trường MaSP' },
      ],
      correctAnswer: 'B',
      explanation: 'MaLoai trong SAN_PHAM là khóa ngoại (FOREIGN KEY) tham chiếu đến trường MaLoai của bảng LOAI_VANG để liên kết sản phẩm với loại vàng cụ thể.',
      relatedSql: 'SELECT sp.MaSP, sp.TenSP, sp.MaLoai, lv.TenLoai\nFROM SAN_PHAM sp\nJOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai;',
    },
    {
      id: 'VANG-Q02',
      databaseId: 'QL_VANG',
      level: 'Nhận biết',
      order: 2,
      question: 'Để lấy danh sách tất cả các loại vàng trong bảng LOAI_VANG sắp xếp giảm dần theo giá niêm yết (GiaNiemYet), câu lệnh SQL nào sau đây là đúng?',
      options: [
        { key: 'A', text: 'SELECT * FROM LOAI_VANG ORDER BY GiaNiemYet DESC;' },
        { key: 'B', text: 'SELECT * FROM LOAI_VANG SORT BY GiaNiemYet DOWN;' },
        { key: 'C', text: 'SELECT ALL FROM LOAI_VANG ORDER BY GiaNiemYet ASC;' },
        { key: 'D', text: 'SELECT MaLoai, TenLoai FROM LOAI_VANG GROUP BY GiaNiemYet DESC;' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề ORDER BY kết hợp từ khóa DESC sắp xếp tập kết quả theo thứ tự giảm dần của cột GiaNiemYet.',
      relatedSql: 'SELECT MaLoai, TenLoai, GiaNiemYet\nFROM LOAI_VANG\nORDER BY GiaNiemYet DESC;',
    },
    {
      id: 'VANG-Q03',
      databaseId: 'QL_VANG',
      level: 'Nhận biết',
      order: 3,
      question: 'Trong bảng SAN_PHAM, ràng buộc "CHECK(TrongLuong > 0)" và "CHECK(TienCong >= 0)" có ý nghĩa gì trong thiết kế CSDL?',
      options: [
        { key: 'A', text: 'Tự động gán giá trị mặc định nếu người dùng nhập thiếu' },
        { key: 'B', text: 'Đảm bảo trọng lượng sản phẩm phải lớn hơn 0 và tiền công chế tác không được âm (>= 0)' },
        { key: 'C', text: 'Giới hạn trọng lượng sản phẩm vàng tối đa không vượt quá 10 chỉ' },
        { key: 'D', text: 'Tự động tính toán giá bán của sản phẩm dựa trên bảng LOAI_VANG' },
      ],
      correctAnswer: 'B',
      explanation: 'Ràng buộc CHECK kiểm tra tính hợp lệ của dữ liệu trước khi lưu vào CSDL: trọng lượng vàng phải dương (>0) và tiền công không âm (>=0).',
      relatedSql: 'SELECT MaSP, TenSP, TrongLuong, TienCong\nFROM SAN_PHAM\nWHERE TrongLuong > 0 AND TienCong >= 0;',
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'VANG-Q04',
      databaseId: 'QL_VANG',
      level: 'Thông hiểu',
      order: 4,
      question: 'Cho câu lệnh: SELECT COUNT(*) FROM SAN_PHAM WHERE TienCong = 0; Kết quả trả về của câu lệnh này thể hiện điều gì?',
      options: [
        { key: 'A', text: 'Tổng số tiền công của tất cả sản phẩm vàng trong tiệm' },
        { key: 'B', text: 'Số lượng sản phẩm không tính tiền công chế tác (như vàng miếng, vàng nhẫn trơn nguyên chất)' },
        { key: 'C', text: 'Số phiếu bán hàng có chiết khấu tiền công cho khách' },
        { key: 'D', text: 'Danh sách các mã loại vàng không có sản phẩm nào' },
      ],
      correctAnswer: 'B',
      explanation: 'Hàm COUNT(*) kết hợp điều kiện WHERE TienCong = 0 đếm số lượng mặt hàng trong danh mục có tiền công bằng 0 (như các sản phẩm vàng miếng SJC SP04, SP05).',
      relatedSql: 'SELECT COUNT(*) AS SoSPKhongTienCong\nFROM SAN_PHAM\nWHERE TienCong = 0;',
    },
    {
      id: 'VANG-Q05',
      databaseId: 'QL_VANG',
      level: 'Thông hiểu',
      order: 5,
      question: 'Để hiển thị danh sách sản phẩm gồm MaSP, TenSP kèm tên loại vàng TenLoai, câu lệnh nối bảng (JOIN) nào dưới đây là chính xác?',
      options: [
        { key: 'A', text: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai FROM SAN_PHAM sp JOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai;' },
        { key: 'B', text: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai FROM SAN_PHAM sp JOIN LOAI_VANG lv ON sp.MaSP = lv.MaLoai;' },
        { key: 'C', text: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai FROM SAN_PHAM sp, LOAI_VANG lv WHERE sp.TenSP = lv.TenLoai;' },
        { key: 'D', text: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai FROM SAN_PHAM sp JOIN LOAI_VANG lv ON sp.TrongLuong = lv.GiaNiemYet;' },
      ],
      correctAnswer: 'A',
      explanation: 'Khóa ngoại liên kết giữa hai bảng SAN_PHAM và LOAI_VANG là trường MaLoai, do đó điều kiện nối bảng chuẩn xác là ON sp.MaLoai = lv.MaLoai.',
      relatedSql: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai\nFROM SAN_PHAM sp\nJOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai;',
    },
    {
      id: 'VANG-Q06',
      databaseId: 'QL_VANG',
      level: 'Thông hiểu',
      order: 6,
      question: 'Cho câu truy vấn: SELECT MaLoai, COUNT(*) AS SoLuongSP FROM SAN_PHAM GROUP BY MaLoai HAVING COUNT(*) >= 3; Mệnh đề HAVING trong câu lệnh này có tác dụng gì?',
      options: [
        { key: 'A', text: 'Lọc các sản phẩm đơn lẻ có số lượng tồn kho lớn hơn hoặc bằng 3' },
        { key: 'B', text: 'Lọc các nhóm loại vàng có từ 3 sản phẩm trở lên trong danh mục' },
        { key: 'C', text: 'Sắp xếp danh sách loại vàng theo số lượng giảm dần' },
        { key: 'D', text: 'Giới hạn số bản ghi kết quả trả về tối đa là 3' },
      ],
      correctAnswer: 'B',
      explanation: 'Mệnh đề HAVING lọc điều kiện trên tập hợp nhóm sau khi thực hiện GROUP BY; ở đây lọc các nhóm MaLoai có số sản phẩm COUNT(*) >= 3.',
      relatedSql: 'SELECT MaLoai, COUNT(*) AS SoLuongSP\nFROM SAN_PHAM\nGROUP BY MaLoai\nHAVING COUNT(*) >= 3;',
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'VANG-Q07',
      databaseId: 'QL_VANG',
      level: 'Vận dụng',
      order: 7,
      question: 'Để tính cột "Thành tiền" cho mỗi phiếu bán hàng bằng công thức SoLuong * DonGiaBan, câu lệnh SQL nào hiển thị đúng và chuẩn cú pháp?',
      options: [
        {
          key: 'A',
          text: `SELECT pb.SoPhieu, pb.NgayBan, sp.TenSP, pb.SoLuong, pb.DonGiaBan, (pb.SoLuong * pb.DonGiaBan) AS ThanhTien\nFROM PHIEU_BAN pb\nJOIN SAN_PHAM sp ON pb.MaSP = sp.MaSP;`
        },
        {
          key: 'B',
          text: `SELECT pb.SoPhieu, pb.NgayBan, sp.TenSP, pb.SoLuong, pb.DonGiaBan, SUM(pb.SoLuong * pb.DonGiaBan)\nFROM PHIEU_BAN pb;`
        },
        {
          key: 'C',
          text: `SELECT pb.SoPhieu, pb.NgayBan, sp.TenSP, (SoLuong + DonGiaBan) AS ThanhTien\nFROM PHIEU_BAN pb\nJOIN SAN_PHAM sp ON pb.SoPhieu = sp.MaSP;`
        },
        {
          key: 'D',
          text: `SELECT * FROM PHIEU_BAN WHERE (SoLuong * DonGiaBan) AS ThanhTien;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Biểu thức tính toán (pb.SoLuong * pb.DonGiaBan) AS ThanhTien trong mệnh đề SELECT tính ra thành tiền cho từng phiếu bán hàng khi nối với bảng SAN_PHAM.',
      relatedSql: `SELECT pb.SoPhieu, pb.NgayBan, sp.TenSP, pb.SoLuong, pb.DonGiaBan, (pb.SoLuong * pb.DonGiaBan) AS ThanhTien\nFROM PHIEU_BAN pb\nJOIN SAN_PHAM sp ON pb.MaSP = sp.MaSP;`,
    },
    {
      id: 'VANG-Q08',
      databaseId: 'QL_VANG',
      level: 'Vận dụng',
      order: 8,
      question: 'Cần viết truy vấn thống kê tổng doanh thu bán thu được theo từng Loại vàng (hiển thị TenLoai và TongDoanhThu), câu lệnh SQL nào sau đây là chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT lv.TenLoai, SUM(pb.SoLuong * pb.DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG lv\nJOIN SAN_PHAM sp ON lv.MaLoai = sp.MaLoai\nJOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nGROUP BY lv.MaLoai, lv.TenLoai\nORDER BY TongDoanhThu DESC;`
        },
        {
          key: 'B',
          text: `SELECT lv.TenLoai, COUNT(pb.DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG lv\nJOIN SAN_PHAM sp ON lv.MaLoai = sp.MaLoai\nGROUP BY lv.TenLoai;`
        },
        {
          key: 'C',
          text: `SELECT lv.TenLoai, (pb.SoLuong * pb.DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG lv\nJOIN PHIEU_BAN pb ON lv.MaLoai = pb.MaSP;`
        },
        {
          key: 'D',
          text: `SELECT TenLoai, AVG(DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG\nGROUP BY TenLoai;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Nối 3 bảng LOAI_VANG -> SAN_PHAM -> PHIEU_BAN, thực hiện GROUP BY theo loại vàng và áp dụng hàm SUM(pb.SoLuong * pb.DonGiaBan) để tính tổng doanh thu bán.',
      relatedSql: `SELECT lv.TenLoai, SUM(pb.SoLuong * pb.DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG lv\nJOIN SAN_PHAM sp ON lv.MaLoai = sp.MaLoai\nJOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nGROUP BY lv.MaLoai, lv.TenLoai\nORDER BY TongDoanhThu DESC;`,
    },
    {
      id: 'VANG-Q09',
      databaseId: 'QL_VANG',
      level: 'Vận dụng',
      order: 9,
      question: 'Để tìm các sản phẩm vàng trong danh mục SAN_PHAM chưa từng phát sinh bất kỳ phiếu bán nào trong bảng PHIEU_BAN, câu truy vấn nào sau đây trả về kết quả đúng?',
      options: [
        {
          key: 'A',
          text: `SELECT sp.MaSP, sp.TenSP\nFROM SAN_PHAM sp\nLEFT JOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nWHERE pb.SoPhieu IS NULL;`
        },
        {
          key: 'B',
          text: `SELECT sp.MaSP, sp.TenSP\nFROM SAN_PHAM sp\nINNER JOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nWHERE pb.SoLuong = 0;`
        },
        {
          key: 'C',
          text: `SELECT sp.MaSP, sp.TenSP\nFROM SAN_PHAM sp\nWHERE sp.MaSP IN (SELECT MaSP FROM PHIEU_BAN);`
        },
        {
          key: 'D',
          text: `SELECT * FROM SAN_PHAM WHERE SoLuong IS NULL;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Phép nối ngoài LEFT JOIN giữ lại toàn bộ sản phẩm trong SAN_PHAM; những sản phẩm chưa từng xuất hiện trong PHIEU_BAN sẽ có giá trị NULL ở các cột của PHIEU_BAN, vì vậy WHERE pb.SoPhieu IS NULL sẽ lọc ra chính xác các sản phẩm này (kết quả là SP05 và SP10).',
      relatedSql: `SELECT sp.MaSP, sp.TenSP, lv.TenLoai, sp.TrongLuong\nFROM SAN_PHAM sp\nJOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai\nLEFT JOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nWHERE pb.SoPhieu IS NULL;`,
    },
    {
      id: 'VANG-Q10',
      databaseId: 'QL_VANG',
      level: 'Vận dụng',
      order: 10,
      question: 'Để thêm một phiếu bán hàng mới: Số phiếu \'PB11\', Mã SP \'SP03\', Ngày bán \'2024-05-20\', Số lượng 2 chiếc, Đơn giá bán 42.000.000 đồng vào bảng PHIEU_BAN, câu lệnh nào đúng chuẩn cú pháp SQL?',
      options: [
        { key: 'A', text: `INSERT INTO PHIEU_BAN (SoPhieu, MaSP, NgayBan, SoLuong, DonGiaBan) VALUES ('PB11', 'SP03', '2024-05-20', 2, 42000000);` },
        { key: 'B', text: `ADD RECORD TO PHIEU_BAN ('PB11', 'SP03', '2024-05-20', 2, 42000000);` },
        { key: 'C', text: `INSERT PHIEU_BAN SET SoPhieu='PB11', MaSP='SP03', NgayBan='2024-05-20', SoLuong=2;` },
        { key: 'D', text: `UPDATE PHIEU_BAN SET SoPhieu = 'PB11' WHERE MaSP = 'SP03';` },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp chuẩn để thêm bản ghi mới trong SQL là: INSERT INTO <ten_bang> (danh_sach_cot) VALUES (danh_sach_gia_tri).',
      relatedSql: `INSERT INTO PHIEU_BAN (SoPhieu, MaSP, NgayBan, SoLuong, DonGiaBan)\nVALUES ('PB11', 'SP03', '2024-05-20', 2, 42000000);`,
    },
  ],

  // ==========================================
  // 8. CSDL QL_CANBO (3 Bảng - Quản Lý Cán Bộ)
  // ==========================================
  QL_CANBO: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'CB-Q01',
      databaseId: 'QL_CANBO',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong mô hình quan hệ CSDL QL_Canbo, trường MaPh trong bảng CANBO đóng vai trò gì?',
      options: [
        { key: 'A', text: 'Là khóa chính (Primary Key) của bảng CANBO' },
        { key: 'B', text: 'Là khóa ngoại (Foreign Key) tham chiếu đến khóa chính MaPh của bảng PHONG' },
        { key: 'C', text: 'Là trường dữ liệu chỉ mục không bắt buộc' },
        { key: 'D', text: 'Là khóa ứng viên thứ cấp' },
      ],
      correctAnswer: 'B',
      explanation: 'MaPh trong CANBO liên kết bản ghi cán bộ với đơn vị phòng ban tương ứng trong bảng PHONG, do đó nó là khóa ngoại (FK).',
      relatedSql: `SELECT cb.MaCB, cb.Ten, cb.MaPh, p.TenPh\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh;`,
    },
    {
      id: 'CB-Q02',
      databaseId: 'QL_CANBO',
      level: 'Nhận biết',
      order: 2,
      question: 'Để trích xuất danh sách các mã phòng ban (MaPh) duy nhất, không trùng lặp từ bảng CANBO, từ khóa nào sau đây được đặt ngay sau SELECT?',
      options: [
        { key: 'A', text: 'UNIQUE' },
        { key: 'B', text: 'DISTINCT' },
        { key: 'C', text: 'DIFFERENT' },
        { key: 'D', text: 'NO_DUPLICATE' },
      ],
      correctAnswer: 'B',
      explanation: 'Từ khóa DISTINCT trong câu lệnh SELECT DISTINCT MaPh FROM CANBO; loại bỏ mọi giá trị lặp lại trong tập kết quả trả về.',
      relatedSql: `SELECT DISTINCT MaPh\nFROM CANBO;`,
    },
    {
      id: 'CB-Q03',
      databaseId: 'QL_CANBO',
      level: 'Nhận biết',
      order: 3,
      question: 'Mệnh đề ORDER BY Luong DESC ở cuối câu truy vấn có tác dụng gì đối với bảng dữ liệu CANBO?',
      options: [
        { key: 'A', text: 'Sắp xếp danh sách cán bộ theo mức lương tăng dần từ thấp đến cao' },
        { key: 'B', text: 'Sắp xếp danh sách cán bộ theo mức lương giảm dần từ cao xuống thấp' },
        { key: 'C', text: 'Tính tổng mức lương của toàn bộ cán bộ' },
        { key: 'D', text: 'Chỉ hiển thị các cán bộ có mức lương cao nhất' },
      ],
      correctAnswer: 'B',
      explanation: 'Từ khóa DESC (viết tắt của Descending) chỉ định trật tự sắp xếp giảm dần theo cột Luong từ mức lương lớn nhất đến nhỏ nhất.',
      relatedSql: `SELECT MaCB, Ten, Luong\nFROM CANBO\nORDER BY Luong DESC;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'CB-Q04',
      databaseId: 'QL_CANBO',
      level: 'Thông hiểu',
      order: 4,
      question: 'Cho câu lệnh SQL sau:\nSELECT cb.Ten, p.TenPh, cb.Luong\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nWHERE p.TenPh = \'Phòng Kỹ thuật\';\nCâu lệnh trên thực hiện công việc gì?',
      sqlSnippet: `SELECT cb.Ten, p.TenPh, cb.Luong\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nWHERE p.TenPh = 'Phòng Kỹ thuật';`,
      options: [
        { key: 'A', text: 'Đổi tên phòng ban của cán bộ thành Phòng Kỹ thuật' },
        { key: 'B', text: 'Liệt kê danh sách tên cán bộ, tên phòng ban và lương của các nhân sự thuộc "Phòng Kỹ thuật"' },
        { key: 'C', text: 'Đếm số lượng cán bộ kỹ thuật trong cơ quan' },
        { key: 'D', text: 'Tính lương trung bình của Phòng Kỹ thuật' },
      ],
      correctAnswer: 'B',
      explanation: 'Câu lệnh kết nối CANBO và PHONG qua MaPh, sau đó dùng điều kiện WHERE p.TenPh = \'Phòng Kỹ thuật\' để trích xuất các cán bộ làm việc tại phòng ban này.',
      relatedSql: `SELECT cb.Ten, p.TenPh, cb.Luong\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nWHERE p.TenPh = 'Phòng Kỹ thuật';`,
    },
    {
      id: 'CB-Q05',
      databaseId: 'QL_CANBO',
      level: 'Thông hiểu',
      order: 5,
      question: 'Cần lọc các cán bộ có mức lương trong khoảng từ 15.000.000 đồng đến 20.000.000 đồng (bao gồm cả hai mốc này), mệnh đề WHERE nào sau đây là chuẩn xác?',
      options: [
        { key: 'A', text: 'WHERE Luong BETWEEN 15000000 AND 20000000' },
        { key: 'B', text: 'WHERE Luong IN (15000000, 20000000)' },
        { key: 'C', text: 'WHERE Luong >= 15000000 OR Luong <= 20000000' },
        { key: 'D', text: 'WHERE Luong = 15000000 AND Luong = 20000000' },
      ],
      correctAnswer: 'A',
      explanation: 'Toán tử BETWEEN 15000000 AND 20000000 bao gồm cả hai mốc biên, tương đương điều kiện (Luong >= 15000000 AND Luong <= 20000000).',
      relatedSql: `SELECT MaCB, Ten, Luong\nFROM CANBO\nWHERE Luong BETWEEN 15000000 AND 20000000;`,
    },
    {
      id: 'CB-Q06',
      databaseId: 'QL_CANBO',
      level: 'Thông hiểu',
      order: 6,
      question: 'Câu lệnh SQL sau đây trả về kết quả gì?\nSELECT MaPh, COUNT(*) AS SoLuong, ROUND(AVG(Luong), 0) AS LuongTB\nFROM CANBO\nGROUP BY MaPh;',
      sqlSnippet: `SELECT MaPh, COUNT(*) AS SoLuong, ROUND(AVG(Luong), 0) AS LuongTB\nFROM CANBO\nGROUP BY MaPh;`,
      options: [
        { key: 'A', text: 'Tổng lương và số lượng của toàn bộ cán bộ công ty' },
        { key: 'B', text: 'Thống kê số lượng cán bộ và mức lương bình quân theo từng phòng ban' },
        { key: 'C', text: 'Danh sách cán bộ có mức lương cao nhất theo mỗi phòng' },
        { key: 'D', text: 'Cán bộ có mức lương bằng mức trung bình của phòng ban' },
      ],
      correctAnswer: 'B',
      explanation: 'Mệnh đề GROUP BY MaPh nhóm dữ liệu theo từng phòng ban, COUNT(*) đếm nhân sự mỗi phòng và AVG(Luong) tính lương bình quân của phòng đó.',
      relatedSql: `SELECT MaPh, COUNT(*) AS SoLuong, ROUND(AVG(Luong), 0) AS LuongTB\nFROM CANBO\nGROUP BY MaPh;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'CB-Q07',
      databaseId: 'QL_CANBO',
      level: 'Vận dụng',
      order: 7,
      question: 'Cần hiển thị thông tin: Mã CB, Tên cán bộ, Tên phòng ban, Lương, Trình độ học vấn của các cán bộ có trình độ \'Tiến sĩ\' hoặc \'Thạc sĩ\', câu lệnh SQL nào sau đây là chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT cb.MaCB, cb.Ten, p.TenPh, cb.Luong, td.TrinhDoHV\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nJOIN TRINHDOVANHOA td ON cb.MaCB = td.MaCB\nWHERE td.TrinhDoHV IN ('Tiến sĩ', 'Thạc sĩ');`
        },
        {
          key: 'B',
          text: `SELECT cb.MaCB, cb.Ten, p.TenPh, cb.Luong, td.TrinhDoHV\nFROM CANBO cb\nWHERE TrinhDoHV = 'Tiến sĩ' AND TrinhDoHV = 'Thạc sĩ';`
        },
        {
          key: 'C',
          text: `SELECT cb.MaCB, cb.Ten, p.TenPh\nFROM PHONG p JOIN CANBO cb ON p.MaPh = cb.MaPh\nWHERE td.TrinhDoHV = 'Thạc sĩ';`
        },
        {
          key: 'D',
          text: `SELECT * FROM CANBO WHERE MaCB IN (SELECT MaPh FROM TRINHDOVANHOA);`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối liên bảng CANBO -> PHONG qua MaPh và CANBO -> TRINHDOVANHOA qua MaCB, kết hợp điều kiện WHERE td.TrinhDoHV IN (\'Tiến sĩ\', \'Thạc sĩ\').',
      relatedSql: `SELECT cb.MaCB, cb.Ten, p.TenPh, cb.Luong, td.TrinhDoHV\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nJOIN TRINHDOVANHOA td ON cb.MaCB = td.MaCB\nWHERE td.TrinhDoHV IN ('Tiến sĩ', 'Thạc sĩ');`,
    },
    {
      id: 'CB-Q08',
      databaseId: 'QL_CANBO',
      level: 'Vận dụng',
      order: 8,
      question: 'Để thống kê tổng quỹ lương chi trả theo từng phòng ban (kể cả phòng ban chưa có cán bộ nào công tác) và sắp xếp tổng lương giảm dần, câu lệnh nào đúng?',
      options: [
        {
          key: 'A',
          text: `SELECT p.MaPh, p.TenPh, COUNT(cb.MaCB) AS SoCanBo, COALESCE(SUM(cb.Luong), 0) AS TongLuong\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nGROUP BY p.MaPh, p.TenPh\nORDER BY TongLuong DESC;`
        },
        {
          key: 'B',
          text: `SELECT p.MaPh, p.TenPh, SUM(cb.Luong) AS TongLuong\nFROM PHONG p\nINNER JOIN CANBO cb ON p.MaPh = cb.MaPh\nORDER BY TongLuong DESC;`
        },
        {
          key: 'C',
          text: `SELECT MaPh, SUM(Luong) FROM CANBO GROUP BY MaPh;`
        },
        {
          key: 'D',
          text: `SELECT p.MaPh, SUM(cb.Luong) FROM CANBO cb LEFT JOIN PHONG p ON cb.MaPh = p.MaPh;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng LEFT JOIN từ bảng PHONG sang CANBO để giữ lại phòng ban chưa có nhân sự (như PH05), kết hợp GROUP BY theo phòng và COALESCE để hiển thị quỹ lương là 0 thay vì NULL.',
      relatedSql: `SELECT p.MaPh, p.TenPh, COUNT(cb.MaCB) AS SoCanBo, COALESCE(SUM(cb.Luong), 0) AS TongLuong\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nGROUP BY p.MaPh, p.TenPh\nORDER BY TongLuong DESC;`,
    },
    {
      id: 'CB-Q09',
      databaseId: 'QL_CANBO',
      level: 'Vận dụng',
      order: 9,
      question: 'Muốn tìm danh sách các phòng ban trong cơ quan hiện chưa được bố trí cán bộ nào làm việc, câu truy vấn nào sau đây mang lại kết quả chuẩn xác?',
      options: [
        {
          key: 'A',
          text: `SELECT p.MaPh, p.TenPh, p.DiaChi\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nWHERE cb.MaCB IS NULL;`
        },
        {
          key: 'B',
          text: `SELECT p.MaPh, p.TenPh FROM PHONG p WHERE p.MaPh = 0;`
        },
        {
          key: 'C',
          text: `SELECT p.MaPh, p.TenPh FROM PHONG p JOIN CANBO cb ON p.MaPh = cb.MaPh WHERE cb.Luong = 0;`
        },
        {
          key: 'D',
          text: `SELECT * FROM PHONG WHERE MaPh NOT NULL;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'LEFT JOIN giữ lại tất cả phòng ban trong bảng PHONG; các phòng ban không có cán bộ nào sẽ có giá trị cb.MaCB bằng NULL. Do đó, điều kiện WHERE cb.MaCB IS NULL lọc ra đúng phòng này (kết quả là PH05).',
      relatedSql: `SELECT p.MaPh, p.TenPh, p.DiaChi\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nWHERE cb.MaCB IS NULL;`,
    },
    {
      id: 'CB-Q10',
      databaseId: 'QL_CANBO',
      level: 'Vận dụng',
      order: 10,
      question: 'Để tiếp nhận thêm một cán bộ mới: Mã \'CB12\', Tên \'Vũ Hải Đăng\', Ngày sinh \'1994-11-20\', Lương 16.000.000 đồng vào làm việc tại phòng \'PH03\', câu lệnh SQL nào chuẩn xác?',
      options: [
        { key: 'A', text: `INSERT INTO CANBO (MaCB, Ten, NgaySinh, Luong, MaPh) VALUES ('CB12', 'Vũ Hải Đăng', '1994-11-20', 16000000, 'PH03');` },
        { key: 'B', text: `ADD INTO CANBO ('CB12', 'Vũ Hải Đăng', '1994-11-20', 16000000, 'PH03');` },
        { key: 'C', text: `INSERT CANBO SET MaCB='CB12', Ten='Vũ Hải Đăng', Luong=16000000;` },
        { key: 'D', text: `UPDATE CANBO ADD RECORD ('CB12', 'Vũ Hải Đăng', 'PH03');` },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp chuẩn trong chuẩn SQL để thêm một bản ghi mới là INSERT INTO <tên_bảng> (danh_sách_cột) VALUES (danh_sách_giá_trị).',
      relatedSql: `INSERT INTO CANBO (MaCB, Ten, NgaySinh, Luong, MaPh)\nVALUES ('CB12', 'Vũ Hải Đăng', '1994-11-20', 16000000, 'PH03');`,
    },
  ],

  // ==========================================
  // 9. CSDL QL_TV (4 Bảng - Quản Lý Thư Viện)
  // ==========================================
  QL_TV: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'TV-Q01',
      databaseId: 'QL_TV',
      level: 'Nhận biết',
      order: 1,
      question: 'Câu lệnh SQL nào sau đây hiển thị danh sách tất cả các độc giả trong bảng DOCGIA?',
      options: [
        { key: 'A', text: 'SELECT * FROM DOCGIA;' },
        { key: 'B', text: 'GET DOCGIA ALL;' },
        { key: 'C', text: 'DISPLAY * IN DOCGIA;' },
        { key: 'D', text: 'SELECT ALL_RECORDS(DOCGIA);' },
      ],
      correctAnswer: 'A',
      explanation: 'Ký tự đại diện sao (*) trong SELECT * FROM DOCGIA trích xuất toàn bộ dữ liệu từ bảng DOCGIA.',
      relatedSql: 'SELECT *\nFROM DOCGIA;',
    },
    {
      id: 'TV-Q02',
      databaseId: 'QL_TV',
      level: 'Nhận biết',
      order: 2,
      question: 'Trong CSDL QL_TV, cột MaTG trong bảng SACH đóng vai trò gì trong mô hình quan hệ?',
      options: [
        { key: 'A', text: 'Là khóa chính của bảng SACH.' },
        { key: 'B', text: 'Là khóa ngoại (Foreign Key) tham chiếu đến khóa chính MaTG của bảng TACGIA.' },
        { key: 'C', text: 'Là một chỉ mục độc lập không có mối quan hệ với bảng khác.' },
        { key: 'D', text: 'Là trường dữ liệu lưu số điện thoại của tác giả.' },
      ],
      correctAnswer: 'B',
      explanation: 'Trường MaTG trong bảng SACH được khai báo là FOREIGN KEY (MaTG) REFERENCES TACGIA(MaTG) nhằm đảm bảo toàn vẹn tham chiếu giữa sách và tác giả sáng tác.',
      relatedSql: 'SELECT s.MaSach, s.TenSach, s.MaTG\nFROM SACH s;',
    },
    {
      id: 'TV-Q03',
      databaseId: 'QL_TV',
      level: 'Nhận biết',
      order: 3,
      question: 'Để lọc các phiếu mượn sách mà độc giả chưa trả sách (trường NgayTra chưa có dữ liệu), mệnh đề WHERE nào sau đây là đúng chuẩn SQL?',
      options: [
        { key: 'A', text: 'WHERE NgayTra = NULL' },
        { key: 'B', text: 'WHERE NgayTra IS NULL' },
        { key: 'C', text: 'WHERE NgayTra == ""' },
        { key: 'D', text: 'WHERE NgayTra EMPTY' },
      ],
      correctAnswer: 'B',
      explanation: 'Trong SQL chuẩn, toán tử IS NULL bắt buộc phải được sử dụng để kiểm tra giá trị vắng mặt hoặc chưa xác định (NULL). Phép so sánh = NULL sẽ luôn trả về UNKNOWN.',
      relatedSql: 'SELECT MaPhieu, MaDG, MaSach, NgayMuon\nFROM MUON_TRA\nWHERE NgayTra IS NULL;',
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'TV-Q04',
      databaseId: 'QL_TV',
      level: 'Thông hiểu',
      order: 4,
      question: 'Câu truy vấn nào dưới đây hiển thị Tên sách (TenSach), Thể loại (TheLoai) cùng Tên tác giả (TenTG) từ hai bảng SACH và TACGIA?',
      options: [
        {
          key: 'A',
          text: `SELECT s.TenSach, s.TheLoai, tg.TenTG\nFROM SACH s\nJOIN TACGIA tg ON s.MaTG = tg.MaTG;`,
        },
        {
          key: 'B',
          text: `SELECT TenSach, TheLoai, TenTG FROM SACH, TACGIA WHERE SACH.MaSach = TACGIA.MaTG;`,
        },
        {
          key: 'C',
          text: `SELECT s.TenSach, tg.TenTG FROM SACH s UNION TACGIA tg;`,
        },
        {
          key: 'D',
          text: `SELECT TenSach, TenTG FROM SACH INNER JOIN TACGIA ON SACH.TenSach = TACGIA.TenTG;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Phép INNER JOIN nối bảng SACH và TACGIA trên điều kiện khóa ngoại s.MaTG = tg.MaTG để lấy đúng tên tác giả của từng cuốn sách.',
      relatedSql: `SELECT s.TenSach, s.TheLoai, tg.TenTG\nFROM SACH s\nJOIN TACGIA tg ON s.MaTG = tg.MaTG;`,
    },
    {
      id: 'TV-Q05',
      databaseId: 'QL_TV',
      level: 'Thông hiểu',
      order: 5,
      question: 'Để thống kê số lượng sách thuộc từng thể loại trong thư viện và sắp xếp số lượng giảm dần, câu lệnh nào sau đây là chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT TheLoai, COUNT(*) AS SoLuong\nFROM SACH\nGROUP BY TheLoai\nORDER BY SoLuong DESC;`,
        },
        {
          key: 'B',
          text: `SELECT TheLoai, SUM(MaSach) FROM SACH ORDER BY TheLoai;`,
        },
        {
          key: 'C',
          text: `SELECT TheLoai, COUNT(TheLoai) FROM SACH WHERE COUNT(*) > 0;`,
        },
        {
          key: 'D',
          text: `SELECT DISTINCT TheLoai, COUNT(*) FROM SACH;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề GROUP BY TheLoai nhóm các cuốn sách theo thể loại, kết hợp hàm gộp COUNT(*) và ORDER BY SoLuong DESC sắp xếp giảm dần.',
      relatedSql: `SELECT TheLoai, COUNT(*) AS SoLuong\nFROM SACH\nGROUP BY TheLoai\nORDER BY SoLuong DESC;`,
    },
    {
      id: 'TV-Q06',
      databaseId: 'QL_TV',
      level: 'Thông hiểu',
      order: 6,
      question: 'Trong bảng MUON_TRA, câu lệnh "SELECT * FROM MUON_TRA WHERE TrangThai = \'Quá hạn\';" trả về tập kết quả mang ý nghĩa gì?',
      options: [
        { key: 'A', text: 'Tất cả các phiếu mượn đã hoàn tất trả sách về kho.' },
        { key: 'B', text: 'Các lượt mượn sách đã quá thời hạn quy định của thư viện mà độc giả chưa hoàn trả.' },
        { key: 'C', text: 'Các độc giả bị hủy thẻ thư viện.' },
        { key: 'D', text: 'Các đầu sách đã hết hạn lưu hành trong thư viện.' },
      ],
      correctAnswer: 'B',
      explanation: 'Ràng buộc kiểm tra CHECK(TrangThai IN (\'Đang mượn\', \'Đã trả\', \'Quá hạn\')) phân loại tình trạng lưu thông sách. Giá trị \'Quá hạn\' biểu thị độc giả giữ sách vượt quá số ngày cho phép.',
      relatedSql: `SELECT * FROM MUON_TRA WHERE TrangThai = 'Quá hạn';`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'TV-Q07',
      databaseId: 'QL_TV',
      level: 'Vận dụng',
      order: 7,
      question: 'Để xem nhật ký mượn sách gồm Mã phiếu, Tên độc giả, Tên sách và Tên tác giả sáng tác, cần kết nối những bảng nào và với thứ tự khóa nào?',
      options: [
        {
          key: 'A',
          text: `FROM MUON_TRA mt JOIN DOCGIA dg ON mt.MaDG = dg.MaDG JOIN SACH s ON mt.MaSach = s.MaSach JOIN TACGIA tg ON s.MaTG = tg.MaTG`,
        },
        {
          key: 'B',
          text: `FROM MUON_TRA mt JOIN TACGIA tg ON mt.MaSach = tg.MaTG JOIN DOCGIA dg ON mt.MaDG = dg.MaDG`,
        },
        {
          key: 'C',
          text: `FROM DOCGIA dg, SACH s, TACGIA tg WHERE dg.MaDG = tg.MaTG`,
        },
        {
          key: 'D',
          text: `FROM SACH s JOIN DOCGIA dg ON s.MaSach = dg.MaDG JOIN MUON_TRA mt ON dg.MaDG = mt.MaDG`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Liên kết chuẩn xác: MUON_TRA nối với DOCGIA qua MaDG, nối với SACH qua MaSach, và từ SACH nối với TACGIA qua MaTG.',
      relatedSql: `SELECT mt.MaPhieu, dg.TenDG, s.TenSach, tg.TenTG\nFROM MUON_TRA mt\nJOIN DOCGIA dg ON mt.MaDG = dg.MaDG\nJOIN SACH s ON mt.MaSach = s.MaSach\nJOIN TACGIA tg ON s.MaTG = tg.MaTG;`,
    },
    {
      id: 'TV-Q08',
      databaseId: 'QL_TV',
      level: 'Vận dụng',
      order: 8,
      question: 'Yêu cầu: Thống kê số lần mượn sách của từng độc giả, đảm bảo giữ lại cả các bạn đọc chưa từng mượn cuốn sách nào (số lần mượn hiển thị là 0). Câu lệnh nào dưới đây đáp ứng chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT dg.MaDG, dg.TenDG, COUNT(mt.MaPhieu) AS SoLanMuon\nFROM DOCGIA dg\nLEFT JOIN MUON_TRA mt ON dg.MaDG = mt.MaDG\nGROUP BY dg.MaDG, dg.TenDG\nORDER BY SoLanMuon DESC;`,
        },
        {
          key: 'B',
          text: `SELECT dg.MaDG, dg.TenDG, COUNT(mt.MaPhieu) AS SoLanMuon\nFROM DOCGIA dg\nINNER JOIN MUON_TRA mt ON dg.MaDG = mt.MaDG\nGROUP BY dg.MaDG, dg.TenDG;`,
        },
        {
          key: 'C',
          text: `SELECT MaDG, COUNT(*) FROM MUON_TRA GROUP BY MaDG;`,
        },
        {
          key: 'D',
          text: `SELECT dg.MaDG, COUNT(mt.MaPhieu) FROM MUON_TRA mt RIGHT JOIN DOCGIA dg ON mt.MaSach = dg.MaDG;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng LEFT JOIN từ bảng DOCGIA sang MUON_TRA để giữ toàn bộ danh sách độc giả, kết hợp COUNT(mt.MaPhieu) sẽ đếm là 0 đối với độc giả chưa có bản ghi mượn nào.',
      relatedSql: `SELECT dg.MaDG, dg.TenDG, COUNT(mt.MaPhieu) AS SoLanMuon\nFROM DOCGIA dg\nLEFT JOIN MUON_TRA mt ON dg.MaDG = mt.MaDG\nGROUP BY dg.MaDG, dg.TenDG\nORDER BY SoLanMuon DESC;`,
    },
    {
      id: 'TV-Q09',
      databaseId: 'QL_TV',
      level: 'Vận dụng',
      order: 9,
      question: 'Muốn tìm danh sách những tác giả có từ 2 đầu sách trở lên trong thư viện, truy vấn SQL nào sử dụng đúng mệnh đề HAVING?',
      options: [
        {
          key: 'A',
          text: `SELECT tg.MaTG, tg.TenTG, COUNT(s.MaSach) AS SoDauSach\nFROM TACGIA tg\nJOIN SACH s ON tg.MaTG = s.MaTG\nGROUP BY tg.MaTG, tg.TenTG\nHAVING COUNT(s.MaSach) >= 2;`,
        },
        {
          key: 'B',
          text: `SELECT tg.MaTG, tg.TenTG FROM TACGIA tg WHERE COUNT(tg.MaTG) >= 2;`,
        },
        {
          key: 'C',
          text: `SELECT tg.TenTG FROM TACGIA tg JOIN SACH s ON tg.MaTG = s.MaTG WHERE s.MaSach >= 2;`,
        },
        {
          key: 'D',
          text: `SELECT tg.TenTG, COUNT(s.MaSach) FROM TACGIA tg HAVING COUNT(s.MaSach) >= 2 GROUP BY tg.TenTG;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Điều kiện lọc trên hàm gộp COUNT bắt buộc phải đặt trong mệnh đề HAVING sau mệnh đề GROUP BY chứ không thể đặt trong WHERE.',
      relatedSql: `SELECT tg.MaTG, tg.TenTG, COUNT(s.MaSach) AS SoDauSach\nFROM TACGIA tg\nJOIN SACH s ON tg.MaTG = s.MaTG\nGROUP BY tg.MaTG, tg.TenTG\nHAVING COUNT(s.MaSach) >= 2;`,
    },
    {
      id: 'TV-Q10',
      databaseId: 'QL_TV',
      level: 'Vận dụng',
      order: 10,
      question: 'Khi lập một phiếu mượn sách mới cho độc giả \'DG06\' mượn cuốn sách \'S07\', câu lệnh SQL INSERT nào tuân thủ đúng thứ tự cột và tính toàn vẹn dữ liệu?',
      options: [
        {
          key: 'A',
          text: `INSERT INTO MUON_TRA (MaPhieu, MaDG, MaSach, NgayMuon, NgayTra, TrangThai)\nVALUES ('PM09', 'DG06', 'S07', '2024-03-25', NULL, 'Đang mượn');`,
        },
        {
          key: 'B',
          text: `INSERT INTO MUON_TRA VALUES ('DG06', 'S07', '2024-03-25', 'Đang mượn');`,
        },
        {
          key: 'C',
          text: `UPDATE MUON_TRA SET MaDG = 'DG06', MaSach = 'S07' WHERE MaPhieu = 'PM09';`,
        },
        {
          key: 'D',
          text: `CREATE ROW IN MUON_TRA ('PM09', 'DG06', 'S07', '2024-03-25');`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Câu lệnh INSERT INTO chỉ định rõ danh sách các trường và cung cấp đầy đủ các giá trị tương ứng, với NgayTra là NULL vì sách mới mượn chưa trả.',
      relatedSql: `INSERT INTO MUON_TRA (MaPhieu, MaDG, MaSach, NgayMuon, NgayTra, TrangThai)\nVALUES ('PM09', 'DG06', 'S07', '2024-03-25', NULL, 'Đang mượn');`,
    },
  ],

  // ==========================================
  // 10. CSDL_QLDIEN (3 Bảng - Quản Lý Điện)
  // ==========================================
  CSDL_QLDIEN: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'QLD-Q01',
      databaseId: 'CSDL_QLDIEN',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL_QLDIEN, bảng CHITIET có khóa chính được xác định như thế nào?',
      options: [
        { key: 'A', text: 'Chỉ duy nhất trường MASD là khóa chính.' },
        { key: 'B', text: 'Chỉ duy nhất trường MAKH là khóa chính.' },
        { key: 'C', text: 'Khóa chính ghép gồm hai trường (MASD, MAKH).' },
        { key: 'D', text: 'Trường SOKW là khóa chính.' },
      ],
      correctAnswer: 'C',
      explanation: 'Trong bảng CHITIET, một khách hàng có thể đăng ký nhiều loại hình sử dụng điện (KD, SH, SX) và một loại hình sử dụng có nhiều khách hàng, nên khóa chính là cặp thuộc tính (MASD, MAKH).',
      relatedSql: `SELECT *\nFROM CHITIET;`,
    },
    {
      id: 'QLD-Q02',
      databaseId: 'CSDL_QLDIEN',
      level: 'Nhận biết',
      order: 2,
      question: 'Câu lệnh SQL nào hiển thị toàn bộ danh sách các hình thức sử dụng điện và đơn giá từ bảng SUDUNG?',
      options: [
        { key: 'A', text: 'SELECT * FROM SUDUNG;' },
        { key: 'B', text: 'SELECT ALL FROM SUDUNG;' },
        { key: 'C', text: 'SHOW TABLE SUDUNG;' },
        { key: 'D', text: 'GET MASD, LOAISD, DONGIA FROM SUDUNG;' },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp SELECT * FROM SUDUNG; lấy toàn bộ các cột (MASD, LOAISD, DONGIA) và tất cả các dòng trong bảng SUDUNG.',
      relatedSql: `SELECT *\nFROM SUDUNG;`,
    },
    {
      id: 'QLD-Q03',
      databaseId: 'CSDL_QLDIEN',
      level: 'Nhận biết',
      order: 3,
      question: 'Theo dữ liệu bảng SUDUNG, loại sử dụng điện có mã MASD = \'KD\' (KINH DOANH) có đơn giá (DONGIA) là bao nhiêu?',
      sqlSnippet: `SELECT MASD, LOAISD, DONGIA\nFROM SUDUNG\nWHERE MASD = 'KD';`,
      options: [
        { key: 'A', text: '100' },
        { key: 'B', text: '500' },
        { key: 'C', text: '750' },
        { key: 'D', text: '1000' },
      ],
      correctAnswer: 'C',
      explanation: 'Theo dữ liệu mẫu trong bảng SUDUNG: KD (KINH DOANH) có đơn giá 750, SH (SINH HOẠT) có đơn giá 500, và SX (SẢN XUẤT) có đơn giá 100.',
      relatedSql: `SELECT MASD, LOAISD, DONGIA\nFROM SUDUNG\nWHERE MASD = 'KD';`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'QLD-Q04',
      databaseId: 'CSDL_QLDIEN',
      level: 'Thông hiểu',
      order: 4,
      question: 'Để lọc danh sách các khách hàng có địa chỉ ở khu vực "PHÚ CƯỜNG" trong bảng KHACHHANG, mệnh đề WHERE nào sau đây viết đúng chuẩn SQL?',
      options: [
        { key: 'A', text: `WHERE DIACHI = 'PHÚ CƯỜNG'` },
        { key: 'B', text: `WHERE DIACHI LIKE '%PHÚ CƯỜNG%'` },
        { key: 'C', text: `WHERE DIACHI CONTAINS 'PHÚ CƯỜNG'` },
        { key: 'D', text: `WHERE DIACHI IN 'PHÚ CƯỜNG'` },
      ],
      correctAnswer: 'B',
      explanation: 'Toán tử LIKE kết hợp ký tự đại diện % ở hai đầu giúp tìm tất cả các chuỗi địa chỉ có chứa cụm từ "PHÚ CƯỜNG" (như 12 YERSIN PHÚ CƯỜNG, 04 BẠCH ĐẰNG PHÚ CƯỜNG, 12 CMT8 PHÚ CƯỜNG).',
      relatedSql: `SELECT MAKH, TENKHACH, DIACHI\nFROM KHACHHANG\nWHERE DIACHI LIKE '%PHÚ CƯỜNG%';`,
    },
    {
      id: 'QLD-Q05',
      databaseId: 'CSDL_QLDIEN',
      level: 'Thông hiểu',
      order: 5,
      question: 'Quan sát câu lệnh SQL sau:\nSELECT SUM(SOKW) AS TongKW\nFROM CHITIET\nWHERE MAKH = \'KH01\';\nKết quả TongKW của khách hàng KH01 (THANH) là bao nhiêu?',
      sqlSnippet: `SELECT SUM(SOKW) AS TongKW\nFROM CHITIET\nWHERE MAKH = 'KH01';`,
      options: [
        { key: 'A', text: '100 KW' },
        { key: 'B', text: '250 KW' },
        { key: 'C', text: '400 KW (100 KD + 150 SH + 150 SX)' },
        { key: 'D', text: '500 KW' },
      ],
      correctAnswer: 'C',
      explanation: 'Khách hàng KH01 có 3 dòng trong bảng CHITIET: KD (100 KW), SH (150 KW) và SX (150 KW). Tổng số KW tiêu thụ là 100 + 150 + 150 = 400 KW.',
      relatedSql: `SELECT MAKH, SUM(SOKW) AS TongKW\nFROM CHITIET\nWHERE MAKH = 'KH01'\nGROUP BY MAKH;`,
    },
    {
      id: 'QLD-Q06',
      databaseId: 'CSDL_QLDIEN',
      level: 'Thông hiểu',
      order: 6,
      question: 'Để hiển thị Mã khách hàng, Tên khách hàng, Loại sử dụng, Số KW và tính cột Thành tiền = SOKW * DONGIA, cần kết nối những bảng nào?',
      options: [
        { key: 'A', text: 'Chỉ cần bảng CHITIET và KHACHHANG.' },
        { key: 'B', text: 'Chỉ cần bảng CHITIET và SUDUNG.' },
        { key: 'C', text: 'Kết nối cả 3 bảng: CHITIET, KHACHHANG và SUDUNG qua các khóa ngoại tương ứng.' },
        { key: 'D', text: 'Chỉ cần truy vấn trên bảng CHITIET.' },
      ],
      correctAnswer: 'C',
      explanation: 'TENKHACH nằm ở bảng KHACHHANG, LOAISD và DONGIA nằm ở bảng SUDUNG, còn SOKW nằm ở bảng CHITIET. Do đó phải JOIN cả 3 bảng.',
      relatedSql: `SELECT ct.MAKH, kh.TENKHACH, sd.LOAISD, ct.SOKW, sd.DONGIA, (ct.SOKW * sd.DONGIA) AS THANHTIEN\nFROM CHITIET ct\nJOIN KHACHHANG kh ON ct.MAKH = kh.MAKH\nJOIN SUDUNG sd ON ct.MASD = sd.MASD;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'QLD-Q07',
      databaseId: 'CSDL_QLDIEN',
      level: 'Vận dụng',
      order: 7,
      question: 'Trong bảng CHITIET, cột THANHTIEN ban đầu đang để trống (NULL). Câu lệnh UPDATE nào cập nhật đúng cột THANHTIEN = SOKW * DONGIA cho tất cả các dòng?',
      options: [
        {
          key: 'A',
          text: `UPDATE CHITIET\nSET THANHTIEN = SOKW * (\n  SELECT DONGIA\n  FROM SUDUNG\n  WHERE SUDUNG.MASD = CHITIET.MASD\n);`,
        },
        {
          key: 'B',
          text: `UPDATE CHITIET SET THANHTIEN = SOKW * DONGIA;`,
        },
        {
          key: 'C',
          text: `INSERT INTO CHITIET (THANHTIEN) SELECT SOKW * DONGIA FROM SUDUNG;`,
        },
        {
          key: 'D',
          text: `ALTER TABLE CHITIET SET THANHTIEN = SOKW * 500;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Vì cột DONGIA nằm ở bảng SUDUNG, câu lệnh UPDATE trên bảng CHITIET dùng truy vấn con tương quan (Correlated Subquery) để tra đúng DONGIA theo MASD của từng dòng.',
      relatedSql: `UPDATE CHITIET\nSET THANHTIEN = SOKW * (\n  SELECT DONGIA\n  FROM SUDUNG\n  WHERE SUDUNG.MASD = CHITIET.MASD\n);`,
    },
    {
      id: 'QLD-Q08',
      databaseId: 'CSDL_QLDIEN',
      level: 'Vận dụng',
      order: 8,
      question: 'Câu lệnh nào thống kê tổng số KW tiêu thụ theo từng loại hình sử dụng (MASD, LOAISD), chỉ lấy những loại hình có tổng số KW lớn hơn 650?',
      options: [
        {
          key: 'A',
          text: `SELECT sd.MASD, sd.LOAISD, SUM(ct.SOKW) AS TongKW\nFROM SUDUNG sd\nJOIN CHITIET ct ON sd.MASD = ct.MASD\nGROUP BY sd.MASD, sd.LOAISD\nHAVING SUM(ct.SOKW) > 650;`,
        },
        {
          key: 'B',
          text: `SELECT sd.MASD, sd.LOAISD, SUM(ct.SOKW) AS TongKW\nFROM SUDUNG sd\nJOIN CHITIET ct ON sd.MASD = ct.MASD\nWHERE SUM(ct.SOKW) > 650\nGROUP BY sd.MASD;`,
        },
        {
          key: 'C',
          text: `SELECT MASD, SUM(SOKW) FROM CHITIET WHERE SOKW > 650 GROUP BY MASD;`,
        },
        {
          key: 'D',
          text: `SELECT sd.LOAISD, COUNT(ct.SOKW) FROM SUDUNG sd HAVING SUM(ct.SOKW) > 650;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Để lọc điều kiện trên hàm tổng hợp SUM(ct.SOKW) > 650 sau khi đã gom nhóm GROUP BY, bắt buộc phải sử dụng mệnh đề HAVING.',
      relatedSql: `SELECT sd.MASD, sd.LOAISD, SUM(ct.SOKW) AS TongKW\nFROM SUDUNG sd\nJOIN CHITIET ct ON sd.MASD = ct.MASD\nGROUP BY sd.MASD, sd.LOAISD\nHAVING SUM(ct.SOKW) > 650;`,
    },
    {
      id: 'QLD-Q09',
      databaseId: 'CSDL_QLDIEN',
      level: 'Vận dụng',
      order: 9,
      question: 'Khách hàng nào trong bảng KHACHHANG hiện chưa có bất kỳ bản ghi tiêu thụ điện nào trong bảng CHITIET, và dùng câu lệnh nào để tìm?',
      options: [
        {
          key: 'A',
          text: `KH06 (VÂN) - dùng LEFT JOIN từ KHACHHANG sang CHITIET kết hợp WHERE ct.MASD IS NULL`,
        },
        {
          key: 'B',
          text: `KH03 (HẢO) - dùng INNER JOIN kết hợp WHERE ct.SOKW = 0`,
        },
        {
          key: 'C',
          text: `KH04 (TIẾN) - dùng WHERE ct.MASD = NULL`,
        },
        {
          key: 'D',
          text: `Không có khách hàng nào chưa sử dụng điện`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Khách hàng KH06 (VÂN - 12 CMT8 PHÚ CƯỜNG) chưa xuất hiện trong bảng CHITIET. Dùng LEFT JOIN kết hợp WHERE ct.MASD IS NULL sẽ lọc chính xác khách hàng này.',
      relatedSql: `SELECT kh.MAKH, kh.TENKHACH, kh.DIACHI\nFROM KHACHHANG kh\nLEFT JOIN CHITIET ct ON kh.MAKH = ct.MAKH\nWHERE ct.MASD IS NULL;`,
    },
    {
      id: 'QLD-Q10',
      databaseId: 'CSDL_QLDIEN',
      level: 'Vận dụng',
      order: 10,
      question: 'Câu lệnh nào tìm ra khách hàng có tổng số tiền điện phải trả (SUM(ct.SOKW * sd.DONGIA)) cao nhất?',
      options: [
        {
          key: 'A',
          text: `SELECT kh.MAKH, kh.TENKHACH, SUM(ct.SOKW * sd.DONGIA) AS TongTien\nFROM KHACHHANG kh\nJOIN CHITIET ct ON kh.MAKH = ct.MAKH\nJOIN SUDUNG sd ON ct.MASD = sd.MASD\nGROUP BY kh.MAKH, kh.TENKHACH\nORDER BY TongTien DESC\nLIMIT 1;`,
        },
        {
          key: 'B',
          text: `SELECT MAKH, MAX(SOKW) FROM CHITIET LIMIT 1;`,
        },
        {
          key: 'C',
          text: `SELECT kh.TENKHACH, ct.SOKW * sd.DONGIA FROM KHACHHANG kh, CHITIET ct, SUDUNG sd ORDER BY DONGIA DESC LIMIT 1;`,
        },
        {
          key: 'D',
          text: `SELECT MAKH, SUM(THANHTIEN) FROM KHACHHANG GROUP BY MAKH;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối 3 bảng, gom nhóm theo từng khách hàng (GROUP BY kh.MAKH, kh.TENKHACH), tính tổng tiền SUM(ct.SOKW * sd.DONGIA), sắp xếp giảm dần (DESC) và lấy dòng đầu tiên (LIMIT 1).',
      relatedSql: `SELECT kh.MAKH, kh.TENKHACH, SUM(ct.SOKW * sd.DONGIA) AS TongTien\nFROM KHACHHANG kh\nJOIN CHITIET ct ON kh.MAKH = ct.MAKH\nJOIN SUDUNG sd ON ct.MASD = sd.MASD\nGROUP BY kh.MAKH, kh.TENKHACH\nORDER BY TongTien DESC\nLIMIT 1;`,
    },
  ],

  // ==========================================
  // 11. CSDL_QLLUONG (2 Bảng - Quản Lý Lương)
  // ==========================================
  CSDL_QLLUONG: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'QLL-Q01',
      databaseId: 'CSDL_QLLUONG',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL_QLLUONG, trường nào đóng vai trò là Khóa ngoại (Foreign Key) trong bảng BANGLUONG để liên kết với bảng DMDV?',
      options: [
        { key: 'A', text: 'MANV' },
        { key: 'B', text: 'DIACHI' },
        { key: 'C', text: 'MADV' },
        { key: 'D', text: 'HSLUONG' },
      ],
      correctAnswer: 'C',
      explanation: 'Trường MADV trong bảng BANGLUONG là khóa ngoại tham chiếu đến khóa chính MADV của bảng DMDV nhằm xác định đơn vị công tác của mỗi nhân viên.',
      relatedSql: `SELECT bl.MANV, bl.HOTEN, bl.MADV, dv.TENDV\nFROM BANGLUONG bl\nJOIN DMDV dv ON bl.MADV = dv.MADV;`,
    },
    {
      id: 'QLD-QLL-02',
      databaseId: 'CSDL_QLLUONG',
      level: 'Nhận biết',
      order: 2,
      question: 'Câu lệnh SQL nào hiển thị toàn bộ danh mục các đơn vị gồm MADV, TENDV và DIACHI từ bảng DMDV?',
      options: [
        { key: 'A', text: 'SELECT * FROM DMDV;' },
        { key: 'B', text: 'SELECT ALL FROM DMDV;' },
        { key: 'C', text: 'GET * FROM DMDV;' },
        { key: 'D', text: 'SHOW DMDV;' },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp SELECT * FROM DMDV; lấy toàn bộ các cột và các bản ghi hiện có trong bảng DMDV.',
      relatedSql: `SELECT *\nFROM DMDV;`,
    },
    {
      id: 'QLL-Q03',
      databaseId: 'CSDL_QLLUONG',
      level: 'Nhận biết',
      order: 3,
      question: 'Theo dữ liệu trong bảng BANGLUONG, nhân viên nào có hệ số lương (HSLUONG) cao nhất (5.3)?',
      sqlSnippet: `SELECT MANV, HOTEN, HSLUONG, NGAYCONG\nFROM BANGLUONG\nORDER BY HSLUONG DESC\nLIMIT 1;`,
      options: [
        { key: 'A', text: 'BV01 - TRẦN THANH HẢI (4.5)' },
        { key: 'B', text: 'GD01 - HỒ BÍCH NGA (5.3)' },
        { key: 'C', text: 'KT02 - NGUYỄN QUỐC TUẤN (4.0)' },
        { key: 'D', text: 'NV02 - TẠ VĂN MINH (4.5)' },
      ],
      correctAnswer: 'B',
      explanation: 'Dựa vào bảng BANGLUONG, nhân viên GD01 (HỒ BÍCH NGA) thuộc đơn vị 02 có hệ số lương cao nhất là 5.3.',
      relatedSql: `SELECT MANV, HOTEN, HSLUONG, NGAYCONG\nFROM BANGLUONG\nORDER BY HSLUONG DESC\nLIMIT 1;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'QLL-Q04',
      databaseId: 'CSDL_QLLUONG',
      level: 'Thông hiểu',
      order: 4,
      question: 'Để lọc danh sách các nhân viên có mã nhân viên (MANV) bắt đầu bằng chữ "KT" (bộ phận Kế toán), điều kiện WHERE nào viết đúng chuẩn SQL?',
      options: [
        { key: 'A', text: `WHERE MANV = 'KT'` },
        { key: 'B', text: `WHERE MANV LIKE 'KT%'` },
        { key: 'C', text: `WHERE MANV LIKE '%KT'` },
        { key: 'D', text: `WHERE MANV STARTS WITH 'KT'` },
      ],
      correctAnswer: 'B',
      explanation: 'Mẫu LIKE \'KT%\' tìm tất cả chuỗi MANV bắt đầu bằng "KT" (gồm KT01, KT02, KT05, KT06).',
      relatedSql: `SELECT MANV, HOTEN, DIACHI, MADV, HSLUONG, NGAYCONG\nFROM BANGLUONG\nWHERE MANV LIKE 'KT%';`,
    },
    {
      id: 'QLL-Q05',
      databaseId: 'CSDL_QLLUONG',
      level: 'Thông hiểu',
      order: 5,
      question: 'Quan sát câu lệnh SQL:\nSELECT COUNT(*) AS SoNV\nFROM BANGLUONG\nWHERE DIACHI = \'TÂN UYÊN\';\nKết quả SoNV trả về là bao nhiêu nhân viên?',
      sqlSnippet: `SELECT COUNT(*) AS SoNV\nFROM BANGLUONG\nWHERE DIACHI = 'TÂN UYÊN';`,
      options: [
        { key: 'A', text: '2 nhân viên' },
        { key: 'B', text: '3 nhân viên (NV01, NV02, NV03)' },
        { key: 'C', text: '4 nhân viên' },
        { key: 'D', text: '5 nhân viên' },
      ],
      correctAnswer: 'B',
      explanation: 'Trong bảng BANGLUONG có 3 nhân viên có địa chỉ cư trú tại TÂN UYÊN là NV01 (NGUYỄN KHẮC DINH), NV02 (TẠ VĂN MINH) và NV03 (BÙI THANH MAI).',
      relatedSql: `SELECT MANV, HOTEN, DIACHI\nFROM BANGLUONG\nWHERE DIACHI = 'TÂN UYÊN';`,
    },
    {
      id: 'QLL-Q06',
      databaseId: 'CSDL_QLLUONG',
      level: 'Thông hiểu',
      order: 6,
      question: 'Khi thực hiện JOIN hai bảng BANGLUONG bl và DMDV dv, vì cả 2 bảng đều có cột tên là DIACHI (địa chỉ nhân viên và địa chỉ đơn vị), ta phải viết mệnh đề SELECT như thế nào để không bị lỗi trùng tên cột (ambiguous column name)?',
      options: [
        { key: 'A', text: 'Viết rõ tên bảng/bí danh đứng trước tên cột: bl.DIACHI AS DiaChi_NV, dv.DIACHI AS DiaChi_DV' },
        { key: 'B', text: 'Chỉ cần viết SELECT DIACHI, DIACHI FROM BANGLUONG JOIN DMDV' },
        { key: 'C', text: 'Xóa cột DIACHI ở một trong hai bảng trước khi SELECT' },
        { key: 'D', text: 'Dùng từ khóa DISTINCT DIACHI' },
      ],
      correctAnswer: 'A',
      explanation: 'Khi hai bảng trong câu lệnh JOIN có cột trùng tên (MADV, DIACHI), bắt buộc phải chỉ định tiền tố tên bảng hoặc bí danh (bl.DIACHI, dv.DIACHI) để SQLite phân biệt rõ.',
      relatedSql: `SELECT bl.MANV, bl.HOTEN, bl.DIACHI AS DiaChi_NV, dv.TENDV, dv.DIACHI AS DiaChi_DV\nFROM BANGLUONG bl\nJOIN DMDV dv ON bl.MADV = dv.MADV;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'QLL-Q07',
      databaseId: 'CSDL_QLLUONG',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh nào thống kê số lượng nhân viên của từng đơn vị (hiển thị MADV, TENDV, SoNV), chỉ lấy các đơn vị có từ 2 nhân viên trở lên?',
      options: [
        {
          key: 'A',
          text: `SELECT dv.MADV, dv.TENDV, COUNT(bl.MANV) AS SoNV\nFROM DMDV dv\nJOIN BANGLUONG bl ON dv.MADV = bl.MADV\nGROUP BY dv.MADV, dv.TENDV\nHAVING COUNT(bl.MANV) >= 2;`,
        },
        {
          key: 'B',
          text: `SELECT dv.MADV, dv.TENDV, COUNT(bl.MANV) AS SoNV\nFROM DMDV dv\nJOIN BANGLUONG bl ON dv.MADV = bl.MADV\nWHERE COUNT(bl.MANV) >= 2\nGROUP BY dv.MADV;`,
        },
        {
          key: 'C',
          text: `SELECT MADV, COUNT(*) FROM BANGLUONG WHERE MANV >= 2 GROUP BY MADV;`,
        },
        {
          key: 'D',
          text: `SELECT dv.TENDV, SUM(bl.MANV) FROM DMDV dv HAVING COUNT(*) >= 2;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Điều kiện lọc trên hàm gộp COUNT(bl.MANV) >= 2 sau khi gom nhóm GROUP BY theo đơn vị bắt buộc phải đặt trong mệnh đề HAVING.',
      relatedSql: `SELECT dv.MADV, dv.TENDV, COUNT(bl.MANV) AS SoNV\nFROM DMDV dv\nJOIN BANGLUONG bl ON dv.MADV = bl.MADV\nGROUP BY dv.MADV, dv.TENDV\nHAVING COUNT(bl.MANV) >= 2;`,
    },
    {
      id: 'QLL-Q08',
      databaseId: 'CSDL_QLLUONG',
      level: 'Vận dụng',
      order: 8,
      question: 'Giả sử cần tăng thêm 0.2 vào hệ số lương (HSLUONG) cho tất cả nhân viên có số ngày công (NGAYCONG) từ 27 ngày trở lên, câu lệnh UPDATE nào đúng?',
      options: [
        {
          key: 'A',
          text: `UPDATE BANGLUONG\nSET HSLUONG = HSLUONG + 0.2\nWHERE NGAYCONG >= 27;`,
        },
        {
          key: 'B',
          text: `UPDATE BANGLUONG\nSET HSLUONG = 0.2\nWHERE NGAYCONG >= 27;`,
        },
        {
          key: 'C',
          text: `ALTER TABLE BANGLUONG ADD HSLUONG = HSLUONG + 0.2 WHERE NGAYCONG >= 27;`,
        },
        {
          key: 'D',
          text: `INSERT INTO BANGLUONG (HSLUONG) VALUES (HSLUONG + 0.2) WHERE NGAYCONG >= 27;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Câu lệnh UPDATE BANGLUONG SET HSLUONG = HSLUONG + 0.2 WHERE NGAYCONG >= 27; cộng thêm 0.2 vào hệ số lương hiện tại của những nhân viên đạt từ 27 ngày công trở lên.',
      relatedSql: `UPDATE BANGLUONG\nSET HSLUONG = ROUND(HSLUONG + 0.2, 2)\nWHERE NGAYCONG >= 27;`,
    },
    {
      id: 'QLL-Q09',
      databaseId: 'CSDL_QLLUONG',
      level: 'Vận dụng',
      order: 9,
      question: 'Câu lệnh nào tìm các nhân viên có hệ số lương (HSLUONG) cao hơn hệ số lương trung bình của toàn bộ nhân viên trong công ty?',
      options: [
        {
          key: 'A',
          text: `SELECT MANV, HOTEN, MADV, HSLUONG\nFROM BANGLUONG\nWHERE HSLUONG > (SELECT AVG(HSLUONG) FROM BANGLUONG);`,
        },
        {
          key: 'B',
          text: `SELECT MANV, HOTEN, HSLUONG FROM BANGLUONG WHERE HSLUONG > AVG(HSLUONG);`,
        },
        {
          key: 'C',
          text: `SELECT MANV, HOTEN FROM BANGLUONG HAVING HSLUONG > AVG(HSLUONG);`,
        },
        {
          key: 'D',
          text: `SELECT MANV, MAX(HSLUONG) FROM BANGLUONG;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Vì không thể đặt trực tiếp hàm gộp AVG(HSLUONG) vào mệnh đề WHERE, ta sử dụng câu truy vấn con (SELECT AVG(HSLUONG) FROM BANGLUONG) để tính mức trung bình chung rồi so sánh.',
      relatedSql: `SELECT MANV, HOTEN, MADV, HSLUONG\nFROM BANGLUONG\nWHERE HSLUONG > (\n  SELECT AVG(HSLUONG)\n  FROM BANGLUONG\n)\nORDER BY HSLUONG DESC;`,
    },
    {
      id: 'QLL-Q10',
      databaseId: 'CSDL_QLLUONG',
      level: 'Vận dụng',
      order: 10,
      question: 'Đơn vị nào có tổng số ngày công (SUM(NGAYCONG)) của các nhân viên cao nhất, và dùng câu lệnh nào để truy vấn?',
      options: [
        {
          key: 'A',
          text: `Đơn vị 01 (CỬA HÀNG SỐ 01 - 70 ngày công) bằng câu lệnh JOIN, GROUP BY đơn vị, ORDER BY SUM(bl.NGAYCONG) DESC LIMIT 1`,
        },
        {
          key: 'B',
          text: `Đơn vị 03 (CÔNG TY ABC) bằng câu lệnh WHERE MAX(NGAYCONG)`,
        },
        {
          key: 'C',
          text: `Đơn vị 04 (XÍ NGHIỆP 204) bằng câu lệnh ORDER BY HSLUONG ASC LIMIT 1`,
        },
        {
          key: 'D',
          text: `Đơn vị 05 (XÍ NGHIỆP GỐM) bằng câu lệnh GROUP BY MANV`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Đơn vị 01 (CỬA HÀNG SỐ 01) có 3 nhân viên: KT01 (17) + NV01 (26) + NV02 (27) = 70 ngày công, cao nhất trong tất cả các đơn vị.',
      relatedSql: `SELECT dv.MADV, dv.TENDV, SUM(bl.NGAYCONG) AS TongNgayCong\nFROM DMDV dv\nJOIN BANGLUONG bl ON dv.MADV = bl.MADV\nGROUP BY dv.MADV, dv.TENDV\nORDER BY TongNgayCong DESC\nLIMIT 1;`,
    },
  ],

  // ==========================================
  // 12. CSDL_VANTAI (4 Bảng - Vận Tải Hành Khách)
  // ==========================================
  CSDL_VANTAI: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'VT-Q01',
      databaseId: 'CSDL_VANTAI',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL_VANTAI, bảng CHITIET có khóa chính được xác định như thế nào?',
      options: [
        { key: 'A', text: 'Chỉ duy nhất trường SONT là khóa chính.' },
        { key: 'B', text: 'Chỉ duy nhất trường MATUYEN là khóa chính.' },
        { key: 'C', text: 'Khóa chính ghép gồm cặp hai trường (SONT, MATUYEN).' },
        { key: 'D', text: 'Trường SOVE là khóa chính.' },
      ],
      correctAnswer: 'C',
      explanation: 'Trong bảng CHITIET, một nhật trình (SONT) có thể đi qua nhiều tuyến đường (MATUYEN) và một tuyến đường xuất hiện trong nhiều nhật trình, nên khóa chính là cặp (SONT, MATUYEN).',
      relatedSql: `SELECT *\nFROM CHITIET;`,
    },
    {
      id: 'VT-Q02',
      databaseId: 'CSDL_VANTAI',
      level: 'Nhận biết',
      order: 2,
      question: 'Câu lệnh SQL nào hiển thị danh sách các tuyến đường gồm MATUYEN, TENTUYEN, SOKM và GIAVE từ bảng TUYENDUONG, sắp xếp theo cự ly (SOKM) giảm dần?',
      options: [
        { key: 'A', text: 'SELECT * FROM TUYENDUONG ORDER BY SOKM DESC;' },
        { key: 'B', text: 'SELECT * FROM TUYENDUONG SORT BY SOKM DESC;' },
        { key: 'C', text: 'SELECT ALL FROM TUYENDUONG GROUP BY SOKM;' },
        { key: 'D', text: 'GET * FROM TUYENDUONG ORDER BY SOKM ASC;' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề ORDER BY SOKM DESC sắp xếp các tuyến đường theo số km từ xa nhất (80 km - BDƯƠNG - BÌNH LONG) đến gần nhất (30 km - BDƯƠNG - TPHCM).',
      relatedSql: `SELECT MATUYEN, TENTUYEN, SOKM, GIAVE\nFROM TUYENDUONG\nORDER BY SOKM DESC;`,
    },
    {
      id: 'VT-Q03',
      databaseId: 'CSDL_VANTAI',
      level: 'Nhận biết',
      order: 3,
      question: 'Theo dữ liệu trong bảng DMXE, xe có mã MAXE = \'X002\' (biển số 613459) do lái xe nào phụ trách và có bao nhiêu chỗ ngồi (SOCHO)?',
      sqlSnippet: `SELECT MAXE, TENXE, TENLAIXE, SOCHO\nFROM DMXE\nWHERE MAXE = 'X002';`,
      options: [
        { key: 'A', text: 'Lái xe BÌNH - 50 chỗ' },
        { key: 'B', text: 'Lái xe NAM - 45 chỗ' },
        { key: 'C', text: 'Lái xe HÀ - 50 chỗ' },
        { key: 'D', text: 'Lái xe LINH - 30 chỗ' },
      ],
      correctAnswer: 'B',
      explanation: 'Theo dữ liệu bảng DMXE: X001 (BÌNH, 50 chỗ), X002 (NAM, 45 chỗ), X003 (HÀ, 50 chỗ), X004 (LINH, 30 chỗ).',
      relatedSql: `SELECT MAXE, TENXE, TENLAIXE, SOCHO\nFROM DMXE\nWHERE MAXE = 'X002';`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'VT-Q04',
      databaseId: 'CSDL_VANTAI',
      level: 'Thông hiểu',
      order: 4,
      question: 'Để hiển thị Số nhật trình (SONT), Ngày chạy (NGAY), Biển số xe (TENXE) và Tên lái xe (TENLAIXE), ta cần kết nối hai bảng nào?',
      options: [
        { key: 'A', text: 'Bảng NHATTRINH và bảng DMXE qua trường khóa MAXE.' },
        { key: 'B', text: 'Bảng NHATTRINH và bảng TUYENDUONG qua trường MATUYEN.' },
        { key: 'C', text: 'Bảng DMXE và bảng CHITIET qua trường SONT.' },
        { key: 'D', text: 'Bảng CHITIET và bảng TUYENDUONG qua trường MATUYEN.' },
      ],
      correctAnswer: 'A',
      explanation: 'Bảng NHATTRINH lưu SONT, NGAY, MAXE; bảng DMXE lưu MAXE, TENXE, TENLAIXE, SOCHO. Hai bảng kết nối trực tiếp qua khóa MAXE.',
      relatedSql: `SELECT nt.SONT, nt.NGAY, xe.MAXE, xe.TENXE, xe.TENLAIXE, xe.SOCHO\nFROM NHATTRINH nt\nJOIN DMXE xe ON nt.MAXE = xe.MAXE;`,
    },
    {
      id: 'VT-Q05',
      databaseId: 'CSDL_VANTAI',
      level: 'Thông hiểu',
      order: 5,
      question: 'Quan sát câu lệnh SQL:\nSELECT SUM(SOVE) AS TongVe\nFROM CHITIET\nWHERE SONT = \'002\';\nTổng số vé bán ra của nhật trình \'002\' là bao nhiêu vé?',
      sqlSnippet: `SELECT SUM(SOVE) AS TongVe\nFROM CHITIET\nWHERE SONT = '002';`,
      options: [
        { key: 'A', text: '95 vé' },
        { key: 'B', text: '97 vé' },
        { key: 'C', text: '125 vé (45 vé BD02 + 40 vé BD03 + 40 vé BD04)' },
        { key: 'D', text: '150 vé' },
      ],
      correctAnswer: 'C',
      explanation: 'Trong bảng CHITIET, nhật trình 002 gồm 3 dòng: BD02 (45 vé), BD03 (40 vé) và BD04 (40 vé). Tổng cộng: 45 + 40 + 40 = 125 vé.',
      relatedSql: `SELECT SONT, SUM(SOVE) AS TongVe\nFROM CHITIET\nWHERE SONT = '002'\nGROUP BY SONT;`,
    },
    {
      id: 'VT-Q06',
      databaseId: 'CSDL_VANTAI',
      level: 'Thông hiểu',
      order: 6,
      question: 'Để tính Thành tiền bán vé (THANHTIEN = SOVE * GIAVE) cho từng dòng trong bảng CHITIET kèm theo Tên tuyến đường (TENTUYEN), cần kết nối bảng CHITIET với bảng nào?',
      options: [
        { key: 'A', text: 'Kết nối bảng CHITIET với bảng TUYENDUONG qua trường MATUYEN.' },
        { key: 'B', text: 'Kết nối bảng CHITIET với bảng DMXE qua trường MAXE.' },
        { key: 'C', text: 'Kết nối bảng CHITIET với bảng NHATTRINH qua trường SONT.' },
        { key: 'D', text: 'Không cần kết nối bảng nào cả.' },
      ],
      correctAnswer: 'A',
      explanation: 'Cột SOVE nằm ở bảng CHITIET còn cột TENTUYEN và GIAVE nằm ở bảng TUYENDUONG, nên cần JOIN hai bảng này qua khóa MATUYEN.',
      relatedSql: `SELECT ct.SONT, ct.MATUYEN, td.TENTUYEN, ct.SOVE, td.GIAVE, (ct.SOVE * td.GIAVE) AS THANHTIEN\nFROM CHITIET ct\nJOIN TUYENDUONG td ON ct.MATUYEN = td.MATUYEN;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'VT-Q07',
      databaseId: 'CSDL_VANTAI',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh nào phát hiện chuyến xe bán số vé vượt quá số chỗ ngồi thiết kế (ct.SOVE > xe.SOCHO)?',
      options: [
        {
          key: 'A',
          text: `SELECT ct.SONT, nt.NGAY, xe.TENXE, xe.TENLAIXE, ct.MATUYEN, ct.SOVE, xe.SOCHO\nFROM CHITIET ct\nJOIN NHATTRINH nt ON ct.SONT = nt.SONT\nJOIN DMXE xe ON nt.MAXE = xe.MAXE\nWHERE ct.SOVE > xe.SOCHO;`,
        },
        {
          key: 'B',
          text: `SELECT SONT, SOVE FROM CHITIET WHERE SOVE > 50;`,
        },
        {
          key: 'C',
          text: `SELECT MAXE, TENXE, SOCHO FROM DMXE WHERE SOCHO < 45;`,
        },
        {
          key: 'D',
          text: `SELECT ct.SONT, xe.SOCHO FROM CHITIET ct, DMXE xe WHERE ct.SONT = xe.MAXE;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối CHITIET -> NHATTRINH -> DMXE để đối chiếu số vé bán (ct.SOVE) với số ghế của chiếc xe thực hiện nhật trình đó (xe.SOCHO), phát hiện nhật trình 003 tuyến BD01 (52 vé > 45 chỗ của xe X002).',
      relatedSql: `SELECT ct.SONT, nt.NGAY, xe.TENXE, xe.TENLAIXE, ct.MATUYEN, ct.SOVE, xe.SOCHO\nFROM CHITIET ct\nJOIN NHATTRINH nt ON ct.SONT = nt.SONT\nJOIN DMXE xe ON nt.MAXE = xe.MAXE\nWHERE ct.SOVE > xe.SOCHO;`,
    },
    {
      id: 'VT-Q08',
      databaseId: 'CSDL_VANTAI',
      level: 'Vận dụng',
      order: 8,
      question: 'Câu lệnh nào thống kê tổng doanh thu (SUM(ct.SOVE * td.GIAVE)) theo từng Tuyến đường, chỉ lấy các tuyến có tổng doanh thu từ 500.000 VNĐ trở lên?',
      options: [
        {
          key: 'A',
          text: `SELECT td.MATUYEN, td.TENTUYEN, SUM(ct.SOVE * td.GIAVE) AS DoanhThu\nFROM TUYENDUONG td\nJOIN CHITIET ct ON td.MATUYEN = ct.MATUYEN\nGROUP BY td.MATUYEN, td.TENTUYEN\nHAVING SUM(ct.SOVE * td.GIAVE) >= 500000;`,
        },
        {
          key: 'B',
          text: `SELECT td.MATUYEN, SUM(ct.SOVE * td.GIAVE) FROM TUYENDUONG td JOIN CHITIET ct ON td.MATUYEN = ct.MATUYEN WHERE SUM(ct.SOVE * td.GIAVE) >= 500000 GROUP BY td.MATUYEN;`,
        },
        {
          key: 'C',
          text: `SELECT MATUYEN, GIAVE FROM TUYENDUONG WHERE GIAVE >= 500000;`,
        },
        {
          key: 'D',
          text: `SELECT MATUYEN, SUM(SOVE) FROM CHITIET HAVING SUM(SOVE) >= 500000;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sau khi gom nhóm GROUP BY theo tuyến đường, điều kiện lọc trên hàm tổng hợp SUM(ct.SOVE * td.GIAVE) >= 500000 phải đặt trong mệnh đề HAVING.',
      relatedSql: `SELECT td.MATUYEN, td.TENTUYEN, SUM(ct.SOVE * td.GIAVE) AS DoanhThu\nFROM TUYENDUONG td\nJOIN CHITIET ct ON td.MATUYEN = ct.MATUYEN\nGROUP BY td.MATUYEN, td.TENTUYEN\nHAVING SUM(ct.SOVE * td.GIAVE) >= 500000;`,
    },
    {
      id: 'VT-Q09',
      databaseId: 'CSDL_VANTAI',
      level: 'Vận dụng',
      order: 9,
      question: 'Trong bảng DMXE, chiếc xe nào hiện chưa từng tham gia bất kỳ chuyến nhật trình nào trong bảng NHATTRINH, và câu lệnh nào dùng để tìm?',
      options: [
        {
          key: 'A',
          text: `Xe X004 (biển số 616107, lái xe LINH) - dùng LEFT JOIN từ DMXE sang NHATTRINH kết hợp WHERE nt.SONT IS NULL`,
        },
        {
          key: 'B',
          text: `Xe X003 (lái xe HÀ) - dùng INNER JOIN kết hợp WHERE nt.SONT = 0`,
        },
        {
          key: 'C',
          text: `Xe X001 (lái xe BÌNH) - dùng WHERE nt.MAXE = NULL`,
        },
        {
          key: 'D',
          text: `Tất cả các xe đều đã có nhật trình chạy`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Xe X004 (616107 - lái xe LINH - 30 chỗ) chưa xuất hiện trong bảng NHATTRINH. Dùng LEFT JOIN từ DMXE sang NHATTRINH kết hợp WHERE nt.SONT IS NULL sẽ tìm ra chiếc xe này.',
      relatedSql: `SELECT xe.MAXE, xe.TENXE, xe.TENLAIXE, xe.SOCHO\nFROM DMXE xe\nLEFT JOIN NHATTRINH nt ON xe.MAXE = nt.MAXE\nWHERE nt.SONT IS NULL;`,
    },
    {
      id: 'VT-Q10',
      databaseId: 'CSDL_VANTAI',
      level: 'Vận dụng',
      order: 10,
      question: 'Trong bảng NHATTRINH có 5 nhật trình (001 đến 005), nhưng những nhật trình nào chưa có dữ liệu chi tiết vé bán trong bảng CHITIET?',
      options: [
        {
          key: 'A',
          text: `Nhật trình 004 và 005 - tìm bằng LEFT JOIN từ NHATTRINH sang CHITIET kết hợp WHERE ct.MATUYEN IS NULL`,
        },
        {
          key: 'B',
          text: `Nhật trình 001 và 002`,
        },
        {
          key: 'C',
          text: `Chỉ nhật trình 003`,
        },
        {
          key: 'D',
          text: `Tất cả 5 nhật trình đều đã có trong bảng CHITIET`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Trong bảng CHITIET mới chỉ có dữ liệu của SONT 001, 002 và 003. Hai nhật trình 004 (15/05/2005 - X002) và 005 (20/05/2005 - X003) chưa có bản ghi nào trong CHITIET.',
      relatedSql: `SELECT nt.SONT, nt.NGAY, nt.MAXE\nFROM NHATTRINH nt\nLEFT JOIN CHITIET ct ON nt.SONT = ct.SONT\nWHERE ct.MATUYEN IS NULL;`,
    },
  ],

  // ==========================================
  // 13. CSDL_QLKHO (4 Bảng - Quản Lý Kho)
  // ==========================================
  CSDL_QLKHO: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'KHO-Q01',
      databaseId: 'CSDL_QLKHO',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL_QLKHO, bảng CTNX (Chi tiết nhập xuất) có khóa chính được xác định như thế nào?',
      options: [
        { key: 'A', text: 'Chỉ duy nhất trường SOHD là khóa chính.' },
        { key: 'B', text: 'Cặp hai trường (SOHD, MAHH) là khóa chính.' },
        { key: 'C', text: 'Bộ ba trường (SOHD, MAHH, MAKHO) tạo thành khóa chính ghép.' },
        { key: 'D', text: 'Trường SOLUONG là khóa chính.' },
      ],
      correctAnswer: 'C',
      explanation: 'Trong bảng CTNX, cùng một số hóa đơn (SOHD = 0003) và cùng một mã hàng hóa (MAHH = B001) có thể nhập/xuất tại nhiều kho khác nhau (K02 và K03), nên khóa chính ghép gồm cả 3 trường (SOHD, MAHH, MAKHO).',
      relatedSql: `SELECT *\nFROM CTNX;`,
    },
    {
      id: 'KHO-Q02',
      databaseId: 'CSDL_QLKHO',
      level: 'Nhận biết',
      order: 2,
      question: 'Trong bảng NXKHO, trường LOAIHD nhận hai giá trị \'N\' và \'X\' mang ý nghĩa gì, và dùng câu lệnh nào để lọc các hóa đơn Nhập kho?',
      options: [
        { key: 'A', text: '\'N\' là Nhập kho, \'X\' là Xuất kho - dùng SELECT * FROM NXKHO WHERE LOAIHD = \'N\';' },
        { key: 'B', text: '\'N\' là Ngoại tỉnh, \'X\' là Xí nghiệp - dùng SELECT * FROM NXKHO;' },
        { key: 'C', text: 'Dùng SELECT * FROM NXKHO WHERE LOAIHD = N;' },
        { key: 'D', text: 'Dùng GET * FROM NXKHO WHERE LOAIHD LIKE \'N\';' },
      ],
      correctAnswer: 'A',
      explanation: 'Giá trị \'N\' ký hiệu cho hóa đơn Nhập kho (0001, 0003, 0005) và \'X\' ký hiệu cho hóa đơn Xuất kho (0002, 0004).',
      relatedSql: `SELECT SOHD, NGAY, LOAIHD\nFROM NXKHO\nWHERE LOAIHD = 'N';`,
    },
    {
      id: 'KHO-Q03',
      databaseId: 'CSDL_QLKHO',
      level: 'Nhận biết',
      order: 3,
      question: 'Theo dữ liệu bảng DMHH, mặt hàng có đơn giá (DONGIA) cao nhất là mặt hàng nào?',
      sqlSnippet: `SELECT MAHH, TENHH, DONGIA\nFROM DMHH\nORDER BY DONGIA DESC\nLIMIT 1;`,
      options: [
        { key: 'A', text: 'A001 - Ấm điện Trung Quốc (100.000)' },
        { key: 'B', text: 'MS01 - Máy sấy tóc Vĩnh Hòa (125.000)' },
        { key: 'C', text: 'QD01 - Quạt điện Bình Minh (200.000)' },
        { key: 'D', text: 'QD02 - Quạt điện Hà Nội (220.000)' },
      ],
      correctAnswer: 'D',
      explanation: 'Trong bảng DMHH, mặt hàng QD02 (Quạt điện Hà Nội) có đơn giá cao nhất là 220.000.',
      relatedSql: `SELECT MAHH, TENHH, DONGIA\nFROM DMHH\nORDER BY DONGIA DESC\nLIMIT 1;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'KHO-Q04',
      databaseId: 'CSDL_QLKHO',
      level: 'Thông hiểu',
      order: 4,
      question: 'Để lọc tất cả các mặt hàng thuộc nhóm "Bóng đèn" hoặc "Quạt điện" trong bảng DMHH, mệnh đề WHERE nào sau đây sử dụng toán tử LIKE đúng?',
      options: [
        { key: 'A', text: `WHERE TENHH LIKE 'Bóng đèn%' OR TENHH LIKE 'Quạt điện%'` },
        { key: 'B', text: `WHERE TENHH = 'Bóng đèn' AND TENHH = 'Quạt điện'` },
        { key: 'C', text: `WHERE TENHH IN ('Bóng đèn%', 'Quạt điện%')` },
        { key: 'D', text: `WHERE MAHH = 'B%' OR MAHH = 'QD%'` },
      ],
      correctAnswer: 'A',
      explanation: 'Toán tử LIKE \'Bóng đèn%\' kết hợp OR TENHH LIKE \'Quạt điện%\' lọc tất cả mặt hàng có tên bắt đầu bằng "Bóng đèn" hoặc "Quạt điện".',
      relatedSql: `SELECT MAHH, TENHH, DONGIA\nFROM DMHH\nWHERE TENHH LIKE 'Bóng đèn%' OR TENHH LIKE 'Quạt điện%';`,
    },
    {
      id: 'KHO-Q05',
      databaseId: 'CSDL_QLKHO',
      level: 'Thông hiểu',
      order: 5,
      question: 'Quan sát câu lệnh SQL:\nSELECT SUM(SOLUONG) AS TongSL\nFROM CTNX\nWHERE SOHD = \'0003\';\nTổng số lượng hàng hóa trong hóa đơn \'0003\' là bao nhiêu?',
      sqlSnippet: `SELECT SUM(SOLUONG) AS TongSL\nFROM CTNX\nWHERE SOHD = '0003';`,
      options: [
        { key: 'A', text: '2.500' },
        { key: 'B', text: '6.500' },
        { key: 'C', text: '6.750 (2500 + 4000 + 50 + 200)' },
        { key: 'D', text: '7.000' },
      ],
      correctAnswer: 'C',
      explanation: 'Hóa đơn 0003 có 4 dòng trong bảng CTNX: B001 tại K02 (2500), B001 tại K03 (4000), LN01 tại K04 (50) và QD01 tại K02 (200). Tổng cộng = 6750.',
      relatedSql: `SELECT SOHD, SUM(SOLUONG) AS TongSL\nFROM CTNX\nWHERE SOHD = '0003'\nGROUP BY SOHD;`,
    },
    {
      id: 'KHO-Q06',
      databaseId: 'CSDL_QLKHO',
      level: 'Thông hiểu',
      order: 6,
      question: 'Để hiển thị Số hóa đơn (SOHD), Tên kho (TENKHO), Tên hàng hóa (TENHH), Số lượng (SOLUONG) và tính Thành tiền = SOLUONG * DONGIA, cần kết nối những bảng nào?',
      options: [
        { key: 'A', text: 'Kết nối 3 bảng: CTNX, DMKHO và DMHH qua các khóa MAKHO và MAHH.' },
        { key: 'B', text: 'Chỉ cần bảng CTNX và DMKHO.' },
        { key: 'C', text: 'Chỉ cần bảng NXKHO và DMHH.' },
        { key: 'D', text: 'Chỉ cần truy vấn trên bảng CTNX.' },
      ],
      correctAnswer: 'A',
      explanation: 'SOHD và SOLUONG nằm ở CTNX, TENKHO nằm ở DMKHO, còn TENHH và DONGIA nằm ở DMHH. Do đó cần JOIN 3 bảng này.',
      relatedSql: `SELECT ct.SOHD, k.TENKHO, hh.TENHH, ct.SOLUONG, hh.DONGIA, (ct.SOLUONG * hh.DONGIA) AS THANHTIEN\nFROM CTNX ct\nJOIN DMKHO k ON ct.MAKHO = k.MAKHO\nJOIN DMHH hh ON ct.MAHH = hh.MAHH;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'KHO-Q07',
      databaseId: 'CSDL_QLKHO',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh nào thống kê tổng số lượng hàng hóa lưu chuyển theo từng Kho (MAKHO, TENKHO), chỉ lấy các kho có tổng số lượng từ 1.000 đơn vị trở lên?',
      options: [
        {
          key: 'A',
          text: `SELECT k.MAKHO, k.TENKHO, SUM(ct.SOLUONG) AS TongSL\nFROM DMKHO k\nJOIN CTNX ct ON k.MAKHO = ct.MAKHO\nGROUP BY k.MAKHO, k.TENKHO\nHAVING SUM(ct.SOLUONG) >= 1000;`,
        },
        {
          key: 'B',
          text: `SELECT k.MAKHO, k.TENKHO, SUM(ct.SOLUONG) FROM DMKHO k JOIN CTNX ct ON k.MAKHO = ct.MAKHO WHERE SUM(ct.SOLUONG) >= 1000 GROUP BY k.MAKHO;`,
        },
        {
          key: 'C',
          text: `SELECT MAKHO, SOLUONG FROM CTNX WHERE SOLUONG >= 1000;`,
        },
        {
          key: 'D',
          text: `SELECT k.TENKHO, COUNT(*) FROM DMKHO k HAVING SUM(SOLUONG) >= 1000;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sau khi gom nhóm GROUP BY theo kho, điều kiện lọc trên hàm tổng hợp SUM(ct.SOLUONG) >= 1000 phải đặt trong mệnh đề HAVING (kết quả là K02 - Long Bình và K03 - Phú Xuân).',
      relatedSql: `SELECT k.MAKHO, k.TENKHO, SUM(ct.SOLUONG) AS TongSL\nFROM DMKHO k\nJOIN CTNX ct ON k.MAKHO = ct.MAKHO\nGROUP BY k.MAKHO, k.TENKHO\nHAVING SUM(ct.SOLUONG) >= 1000;`,
    },
    {
      id: 'KHO-Q08',
      databaseId: 'CSDL_QLKHO',
      level: 'Vận dụng',
      order: 8,
      question: 'Những mặt hàng nào trong bảng DMHH chưa từng phát sinh bất kỳ giao dịch nhập/xuất nào trong bảng CTNX, và câu lệnh nào dùng để tìm?',
      options: [
        {
          key: 'A',
          text: `3 mặt hàng B002, LN02, MS01 - tìm bằng LEFT JOIN từ DMHH sang CTNX kết hợp WHERE ct.SOHD IS NULL`,
        },
        {
          key: 'B',
          text: `Mặt hàng A001 và B001 - dùng INNER JOIN`,
        },
        {
          key: 'C',
          text: `Mặt hàng QD01 và QD02 - dùng WHERE ct.SOLUONG = 0`,
        },
        {
          key: 'D',
          text: `Tất cả 8 mặt hàng trong DMHH đều đã có giao dịch`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Trong 8 mặt hàng của DMHH, chỉ có A001, B001, LN01, QD01, QD02 xuất hiện trong CTNX. Ba mặt hàng B002 (Bóng đèn Điện Quang), LN02 (Lò nướng Hồng Ký), MS01 (Máy sấy tóc Vĩnh Hòa) chưa có giao dịch nào.',
      relatedSql: `SELECT hh.MAHH, hh.TENHH, hh.DONGIA\nFROM DMHH hh\nLEFT JOIN CTNX ct ON hh.MAHH = ct.MAHH\nWHERE ct.SOHD IS NULL;`,
    },
    {
      id: 'KHO-Q09',
      databaseId: 'CSDL_QLKHO',
      level: 'Vận dụng',
      order: 9,
      question: 'Trong bảng NXKHO có 5 hóa đơn (0001 đến 0005), những hóa đơn nào chưa có dữ liệu chi tiết trong bảng CTNX?',
      options: [
        {
          key: 'A',
          text: `Hóa đơn 0004 và 0005 - tìm bằng LEFT JOIN từ NXKHO sang CTNX kết hợp WHERE ct.MAHH IS NULL`,
        },
        {
          key: 'B',
          text: `Hóa đơn 0001 và 0002`,
        },
        {
          key: 'C',
          text: `Chỉ hóa đơn 0003`,
        },
        {
          key: 'D',
          text: `Cả 5 hóa đơn đều đã có chi tiết trong CTNX`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Bảng CTNX mới lưu chi tiết của các hóa đơn 0001, 0002 và 0003. Hai hóa đơn 0004 (03/12/2005 - X) và 0005 (16/07/2005 - N) chưa có dòng chi tiết nào.',
      relatedSql: `SELECT nx.SOHD, nx.NGAY, nx.LOAIHD\nFROM NXKHO nx\nLEFT JOIN CTNX ct ON nx.SOHD = ct.SOHD\nWHERE ct.MAHH IS NULL;`,
    },
    {
      id: 'KHO-Q10',
      databaseId: 'CSDL_QLKHO',
      level: 'Vận dụng',
      order: 10,
      question: 'Câu lệnh nào thống kê tổng trị giá tiền hàng (SUM(ct.SOLUONG * hh.DONGIA)) của từng hóa đơn, sắp xếp từ cao xuống thấp?',
      options: [
        {
          key: 'A',
          text: `SELECT nx.SOHD, nx.NGAY, nx.LOAIHD, SUM(ct.SOLUONG * hh.DONGIA) AS TongTriGia\nFROM NXKHO nx\nJOIN CTNX ct ON nx.SOHD = ct.SOHD\nJOIN DMHH hh ON ct.MAHH = hh.MAHH\nGROUP BY nx.SOHD, nx.NGAY, nx.LOAIHD\nORDER BY TongTriGia DESC;`,
        },
        {
          key: 'B',
          text: `SELECT SOHD, MAX(SOLUONG) FROM CTNX GROUP BY SOHD;`,
        },
        {
          key: 'C',
          text: `SELECT SOHD, SUM(DONGIA) FROM DMHH ORDER BY DONGIA DESC;`,
        },
        {
          key: 'D',
          text: `SELECT nx.SOHD, ct.SOLUONG * hh.DONGIA FROM NXKHO nx, CTNX ct, DMHH hh;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối NXKHO, CTNX và DMHH, gom nhóm theo từng hóa đơn (GROUP BY nx.SOHD, nx.NGAY, nx.LOAIHD) và tính tổng trị giá SUM(ct.SOLUONG * hh.DONGIA).',
      relatedSql: `SELECT nx.SOHD, nx.NGAY, nx.LOAIHD, SUM(ct.SOLUONG * hh.DONGIA) AS TongTriGia\nFROM NXKHO nx\nJOIN CTNX ct ON nx.SOHD = ct.SOHD\nJOIN DMHH hh ON ct.MAHH = hh.MAHH\nGROUP BY nx.SOHD, nx.NGAY, nx.LOAIHD\nORDER BY TongTriGia DESC;`,
    },
  ],

  // ==========================================
  // 14. CSDL_KDSACH (4 Bảng - Kinh Doanh Sách)
  // ==========================================
  CSDL_KDSACH: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'KDS-Q01',
      databaseId: 'CSDL_KDSACH',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL_KDSACH, bảng CTHOADON có khóa chính được xác định như thế nào?',
      options: [
        { key: 'A', text: 'Chỉ duy nhất trường SOCTU là khóa chính.' },
        { key: 'B', text: 'Chỉ duy nhất trường MASACH là khóa chính.' },
        { key: 'C', text: 'Khóa chính ghép gồm bộ ba trường (SOCTU, MASACH, MALOAI).' },
        { key: 'D', text: 'Trường SOLUONG là khóa chính.' },
      ],
      correctAnswer: 'C',
      explanation: 'Theo cấu trúc bảng CTHOADON, bộ ba thuộc tính (SOCTU, MASACH, MALOAI) cùng tạo nên khóa chính ghép để định danh duy nhất mỗi dòng chi tiết chứng từ sách.',
      relatedSql: `SELECT *\nFROM CTHOADON;`,
    },
    {
      id: 'KDS-Q02',
      databaseId: 'CSDL_KDSACH',
      level: 'Nhận biết',
      order: 2,
      question: 'Câu lệnh SQL nào hiển thị toàn bộ danh sách các loại sách gồm MALOAI và LOAISACH từ bảng LOAISACH?',
      options: [
        { key: 'A', text: 'SELECT * FROM LOAISACH;' },
        { key: 'B', text: 'SELECT ALL FROM LOAISACH;' },
        { key: 'C', text: 'SHOW TABLE LOAISACH;' },
        { key: 'D', text: 'GET MALOAI, LOAISACH FROM LOAISACH;' },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp SELECT * FROM LOAISACH; hiển thị tất cả 5 loại sách: HH03 (HÓA HỌC), SH05 (SINH HỌC), TH01 (TIN HỌC), VH02 (VĂN HỌC), VL04 (VẬT LÝ).',
      relatedSql: `SELECT *\nFROM LOAISACH;`,
    },
    {
      id: 'KDS-Q03',
      databaseId: 'CSDL_KDSACH',
      level: 'Nhận biết',
      order: 3,
      question: 'Theo dữ liệu bảng DMSACH, cuốn sách nào có đơn giá (DONGIA) cao nhất (36.000)?',
      sqlSnippet: `SELECT MASACH, TENSACH, DONGIA\nFROM DMSACH\nORDER BY DONGIA DESC\nLIMIT 1;`,
      options: [
        { key: 'A', text: 'ACC001 - LẬP TRÌNH ACCESS CƠ BẢN (25.000)' },
        { key: 'B', text: 'SHC003 - SINH HỌC CAO CẤP (32.000)' },
        { key: 'C', text: 'WRD002 - LÀM QUEN VỚI MSWORD 2002 (36.000)' },
        { key: 'D', text: 'VLC002 - VẬT LÝ CAO CẤP (23.000)' },
      ],
      correctAnswer: 'C',
      explanation: 'Trong bảng DMSACH, cuốn WRD002 (LÀM QUEN VỚI MSWORD 2002) có đơn giá cao nhất là 36.000.',
      relatedSql: `SELECT MASACH, TENSACH, DONGIA\nFROM DMSACH\nORDER BY DONGIA DESC\nLIMIT 1;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'KDS-Q04',
      databaseId: 'CSDL_KDSACH',
      level: 'Thông hiểu',
      order: 4,
      question: 'Để lọc danh sách các hóa đơn trong bảng HOADON của khách hàng ở khu vực "BÌNH DƯƠNG", mệnh đề WHERE nào sau đây là đúng?',
      options: [
        { key: 'A', text: `WHERE DIACHI = 'BÌNH DƯƠNG'` },
        { key: 'B', text: `WHERE HOTEN = 'BÌNH DƯƠNG'` },
        { key: 'C', text: `WHERE LOAICTU = 'BÌNH DƯƠNG'` },
        { key: 'D', text: `WHERE SOCTU LIKE 'BÌNH DƯƠNG'` },
      ],
      correctAnswer: 'A',
      explanation: 'Trường DIACHI trong bảng HOADON lưu địa chỉ khách hàng. Điều kiện WHERE DIACHI = \'BÌNH DƯƠNG\' lọc ra 4 chứng từ: 002, 003, 005 và 007.',
      relatedSql: `SELECT SOCTU, LOAICTU, NGAYCTU, HOTEN, DIACHI\nFROM HOADON\nWHERE DIACHI = 'BÌNH DƯƠNG';`,
    },
    {
      id: 'KDS-Q05',
      databaseId: 'CSDL_KDSACH',
      level: 'Thông hiểu',
      order: 5,
      question: 'Quan sát câu lệnh SQL:\nSELECT SUM(SOLUONG) AS TongSL\nFROM CTHOADON\nWHERE SOCTU = \'001\';\nTổng số lượng sách trong chứng từ \'001\' là bao nhiêu cuốn?',
      sqlSnippet: `SELECT SUM(SOLUONG) AS TongSL\nFROM CTHOADON\nWHERE SOCTU = '001';`,
      options: [
        { key: 'A', text: '8 cuốn' },
        { key: 'B', text: '20 cuốn' },
        { key: 'C', text: '23 cuốn (5 cuốn ACC001 + 15 cuốn SHC003 + 3 cuốn WRD002)' },
        { key: 'D', text: '35 cuốn' },
      ],
      correctAnswer: 'C',
      explanation: 'Trong bảng CTHOADON, chứng từ 001 gồm 3 dòng: ACC001 (5), SHC003 (15) và WRD002 (3). Tổng số lượng = 5 + 15 + 3 = 23 cuốn.',
      relatedSql: `SELECT SOCTU, SUM(SOLUONG) AS TongSL\nFROM CTHOADON\nWHERE SOCTU = '001'\nGROUP BY SOCTU;`,
    },
    {
      id: 'KDS-Q06',
      databaseId: 'CSDL_KDSACH',
      level: 'Thông hiểu',
      order: 6,
      question: 'Để hiển thị Số chứng từ (SOCTU), Tên sách (TENSACH), Tên loại sách (LOAISACH), Số lượng (SOLUONG) và tính Thành tiền = SOLUONG * DONGIA, cần kết nối những bảng nào?',
      options: [
        { key: 'A', text: 'Kết nối 3 bảng: CTHOADON, DMSACH và LOAISACH qua MASACH và MALOAI.' },
        { key: 'B', text: 'Chỉ cần bảng CTHOADON và HOADON.' },
        { key: 'C', text: 'Chỉ cần bảng DMSACH và LOAISACH.' },
        { key: 'D', text: 'Chỉ cần truy vấn trên bảng CTHOADON.' },
      ],
      correctAnswer: 'A',
      explanation: 'SOCTU và SOLUONG nằm ở CTHOADON, TENSACH và DONGIA nằm ở DMSACH, còn tên LOAISACH nằm ở bảng LOAISACH.',
      relatedSql: `SELECT ct.SOCTU, s.TENSACH, ls.LOAISACH, ct.SOLUONG, s.DONGIA, (ct.SOLUONG * s.DONGIA) AS THANHTIEN\nFROM CTHOADON ct\nJOIN DMSACH s ON ct.MASACH = s.MASACH\nJOIN LOAISACH ls ON ct.MALOAI = ls.MALOAI;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'KDS-Q07',
      databaseId: 'CSDL_KDSACH',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh nào thống kê tổng số lượng sách theo từng Loại sách (MALOAI, LOAISACH), chỉ lấy các loại sách có tổng số lượng từ 20 cuốn trở lên?',
      options: [
        {
          key: 'A',
          text: `SELECT ls.MALOAI, ls.LOAISACH, SUM(ct.SOLUONG) AS TongSL\nFROM LOAISACH ls\nJOIN CTHOADON ct ON ls.MALOAI = ct.MALOAI\nGROUP BY ls.MALOAI, ls.LOAISACH\nHAVING SUM(ct.SOLUONG) >= 20;`,
        },
        {
          key: 'B',
          text: `SELECT ls.MALOAI, ls.LOAISACH, SUM(ct.SOLUONG) FROM LOAISACH ls JOIN CTHOADON ct ON ls.MALOAI = ct.MALOAI WHERE SUM(ct.SOLUONG) >= 20 GROUP BY ls.MALOAI;`,
        },
        {
          key: 'C',
          text: `SELECT MALOAI, SOLUONG FROM CTHOADON WHERE SOLUONG >= 20;`,
        },
        {
          key: 'D',
          text: `SELECT ls.LOAISACH, COUNT(*) FROM LOAISACH ls HAVING SUM(SOLUONG) >= 20;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sau khi gom nhóm GROUP BY theo loại sách, điều kiện lọc trên hàm gộp SUM(ct.SOLUONG) >= 20 phải đặt trong mệnh đề HAVING (kết quả gồm TH01 - TIN HỌC: 72 cuốn và VL04 - VẬT LÝ: 20 cuốn).',
      relatedSql: `SELECT ls.MALOAI, ls.LOAISACH, SUM(ct.SOLUONG) AS TongSL\nFROM LOAISACH ls\nJOIN CTHOADON ct ON ls.MALOAI = ct.MALOAI\nGROUP BY ls.MALOAI, ls.LOAISACH\nHAVING SUM(ct.SOLUONG) >= 20;`,
    },
    {
      id: 'KDS-Q08',
      databaseId: 'CSDL_KDSACH',
      level: 'Vận dụng',
      order: 8,
      question: 'Những cuốn sách nào trong bảng DMSACH hiện chưa từng xuất hiện trong bảng CTHOADON, và dùng câu lệnh nào để tìm?',
      options: [
        {
          key: 'A',
          text: `2 cuốn HHP004 (HÓA HỌC CĂN BẢN) và VLC002 (VẬT LÝ CAO CẤP) - dùng LEFT JOIN từ DMSACH sang CTHOADON kết hợp WHERE ct.SOCTU IS NULL`,
        },
        {
          key: 'B',
          text: `Cuốn ACC001 và EXC003 - dùng INNER JOIN`,
        },
        {
          key: 'C',
          text: `Cuốn WRD002 - dùng WHERE ct.SOLUONG = 0`,
        },
        {
          key: 'D',
          text: `Tất cả 7 cuốn sách trong DMSACH đều đã có trong CTHOADON`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Trong 7 đầu sách của DMSACH, có 2 đầu sách chưa phát sinh dòng chi tiết nào trong CTHOADON là HHP004 và VLC002.',
      relatedSql: `SELECT s.MASACH, s.TENSACH, s.DONGIA\nFROM DMSACH s\nLEFT JOIN CTHOADON ct ON s.MASACH = ct.MASACH\nWHERE ct.SOCTU IS NULL;`,
    },
    {
      id: 'KDS-Q09',
      databaseId: 'CSDL_KDSACH',
      level: 'Vận dụng',
      order: 9,
      question: 'Trong bảng HOADON có 7 chứng từ (001 đến 007), những chứng từ nào chưa có dữ liệu chi tiết sách trong bảng CTHOADON?',
      options: [
        {
          key: 'A',
          text: `Chứng từ 004 (CAO VĂN ẤN) và 006 (TRIỂN CHIÊU) - tìm bằng LEFT JOIN từ HOADON sang CTHOADON kết hợp WHERE ct.MASACH IS NULL`,
        },
        {
          key: 'B',
          text: `Chứng từ 001 và 002`,
        },
        {
          key: 'C',
          text: `Chứng từ 003 và 005`,
        },
        {
          key: 'D',
          text: `Cả 7 chứng từ đều đã có chi tiết trong CTHOADON`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Bảng CTHOADON mới chỉ có dữ liệu của các số chứng từ 001, 002, 003, 005 và 007. Hai chứng từ 004 và 006 chưa có bản ghi nào trong CTHOADON.',
      relatedSql: `SELECT hd.SOCTU, hd.LOAICTU, hd.NGAYCTU, hd.HOTEN, hd.DIACHI\nFROM HOADON hd\nLEFT JOIN CTHOADON ct ON hd.SOCTU = ct.SOCTU\nWHERE ct.MASACH IS NULL;`,
    },
    {
      id: 'KDS-Q10',
      databaseId: 'CSDL_KDSACH',
      level: 'Vận dụng',
      order: 10,
      question: 'Câu lệnh nào tìm ra Số chứng từ (SOCTU, HOTEN) có tổng trị giá hóa đơn (SUM(ct.SOLUONG * s.DONGIA)) cao nhất?',
      options: [
        {
          key: 'A',
          text: `SELECT hd.SOCTU, hd.HOTEN, SUM(ct.SOLUONG * s.DONGIA) AS TongTriGia\nFROM HOADON hd\nJOIN CTHOADON ct ON hd.SOCTU = ct.SOCTU\nJOIN DMSACH s ON ct.MASACH = s.MASACH\nGROUP BY hd.SOCTU, hd.HOTEN\nORDER BY TongTriGia DESC\nLIMIT 1;`,
        },
        {
          key: 'B',
          text: `SELECT SOCTU, MAX(SOLUONG) FROM CTHOADON LIMIT 1;`,
        },
        {
          key: 'C',
          text: `SELECT SOCTU, HOTEN FROM HOADON ORDER BY SOCTU DESC LIMIT 1;`,
        },
        {
          key: 'D',
          text: `SELECT MASACH, MAX(DONGIA) FROM DMSACH;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối HOADON, CTHOADON và DMSACH, gom nhóm theo từng chứng từ, tính tổng tiền SUM(ct.SOLUONG * s.DONGIA), sắp xếp giảm dần (DESC) và lấy dòng đầu tiên (LIMIT 1 - chứng từ 005 của LÊ VĂN NUÔI với tổng trị giá 1.150.000).',
      relatedSql: `SELECT hd.SOCTU, hd.HOTEN, SUM(ct.SOLUONG * s.DONGIA) AS TongTriGia\nFROM HOADON hd\nJOIN CTHOADON ct ON hd.SOCTU = ct.SOCTU\nJOIN DMSACH s ON ct.MASACH = s.MASACH\nGROUP BY hd.SOCTU, hd.HOTEN\nORDER BY TongTriGia DESC\nLIMIT 1;`,
    },
  ],

  // ==========================================
  // 15. CSDL_QLTAU (4 Bảng - Quản Lý Tàu)
  // ==========================================
  CSDL_QLTAU: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'TAU-Q01',
      databaseId: 'CSDL_QLTAU',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL_QLTAU, bảng LICHTRINH chứa những trường Khóa ngoại (Foreign Key) nào để liên kết với 3 bảng còn lại?',
      options: [
        { key: 'A', text: 'Ba trường: MaTau, MaThuyenVien và MaMatHang.' },
        { key: 'B', text: 'Chỉ duy nhất trường Malichtrinh.' },
        { key: 'C', text: 'Hai trường: CangXuatPhat và CangDen.' },
        { key: 'D', text: 'Hai trường: GioKhoiHanh và GioCapBen.' },
      ],
      correctAnswer: 'A',
      explanation: 'Trong bảng LICHTRINH, Malichtrinh là khóa chính; còn MaTau tham chiếu đến bảng TAU, MaThuyenVien tham chiếu đến bảng THUYENVIEN, và MaMatHang tham chiếu đến bảng MATHANG.',
      relatedSql: `SELECT Malichtrinh, MaTau, MaThuyenVien, MaMatHang, CangXuatPhat, CangDen\nFROM LICHTRINH;`,
    },
    {
      id: 'TAU-Q02',
      databaseId: 'CSDL_QLTAU',
      level: 'Nhận biết',
      order: 2,
      question: 'Câu lệnh SQL nào hiển thị danh sách tất cả các con tàu gồm MaTau, TenTau và TrongTaiToiDa từ bảng TAU, sắp xếp theo trọng tải tối đa giảm dần?',
      options: [
        { key: 'A', text: 'SELECT MaTau, TenTau, TrongTaiToiDa FROM TAU ORDER BY TrongTaiToiDa DESC;' },
        { key: 'B', text: 'SELECT * FROM TAU SORT BY TrongTaiToiDa DESC;' },
        { key: 'C', text: 'SELECT ALL FROM TAU GROUP BY TrongTaiToiDa;' },
        { key: 'D', text: 'GET MaTau, TenTau FROM TAU ORDER BY TrongTaiToiDa ASC;' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề ORDER BY TrongTaiToiDa DESC sắp xếp các con tàu theo trọng tải từ lớn nhất (8000 tấn - Thái Bình Dương) xuống nhỏ nhất (3500 tấn - Hải Âu 02).',
      relatedSql: `SELECT MaTau, TenTau, TrongTaiToiDa\nFROM TAU\nORDER BY TrongTaiToiDa DESC;`,
    },
    {
      id: 'TAU-Q03',
      databaseId: 'CSDL_QLTAU',
      level: 'Nhận biết',
      order: 3,
      question: 'Để lọc danh sách các thuyền viên giữ chức danh \'Thuyền trưởng\' trong bảng THUYENVIEN, câu lệnh nào sau đây là đúng?',
      sqlSnippet: `SELECT MaThuyenVien, TenThuyenVien, ChucDanh, MucLuong\nFROM THUYENVIEN\nWHERE ChucDanh = 'Thuyền trưởng';`,
      options: [
        { key: 'A', text: `SELECT * FROM THUYENVIEN WHERE ChucDanh = 'Thuyền trưởng';` },
        { key: 'B', text: `SELECT * FROM THUYENVIEN HAVING ChucDanh = 'Thuyền trưởng';` },
        { key: 'C', text: `SELECT * FROM THUYENVIEN GROUP BY 'Thuyền trưởng';` },
        { key: 'D', text: `SELECT * FROM THUYENVIEN WHERE TenThuyenVien = 'Thuyền trưởng';` },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề WHERE ChucDanh = \'Thuyền trưởng\' lọc các dòng trong bảng THUYENVIEN có chức danh là Thuyền trưởng (TV01 - Nguyễn Văn Hải và TV04 - Phạm Quốc Đạt).',
      relatedSql: `SELECT MaThuyenVien, TenThuyenVien, ChucDanh, MucLuong\nFROM THUYENVIEN\nWHERE ChucDanh = 'Thuyền trưởng';`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'TAU-Q04',
      databaseId: 'CSDL_QLTAU',
      level: 'Thông hiểu',
      order: 4,
      question: 'Để hiển thị các lịch trình xuất phát từ \'Cảng Cát Lái\' và cập bến tại \'Cảng Hải Phòng\', điều kiện WHERE nào viết đúng?',
      options: [
        { key: 'A', text: `WHERE CangXuatPhat = 'Cảng Cát Lái' AND CangDen = 'Cảng Hải Phòng'` },
        { key: 'B', text: `WHERE CangXuatPhat = 'Cảng Cát Lái' OR CangDen = 'Cảng Hải Phòng'` },
        { key: 'C', text: `WHERE CangXuatPhat LIKE 'Cảng Hải Phòng'` },
        { key: 'D', text: `WHERE DinhVi = 'Cảng Cát Lái - Cảng Hải Phòng'` },
      ],
      correctAnswer: 'A',
      explanation: 'Toán tử AND yêu cầu thỏa mãn đồng thời cả hai điều kiện: cảng khởi hành là Cảng Cát Lái và cảng đích là Cảng Hải Phòng (gồm LT01 và LT07).',
      relatedSql: `SELECT Malichtrinh, MaTau, MaThuyenVien, MaMatHang, CangXuatPhat, CangDen, GioKhoiHanh, GioCapBen\nFROM LICHTRINH\nWHERE CangXuatPhat = 'Cảng Cát Lái' AND CangDen = 'Cảng Hải Phòng';`,
    },
    {
      id: 'TAU-Q05',
      databaseId: 'CSDL_QLTAU',
      level: 'Thông hiểu',
      order: 5,
      question: 'Để hiển thị Mã lịch trình (Malichtrinh), Tên tàu (TenTau), Tên thuyền viên (TenThuyenVien) và Tên mặt hàng (TenMatHang), cần thực hiện phép kết nối (JOIN) như thế nào?',
      options: [
        {
          key: 'A',
          text: 'Kết nối bảng LICHTRINH với cả 3 bảng TAU (qua MaTau), THUYENVIEN (qua MaThuyenVien) và MATHANG (qua MaMatHang).',
        },
        {
          key: 'B',
          text: 'Chỉ cần kết nối bảng TAU với bảng MATHANG.',
        },
        {
          key: 'C',
          text: 'Chỉ cần truy vấn trên bảng LICHTRINH.',
        },
        {
          key: 'D',
          text: 'Kết nối bảng THUYENVIEN với bảng MATHANG qua trường SoGiayPhep.',
        },
      ],
      correctAnswer: 'A',
      explanation: 'Bảng LICHTRINH đóng vai trò trung tâm lưu các mã khóa ngoại MaTau, MaThuyenVien, MaMatHang. Do đó cần JOIN LICHTRINH với cả 3 bảng danh mục.',
      relatedSql: `SELECT lt.Malichtrinh, t.TenTau, tv.TenThuyenVien, mh.TenMatHang, lt.CangXuatPhat, lt.CangDen\nFROM LICHTRINH lt\nJOIN TAU t ON lt.MaTau = t.MaTau\nJOIN THUYENVIEN tv ON lt.MaThuyenVien = tv.MaThuyenVien\nJOIN MATHANG mh ON lt.MaMatHang = mh.MaMatHang;`,
    },
    {
      id: 'TAU-Q06',
      databaseId: 'CSDL_QLTAU',
      level: 'Thông hiểu',
      order: 6,
      question: 'Câu lệnh nào thống kê số lượng chuyến lịch trình xuất phát từ mỗi cảng (CangXuatPhat), sắp xếp theo số chuyến giảm dần?',
      options: [
        {
          key: 'A',
          text: `SELECT CangXuatPhat, COUNT(*) AS SoChuyen\nFROM LICHTRINH\nGROUP BY CangXuatPhat\nORDER BY SoChuyen DESC;`,
        },
        {
          key: 'B',
          text: `SELECT CangXuatPhat, SUM(Malichtrinh) FROM LICHTRINH;`,
        },
        {
          key: 'C',
          text: `SELECT DISTINCT CangXuatPhat, COUNT(*) FROM LICHTRINH WHERE COUNT(*) > 0;`,
        },
        {
          key: 'D',
          text: `SELECT CangXuatPhat FROM LICHTRINH ORDER BY COUNT(*) DESC;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng GROUP BY CangXuatPhat kết hợp hàm COUNT(*) để đếm số lịch trình xuất phát từ từng cảng và ORDER BY SoChuyen DESC.',
      relatedSql: `SELECT CangXuatPhat, COUNT(*) AS SoChuyen\nFROM LICHTRINH\nGROUP BY CangXuatPhat\nORDER BY SoChuyen DESC;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'TAU-Q07',
      databaseId: 'CSDL_QLTAU',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh nào tìm danh sách các con tàu đã thực hiện từ 2 chuyến lịch trình trở lên (hiển thị MaTau, TenTau, SoChuyen)?',
      options: [
        {
          key: 'A',
          text: `SELECT t.MaTau, t.TenTau, COUNT(lt.Malichtrinh) AS SoChuyen\nFROM TAU t\nJOIN LICHTRINH lt ON t.MaTau = lt.MaTau\nGROUP BY t.MaTau, t.TenTau\nHAVING COUNT(lt.Malichtrinh) >= 2;`,
        },
        {
          key: 'B',
          text: `SELECT t.MaTau, t.TenTau, COUNT(lt.Malichtrinh) FROM TAU t JOIN LICHTRINH lt ON t.MaTau = lt.MaTau WHERE COUNT(lt.Malichtrinh) >= 2 GROUP BY t.MaTau;`,
        },
        {
          key: 'C',
          text: `SELECT MaTau, TenTau FROM TAU WHERE TrongTaiToiDa >= 2;`,
        },
        {
          key: 'D',
          text: `SELECT MaTau, COUNT(*) FROM LICHTRINH HAVING COUNT(*) >= 2;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sau khi gom nhóm GROUP BY theo từng con tàu, điều kiện lọc trên hàm đếm COUNT(lt.Malichtrinh) >= 2 bắt buộc phải đặt trong mệnh đề HAVING.',
      relatedSql: `SELECT t.MaTau, t.TenTau, COUNT(lt.Malichtrinh) AS SoChuyen\nFROM TAU t\nJOIN LICHTRINH lt ON t.MaTau = lt.MaTau\nGROUP BY t.MaTau, t.TenTau\nHAVING COUNT(lt.Malichtrinh) >= 2;`,
    },
    {
      id: 'TAU-Q08',
      databaseId: 'CSDL_QLTAU',
      level: 'Vận dụng',
      order: 8,
      question: 'Trong bảng TAU, con tàu nào hiện chưa được phân công bất kỳ chuyến lịch trình nào trong bảng LICHTRINH, và dùng câu lệnh nào để tìm?',
      options: [
        {
          key: 'A',
          text: `Tàu T05 (Sóng Thần 09) - dùng LEFT JOIN từ TAU sang LICHTRINH kết hợp WHERE lt.Malichtrinh IS NULL`,
        },
        {
          key: 'B',
          text: `Tàu T01 (Biển Đông 01) - dùng INNER JOIN`,
        },
        {
          key: 'C',
          text: `Tàu T03 (Thái Bình Dương) - dùng WHERE lt.Malichtrinh = NULL`,
        },
        {
          key: 'D',
          text: `Tất cả 5 con tàu đều đã có lịch trình`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Tàu T05 (Sóng Thần 09 - trọng tải 4200 tấn) chưa xuất hiện trong bảng LICHTRINH. Phép LEFT JOIN kết hợp WHERE lt.Malichtrinh IS NULL sẽ lọc chính xác con tàu này.',
      relatedSql: `SELECT t.MaTau, t.TenTau, t.TrongTaiToiDa\nFROM TAU t\nLEFT JOIN LICHTRINH lt ON t.MaTau = lt.MaTau\nWHERE lt.Malichtrinh IS NULL;`,
    },
    {
      id: 'TAU-Q09',
      databaseId: 'CSDL_QLTAU',
      level: 'Vận dụng',
      order: 9,
      question: 'Câu lệnh nào tìm các thuyền viên có mức lương (MucLuong) cao hơn mức lương trung bình của toàn bộ thuyền viên trong bảng THUYENVIEN?',
      options: [
        {
          key: 'A',
          text: `SELECT MaThuyenVien, TenThuyenVien, ChucDanh, MucLuong\nFROM THUYENVIEN\nWHERE MucLuong > (SELECT AVG(MucLuong) FROM THUYENVIEN)\nORDER BY MucLuong DESC;`,
        },
        {
          key: 'B',
          text: `SELECT MaThuyenVien, TenThuyenVien, MucLuong FROM THUYENVIEN WHERE MucLuong > AVG(MucLuong);`,
        },
        {
          key: 'C',
          text: `SELECT MaThuyenVien, TenThuyenVien FROM THUYENVIEN HAVING MucLuong > AVG(MucLuong);`,
        },
        {
          key: 'D',
          text: `SELECT MaThuyenVien, MAX(MucLuong) FROM THUYENVIEN;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng truy vấn con (SELECT AVG(MucLuong) FROM THUYENVIEN) trong mệnh đề WHERE để tính mức lương trung bình chung rồi lọc các thuyền viên có lương cao hơn mức đó.',
      relatedSql: `SELECT MaThuyenVien, TenThuyenVien, ChucDanh, MucLuong\nFROM THUYENVIEN\nWHERE MucLuong > (\n  SELECT AVG(MucLuong)\n  FROM THUYENVIEN\n)\nORDER BY MucLuong DESC;`,
    },
    {
      id: 'TAU-Q10',
      databaseId: 'CSDL_QLTAU',
      level: 'Vận dụng',
      order: 10,
      question: 'Trong bảng MATHANG, mặt hàng nào chưa từng được vận chuyển trong bất kỳ chuyến lịch trình nào của bảng LICHTRINH?',
      options: [
        {
          key: 'A',
          text: `MH06 (Xi măng Hà Tiên, GP-2025-006) - tìm bằng LEFT JOIN từ MATHANG sang LICHTRINH kết hợp WHERE lt.Malichtrinh IS NULL`,
        },
        {
          key: 'B',
          text: `MH01 (Gạo xuất khẩu ST25)`,
        },
        {
          key: 'C',
          text: `MH04 (Cà phê nhân Đắk Lắk)`,
        },
        {
          key: 'D',
          text: `Tất cả 6 mặt hàng đều đã được vận chuyển`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Mặt hàng MH06 (Xi măng Hà Tiên) chưa có dòng lịch trình nào trong bảng LICHTRINH. Dùng LEFT JOIN kết hợp WHERE lt.Malichtrinh IS NULL để tìm.',
      relatedSql: `SELECT mh.MaMatHang, mh.TenMatHang, mh.SoLuong, mh.SoGiayPhep\nFROM MATHANG mh\nLEFT JOIN LICHTRINH lt ON mh.MaMatHang = lt.MaMatHang\nWHERE lt.Malichtrinh IS NULL;`,
    },
  ],

  // ==========================================
  // 16. CSDL_CUUHOA (4 Bảng - Cứu Hỏa PCCC)
  // ==========================================
  CSDL_CUUHOA: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'CH-Q01',
      databaseId: 'CSDL_CUUHOA',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL_CUUHOA, bảng DIEU_DONG_XE có khóa chính và các khóa ngoại nào?',
      options: [
        { key: 'A', text: 'Khóa chính là MaDieuDong; hai khóa ngoại là MaVu (tham chiếu VU_CHAY) và MaXe (tham chiếu XE_CHUA_CHAY).' },
        { key: 'B', text: 'Khóa chính là MaVu; khóa ngoại là GioXuatPhat.' },
        { key: 'C', text: 'Khóa chính là MaXe; khóa ngoại là MaTru.' },
        { key: 'D', text: 'Khóa chính là GioXuatPhat.' },
      ],
      correctAnswer: 'A',
      explanation: 'Trong bảng DIEU_DONG_XE(MaDieuDong, MaVu, MaXe, GioXuatPhat), MaDieuDong định danh duy nhất mỗi lệnh điều động, MaVu liên kết đến VU_CHAY và MaXe liên kết đến XE_CHUA_CHAY.',
      relatedSql: `SELECT *\nFROM DIEU_DONG_XE;`,
    },
    {
      id: 'CH-Q02',
      databaseId: 'CSDL_CUUHOA',
      level: 'Nhận biết',
      order: 2,
      question: 'Câu lệnh SQL nào hiển thị danh sách tất cả các trụ nước gồm MaTru, ViTri và ApLucChuan từ bảng TRU_NUOC, sắp xếp theo ApLucChuan giảm dần?',
      options: [
        { key: 'A', text: 'SELECT MaTru, ViTri, ApLucChuan FROM TRU_NUOC ORDER BY ApLucChuan DESC;' },
        { key: 'B', text: 'SELECT * FROM TRU_NUOC SORT BY ApLucChuan DESC;' },
        { key: 'C', text: 'SELECT ALL FROM TRU_NUOC GROUP BY ApLucChuan;' },
        { key: 'D', text: 'GET MaTru, ViTri FROM TRU_NUOC ORDER BY ApLucChuan ASC;' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề ORDER BY ApLucChuan DESC sắp xếp các trụ nước theo áp lực chuẩn từ cao nhất (6.0 bar - TN03) xuống thấp nhất (3.8 bar - TN06).',
      relatedSql: `SELECT MaTru, ViTri, ApLucChuan\nFROM TRU_NUOC\nORDER BY ApLucChuan DESC;`,
    },
    {
      id: 'CH-Q03',
      databaseId: 'CSDL_CUUHOA',
      level: 'Nhận biết',
      order: 3,
      question: 'Theo dữ liệu trong bảng XE_CHUA_CHAY, xe chữa cháy nào có dung tích bồn nước (DungTichNuoc) lớn nhất (10.000 lít)?',
      sqlSnippet: `SELECT MaXe, BienSo, DungTichNuoc\nFROM XE_CHUA_CHAY\nORDER BY DungTichNuoc DESC\nLIMIT 1;`,
      options: [
        { key: 'A', text: 'XCC01 - Biển số 51A-114.01 (4.000 lít)' },
        { key: 'B', text: 'XCC03 - Biển số 61A-114.05 (8.000 lít)' },
        { key: 'C', text: 'XCC05 - Biển số 51A-114.12 (10.000 lít)' },
        { key: 'D', text: 'XCC06 - Biển số 61A-114.15 (3.500 lít)' },
      ],
      correctAnswer: 'C',
      explanation: 'Trong bảng XE_CHUA_CHAY, xe XCC05 (biển số 51A-114.12) có dung tích nước lớn nhất là 10.000 lít.',
      relatedSql: `SELECT MaXe, BienSo, DungTichNuoc\nFROM XE_CHUA_CHAY\nORDER BY DungTichNuoc DESC\nLIMIT 1;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'CH-Q04',
      databaseId: 'CSDL_CUUHOA',
      level: 'Thông hiểu',
      order: 4,
      question: 'Để lọc danh sách các xe chữa cháy mang biển số thuộc TP.HCM (bắt đầu bằng \'51A\') và có dung tích nước từ 5.000 lít trở lên, mệnh đề WHERE nào viết đúng?',
      options: [
        { key: 'A', text: `WHERE BienSo LIKE '51A%' AND DungTichNuoc >= 5000` },
        { key: 'B', text: `WHERE BienSo = '51A' OR DungTichNuoc >= 5000` },
        { key: 'C', text: `WHERE BienSo LIKE '%51A' AND DungTichNuoc > 5000` },
        { key: 'D', text: `WHERE MaXe LIKE '51A%'` },
      ],
      correctAnswer: 'A',
      explanation: 'Mẫu LIKE \'51A%\' kiểm tra biển số bắt đầu bằng "51A", kết hợp toán tử AND với điều kiện DungTichNuoc >= 5000 (gồm XCC02, XCC04, XCC05).',
      relatedSql: `SELECT MaXe, BienSo, DungTichNuoc\nFROM XE_CHUA_CHAY\nWHERE BienSo LIKE '51A%' AND DungTichNuoc >= 5000;`,
    },
    {
      id: 'CH-Q05',
      databaseId: 'CSDL_CUUHOA',
      level: 'Thông hiểu',
      order: 5,
      question: 'Để hiển thị Mã điều động (MaDieuDong), Địa điểm cháy (DiaDiem), Biển số xe (BienSo), Dung tích nước (DungTichNuoc) và Giờ xuất phát (GioXuatPhat), cần kết nối những bảng nào?',
      options: [
        { key: 'A', text: 'Kết nối 3 bảng: DIEU_DONG_XE, VU_CHAY (qua MaVu) và XE_CHUA_CHAY (qua MaXe).' },
        { key: 'B', text: 'Chỉ cần kết nối bảng DIEU_DONG_XE và TRU_NUOC.' },
        { key: 'C', text: 'Chỉ cần bảng VU_CHAY và XE_CHUA_CHAY.' },
        { key: 'D', text: 'Chỉ cần truy vấn trên bảng DIEU_DONG_XE.' },
      ],
      correctAnswer: 'A',
      explanation: 'DiaDiem nằm ở bảng VU_CHAY, BienSo và DungTichNuoc nằm ở bảng XE_CHUA_CHAY, còn MaDieuDong và GioXuatPhat nằm ở bảng DIEU_DONG_XE.',
      relatedSql: `SELECT dd.MaDieuDong, vc.DiaDiem, xe.BienSo, xe.DungTichNuoc, dd.GioXuatPhat\nFROM DIEU_DONG_XE dd\nJOIN VU_CHAY vc ON dd.MaVu = vc.MaVu\nJOIN XE_CHUA_CHAY xe ON dd.MaXe = xe.MaXe;`,
    },
    {
      id: 'CH-Q06',
      databaseId: 'CSDL_CUUHOA',
      level: 'Thông hiểu',
      order: 6,
      question: 'Quan sát câu lệnh SQL:\nSELECT COUNT(*) AS SoXe\nFROM DIEU_DONG_XE\nWHERE MaVu = \'VC01\';\nCó bao nhiêu lượt xe chữa cháy được điều động tới vụ cháy \'VC01\'?',
      sqlSnippet: `SELECT COUNT(*) AS SoXe\nFROM DIEU_DONG_XE\nWHERE MaVu = 'VC01';`,
      options: [
        { key: 'A', text: '1 xe' },
        { key: 'B', text: '2 xe' },
        { key: 'C', text: '3 xe (XCC03, XCC05 và XCC02)' },
        { key: 'D', text: '4 xe' },
      ],
      correctAnswer: 'C',
      explanation: 'Trong bảng DIEU_DONG_XE, vụ cháy VC01 có 3 lệnh điều động là DD01 (XCC03), DD02 (XCC05) và DD03 (XCC02).',
      relatedSql: `SELECT MaVu, COUNT(*) AS SoXe\nFROM DIEU_DONG_XE\nWHERE MaVu = 'VC01'\nGROUP BY MaVu;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'CH-Q07',
      databaseId: 'CSDL_CUUHOA',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh nào thống kê số lượng xe được điều động cho từng vụ cháy (MaVu, DiaDiem), chỉ hiển thị những vụ cháy huy động từ 2 xe trở lên?',
      options: [
        {
          key: 'A',
          text: `SELECT vc.MaVu, vc.DiaDiem, COUNT(dd.MaDieuDong) AS SoXe\nFROM VU_CHAY vc\nJOIN DIEU_DONG_XE dd ON vc.MaVu = dd.MaVu\nGROUP BY vc.MaVu, vc.DiaDiem\nHAVING COUNT(dd.MaDieuDong) >= 2;`,
        },
        {
          key: 'B',
          text: `SELECT vc.MaVu, vc.DiaDiem, COUNT(dd.MaDieuDong) FROM VU_CHAY vc JOIN DIEU_DONG_XE dd ON vc.MaVu = dd.MaVu WHERE COUNT(dd.MaDieuDong) >= 2 GROUP BY vc.MaVu;`,
        },
        {
          key: 'C',
          text: `SELECT MaVu, COUNT(*) FROM DIEU_DONG_XE WHERE MaXe >= 2;`,
        },
        {
          key: 'D',
          text: `SELECT vc.DiaDiem, SUM(dd.MaXe) FROM VU_CHAY vc HAVING COUNT(*) >= 2;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sau khi gom nhóm GROUP BY theo từng vụ cháy, điều kiện lọc trên hàm đếm COUNT(dd.MaDieuDong) >= 2 bắt buộc phải đặt trong mệnh đề HAVING.',
      relatedSql: `SELECT vc.MaVu, vc.DiaDiem, COUNT(dd.MaDieuDong) AS SoXe\nFROM VU_CHAY vc\nJOIN DIEU_DONG_XE dd ON vc.MaVu = dd.MaVu\nGROUP BY vc.MaVu, vc.DiaDiem\nHAVING COUNT(dd.MaDieuDong) >= 2;`,
    },
    {
      id: 'CH-Q08',
      databaseId: 'CSDL_CUUHOA',
      level: 'Vận dụng',
      order: 8,
      question: 'Trong bảng XE_CHUA_CHAY, chiếc xe nào hiện chưa từng được điều động trong bảng DIEU_DONG_XE, và dùng câu lệnh nào để tìm?',
      options: [
        {
          key: 'A',
          text: `Xe XCC06 (biển số 61A-114.15, 3500 lít) - dùng LEFT JOIN từ XE_CHUA_CHAY sang DIEU_DONG_XE kết hợp WHERE dd.MaDieuDong IS NULL`,
        },
        {
          key: 'B',
          text: `Xe XCC01 (51A-114.01) - dùng INNER JOIN`,
        },
        {
          key: 'C',
          text: `Xe XCC04 (51A-114.08) - dùng WHERE dd.MaDieuDong = NULL`,
        },
        {
          key: 'D',
          text: `Tất cả 6 xe đều đã được điều động`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Xe XCC06 (61A-114.15) chưa xuất hiện trong bảng DIEU_DONG_XE. Dùng LEFT JOIN kết hợp WHERE dd.MaDieuDong IS NULL sẽ lọc chính xác xe dự phòng này.',
      relatedSql: `SELECT xe.MaXe, xe.BienSo, xe.DungTichNuoc\nFROM XE_CHUA_CHAY xe\nLEFT JOIN DIEU_DONG_XE dd ON xe.MaXe = dd.MaXe\nWHERE dd.MaDieuDong IS NULL;`,
    },
    {
      id: 'CH-Q09',
      databaseId: 'CSDL_CUUHOA',
      level: 'Vận dụng',
      order: 9,
      question: 'Trong bảng VU_CHAY, vụ cháy nào chưa có lệnh điều động xe trong bảng DIEU_DONG_XE?',
      options: [
        {
          key: 'A',
          text: `VC05 (Nhà kho Quận 7) - tìm bằng LEFT JOIN từ VU_CHAY sang DIEU_DONG_XE kết hợp WHERE dd.MaDieuDong IS NULL`,
        },
        {
          key: 'B',
          text: `VC01 (Kho xưởng KCN Sóng Thần)`,
        },
        {
          key: 'C',
          text: `VC03 (Cửa hàng tạp hóa gần Chợ Bến Thành)`,
        },
        {
          key: 'D',
          text: `Cả 5 vụ cháy đều có xe điều động`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Vụ cháy VC05 (Nhà kho Quận 7) chưa có bản ghi nào trong bảng DIEU_DONG_XE.',
      relatedSql: `SELECT vc.MaVu, vc.DiaDiem, vc.ThoiGianBao\nFROM VU_CHAY vc\nLEFT JOIN DIEU_DONG_XE dd ON vc.MaVu = dd.MaVu\nWHERE dd.MaDieuDong IS NULL;`,
    },
    {
      id: 'CH-Q10',
      databaseId: 'CSDL_CUUHOA',
      level: 'Vận dụng',
      order: 10,
      question: 'Câu lệnh nào tìm ra Vụ cháy (MaVu, DiaDiem) huy động tổng dung tích nước của các xe chữa cháy (SUM(xe.DungTichNuoc)) lớn nhất?',
      options: [
        {
          key: 'A',
          text: `SELECT vc.MaVu, vc.DiaDiem, SUM(xe.DungTichNuoc) AS TongDungTichNuoc\nFROM VU_CHAY vc\nJOIN DIEU_DONG_XE dd ON vc.MaVu = dd.MaVu\nJOIN XE_CHUA_CHAY xe ON dd.MaXe = xe.MaXe\nGROUP BY vc.MaVu, vc.DiaDiem\nORDER BY TongDungTichNuoc DESC\nLIMIT 1;`,
        },
        {
          key: 'B',
          text: `SELECT MaXe, MAX(DungTichNuoc) FROM XE_CHUA_CHAY LIMIT 1;`,
        },
        {
          key: 'C',
          text: `SELECT MaVu, COUNT(*) FROM DIEU_DONG_XE ORDER BY MaVu DESC LIMIT 1;`,
        },
        {
          key: 'D',
          text: `SELECT MaTru, MAX(ApLucChuan) FROM TRU_NUOC;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối VU_CHAY, DIEU_DONG_XE và XE_CHUA_CHAY, gom nhóm theo vụ cháy, tính tổng dung tích nước SUM(xe.DungTichNuoc), sắp xếp giảm dần và lấy dòng đầu tiên với LIMIT 1 (VC01: 24.000 lít).',
      relatedSql: `SELECT vc.MaVu, vc.DiaDiem, SUM(xe.DungTichNuoc) AS TongDungTichNuoc\nFROM VU_CHAY vc\nJOIN DIEU_DONG_XE dd ON vc.MaVu = dd.MaVu\nJOIN XE_CHUA_CHAY xe ON dd.MaXe = xe.MaXe\nGROUP BY vc.MaVu, vc.DiaDiem\nORDER BY TongDungTichNuoc DESC\nLIMIT 1;`,
    },
  ],
};
